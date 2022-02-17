import { Namespaces, type AnyPayload } from '../../ipc';
import { writable } from 'svelte/store';
import { ඞ } from '../../spotify-pls-dont-sue';

interface Payload {
  type: string;
  headers: Record<string, string>;
  payloads: Array<{
    events: Array<{
      type: string;
      event: any;
    }>;
  }>;
}

export const spotifyState = writable<string>('UNINITIALISED');

export async function init(cookie: string) {
  spotifyState.set('CONNECTING');

  const { token } = await fetch('/api/user', {
    headers: {
      'x-spotify-cookie': cookie
    }
  })
    .then(r => r.json());

  const ws = new WebSocket(`wss://${ඞ.SPOTIFY_WS_URL}/?access_token=${token}`);

  ws.onmessage = (payload) => {
    handlePayload(token, cookie, JSON.parse(payload.data));
  };

  ws.onopen = () => {
    setInterval(() => {
      ws.send(JSON.stringify({ type: 'ping' }));
    }, 30_000);
  };
}

async function handlePayload(token: string, cookie: string, payload: Payload): Promise<void> {
  if (payload.type !== 'message') {
    return;
  }

  if (payload.headers?.['Spotify-Connection-Id']) {
    return subscribe(token, cookie, payload.headers['Spotify-Connection-Id']);
  }

  for (const event of payload.payloads.map(p => p.events).flat()) {
    if (event.type === 'PLAYER_STATE_CHANGED') {
      await handleEvent(event);
    }
  }
}

async function subscribe(token: string, cookie: string, connectionID: string) {
  spotifyState.set('SUBSCRIBING');
  const res = await fetch(`https://${ඞ.SPOTIFY_SUBSCRIBE_URL}?connection_id=${connectionID}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  const body = await res.json();
  if (body.message === ඞ.SUBSCRIBE_SUCCESS_RESPONSE) {
    spotifyState.set('CONNECTED');
    const context = cast.framework.CastContext.getInstance();
    const session = context.getCurrentSession();
  
    if (session) {
      console.log('sending', cookie);
      session.sendMessage(Namespaces.APPLICATION_LOGIC, {
        type: 'COOKIE',
        payload: { cookie }
      } as AnyPayload);
    }
  }
}

async function handleEvent(event: unknown) {
  const context = cast.framework.CastContext.getInstance();
  const session = context.getCurrentSession();

  if (session) {
    session.sendMessage(Namespaces.PLAYER_STATE_SYNC, event);
  }
}
