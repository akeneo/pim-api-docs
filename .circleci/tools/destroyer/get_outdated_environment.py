from google.oauth2.credentials import Credentials

from google.cloud import storage
from github import Github

import os
import settings


def get_outdated_environments(credentials, bucket_name, open_pull_requests):
    client = storage.Client(credentials=credentials)
    bucket = client.get_bucket(bucket_name)
    outdated_environments = []
    for blob in bucket.list_blobs():
        environment = blob.name.split("/")[1]
        if (
            environment != "dev"
            and "pr-" in environment
            and environment not in open_pull_requests
        ):
            outdated_environments.append(environment)
    return outdated_environments


def get_open_pull_requests(access_token, username, reponame):
    g = Github(access_token)
    repo = g.get_repo(f"{username}/{reponame}")
    return [
        f"pr-{pull_request.number}"
        for pull_request in repo.get_pulls(state="open", sort="created", base="master")
    ]


if __name__ == "__main__":
    try:
        bucket_name = settings.settings.terraform_bucket_name
        credentials = Credentials(
            token=os.environ["GOOGLE_OAUTH_ACCESS_TOKEN"],
            scopes=["https://www.googleapis.com/auth/cloud-platform"]
        )

        GITHUB_ACCESS_TOKEN = os.environ["GITHUB_ACCESS_TOKEN"]
        CIRCLE_PROJECT_USERNAME = os.environ["CIRCLE_PROJECT_USERNAME"]
        CIRCLE_PROJECT_REPONAME = os.environ["CIRCLE_PROJECT_REPONAME"]
        open_pull_requests = get_open_pull_requests(
            GITHUB_ACCESS_TOKEN, CIRCLE_PROJECT_USERNAME, CIRCLE_PROJECT_REPONAME
        )
        outdated_environments = get_outdated_environments(
            credentials,
            bucket_name,
            open_pull_requests,
        )
        print(outdated_environments)
    except Exception as e:
        print(e)
