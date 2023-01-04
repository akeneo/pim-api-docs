variable "project_id" {
  type        = string
  description = "Project ID"
}

variable "stage" {
  type        = string
  description = "Stage"
}

variable "app_version" {
  type        = string
  description = "Application version"
}

variable "prefix" {
  type        = string
  description = "Prefix of all items related to the infrastructure"
}

variable "pull_request" {
  type        = bool
  description = "Pull Request context?"
}

variable "pull_request_id" {
  type        = string
  description = "Pull Request ID"
}

locals {
  context = var.pull_request ? "${var.pull_request_id}" : var.stage
  labels = {
    env     = var.stage
    version = lower(var.app_version)
    app     = var.prefix
    project = var.project_id
  }
}
