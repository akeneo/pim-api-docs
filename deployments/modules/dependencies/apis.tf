resource "google_project_service" "apis" {
  for_each                   = toset(var.google_project_services)
  project                    = var.project_id
  service                    = each.key
  disable_dependent_services = true
}
