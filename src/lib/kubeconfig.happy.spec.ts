// tslint:disable:no-expression-statement
import axios from 'axios';
import listen from 'test-listen';

import test, { ExecutionContext } from 'ava';
import { Server } from 'http';
import { KubeConfig } from './kubeconfig';

test.before(
  async (t: ExecutionContext<{ server: Server; baseUrl: string }>) => {
    const kc = new KubeConfig();

    kc.loadFromDefault();
    const cluster = kc.getCurrentCluster();

    t.context.server = await kc.makeHttpProxy(cluster);
    t.context.baseUrl = await listen(t.context.server);
  }
);

test.after.always(
  (t: ExecutionContext<{ server: Server; baseUrl: string }>) => {
    t.context.server.close();
  }
);

test.serial(
  'get API basepoint',
  async (t: ExecutionContext<{ server: Server; baseUrl: string }>) => {
    const res = await axios.get(`${t.context.baseUrl}/apis`);
    t.is(res.status, 200);
    t.is(res.data.kind, 'APIGroupList');
  }
);
