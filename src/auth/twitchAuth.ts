import { Hono } from '@hono/hono';
import { sendTwitchCodeGranted } from '../ipc.ts';

export const twitchAuth = new Hono().get('codegrant', async (c) => {
  const code = c.req.query('code');
  if (code) {
    await sendTwitchCodeGranted(code);
    return c.text('Granted! You can now close this window');
  }
  return c.text('Grant failed: code not present in query parameters');
});
