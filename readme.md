# Akeneo Web API documentation
This repository holds the sources for the documentation of the web API that was released in 1.7.

The API documentation can be found here: [api.akeneo.com](http://api.akeneo.com).

## Installation for dev/preview purposes

### Requirements
[Node](https://nodejs.org/en/) is required and [Gulp-cli](https://github.com/gulpjs/gulp-cli) as well.

```bash
sudo npm install --global n
sudo n 7.2.0
npm install
sudo npm install --global gulp-cli
```

### Run locally
Once Node and gulp-cli installed, run:

```bash
npm install

gulp serve
```

The API documentation site is then available on `localhost:8000`.
Files located in the content and src directories are watched for changes, so when developing you do not need to launch any other task.
