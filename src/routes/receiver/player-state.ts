import { writable } from 'svelte/store';
import { castInit } from './cast-init';
import type { PlayerState } from './parse-player-state';

export const playerState = writable<PlayerState>(null);
castInit(playerState);
