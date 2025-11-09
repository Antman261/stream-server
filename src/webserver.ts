import { newNode } from '@antman/lifecycle';
import { Hono } from '@hono/hono';
import { logger } from '@hono/hono/logger';
import { parseArgs } from '@std/cli/parse-args';
import { talon } from './talon/routes/commandCounter.ts';
import { auth } from './auth/index.ts';

export const webserver = newNode(() => {
  const port = parseInt(
    parseArgs(Deno.args, { string: ['port'] }).port ?? '7500',
    10
  );
  let server: Deno.HttpServer<Deno.NetAddr> | undefined;
  const app = new Hono();
  app.use(logger(console.error));
  app.get('/healthcheck', (c) => c.text('OK'));
  app.route('/talon', talon);
  app.route('/auth', auth);

  return {
    name: 'webserver',
    start() {
      server = Deno.serve({ port, onListen: makeListener(port) }, app.fetch);
      return Promise.resolve();
    },
    async close() {
      await server?.shutdown();
    },
  };
});

const makeListener =
  (port: number) =>
  ({ hostname }: Deno.NetAddr) =>
    console.error(`Listening on http://${hostname}:${port}`);
