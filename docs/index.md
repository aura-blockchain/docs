---
sidebar_position: 1
slug: /
title: Introduction
---

# AURA Blockchain

AURA is a Cosmos SDK blockchain for credential verification and identity management.

## What is AURA?

AURA provides a decentralized platform for issuing, verifying, and managing credentials:

- **Credential Issuance**: Organizations issue verifiable credentials on-chain
- **Instant Verification**: Verify credentials without contacting the issuer
- **Privacy-Preserving**: Selective disclosure and zero-knowledge proofs
- **Interoperable**: IBC-enabled for cross-chain credential verification

## MVP Testnet

The AURA MVP testnet is live with chain ID `aura-mvp-1`.

| Resource | URL |
|----------|-----|
| RPC | `https://testnet-rpc.aurablockchain.org` |
| REST API | `https://testnet-api.aurablockchain.org` |
| Explorer | [explorer.aurablockchain.org](https://explorer.aurablockchain.org) |
| Faucet | [testnet-faucet.aurablockchain.org](https://testnet-faucet.aurablockchain.org) |

## Quick Start

```bash
# Install aurad
curl -LO https://artifacts.aurablockchain.org/aurad-linux-amd64
chmod +x aurad-linux-amd64 && sudo mv aurad-linux-amd64 /usr/local/bin/aurad

# Initialize node
aurad init my-node --chain-id aura-mvp-1

# Download genesis
curl -o ~/.aura/config/genesis.json https://artifacts.aurablockchain.org/aura-mvp-1/genesis.json

# Configure peers
PEERS="f5ce5e5ce5dd77bdbfd636fb8148756f6df9c531@158.69.119.76:26681,35fdadb8b017fc95023a384c7769b946f363294e@139.99.149.160:26681"
sed -i "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.aura/config/config.toml

# Start node
aurad start
```

## Documentation

- [Getting Started](/getting-started/overview) - New to AURA? Start here
- [MVP Modules](/mvp/modules) - Learn about the 12 MVP modules
- [CLI Reference](/mvp/cli-reference) - Command-line interface
- [Validator Setup](/operations/validator-setup) - Run a validator node

## Community

- [GitHub](https://github.com/aura-blockchain)
- [Discord](https://discord.gg/RwQ8pma6)
- [Twitter](https://twitter.com/useyouraura)
- Email: info@aurablockchain.org
