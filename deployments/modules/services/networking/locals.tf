locals {
  context                   = var.pull_request ? "${var.pull_request_id}" : var.stage
  dns_prefix                = var.pull_request ? "${var.pull_request_id}." : ""
  public_project_level_fqdn = [for domain in var.domains : replace("${replace(domain, "/(^[^\\.]+)/", "${local.dns_prefix}$${1}-${var.stage}")}", "'", "")]
  public_fqdn               = var.stage == "prod" ? var.domains : [for domain in var.domains : replace("${replace(domain, "/(^[^\\.]+)/", "$${1}-${var.stage}")}", "'", "")]
  public_domains            = var.stage == "prod" ? concat(local.public_project_level_fqdn, local.public_fqdn) : local.public_project_level_fqdn
}
