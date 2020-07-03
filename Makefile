UID = $(shell id -u)
GID = $(shell id -g)

DOCKER_IMAGE_TAG = pim-api-docs:latest
DOCKER_RUN = docker run -it --rm -u $(UID):$(GID) -v "$${PWD}":/opt/workdir -w /opt/workdir

.PHONY: docker-build yarn-install serve deploy-staging
.DEFAULT_GOAL := build

docker-build:
	docker build -t $(DOCKER_IMAGE_TAG) - < Dockerfile

yarn-install: docker-build
	$(DOCKER_RUN) -e HOME=/tmp -v /etc/passwd:/etc/passwd:ro $(DOCKER_IMAGE_TAG) yarn install

watch: yarn-install
	$(DOCKER_RUN) --expose=8000 -p=8000:8000 $(DOCKER_IMAGE_TAG) yarn gulp serve

build: yarn-install
	$(DOCKER_RUN) $(DOCKER_IMAGE_TAG) yarn gulp create-dist

deploy: build
	$(DOCKER_RUN) -v /etc/passwd:/etc/passwd:ro -v $${SSH_AUTH_SOCK}:/ssh-auth.sock:ro -e SSH_AUTH_SOCK=/ssh-auth.sock $(DOCKER_IMAGE_TAG) rsync --no-v -e "ssh -q -p $${PORT} -o StrictHostKeyChecking=no" -az --delete dist/ akeneo@$${HOSTNAME}:/var/www/html
