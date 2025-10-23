# Security Overview

## Introduction

Security is paramount when extending the PIM with external integrations. Extensions can access sensitive product data, user information, and trigger operations within your organization. This section covers security best practices and mechanisms for protecting your extensions.

## Security by Extension Type

Different extension types have different security considerations:

| Extension Type | Primary Security Concerns | Key Mechanisms |
|----------------|--------------------------|----------------|
| **Link** | URL manipulation, phishing | HTTPS URLs, trusted domains |
| **Iframe** | XSS, clickjacking, data exposure | CSP headers, JWT tokens, origin validation |
| **Action** | Unauthorized execution, replay attacks | Request signing (SHA-512), credentials |
| **Data Component** | Unauthorized data access | Request signing, credentials |
| **Custom Component** | Code injection, API abuse | Sandbox execution, user permissions |

## Key Security Mechanisms

### 1. HTTPS Only

**All extensions must use HTTPS URLs.** This ensures:
- Encrypted communication
- Protection against man-in-the-middle attacks
- Data confidentiality

```json
{
  "url": "https://secure.example.com"  // ✅ Secure
}
```

```json
{
  "url": "http://insecure.example.com"  // ❌ Insecure
}
```

### 2. Request Signing

Extensions can configure a **secret** to cryptographically sign requests. The PIM uses SHA-512 HMAC to generate signatures.

**Available for:**
- Iframe extensions (JWT tokens)
- Action extensions (request body signing)
- Data component extensions (URL signing)

**Benefits:**
- Verify requests originated from Akeneo
- Prevent tampering
- Detect replay attacks (when combined with timestamps)

[Learn more: Iframe Security](/extensions/security/iframe-security.html)

### 3. Authentication Credentials

Extensions can include authentication headers when calling your endpoints.

**Supported methods:**
- **Bearer Tokens**: `Authorization: Bearer <token>`
- **Basic Authentication**: `Authorization: Basic <base64>`
- **Custom Headers**: Any header name/value pair

**Security features:**
- Credentials encrypted at rest
- Transmitted server-side only (not exposed to browser)
- Per-extension configuration

[Learn more: Credentials](/extensions/security/credentials.html)

### 4. User Permissions

**All extension operations respect PIM user permissions.** Users can only:
- View data they have access to
- Perform operations they're authorized for
- Execute extensions assigned to their user groups

**Extension-level controls:**
- Filter by user groups
- Filter by product selection
- Active/inactive status

### 5. Sandbox Execution (Custom Components)

Custom Component extensions run in a secure JavaScript sandbox (SES - Secure ECMAScript):
- Limited JavaScript APIs
- No direct DOM access to parent pages
- No arbitrary network requests
- Isolated from other extensions

## Threat Models

### Cross-Site Scripting (XSS)

**Risk:** Malicious scripts executed in user's browser

**Iframe extensions are vulnerable if:**
- Your application doesn't sanitize inputs
- You render untrusted content
- You don't implement CSP headers

**Mitigation:**
- Implement Content Security Policy (CSP)
- Sanitize all user inputs
- Use framework protections (React, Vue escape by default)
- Validate data from PostMessage

[Learn more: Iframe Security](/extensions/security/iframe-security.html)

### Clickjacking

**Risk:** Invisible iframe overlay tricks users into clicking malicious elements

**Mitigation:**
- Set `X-Frame-Options` header on your iframe content
- Implement frame-ancestors CSP directive
- Verify frame context in your application

```http
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: frame-ancestors 'self' https://*.cloud.akeneo.com
```

### Replay Attacks

**Risk:** Attacker captures and resends valid requests

**Action extensions are vulnerable if:**
- No timestamp validation
- No request uniqueness checks
- Long-lived signatures

**Mitigation:**
- Validate timestamp in request body
- Reject requests older than 5 minutes
- Use nonce or request IDs for idempotency

```javascript
const FIVE_MINUTES = 300;
const now = Math.floor(Date.now() / 1000);

if (Math.abs(now - request.body.timestamp) > FIVE_MINUTES) {
  return res.status(401).json({ error: 'Request expired' });
}
```

### Man-in-the-Middle (MITM)

**Risk:** Attacker intercepts communication

**Mitigation:**
- **Always use HTTPS** (enforced by PIM)
- Validate SSL certificates
- Use certificate pinning for critical APIs

### Unauthorized Access

**Risk:** Users access extensions or data they shouldn't

**Mitigation:**
- Configure user group restrictions
- Implement product selection filters
- Validate user permissions in your endpoints
- Check PIM permissions via API

```javascript
// Verify user has permission
const user = request.body.user;
const allowedGroups = ['Manager', 'Admin'];

if (!user.groups.some(g => allowedGroups.includes(g))) {
  return res.status(403).json({ error: 'Insufficient permissions' });
}
```

### Data Exposure

**Risk:** Sensitive data leaked through extensions

**Mitigation:**
- Minimize data exposure in iframe URLs
- Use PostMessage for sensitive data
- Implement JWT token validation
- Encrypt data at rest and in transit
- Audit extension access to sensitive attributes

