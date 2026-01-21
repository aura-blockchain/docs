---
sidebar_position: 3
---

# React SDK

React hooks for integrating AURA verification into React applications.

## Installation

```bash
npm install @aura-network/verifier-sdk-react
# Also requires the core SDK
npm install @aura-network/verifier-sdk
```

## Quick Start

```tsx
import { AuraProvider, useVerifier } from '@aura-network/verifier-sdk-react';

// Wrap your app
function App() {
  return (
    <AuraProvider
      config={{
        rpcEndpoint: 'https://testnet-rpc.aurablockchain.org'
      }}
    >
      <VerificationForm />
    </AuraProvider>
  );
}

// Use the hooks
function VerificationForm() {
  const { verify, isVerifying, result, error } = useVerifier();

  const handleScan = async (qrCode: string) => {
    await verify(qrCode);
  };

  return (
    <div>
      {isVerifying && <p>Verifying...</p>}
      {result?.valid && <p>Verified!</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

## Hooks

### `useVerifier`

Main hook for credential verification.

```tsx
const {
  verify,           // (qrCode: string) => Promise<void>
  verifySignature,  // (params) => Promise<VerificationResult>
  isVerifying,      // boolean
  result,           // VerificationResult | null
  error,            // Error | null
  reset             // () => void
} = useVerifier();
```

### `useCredential`

Hook for checking individual credentials.

```tsx
const {
  checkCredential,  // (credentialId: string) => Promise<void>
  isChecking,       // boolean
  credential,       // CredentialResult | null
  isRevoked,        // boolean | null
  error             // Error | null
} = useCredential();
```

### `useOfflineMode`

Hook for managing offline verification cache.

```tsx
const {
  isOnline,         // boolean
  cacheStatus,      // { issuers: number, credentials: number }
  prefetch,         // (issuers: string[]) => Promise<void>
  clearCache,       // () => Promise<void>
  lastSync          // Date | null
} = useOfflineMode();
```

### `useQRScanner`

Hook for QR code scanning (requires camera access).

```tsx
const {
  startScanning,    // () => void
  stopScanning,     // () => void
  isScanning,       // boolean
  scannedData,      // QRPresentation | null
  error             // Error | null
} = useQRScanner({
  onScan: (data) => console.log('Scanned:', data),
  autoVerify: true  // Automatically verify after scan
});
```

## Components

### `QRScanner`

Built-in QR scanner component.

```tsx
import { QRScanner } from '@aura-network/verifier-sdk-react';

<QRScanner
  onScan={(data) => handleVerification(data)}
  onError={(error) => console.error(error)}
  width={300}
  height={300}
/>
```

### `VerificationStatus`

Display verification status with built-in styling.

```tsx
import { VerificationStatus } from '@aura-network/verifier-sdk-react';

<VerificationStatus
  result={verificationResult}
  showDetails={true}
/>
```

## Full Example

```tsx
import React, { useState } from 'react';
import {
  AuraProvider,
  useVerifier,
  useQRScanner,
  QRScanner,
  VerificationStatus
} from '@aura-network/verifier-sdk-react';

function AgeVerificationApp() {
  return (
    <AuraProvider
      config={{
        rpcEndpoint: 'https://testnet-rpc.aurablockchain.org',
        offlineMode: { enabled: true }
      }}
    >
      <AgeVerificationScreen />
    </AuraProvider>
  );
}

function AgeVerificationScreen() {
  const [showScanner, setShowScanner] = useState(false);
  const { verify, isVerifying, result, error, reset } = useVerifier();

  const handleScan = async (qrData: string) => {
    setShowScanner(false);
    await verify(qrData);
  };

  if (result) {
    return (
      <div>
        <VerificationStatus result={result} showDetails />
        {result.valid && result.context?.show_age_over_21 && (
          <p>Customer is verified as 21+</p>
        )}
        <button onClick={reset}>Scan Another</button>
      </div>
    );
  }

  return (
    <div>
      {showScanner ? (
        <QRScanner
          onScan={handleScan}
          onError={(e) => console.error(e)}
        />
      ) : (
        <button onClick={() => setShowScanner(true)}>
          Scan Customer QR Code
        </button>
      )}
      {isVerifying && <p>Verifying credential...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default AgeVerificationApp;
```

## TypeScript Support

```typescript
import type {
  AuraProviderProps,
  UseVerifierResult,
  UseCredentialResult,
  UseOfflineModeResult,
  UseQRScannerResult
} from '@aura-network/verifier-sdk-react';
```

## Source Code

- **GitHub**: [github.com/aura-blockchain/aura-sdk/packages/react](https://github.com/aura-blockchain/aura-sdk/tree/main/packages/react)
- **npm**: [@aura-network/verifier-sdk-react](https://www.npmjs.com/package/@aura-network/verifier-sdk-react)
