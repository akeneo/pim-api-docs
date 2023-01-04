import google.oauth2.id_token
import google.auth
import google.auth.transport.requests
from google.auth import impersonated_credentials
from google.cloud import storage
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
        request = google.auth.transport.requests.Request()
        source_credentials, project_id = google.auth.default()
        impersonate_service_account = (
            f"main-service-account@{project_id}.iam.gserviceaccount.com"
        )
        target_scopes = ["https://www.googleapis.com/auth/cloud-platform"]
        credentials = impersonated_credentials.Credentials(
            source_credentials=source_credentials,
            target_principal=impersonate_service_account,
            target_scopes=target_scopes,
        )
        remove_state_folder(credentials, bucket_name, pull_request_id)
