import docker
import os
import argparse
import settings

pwd = os.getcwd()


def docker_streamer(terraform_handler):
    def streamer(*args, **kwargs):
        container = terraform_handler(*args, **kwargs)
        for line in container.logs(stream=True, follow=True):
            print(line.rstrip().decode())

    return streamer


@docker_streamer
def terraform_handler(terraform_version, sources_path, command):
    token = os.getenv('GOOGLE_OAUTH_ACCESS_TOKEN', '')

    return client.containers.run(
        f"hashicorp/terraform:{terraform_version}",
        command,
        environment=[
            f"GOOGLE_OAUTH_ACCESS_TOKEN={token}",
        ],
        volumes=[f"{pwd}{sources_path}:{sources_path}"],
        working_dir=f"{sources_path}",
        detach=True,
        auto_remove=True,
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--first_install", help="First install?", required=True)
    parser.add_argument("--stage", help="Stage", required=True)
    parser.add_argument("--app_version", help="Application Version", required=True)
    parser.add_argument("--pull_request", help="Pull Request?", required=True)
    parser.add_argument(
        "--pull_request_id", help="ID of the Pull Request", required=True
    )
    args = parser.parse_args()

    project_id = settings.settings.gcp_project_id
    terraform_version = settings.settings.terraform_version
    sources_path = settings.settings.terraform_sources_path
    first_install = args.first_install
    stage = args.stage
    app_version = args.app_version
    pull_request = args.pull_request
    pull_request_id = args.pull_request_id

    chdir = f"{sources_path}/stages/{stage}/services"
    backend_config = f"prefix=services/{pull_request_id}"
    client = docker.from_env()
    client.images.pull(f"hashicorp/terraform:{terraform_version}")

    terraform_init = terraform_handler(
        terraform_version,
        sources_path,
        f"-chdir={chdir} init -reconfigure -backend=true -backend-config={backend_config}",
    )
    terraform_validate = terraform_handler(terraform_version, sources_path, "validate")
    terraform_destroy = terraform_handler(
        terraform_version,
        sources_path,
        [
            f"-chdir={chdir}",
            "destroy",
            f"-var=first_install={first_install}",
            f"-var=stage={stage}",
            f'-var=app_version="{app_version}',
            f"-var=pull_request={pull_request}",
            f"-var=pull_request_id={pull_request_id}",
            "-auto-approve",
        ],
    )
