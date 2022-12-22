resource "google_dns_managed_zone" "project_zone" {
  name        = "api-${var.stage}-${var.dns_managed_zone}"
  dns_name    = "api-${var.stage}.${replace(var.dns_managed_zone, "-", ".")}."
  description = "api-${var.stage} DNS zone"
  project     = var.project_id

  dnssec_config {
    state = "on"
  }

  depends_on = [
    google_project_service.dns,
  ]
}

resource "google_project_service" "dns" {
  project                    = var.project_id
  service                    = "dns.googleapis.com"
  disable_dependent_services = true
}
