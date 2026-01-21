---
sidebar_position: 6
---

# CLI Tool

Command-line interface for AURA credential verification and testing.

## Installation

```bash
# Global install
npm install -g @aura-network/verifier-cli

# Or use npx
npx @aura-network/verifier-cli --help
```

## Commands

### `verify`

Verify a credential or QR code:

```bash
# Verify a QR code string
aura-verify verify --qr "eyJoIjoiZGlkOmF1cmE6..."

# Verify from file
aura-verify verify --file presentation.json

# Verify with specific network
aura-verify verify --qr "..." --network testnet
```

### `check`

Check credential status on the blockchain:

```bash
# Check if credential is revoked
aura-verify check credential-id-123

# Check issuer status
aura-verify check --issuer did:aura:issuer1
```

### `parse`

Parse and display QR code contents:

```bash
# Parse QR data
aura-verify parse "eyJoIjoiZGlkOmF1cmE6..."

# Output as JSON
aura-verify parse "..." --json
```

### `status`

Check network connectivity:

```bash
# Check testnet status
aura-verify status

# Check specific endpoint
aura-verify status --rpc https://testnet-rpc.aurablockchain.org
```

### `config`

Manage CLI configuration:

```bash
# Set default network
aura-verify config set network testnet

# Set default RPC endpoint
aura-verify config set rpc https://testnet-rpc.aurablockchain.org

# View current config
aura-verify config list

# Reset to defaults
aura-verify config reset
```

## Examples

### Basic Verification

```bash
$ aura-verify verify --qr "eyJoIjoiZGlkOmF1cmE6aG9sZGVyMTIzIiwicCI6..."

✓ Signature Valid
✓ Credential Not Revoked
✓ Issuer Active: did:aura:dmv

Disclosure Context:
  • Age Over 21: true
  • Full Name: hidden
  • Address: hidden

Expires: 2025-03-15T10:30:00Z
```

### Batch Verification

```bash
# Verify multiple QR codes from file (one per line)
aura-verify verify --batch qrcodes.txt

# Output results as JSON
aura-verify verify --batch qrcodes.txt --output results.json
```

### Scripting

```bash
#!/bin/bash
# Verify and check exit code
if aura-verify verify --qr "$QR_DATA" --quiet; then
  echo "Access granted"
else
  echo "Verification failed"
fi
```

### JSON Output

```bash
$ aura-verify verify --qr "..." --json

{
  "valid": true,
  "signature": {
    "valid": true,
    "algorithm": "ed25519"
  },
  "credential": {
    "id": "cred-123",
    "revoked": false,
    "issuer": {
      "did": "did:aura:dmv",
      "active": true
    }
  },
  "context": {
    "show_age_over_21": true,
    "show_full_name": false
  },
  "expiration": "2025-03-15T10:30:00Z"
}
```

## Configuration File

The CLI stores configuration in `~/.aura-verifier/config.json`:

```json
{
  "network": "testnet",
  "rpc": "https://testnet-rpc.aurablockchain.org",
  "rest": "https://testnet-api.aurablockchain.org",
  "timeout": 30000,
  "debug": false
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `AURA_RPC_ENDPOINT` | Override RPC endpoint |
| `AURA_REST_ENDPOINT` | Override REST endpoint |
| `AURA_NETWORK` | Set network (`testnet` or `mainnet`) |
| `AURA_DEBUG` | Enable debug output (`true`/`false`) |

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Verification successful |
| 1 | Verification failed |
| 2 | Invalid input |
| 3 | Network error |
| 4 | Configuration error |

## Source Code

- **GitHub**: [github.com/aura-blockchain/aura-sdk/packages/cli](https://github.com/aura-blockchain/aura-sdk/tree/main/packages/cli)
- **npm**: [@aura-network/verifier-cli](https://www.npmjs.com/package/@aura-network/verifier-cli)
