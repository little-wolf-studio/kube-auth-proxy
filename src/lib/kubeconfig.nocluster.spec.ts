// tslint:disable:no-expression-statement
import test, { ExecutionContext } from 'ava';
import { Server } from 'http';
import { KubeConfig } from './kubeconfig';

test.serial(
  'it throws if no cluster',
  async (t: ExecutionContext<{ server: Server; baseUrl: string }>) => {
    const kc = new KubeConfig();

    kc.loadFromDefault();
    const cluster = null;
    let throws = false;

    try {
      t.context.server = await kc.makeHttpProxy(cluster);
    } catch (e) {
      throws = true;
    }

    t.is(throws, true);
  }
);
