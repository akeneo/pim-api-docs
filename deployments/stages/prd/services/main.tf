module "services" {
  source           = "../../../modules/services"
  project_id       = var.project_id
  region           = var.region
  prefix           = var.prefix
  dns_managed_zone = var.dns_managed_zone
  domains          = var.domains
  first_install    = var.first_install
  stage            = var.stage
  app_version      = var.app_version
}

terraform {
  backend "gcs" {
    bucket = "akecld-terraform-pim-api-docs-prd"
    prefix = "services/prd"
  }
  required_version = "= 1.1.7"
}
