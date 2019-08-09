# Akeneo Web API documentation
This repository holds the sources for the documentation of the web API that was released in 1.7.

The API documentation can be found here: [api.akeneo.com](http://api.akeneo.com).

## Installation for dev/preview purposes

### Requirements
[Node.js](https://nodejs.org/en/) is required.
You can optionally choose [Yarn](https://yarnpkg.com/lang/en/) as package manager instead of NPM (provided with NodeJS by default).

### Run locally
First, install the all dependencies with Yarn:

```bash
yarn install
```

or with NPM:

```bash
npm install
```

Then run the Gulp server, with Yarn: 

```bash
yarn serve
```

or with NPM:

```bash
npm serve
```

The API documentation site is then available on `localhost:8000`.
Files located in the content and src directories are watched for changes, so when developing you do not need to launch any other task.

### Run with Docker

```bash
make serve
```

## Swagger

As our YAML Swagger spec uses references and links, it is considered as non-valid.
During the build, we generate a valid JSON specification that is put under the `content/swagger` folder. Don't forget to version it if you made any change into the YAML Swagger spec.
