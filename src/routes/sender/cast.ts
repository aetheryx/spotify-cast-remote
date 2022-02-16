import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const castState = writable<string>('UNINITIALISED');

function init() {
  const context = cast.framework.CastContext.getInstance();

  context.addEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED, (event) => {
    castState.set(event.sessionState);
  });

  context.setOptions({
    receiverApplicationId: import.meta.env.VITE_GCAST_APPLICATION_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
  });
}

if (browser && window['__GCastApiIsAvailable']) {
  init();
} else if (browser) {
  window['__onGCastApiAvailable'] = function (available) {
    if (available) {
      window['__GCastApiIsAvailable'] = true;
      init();
    }
  };
}