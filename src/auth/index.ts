import { Hono } from '@hono/hono';
import { twitchAuth } from './twitchAuth.ts';

export const auth = new Hono().route('/twitch', twitchAuth);
