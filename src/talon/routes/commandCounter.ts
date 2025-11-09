import { Signal, signal } from '@preact/signals';
import { Hono } from '@hono/hono';
import { upgradeWebSocket } from '@hono/hono/deno';

const counts: Record<string, Signal<number>> = {};
const getCount = (n: string, v = 0) => (counts[n] = counts[n] ??= signal(v));

export const talon = new Hono()
  .get('counter/:name', (c) => {
    const count = getCount(c.req.param('name'));
    return c.text(count.value.toString());
  })
  .post('counter/:name', (c) => {
    const count = getCount(c.req.param('name'), 1);
    count.value = count.value + 1;
    return c.json({ value: count.value });
  })
  .get(
    'counter/:name/ws',
    upgradeWebSocket((c) => ({
      onOpen: (_e, ws) => {
        const count = getCount(c.req.param('name'));
        count.subscribe((value) => ws.send(value.toString()));
        ws.send(count.value.toString());
      },
    }))
  );
