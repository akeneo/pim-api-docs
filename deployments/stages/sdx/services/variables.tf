variable "project_id" {
  type    = string
  default = "akecld-prd-pim-api-docs-sdx"
}

variable "region" {
  type    = string
  default = "europe-west3"
}

variable "prefix" {
  type        = string
  description = "Prefix of all items related to the infrastructure"
  default     = "pim-api-docs"
}

variable "dns_managed_zone" {
  type    = string
  default = "akeneo-com"
}

variable "domains" {
  type        = list(string)
  description = "List of all domains to manage"
  default = [
    "api.akeneo.com",
  ]
}

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

variable "pull_request" {
  type        = bool
  description = "Pull Request context?"
  default     = false
}

variable "pull_request_id" {
  type        = string
  description = "Pull Request ID"
}
