import { KubeConfig as K8sKubeConfig } from '@kubernetes/client-node';
import http from 'http';
import https from 'https';
import { URL } from 'url';

export class KubeConfig extends K8sKubeConfig {
  public async makeHttpProxy() {
    const cluster = this.getCurrentCluster();
    if (!cluster) {
      throw new Error('No active cluster!');
    }

    const server = http.createServer();
    const serverUrl = new URL(cluster.server);

    const opt = {
      host: serverUrl.host
    };

    await this.applytoHTTPSOptions(opt);

    server.on('request', (req, res) => {
      const connector = https.request(
        {
          ...opt,
          method: req.method,
          path: req.url
        },
        upstreamRes => {
          upstreamRes.pipe(res);
        }
      );

      req.pipe(connector);
    });

    return server;
  }
}
