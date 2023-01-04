resource "google_dns_record_set" "public" {
  name         = "${local.public_project_level_fqdn[0]}."
  managed_zone = "api-${var.stage}-${var.dns_managed_zone}"
  type         = "A"
  ttl          = 300
  project      = var.project_id

  rrdatas = [google_compute_global_address.default.address]

  depends_on = [
    google_compute_global_address.default
  ]
}
