resource "google_compute_backend_bucket" "front" {
  name        = "${local.context}-bb"
  description = "Contains static files"
  bucket_name = var.bucket_name
  enable_cdn  = true
}
