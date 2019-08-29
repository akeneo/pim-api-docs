_DOCKER_IMAGE_TAG = pim-api-docs:latest
_DOCKER_RUN = docker run -it --rm -u "$${UID}":"$${GID}" -v "$${PWD}":/opt/workdir -w /opt/workdir

.PHONY: _docker-build _yarn-install serve deploy-staging
.DEFAULT_GOAL := serve

_docker-build:
	@echo "\n🛠\033[1m  Building Docker Image <pim-api-docs:latest>...\033[0m"
	docker build -t $(_DOCKER_IMAGE_TAG) .

_yarn-install: _docker-build
	@echo "\n🚚\033[1m  Installing Yarn dependencies...\033[0m"
	$(_DOCKER_RUN) $(_DOCKER_IMAGE_TAG) yarn install
	
serve: _yarn-install
	@echo "\n🌍\033[1m  Serving local documentation (http://0.0.0.0:8000)...\033[0m"
	$(_DOCKER_RUN) --expose=8000 -p=8000:8000 $(_DOCKER_IMAGE_TAG) yarn gulp serve

deploy-staging: _yarn-install config.json
	@echo "\n🚀\033[1m  Deploying to staging...\033[0m"
	$(_DOCKER_RUN) -v ~/.ssh/config:/etc/ssh/ssh_config:ro -v "$${SSH_AUTH_SOCK}":/ssh-auth.sock:ro -e SSH_AUTH_SOCK=/ssh-auth.sock $(_DOCKER_IMAGE_TAG) yarn gulp deploy --env=staging
