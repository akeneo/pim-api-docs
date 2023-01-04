resource "google_artifact_registry_repository" "docker" {
  provider = google-beta
  project  = var.project_id

  location      = var.docker_registry_location
  repository_id = var.docker_registry_id
  description   = "Docker Registry"
  format        = "DOCKER"

  depends_on = [
    google_project_service.apis,
  ]
}

resource "google_artifact_registry_repository_iam_member" "main_docker_iam" {
  provider = google-beta
  project  = var.project_id

  location   = google_artifact_registry_repository.docker.location
  repository = google_artifact_registry_repository.docker.name
  role       = "roles/artifactregistry.writer"
  member     = "serviceAccount:main-service-account@${var.project_id}.iam.gserviceaccount.com"

  depends_on = [
    google_artifact_registry_repository.docker,
  ]
}
