import { LifecycleComponent } from '@antman/lifecycle';
import { Hono } from '@hono/hono';
import { logger } from '@hono/hono/logger';
import { parseArgs } from '@std/cli/parse-args';
import { talon } from './talon/routes/commandCounter.ts';

export const webserver = new (class Webserver implements LifecycleComponent {
  name: 'webserver';
  status: LifecycleComponent['status'];
  app = new Hono();
  #abortController: AbortController;
  #server?: Deno.HttpServer<Deno.NetAddr>;
  constructor() {
    this.name = 'webserver';
    this.status = 'pending';
    this.#abortController = new AbortController();
    this.app.use(logger());
    this.app.route('/talon', talon);
  }
  start() {
    const port = parseArgs(Deno.args, { string: ['port'] }).port ?? '7500';
    Deno.serve(
      {
        signal: this.#abortController.signal,
        port: parseInt(port),
        onListen: ({ hostname }) =>
          console.log(`Listening on http://${hostname}:${port}`),
      },
      this.app.fetch,
    );
    return Promise.resolve();
  }
  async close() {
    await this.#server?.shutdown();
  }
})();
