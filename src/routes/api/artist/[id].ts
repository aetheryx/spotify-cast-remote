import type { RequestHandler } from '@sveltejs/kit';
import { load } from 'cheerio';
import { ඞ } from '../../../spotify-pls-dont-sue';

export const get: RequestHandler = async ({ params }) => {
  const id: string = params.id;

  const page = await fetch(`https://${ඞ.ARTIST_DATA_URL}/${id}`);
  const body = await page.text();
  const rawData = load(body)('#initial-state').html();
  const data = JSON.parse(Buffer.from(rawData, 'base64').toString());
  const bio = data.entities.items[`spotify:artist:${id}`].nodes.find(node => node.component?.id === 'artist:biography');

  return {
    status: 200,
    body: {
      colors: data.colorExtraction.colors,
      backgroundImage: bio?.images?.background?.uri ?? null,
    }
  };
};