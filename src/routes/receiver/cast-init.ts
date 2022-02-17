import type { Writable } from 'svelte/store';
import { Namespaces } from '../../ipc';
import { intoState, type PlayerState } from './parse-player-state';

export function castInit(
  playerState: Writable<PlayerState>,
  cookieState: Writable<string>,
): void {
  const context = cast.framework.CastReceiverContext.getInstance();

  context.start({
    maxInactivity: 30,
    disableIdleTimeout: true,
    customNamespaces: {
      [Namespaces.PLAYER_COMMAND]: cast.framework.system.MessageType.JSON,
      [Namespaces.PLAYER_STATE_SYNC]: cast.framework.system.MessageType.JSON,
      [Namespaces.APPLICATION_LOGIC]: cast.framework.system.MessageType.JSON,
    },
  });

  context.addCustomMessageListener(Namespaces.PLAYER_STATE_SYNC, ({ data }) => {
    playerState.set(intoState(data));
  });

  context.addCustomMessageListener(Namespaces.APPLICATION_LOGIC, ({ data }) => {
    cookieState.set(data.payload.cookie);
  });
}
