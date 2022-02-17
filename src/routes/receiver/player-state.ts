import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { backgroundInit } from './background-urls';
import { castInit } from './cast-init';
import type { PlayerState } from './parse-player-state';

export const cookie = writable<string>(null);
export const playerState = writable<PlayerState>(null);
if (browser) {
  castInit(playerState, cookie);
  backgroundInit(playerState, cookie);
}
