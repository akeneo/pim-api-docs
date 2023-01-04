variable "project_id" {
  type        = string
  description = "Project ID"
}

variable "region" {
  type        = string
  description = "Region"
}

variable "stage" {
  type        = string
  description = "Stage"
}

variable "dns_managed_zone" {
  type        = string
  description = "DNS Managed Zone"
}

variable "docker_registry_id" {
  type        = string
  description = "Docker Registry ID"
}

variable "docker_registry_location" {
  type        = string
  description = "Docker Registry Location"
}

variable "google_project_services" {
  type        = list(string)
  description = "List of all google project APIs to activate"
  default = [
    "container.googleapis.com",
    "monitoring.googleapis.com",
    "logging.googleapis.com",
    "servicenetworking.googleapis.com",
    "artifactregistry.googleapis.com",
    "run.googleapis.com",
    "secretmanager.googleapis.com",
  ]
}

data "google_project" "project" {
  project_id = var.project_id
}

locals {
  project_number = data.google_project.project.number
}
