import { backgroundCache } from './background-urls';

interface Artist {
  name: string;
  id: string;
}

export interface PlayerState {
  id: string;
  paused: boolean;
  name: string;
  artists: Artist[];
  durationMs: number;
  iconURL: string;
  background: null | Record<string, unknown>;
  progress: {
    ms: number;
    syncedAt: number;
  }
}

export function intoState(data: Record<string, any>): PlayerState | null {
  const { state } = data.event;

  return {
    id: state.item.id,
    paused: !state.is_playing,
    artists: state.item.artists.map(a => ({
      id: a.id,
      name: a.name
    })),
    name: state.item.name,
    durationMs: state.item.duration_ms,
    progress: {
      ms: state.progress_ms,
      syncedAt: state.timestamp,
    },
    iconURL: state.item.album.images[0].url,
    background: backgroundCache.get(state.item.id) ?? null
  };
}
