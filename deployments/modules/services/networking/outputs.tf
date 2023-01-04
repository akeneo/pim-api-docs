output "public_fqdn" {
  value = var.pull_request ? local.public_project_level_fqdn : local.public_fqdn
}
