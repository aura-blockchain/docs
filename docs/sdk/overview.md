---
sidebar_position: 1
---

# SDK Overview

Build third-party verifiers and integrate with the AURA Network using our production-ready SDKs.

## Available SDKs

| SDK | Package | Platform |
|-----|---------|----------|
| [TypeScript SDK](./typescript) | `@aura-network/verifier-sdk` | Node.js, Browser |
| [React Hooks](./react) | `@aura-network/verifier-sdk-react` | React apps |
| [React Native](./react-native) | `@aura-network/verifier-sdk-react-native` | iOS, Android |
| [Flutter](./flutter) | `aura_verifier_sdk` | iOS, Android, Web |
| [CLI](./cli) | `@aura-network/verifier-cli` | Terminal |

## Quick Install

```bash
# TypeScript/JavaScript
npm install @aura-network/verifier-sdk

# React
npm install @aura-network/verifier-sdk-react

# React Native
npm install @aura-network/verifier-sdk-react-native

# Flutter
flutter pub add aura_verifier_sdk
```

## Network Configuration

### Testnet (Current)

```typescript
const config = {
  rpcEndpoint: 'https://testnet-rpc.aurablockchain.org',
  restEndpoint: 'https://testnet-api.aurablockchain.org',
  chainId: 'aura-mvp-1'
};
```

### Mainnet (Coming Soon)

```typescript
const config = {
  rpcEndpoint: 'https://rpc.aurablockchain.org',
  restEndpoint: 'https://api.aurablockchain.org',
  chainId: 'aura-1'
};
```

## Use Cases

### Age Verification

Verify users are over 21 without seeing their actual birthdate:

```typescript
import { VerifierSDK, parseQRCode } from '@aura-network/verifier-sdk';

const verifier = new VerifierSDK({
  rpcEndpoint: 'https://testnet-rpc.aurablockchain.org'
});

const qrData = parseQRCode(scannedQRString);

if (qrData.ctx.show_age_over_21) {
  const result = await verifier.verifySignature({
    publicKey: qrData.h,
    message: JSON.stringify(qrData.payload),
    signature: qrData.sig,
    algorithm: 'ed25519'
  });

  if (result.valid && Date.now() / 1000 < qrData.exp) {
    // Customer is verified as over 21
  }
}
```

### Identity Verification

Verify identity credentials for marketplace trust:

```typescript
const identityResult = await verifier.verifyCredential({
  credentialId: qrData.vcs[0].id,
  issuerDid: qrData.vcs[0].issuer,
  presentation: qrData
});

if (identityResult.valid && !identityResult.revoked) {
  // Identity verified - allow transaction
}
```

### Offline Verification

Cache credentials for offline scenarios:

```typescript
const verifier = new VerifierSDK({
  rpcEndpoint: 'https://testnet-rpc.aurablockchain.org',
  offlineMode: {
    enabled: true,
    cacheTTL: 3600000, // 1 hour
    storage: 'indexeddb' // or 'sqlite' for React Native
  }
});

// Pre-fetch issuer public keys
await verifier.prefetchIssuers(['did:aura:issuer1', 'did:aura:issuer2']);

// Works offline after prefetch
const result = await verifier.verifySignature(qrData);
```

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Your Application                       │
├──────────────────────────────────────────────────────────┤
│                     AURA SDK                              │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ Verification│  │   Caching    │  │  Crypto Utils   │   │
│  │   Engine    │  │   Layer      │  │  (Ed25519/etc)  │   │
│  └──────┬─────┘  └──────┬───────┘  └────────┬────────┘   │
├─────────┼───────────────┼──────────────────┬─┴───────────┤
│         │               │                  │              │
│  ┌──────▼───────────────▼──────────────────▼──────┐      │
│  │              Network Layer (CosmJS)             │      │
│  └────────────────────────┬───────────────────────┘      │
└───────────────────────────┼──────────────────────────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │   AURA Blockchain   │
                  │  (Cosmos SDK Node)  │
                  └─────────────────────┘
```

## Requirements

- **Node.js**: 18.0.0 or higher
- **TypeScript**: 5.0+ (optional, for type safety)
- **React**: 18+ (for React hooks)
- **React Native**: 0.72+ (for mobile)
- **Flutter**: 3.0+ (for Dart SDK)

## Source Code

All SDKs are open source:

- **GitHub**: [github.com/aura-blockchain/aura-sdk](https://github.com/aura-blockchain/aura-sdk)
- **npm**: [@aura-network](https://www.npmjs.com/org/aura-network)
- **pub.dev**: [aura_verifier_sdk](https://pub.dev/packages/aura_verifier_sdk)

## Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/aura-blockchain/aura-sdk/issues)
- **Discord**: [Join the community](https://discord.gg/RwQ8pma6)
- **Email**: dev@aurablockchain.org
