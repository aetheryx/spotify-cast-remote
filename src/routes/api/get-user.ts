import { load } from 'cheerio';
import LRUCache from 'lru-cache';
import { ඞ } from '../../spotify-pls-dont-sue';

interface User {
  token: string;
  expiry: number;
}
const cache = new LRUCache<string, User>({
  max: 10,
});

export async function getUser(cookie: string): Promise<User> {
  const cached = cache.get(cookie);
  if (cached && Date.now() < cached.expiry) {
    return cached;
  }

  const res = await fetch(`https://${ඞ.USER_CONFIG_URL}`, {
    'headers': {
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      cookie,
    },
  });

  const body = await res.text();
  const configRaw = load(body)('#config').html();
  const config = JSON.parse(configRaw);

  const user: User = {
    token: config.accessToken,
    expiry: config.accessTokenExpirationTimestampMs
  };
  cache.set(cookie, user);

  return user;
}