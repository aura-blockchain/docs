# Overview

AURA is a purpose-built blockchain for credential verification, built on the Cosmos SDK.

## Architecture

AURA uses a modular architecture with the following core components:

- **Consensus**: CometBFT (Tendermint) for Byzantine fault-tolerant consensus
- **Application Layer**: Cosmos SDK modules for business logic
- **Credential Layer**: Custom modules for credential management

## Key Concepts

### Credentials

A credential in AURA represents a verifiable claim issued by an authority (issuer) about a subject. Credentials are stored on-chain with cryptographic proofs.

### Issuers

Issuers are registered entities authorized to create credentials. Each issuer has an on-chain identity and signing keys.

### Verifiers

Verifiers can query the blockchain to verify credentials without contacting the original issuer.

### Schema Registry

The schema registry defines the structure of credentials, ensuring consistency and interoperability.

## Network Tokens

- **AURA**: The native staking and governance token
- **uaura**: The base denomination (1 AURA = 1,000,000 uaura)

## Consensus

AURA uses Delegated Proof of Stake (DPoS) with:

- Block time: ~5 seconds
- Validators: Active set determined by stake
- Slashing: Penalties for downtime and double-signing
