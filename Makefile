DOCKER_IMAGE_TAG = pim-api-docs:latest
DOCKER_RUN_CMD = docker run -it --rm -u ${UID}:${GID} -v ${PWD}:/opt/workdir -w /opt/workdir

.DEFAULT_GOAL := serve

.PHONY: docker-build
docker-build:
	@echo "\n🛠\033[1m  Building Docker Image <pim-api-docs:latest>...\033[0m"
	docker build -t $(DOCKER_IMAGE_TAG) .

.PHONY: yarn-install
yarn-install: docker-build
	@echo "\n🚚\033[1m  Installing Yarn dependencies...\033[0m"
	$(DOCKER_RUN_CMD) $(DOCKER_IMAGE_TAG) yarn install
	
.PHONY: serve
serve: yarn-install
	@echo "\n🌍\033[1m  Serving local documentation (http://0.0.0.0:8000)...\033[0m"
	$(DOCKER_RUN_CMD) --expose=8000 -p=8000:8000 $(DOCKER_IMAGE_TAG) yarn gulp serve
