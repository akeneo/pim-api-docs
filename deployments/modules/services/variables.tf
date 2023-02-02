variable "project_id" {
  type        = string
  description = "Project ID"
}

variable "region" {
  type        = string
  description = "Region"
}

variable "prefix" {
  type        = string
  description = "Prefix of all items related to the infrastructure"
}

variable "dns_managed_zone" {
  type        = string
  description = "DNS Managed Zone"
}

variable "domains" {
  type        = list(string)
  description = "List of all domains to manage"
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
  default     = ""
}
