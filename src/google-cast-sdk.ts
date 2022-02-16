import { browser } from '$app/env';

export const cast = browser ? window['cast'] : null;
export const chrome = browser ? window['chromecast'] : null;
