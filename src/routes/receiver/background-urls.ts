import type { Writable } from 'svelte/store';
import LRUCache from 'lru-cache';
import type { PlayerState } from './parse-player-state';

export const backgroundCache = new LRUCache<string, Record<string, unknown>>({
  max: 100
});

export function backgroundInit(
  playerState: Writable<PlayerState>,
  cookieState: Writable<string>
): void {
  let cookie: string;
  cookieState.subscribe(v => {
    cookie = v;
  });

  playerState.subscribe(async state => {
    if (!state || state.background) {
      return;
    }

    const data = await fetch(`/api/track-visuals/${state.artists[0].id}-${state.iconURL.split('/').pop()}`, {
      headers: {
        'x-spotify-cookie': cookie
      }
    }).then(r => r.json());
    backgroundCache.set(state.id, data);

    playerState.update(uState => ({
      ...uState,
      background: data
    }));
  });
}
