module "dependencies" {
  source                   = "../../../modules/dependencies"
  project_id               = var.project_id
  region                   = var.region
  stage                    = var.stage
  dns_managed_zone         = var.dns_managed_zone
  docker_registry_id       = var.docker_registry_id
  docker_registry_location = var.docker_registry_location
}

terraform {
  backend "gcs" {
    bucket = "akecld-terraform-pim-api-docs-ppd"
    prefix = "dependencies/ppd"
  }
  required_version = "= 1.6.5"
}
