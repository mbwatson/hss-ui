# HSS UI Proof-of-concept

## About this effort

This app is being developed to scaffold a new user interface for HEAL Semantic Search for the HEAL Data FAIR website.

## 🚧 Development

1. clone this repo, change into root dir, install deps: `npm i`
2. start dev server on port 8080: `npm start`.

This is a React app bundled with Webpack. In an effort to plan for separation and potention publishing of the core Dug UI functionality, that machinery is being developed in a `dug` workspace. It consists of a context provider, which constructs and provides the fetching functions for concepts, studies, variables, etc.

## 📦 Deployment

Use these intructions to guide you through deploying this app in Sterling at RENCI.
These use the `comms` namespace, so adapt accordingly. Also, bump and make note of the new version, as it will be used numerous times across several of these commands. We'll use `0.1.0` for these notes.

1. Build the image.

```bash
$ docker build -t containers.renci.org/comms/hss-ui:0.1.0 .

```

Verify we can spin up a container based on this new image.

```bash
$ docker run --rm --name hss -p 80:8080 containers.renci.org/comms/hss-ui:0.1.0
```

Push to container registry.
```bash
docker push containers.renci.org/comms/hss-ui:0.1.0
```

> [!NOTE]
> You may need to log in with `docker login containers.renci.org`.


Update version tag in `chart/values.yaml`.
```
image:
  tag: "0.1.0" # match tag to version
```

Deploy.
```
helm install hss-ui ./chart/ -n comms
```
