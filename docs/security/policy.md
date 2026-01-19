---
sidebar_position: 1
---

# Security Policy

AURA takes security seriously. This document outlines our security practices and vulnerability disclosure process.

## Supported Versions

| Version | Supported |
|---------|-----------|
| v1.0.x-mvp | Yes |
| < v1.0.0 | No |

## Reporting Vulnerabilities

**Do NOT report security vulnerabilities through public GitHub issues.**

### Responsible Disclosure

1. **Email**: security@aurablockchain.org
2. **PGP Key**: Available at [keys.aurablockchain.org](https://keys.aurablockchain.org)

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

| Phase | Timeline |
|-------|----------|
| Initial response | 24 hours |
| Triage | 72 hours |
| Fix development | 7-14 days |
| Public disclosure | After fix deployed |

## Bug Bounty

We offer rewards for responsibly disclosed vulnerabilities:

| Severity | Reward |
|----------|--------|
| Critical | Up to $10,000 |
| High | Up to $5,000 |
| Medium | Up to $1,000 |
| Low | Up to $250 |

### Scope

**In Scope**:

- Core blockchain code
- Consensus vulnerabilities
- Smart contract platform
- Cryptographic issues
- Authentication/authorization bypasses

**Out of Scope**:

- Social engineering
- Physical attacks
- DoS attacks
- Third-party services
- Already reported issues

## Security Best Practices

### For Validators

1. **Key Management**
   - Use HSM for validator keys when possible
   - Never share private keys
   - Rotate keys periodically

2. **Infrastructure**
   - Use sentry node architecture
   - Enable firewalls
   - Keep systems updated
   - Monitor for anomalies

3. **Operations**
   - Use secure communication channels
   - Verify software signatures
   - Test upgrades on testnet first

### For Users

1. **Wallet Security**
   - Use hardware wallets for large amounts
   - Backup seed phrases securely
   - Verify addresses before sending

2. **Transaction Safety**
   - Double-check recipient addresses
   - Start with small test transactions
   - Understand gas and fees

## Security Audits

| Auditor | Date | Scope | Status |
|---------|------|-------|--------|
| TBD | Q2 2026 | Full MVP | Scheduled |

## Incident Response

In case of a security incident:

1. **Detection**: Monitor for anomalies
2. **Assessment**: Evaluate severity
3. **Containment**: Limit damage
4. **Communication**: Notify stakeholders
5. **Recovery**: Restore normal operations
6. **Post-mortem**: Learn and improve

See [Incident Response](incident-response.md) for detailed procedures.

## Contact

- **Security Team**: security@aurablockchain.org
- **General**: team@aurablockchain.org
