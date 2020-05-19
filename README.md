# kube-auth-proxy

HTTP Proxy for the Kubernetes Master API. We wanted a method that provides a secure connection to a remote Kubernetes cluster that could be interfaced using HTTP. This is intended to be used in situations where `kubectl proxy --port=8080 &` can't be used.

## Installation

To add to your project

```shell
npm install --save @little-wolf-studio/kube-auth-proxy
```

or if you're using Yarn

```shell
yarn add @little-wolf-studio/kube-auth-proxy
```

## Usage

This library returns a `KubeConfig` object as created in @kubernetes/client-node. We add additional methods to this class to expose additional ways of interfacing with the Kubernetes API. Example

```javascript
    const kc = new KubeConfig();

    kc.loadFromDefault();
    const cluster = kc.getCurrentCluster();

    // Await is necessary as authentication methods are async
    const apiServer = await kc.makeHttpProxy(cluster);

    // Kubernetes API is available on http://localhost:3000
    apiServer.listen(3000);

```

## Documentation

See https://little-wolf-studio.github.io/kube-auth-proxy/