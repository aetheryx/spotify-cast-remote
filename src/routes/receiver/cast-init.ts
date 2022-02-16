import { browser } from '$app/env';
import type { Writable } from 'svelte/store';
import { Namespaces } from '../../ipc';
import { intoState, type PlayerState } from './parse-player-state';

export function castInit(playerState: Writable<PlayerState>): void {
  if (!browser) {
    return;
  }

  const context = cast.framework.CastReceiverContext.getInstance();

  context.start({
    maxInactivity: 30,
    disableIdleTimeout: true,
    customNamespaces: {
      [Namespaces.PLAYER_COMMAND]: cast.framework.system.MessageType.JSON,
      [Namespaces.PLAYER_STATE_SYNC]: cast.framework.system.MessageType.JSON,
    },
  });

  context.addCustomMessageListener(Namespaces.PLAYER_STATE_SYNC, ({ data }) => {
    console.log('received', data);
    playerState.set(intoState(data));
  });
}
