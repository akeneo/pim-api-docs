from google.oauth2.credentials import Credentials

from google.cloud import storage

import os
import argparse
import settings


def remove_state_folder(credentials, bucket_name, pull_request_id):
    client = storage.Client(credentials=credentials)
    bucket = client.get_bucket(bucket_name)
    for blob in bucket.list_blobs():
        name_without_filename = blob.name[: blob.name.rfind("/")]
        if name_without_filename == f"services/{pull_request_id}":
            blob.delete()
            print(f"{name_without_filename} state folder has been deleted!")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--pull_request_id", help="ID of the Pull Request")
    args = parser.parse_args()
    if args.pull_request_id:
        pull_request_id = args.pull_request_id
        region = settings.settings.gcp_project_region
        bucket_name = settings.settings.terraform_bucket_name

        credentials = Credentials(
            token=os.environ["GOOGLE_OAUTH_ACCESS_TOKEN"],
            scopes=["https://www.googleapis.com/auth/cloud-platform"]
        )
        remove_state_folder(credentials, bucket_name, pull_request_id)
