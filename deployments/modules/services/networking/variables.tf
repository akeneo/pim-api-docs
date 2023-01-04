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

variable "bucket_name" {
  type        = string
  description = "Bucket Name"
}

variable "dns_managed_zone" {
  type        = string
  description = "DNS Managed Zone"
}

variable "domains" {
  type        = list(string)
  description = "List of all domains to manage"
}

variable "stage" {
  type        = string
  description = "Stage"
}

variable "pull_request" {
  type        = bool
  description = "Pull Request context?"
}

variable "pull_request_id" {
  type        = string
  description = "Pull Request ID"
}
