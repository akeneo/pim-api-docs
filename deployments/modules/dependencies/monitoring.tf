# terraform {
#   required_providers {
#     datadog = {
#       source = "datadog/datadog"
#     }
#   }
# }

# data "google_secret_manager_secret_version" "datadog_api_key" {
#   secret  = "datadog-api-key"
#   project = var.project_id
# }

# data "google_secret_manager_secret_version" "datadog_app_key" {
#   secret  = "datadog-app-key"
#   project = var.project_id
# }

# provider "datadog" {
#   app_key = data.google_secret_manager_secret_version.datadog_app_key.secret_data
#   api_key = data.google_secret_manager_secret_version.datadog_api_key.secret_data
#   api_url = "https://api.datadoghq.eu/"
# }

# resource "datadog_integration_gcp" "gcp_project_integration" {
#   project_id     = var.project_id
#   private_key_id = jsondecode(base64decode(google_service_account_key.datadog_monitoring.private_key))["private_key_id"]
#   private_key    = jsondecode(base64decode(google_service_account_key.datadog_monitoring.private_key))["private_key"]
#   client_email   = google_service_account.datadog_gcp_integration.email
#   client_id      = google_service_account.datadog_gcp_integration.unique_id
# }

# resource "google_service_account" "datadog_gcp_integration" {
#   account_id   = "appstore-datadog-sa"
#   project      = var.project_id
#   display_name = "Datadog <> Google Cloud integration service account"
# }

# resource "google_service_account_key" "datadog_monitoring" {
#   service_account_id = google_service_account.datadog_gcp_integration.name
#   public_key_type    = "TYPE_X509_PEM_FILE"
# }

# resource "google_logging_project_sink" "log-export-sink" {
#   name                   = "appstore-datadog-log-sink"
#   destination            = module.datadog_pubsub_destination.destination_uri
#   project                = var.project_id
#   filter                 = "resource.type=workflows.googleapis.com/Workflow OR resource.type=cloud_run_revision"
#   unique_writer_identity = true
# }

# module "datadog_pubsub_destination" {
#   source                   = "terraform-google-modules/log-export/google//modules/pubsub"
#   create_push_subscriber   = true
#   create_subscriber        = false
#   log_sink_writer_identity = "serviceAccount:${google_service_account.datadog_gcp_integration.email}"
#   project_id               = var.project_id
#   push_endpoint            = "https://gcp-intake.logs.datadoghq.eu/v1/input/${data.google_secret_manager_secret_version.datadog_api_key.secret_data}/"
#   topic_name               = "datadog-sink"
# }

# resource "datadog_logs_custom_pipeline" "appstore_cloud_run" {
#   filter {
#     query = "project_id:${var.project_id} source:(\"gcp.cloud.run.revision\" OR \"gcp.workflows.googleapis.com/workflow\")"
#   }
#   name       = "${var.project_id} appstore cloud run logs processor"
#   is_enabled = true
#   processor {
#     status_remapper {
#       sources    = ["data.severity", "data.jsonPayload.level_name", "data.jsonPayload.level"]
#       name       = "Retrieve status from cloud run logs"
#       is_enabled = true
#     }
#   }
#   processor {
#     date_remapper {
#       sources    = ["data.timestamp"]
#       name       = "Retrieve timestamp from cloud run logs"
#       is_enabled = true
#     }
#   }
#   processor {
#     message_remapper {
#       sources    = ["data.jsonPayload.msg", "data.jsonPayload.message"]
#       name       = "JSON Payload as log official message"
#       is_enabled = true
#     }
#   }

# }

# resource "google_project_iam_member" "datadog_compute_viewer" {
#   project = var.project_id
#   role    = "roles/compute.viewer"
#   member  = "serviceAccount:${google_service_account.datadog_gcp_integration.email}"
# }

# resource "google_project_iam_member" "datadog_monitoring_viewer" {
#   project = var.project_id
#   role    = "roles/monitoring.viewer"
#   member  = "serviceAccount:${google_service_account.datadog_gcp_integration.email}"
# }

# resource "google_project_iam_member" "datadog_cloudasset_viewer" {
#   project = var.project_id
#   role    = "roles/cloudasset.viewer"
#   member  = "serviceAccount:${google_service_account.datadog_gcp_integration.email}"
# }

# resource "google_project_iam_member" "sink_publisher" {
#   project = var.project_id
#   role    = "roles/pubsub.publisher"
#   member  = google_logging_project_sink.log-export-sink.writer_identity
# }
