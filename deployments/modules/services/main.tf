module "storage" {
  source          = "./storage"
  project_id      = var.project_id
  prefix          = var.prefix
  stage           = var.stage
  app_version     = var.app_version
  pull_request    = var.pull_request
  pull_request_id = var.pull_request_id
}

module "networking" {
  source           = "./networking"
  project_id       = var.project_id
  region           = var.region
  prefix           = var.prefix
  bucket_name      = module.storage.bucket_name
  dns_managed_zone = var.dns_managed_zone
  domains          = var.domains
  stage            = var.stage
  pull_request     = var.pull_request
  pull_request_id  = var.pull_request_id

  depends_on = [
    module.storage
  ]
}
