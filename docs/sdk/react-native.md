---
sidebar_position: 4
---

# React Native SDK

Build mobile verification apps for iOS and Android with the AURA React Native SDK.

## Installation

```bash
npm install @aura-network/verifier-sdk-react-native
npm install @aura-network/verifier-sdk

# iOS only
cd ios && pod install
```

### Additional Dependencies

The SDK requires these peer dependencies:

```bash
npm install react-native-camera react-native-permissions
```

## Quick Start

```tsx
import { AuraProvider, useVerifier, QRScanner } from '@aura-network/verifier-sdk-react-native';

function App() {
  return (
    <AuraProvider
      config={{
        rpcEndpoint: 'https://testnet-rpc.aurablockchain.org',
        offlineMode: {
          enabled: true,
          storage: 'sqlite'  // Uses SQLite for mobile
        }
      }}
    >
      <VerificationScreen />
    </AuraProvider>
  );
}

function VerificationScreen() {
  const { verify, isVerifying, result } = useVerifier();

  return (
    <View style={styles.container}>
      <QRScanner
        onScan={(data) => verify(data)}
        style={styles.scanner}
      />
      {isVerifying && <ActivityIndicator />}
      {result?.valid && (
        <View style={styles.success}>
          <Text>Verified!</Text>
        </View>
      )}
    </View>
  );
}
```

## Platform Setup

### iOS

Add camera permissions to `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>Camera access is required to scan verification QR codes</string>
```

### Android

Add camera permissions to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

## Components

### `QRScanner`

Native QR scanner optimized for mobile.

```tsx
<QRScanner
  onScan={(data) => handleScan(data)}
  onError={(error) => console.error(error)}
  style={{ flex: 1 }}
  showOverlay={true}
  overlayColor="rgba(0, 0, 0, 0.5)"
  markerColor="#00ff00"
  torch={false}
/>
```

### `VerificationCard`

Display verification results with native styling.

```tsx
import { VerificationCard } from '@aura-network/verifier-sdk-react-native';

<VerificationCard
  result={verificationResult}
  onDismiss={() => reset()}
  showAnimation={true}
/>
```

## Hooks

All hooks from the React SDK are available, plus mobile-specific hooks:

### `useCamera`

```tsx
const {
  hasPermission,
  requestPermission,
  toggleTorch,
  isTorchOn
} = useCamera();
```

### `useBiometrics`

Secure credential caching with biometric authentication.

```tsx
const {
  isAvailable,
  authenticate,
  saveCredential,
  getCredential
} = useBiometrics();

// Store verified credential securely
await saveCredential('user-credential', credentialData);

// Retrieve with biometric auth
const credential = await authenticate().then(() =>
  getCredential('user-credential')
);
```

## Offline Mode

The React Native SDK uses SQLite for persistent offline storage:

```tsx
<AuraProvider
  config={{
    rpcEndpoint: 'https://testnet-rpc.aurablockchain.org',
    offlineMode: {
      enabled: true,
      storage: 'sqlite',
      cacheTTL: 86400000,  // 24 hours
      maxCacheSize: 50     // MB
    }
  }}
>
  {children}
</AuraProvider>
```

Pre-fetch for offline use:

```tsx
const { prefetch, cacheStatus } = useOfflineMode();

// Download issuer keys for offline verification
await prefetch([
  'did:aura:issuer1',
  'did:aura:issuer2'
]);

console.log(`Cached ${cacheStatus.issuers} issuers`);
```

## Full Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import {
  AuraProvider,
  useVerifier,
  useCamera,
  useOfflineMode,
  QRScanner,
  VerificationCard
} from '@aura-network/verifier-sdk-react-native';

function App() {
  return (
    <AuraProvider
      config={{
        rpcEndpoint: 'https://testnet-rpc.aurablockchain.org',
        offlineMode: { enabled: true, storage: 'sqlite' }
      }}
    >
      <IDVerificationApp />
    </AuraProvider>
  );
}

function IDVerificationApp() {
  const [scanning, setScanning] = useState(false);
  const { verify, isVerifying, result, reset } = useVerifier();
  const { hasPermission, requestPermission } = useCamera();
  const { isOnline, prefetch } = useOfflineMode();

  useEffect(() => {
    // Pre-fetch issuers on app start
    prefetch(['did:aura:dmv', 'did:aura:passport']);
  }, []);

  const startScan = async () => {
    if (!hasPermission) {
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert('Camera permission required');
        return;
      }
    }
    setScanning(true);
  };

  const handleScan = async (qrData: string) => {
    setScanning(false);
    await verify(qrData);
  };

  if (result) {
    return (
      <View style={styles.container}>
        <VerificationCard
          result={result}
          onDismiss={reset}
        />
      </View>
    );
  }

  if (scanning) {
    return (
      <QRScanner
        onScan={handleScan}
        onError={(e) => Alert.alert('Scan Error', e.message)}
        style={StyleSheet.absoluteFill}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {isOnline ? '🟢 Online' : '🟡 Offline Mode'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={startScan}>
        <Text style={styles.buttonText}>Scan ID</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  status: { fontSize: 14, marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8 },
  buttonText: { color: 'white', fontSize: 18 }
});

export default App;
```

## Source Code

- **GitHub**: [github.com/aura-blockchain/aura-sdk/packages/react-native](https://github.com/aura-blockchain/aura-sdk/tree/main/packages/react-native)
- **npm**: [@aura-network/verifier-sdk-react-native](https://www.npmjs.com/package/@aura-network/verifier-sdk-react-native)