## Security Checklist

### For All Extensions

- [ ] Use HTTPS URLs only
- [ ] Configure appropriate user group restrictions
- [ ] Set up product selection filters if needed
- [ ] Document security considerations
- [ ] Regularly review extension access logs
- [ ] Keep extension versions tracked
- [ ] Test with limited-permission users

### For Iframe Extensions

- [ ] Implement Content Security Policy (CSP)
- [ ] Configure JWT secret for token validation
- [ ] Validate PostMessage origins
- [ ] Sanitize all user inputs
- [ ] Set X-Frame-Options header
- [ ] Handle authentication securely
- [ ] Don't expose sensitive data in URLs

[Learn more: Iframe Security](/extensions/security/iframe-security.html)

### For Action Extensions

- [ ] Configure request signing secret
- [ ] Validate signatures on your endpoint
- [ ] Check timestamps to prevent replay attacks
- [ ] Implement idempotency
- [ ] Add authentication credentials
- [ ] Log all requests
- [ ] Rate limit your endpoints
- [ ] Validate request structure

### For Data Component Extensions

- [ ] Configure request signing secret
- [ ] Validate signatures on your endpoint
- [ ] Add authentication credentials
- [ ] Implement access controls
- [ ] Don't expose sensitive data unnecessarily
- [ ] Rate limit your API
- [ ] Cache appropriately

### For Custom Component Extensions

- [ ] Validate all API inputs
- [ ] Handle errors gracefully
- [ ] Respect user permissions
- [ ] Don't store secrets in code
- [ ] Use external API calls via SDK only
- [ ] Test with different user permissions
- [ ] Review for sensitive data exposure

## Best Practices

### 1. Principle of Least Privilege

Grant minimum necessary permissions:
- Restrict to specific user groups
- Limit to relevant product selections
- Request minimal API scopes
- Implement fine-grained access controls in your endpoints

### 2. Defense in Depth

Layer multiple security mechanisms:
- HTTPS + credentials + request signing
- User permissions + product filters + endpoint validation
- Client-side validation + server-side validation

### 3. Secure Configuration

Protect secrets and credentials:
- Never commit secrets to version control
- Use environment variables for secrets
- Rotate credentials regularly
- Use different credentials per environment
- Minimum 32 characters for secrets

### 4. Monitoring and Auditing

Track extension usage:
- Log all extension executions
- Monitor for unusual patterns
- Alert on failed authentications
- Review access logs regularly
- Track user actions

### 5. Regular Security Reviews

- Review extension permissions quarterly
- Update dependencies regularly
- Test security mechanisms
- Perform penetration testing
- Review user access patterns

### 6. Incident Response

Prepare for security incidents:
- Document incident response procedures
- Know how to disable extensions quickly
- Have communication plan
- Maintain audit logs
- Test recovery procedures

## Compliance Considerations

Depending on your industry, consider:

### GDPR (General Data Protection Regulation)

- Document what data extensions access
- Ensure data minimization
- Implement right to access/deletion
- Maintain data processing records
- Include extensions in privacy policy

### SOC 2

- Implement access controls
- Maintain audit logs
- Document security procedures
- Regular security reviews
- Incident response procedures

### HIPAA (Healthcare)

- Encrypt all data in transit and at rest
- Implement strict access controls
- Maintain detailed audit logs
- Business associate agreements with vendors
- Regular risk assessments

## Security by Development Stage

### Development
- Use separate PIM instances
- Test data only
- Different credentials
- Enable verbose logging
- Test error scenarios

### Staging
- Production-like security
- Test with real user groups
- Validate permissions
- Security testing
- Performance testing

### Production
- Full security measures enabled
- Monitoring active
- Limited debugging information
- Incident response ready
- Regular security audits

## Resources

### Documentation
- [Iframe Security](/extensions/security/iframe-security.html) - JWT and CSP
- [Credentials](/extensions/security/credentials.html) - Authentication methods
- [User Permissions](https://help.akeneo.com) - PIM permission system

### External Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Common web vulnerabilities
- [Mozilla Security Guidelines](https://infosec.mozilla.org/guidelines/) - Security best practices
- [Content Security Policy Reference](https://content-security-policy.com/) - CSP documentation

### Tools
- [JWT Debugger](https://jwt.io/) - Decode and verify JWT tokens
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) - Test CSP headers
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Test SSL configuration

## Getting Help

If you discover a security vulnerability:
- **Do not** disclose publicly
- Contact Akeneo security team
- Provide detailed description
- Include steps to reproduce
- Allow time for fixes before disclosure

For security questions:
- Consult with your security team
- Review Akeneo security documentation
- Contact Akeneo support
- Engage security consultants if needed

## Learn More

- [Iframe Security](/extensions/security/iframe-security.html) - Detailed iframe security
- [Credentials](/extensions/security/credentials.html) - Authentication methods
- [Getting Started](/extensions/getting-started.html) - Basic setup
- [FAQ](/extensions/faq.html) - Common questions

::: panel-link Iframe Security [Next](/extensions/security/iframe-security.html)
:::
