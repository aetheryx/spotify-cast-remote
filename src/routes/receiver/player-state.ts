import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { backgroundURLInit } from './background-urls';
import { castInit } from './cast-init';
import type { PlayerState } from './parse-player-state';

export const playerState = writable<PlayerState>(null);
if (browser) {
  castInit(playerState);
  backgroundURLInit(playerState);
}
