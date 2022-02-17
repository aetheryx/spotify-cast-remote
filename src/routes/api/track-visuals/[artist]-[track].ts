import type { RequestHandler } from '@sveltejs/kit';
import { ඞ } from '../../../spotify-pls-dont-sue';
import { getUser } from '../get-user';

const encode = (data: unknown) => encodeURIComponent(JSON.stringify(data));

export const get: RequestHandler = async ({ request, params: { artist, track } }) => {
  const { token } = await getUser(request.headers.get('x-spotify-cookie'));

  const artistData = await fetch(`https://${ඞ.ARTIST_DATA_URL}${
    encode({ artistUri: `spotify:artist:${artist}` })
  }`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  }).then(r => r.json());

  const body = {
    backgroundImage: artistData.data.artist.visuals.headerImage?.sources[0].url ?? null,
    color: null,
  };

  if (!body.backgroundImage) {
    const trackData = await fetch(`https://${ඞ.FETCH_EXTRACTED_COLORS_URL}${
      encode({ uris: [`https://i.scdn.co/image/${track}`] })
    }`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(r => r.json());

    body.color = trackData.data.extractedColors.find(c => c.__typename === 'ExtractedColors') ?? null;
  }

  return {
    status: 200,
    body,
  };
};
