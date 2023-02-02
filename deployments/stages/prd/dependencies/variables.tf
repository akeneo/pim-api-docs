variable "project_id" {
  type    = string
  default = "akecld-prd-pim-api-docs-prd"
}

variable "region" {
  type    = string
  default = "europe-west3"
}

variable "dns_managed_zone" {
  type    = string
  default = "akeneo-com"
}

variable "docker_registry_id" {
  type    = string
  default = "docker-repository"
}

variable "docker_registry_location" {
  type    = string
  default = "europe-west3"
}

# Custom Parameters

variable "first_install" {
  description = "Is it the first deployment?"
}

variable "stage" {
  type        = string
  description = "Stage"
}

variable "app_version" {
  type        = string
  description = "Application version"
}
