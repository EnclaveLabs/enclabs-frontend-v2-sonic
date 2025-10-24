# Enclabs Protocol Frontend

<p align="center">
  <img src="https://pbs.twimg.com/profile_images/1842107609077182464/4yrzsKWt_400x400.jpg">
</p>

Official repository for the [Enclabs protocol](https://www.enclabs.finance/) application.


## Getting started

### Set environment variables

Create a `.env` file in the root of the project using the `.env.template` file as a template. You
will need to set environment variables for RPC provider and subgraph URLs, as the ones set by
default in the codebase are only valid for hosted environments.

### Install dependencies with yarn

```ssh
yarn
```

### Start the development server

```ssh
yarn start
```

## Useful commands

Run tests

```ssh
yarn test
```

Check Typescript code

```ssh
yarn tsc
```

Lint code

```ssh
yarn lint
```

Format code

```
yarn format
```

Generate production build

```ssh
yarn build
```

Start application with production build

```ssh
yarn serve
```

