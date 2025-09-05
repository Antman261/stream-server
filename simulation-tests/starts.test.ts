import { expect } from '@std/expect';
import { makeSimTest } from '@antman/sim-test';
const withSim = makeSimTest({
  clients: [],
  servers: [{ entryPath: './main.ts' }],
});

Deno.test(
  'Server starts up',
  withSim(async ({ simCtx }) => {
    const [server] = simCtx.serverInstances;
    const { text } = await server.getText('/');
    expect(text).toEqual('Hello Hono!');
  }),
);

Deno.test(
  'Counters can count',
  withSim(async ({ simCtx }) => {
    const [server] = simCtx.serverInstances;
    expect(await server.getText('/talon/counter/bees')).toEqual({
      status: 200,
      text: '0',
    });
    expect(await server.post('/talon/counter/bees', {})).toEqual({
      status: 200,
      json: undefined,
    });
    expect(await server.getText('/talon/counter/bees')).toEqual({
      status: 200,
      text: '1',
    });
  }),
);
