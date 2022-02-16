export interface PlayerState {
  paused: boolean;
  name: string;
  artists: string[];
  durationMs: number;
  imageURL: string;
  progress: {
    ms: number;
    syncedAt: number;
  }
}

export function intoState(data: Record<string, any>): PlayerState | null {
  const { state } = data.event;

  return {
    paused: !state.is_playing,
    artists: state.item.artists.map(a => a.name),
    name: state.item.name,
    durationMs: state.item.duration_ms,
    progress: {
      ms: state.progress_ms,
      syncedAt: Date.now(),
    },
    imageURL: state.item.album.images[0].url,
  };
}
