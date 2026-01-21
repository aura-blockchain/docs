---
sidebar_position: 2
---

# TypeScript SDK

The core AURA SDK for Node.js and browser environments.

## Installation

```bash
npm install @aura-network/verifier-sdk
# or
pnpm add @aura-network/verifier-sdk
# or
yarn add @aura-network/verifier-sdk
```

## Quick Start

```typescript
import { VerifierSDK } from '@aura-network/verifier-sdk';

// Initialize
const verifier = new VerifierSDK({
  rpcEndpoint: 'https://testnet-rpc.aurablockchain.org',
  timeout: 30000,
  debug: false
});

// Verify a signature
const result = await verifier.verifySignature({
  publicKey: 'a1b2c3d4...',
  message: 'credential-presentation-data',
  signature: 'signature-from-qr-code',
  algorithm: 'ed25519'
});

if (result.valid) {
  console.log('Verified!');
}

// Clean up
await verifier.disconnect();
```

## Configuration

```typescript
interface VerifierConfig {
  // Required
  rpcEndpoint: string;

  // Optional
  restEndpoint?: string;
  grpcEndpoint?: string;
  timeout?: number;           // Default: 30000ms
  retries?: number;           // Default: 3
  retryDelay?: number;        // Default: 1000ms
  debug?: boolean;            // Default: false

  // Offline mode
  offlineMode?: {
    enabled: boolean;
    cacheTTL?: number;        // Default: 3600000ms (1 hour)
    storage?: 'memory' | 'indexeddb' | 'localstorage';
  };
}
```

## API Reference

### VerifierSDK

#### `verifySignature(params)`

Verify a cryptographic signature.

```typescript
const result = await verifier.verifySignature({
  publicKey: string,          // Hex-encoded public key
  message: string,            // Original message
  signature: string,          // Hex-encoded signature
  algorithm: 'ed25519' | 'secp256k1'
});

// Returns
interface VerificationResult {
  valid: boolean;
  error?: string;
  timestamp: number;
}
```

#### `verifyCredential(params)`

Verify a credential against the blockchain.

```typescript
const result = await verifier.verifyCredential({
  credentialId: string,
  issuerDid: string,
  holderDid: string,
  presentation: object
});

// Returns
interface CredentialResult {
  valid: boolean;
  revoked: boolean;
  issuer: {
    did: string;
    active: boolean;
  };
  error?: string;
}
```

#### `parseQRCode(data)`

Parse a QR code presentation.

```typescript
import { parseQRCode } from '@aura-network/verifier-sdk';

const qrData = parseQRCode(scannedString);

// Returns
interface QRPresentation {
  h: string;          // Holder DID
  p: string;          // Presentation ID
  vcs: Credential[];  // Verifiable credentials
  ctx: {              // Disclosure context
    show_age_over_21?: boolean;
    show_full_name?: boolean;
    show_address?: boolean;
  };
  exp: number;        // Expiration timestamp
  n: string;          // Nonce
  sig: string;        // Signature
}
```

#### `prefetchIssuers(dids)`

Pre-fetch issuer public keys for offline verification.

```typescript
await verifier.prefetchIssuers([
  'did:aura:issuer1',
  'did:aura:issuer2'
]);
```

#### `checkRevocation(credentialId)`

Check if a credential has been revoked.

```typescript
const revoked = await verifier.checkRevocation('credential-id-123');
```

### Error Handling

```typescript
import {
  VerifierSDK,
  VerificationError,
  NetworkError,
  TimeoutError,
  InvalidSignatureError
} from '@aura-network/verifier-sdk';

try {
  const result = await verifier.verifySignature(params);
} catch (error) {
  if (error instanceof NetworkError) {
    // Network connectivity issue
    console.error('Network error:', error.message);
  } else if (error instanceof TimeoutError) {
    // Request timed out
    console.error('Timeout:', error.message);
  } else if (error instanceof InvalidSignatureError) {
    // Invalid signature format
    console.error('Invalid signature:', error.message);
  } else if (error instanceof VerificationError) {
    // General verification error
    console.error('Verification failed:', error.message);
  }
}
```

## Examples

### Express.js API

```typescript
import express from 'express';
import { VerifierSDK, parseQRCode } from '@aura-network/verifier-sdk';

const app = express();
const verifier = new VerifierSDK({
  rpcEndpoint: 'https://testnet-rpc.aurablockchain.org'
});

app.post('/verify', express.json(), async (req, res) => {
  try {
    const { qrCode } = req.body;
    const qrData = parseQRCode(qrCode);

    const result = await verifier.verifySignature({
      publicKey: qrData.h,
      message: JSON.stringify(qrData.payload),
      signature: qrData.sig,
      algorithm: 'ed25519'
    });

    res.json({ valid: result.valid, context: qrData.ctx });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000);
```

### Browser Usage

```typescript
import { VerifierSDK } from '@aura-network/verifier-sdk';

// Works in browsers with IndexedDB caching
const verifier = new VerifierSDK({
  rpcEndpoint: 'https://testnet-rpc.aurablockchain.org',
  offlineMode: {
    enabled: true,
    storage: 'indexeddb'
  }
});
```

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import type {
  VerifierConfig,
  VerificationResult,
  CredentialResult,
  QRPresentation,
  Credential
} from '@aura-network/verifier-sdk';
```

## Source Code

- **GitHub**: [github.com/aura-blockchain/aura-sdk/packages/core](https://github.com/aura-blockchain/aura-sdk/tree/main/packages/core)
- **npm**: [@aura-network/verifier-sdk](https://www.npmjs.com/package/@aura-network/verifier-sdk)
