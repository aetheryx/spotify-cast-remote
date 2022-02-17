export enum Namespaces {
  PLAYER_STATE_SYNC = 'urn:x-cast:com.aetheryx.spotify-cast.player-state-sync',
  PLAYER_COMMAND = 'urn:x-cast:com.aetheryx.spotify-cast.player-command',
  APPLICATION_LOGIC = 'urn:x-cast:com.aetheryx.spotify-cast.application-logic',
}

interface Payload<T, P> {
  type: T;
  payload: P;
}

export type AnyPayload =
  Payload<'COOKIE', { cookie: string }>;
