resource "google_compute_global_address" "default" {
  name = "${local.context}-ip"
}

resource "google_compute_url_map" "default" {
  name            = "${local.context}-https-lb"
  default_service = google_compute_backend_bucket.front.id
}

resource "google_compute_url_map" "https_redirect" {
  name = "${local.context}-https-redirect"

  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

resource "google_compute_managed_ssl_certificate" "default" {
  name = "${local.context}-cert"

  managed {
    domains = local.public_domains
  }
}

resource "google_compute_ssl_policy" "default-ssl-policy" {
  project         = var.project_id
  name            = "default-ssl-policy"
  profile         = "COMPATIBLE"
  min_tls_version = "TLS_1_2"
  description     = "Recommended SSL policy for security purposes"
}

resource "google_compute_target_https_proxy" "default" {
  name             = "${local.context}-https-lb-proxy"
  url_map          = google_compute_url_map.default.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
  ssl_policy       = google_compute_ssl_policy.default-ssl-policy.id
}

resource "google_compute_target_http_proxy" "https_redirect" {
  name    = "${local.context}-http-lb-proxy"
  url_map = google_compute_url_map.https_redirect.id
}

resource "google_compute_global_forwarding_rule" "https_redirect" {
  name                  = "${local.context}-http-lb-forwarding-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL"
  port_range            = "80"
  target                = google_compute_target_http_proxy.https_redirect.id
  ip_address            = google_compute_global_address.default.id
}

resource "google_compute_global_forwarding_rule" "default" {
  name                  = "${local.context}-https-lb-forwarding-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL"
  port_range            = "443"
  target                = google_compute_target_https_proxy.default.id
  ip_address            = google_compute_global_address.default.id
}
