# Akeneo Web API documentation
This repository holds the sources for the documentation of the web API that was released in 1.7.

The API documentation can be found here: [api.akeneo.com](http://api.akeneo.com).

## Installation for dev/preview purposes

### Requirements
- Install [Docker Engine](https://docs.docker.com/engine/installation/).
- Install [Docker Compose](https://docs.docker.com/compose/install/).

### Build with docker

```bash
make build
```

This is only building the documentation. The documentation is not available with this command, as it does not launch the HTTP server. 

### Build and launch HTTP server with docker

```bash
make watch
```

The API documentation site is then available on `localhost:8000`.
Files located in the content and src directories are watched for changes, so when developing you do not need to launch any other task.

## Deployment

### Continuous delivery

Once you merge a PR into the `master` branch, it is deployed on the staging server. Here are the steps to release:

- Check the staging environment if everything is ok to be deployed in production
- Open this [link](https://circleci.com/gh/akeneo/workflows/pim-api-docs/tree/master). You have to be connected with your Github account.
- Click on the first row which should be "On hold"

![List of merged PR in master](.circleci/list_workflows.jpg)

- Click on the box "approve_to_deploy_in_production" and approve. It will launch the deployment in production.

![List of jobs in a workflow](.circleci/list_jobs.jpg)

- It's deployed in production in 1 minute!

### Local deployment

Your public SSH key should be deployed on the server (see Ansible configuration). It is strongly recommended to release with the CI process though.

```bash
HOSTNAME=xxx PORT=xxx make deploy
```

HOSTNAME is the server to deploy the documentation on.
PORT is the SSH port to connect to the server.

To know the production and staging environments of api-docs, please read the [inventory](https://github.com/akeneo/ansible/blob/master/inventories/core.inventory).

## Swagger

As our YAML Swagger spec uses references and links, it is considered as non-valid.
During the build, we generate a valid JSON specification that is put under the `content/swagger` folder. Don't forget to version it if you made any change into the YAML Swagger spec.
