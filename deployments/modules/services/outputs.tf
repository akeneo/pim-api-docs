output "service_frontend_public_url" {
  value = "https://${module.networking.public_fqdn[0]}"
}
