_DOCKER_IMAGE_TAG = pim-api-docs:latest
_DOCKER_RUN = docker run -it --rm -u "$${UID}":"$${GID}" -v "$${PWD}":/opt/workdir -w /opt/workdir

.PHONY: _docker-build _yarn-install serve deploy-staging
.DEFAULT_GOAL := build

docker-build:
	docker build -t $(_DOCKER_IMAGE_TAG) .

yarn-install: docker-build
	$(_DOCKER_RUN) $(_DOCKER_IMAGE_TAG) yarn install

build: yarn-install
	$(_DOCKER_RUN) --expose=8000 -p=8000:8000 $(_DOCKER_IMAGE_TAG) yarn gulp serve

deploy: yarn-install
	$(_DOCKER_RUN) -e PORT -e HOSTNAME -v "$${SSH_AUTH_SOCK}":/ssh-auth.sock:ro -e SSH_AUTH_SOCK=/ssh-auth.sock $(_DOCKER_IMAGE_TAG) yarn gulp deploy
