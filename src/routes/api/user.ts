import type { EndpointOutput, RequestHandler } from '@sveltejs/kit';
import { getUser } from './get-user';

export const get: RequestHandler = async ({ request }) => {
  const cookie = request.headers.get('x-spotify-cookie');
  const user = await getUser(cookie);

  return {
    status: 200,
    body: user as unknown as EndpointOutput['body'],
  };
};
