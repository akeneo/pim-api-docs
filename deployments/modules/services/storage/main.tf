resource "google_storage_bucket" "front" {
  name     = "${local.context}-${var.project_id}-front"
  location = "EU"

  project       = var.project_id
  force_destroy = true

  website {
    main_page_suffix = "index.html"
  }
}

resource "google_storage_bucket_access_control" "front_read_only" {
  bucket = google_storage_bucket.front.name
  role   = "READER"
  entity = "allUsers"
}

resource "google_storage_default_object_access_control" "front_read_only" {
  bucket = google_storage_bucket.front.name
  role   = "READER"
  entity = "allUsers"
}
