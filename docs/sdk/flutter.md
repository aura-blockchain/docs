---
sidebar_position: 5
---

# Flutter SDK

Build cross-platform verification apps with the AURA Flutter/Dart SDK.

## Installation

Add to your `pubspec.yaml`:

```yaml
dependencies:
  aura_verifier_sdk: ^1.0.0
```

Then run:

```bash
flutter pub get
```

## Quick Start

```dart
import 'package:aura_verifier_sdk/aura_verifier_sdk.dart';

// Initialize
final verifier = AuraVerifier(
  rpcEndpoint: 'https://testnet-rpc.aurablockchain.org',
);

// Verify a QR code
final qrData = AuraQRParser.parse(scannedQRString);
final result = await verifier.verifySignature(
  publicKey: qrData.holderDid,
  message: qrData.payload,
  signature: qrData.signature,
  algorithm: SignatureAlgorithm.ed25519,
);

if (result.valid) {
  print('Verified!');
}

// Clean up
await verifier.dispose();
```

## Platform Setup

### iOS

Add camera permissions to `ios/Runner/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>Camera access is required to scan verification QR codes</string>
```

### Android

Add camera permissions to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

## API Reference

### AuraVerifier

```dart
class AuraVerifier {
  AuraVerifier({
    required String rpcEndpoint,
    String? restEndpoint,
    Duration timeout = const Duration(seconds: 30),
    OfflineConfig? offlineConfig,
  });

  Future<VerificationResult> verifySignature({
    required String publicKey,
    required String message,
    required String signature,
    SignatureAlgorithm algorithm = SignatureAlgorithm.ed25519,
  });

  Future<CredentialResult> verifyCredential({
    required String credentialId,
    required String issuerDid,
    required Map<String, dynamic> presentation,
  });

  Future<bool> checkRevocation(String credentialId);

  Future<void> prefetchIssuers(List<String> issuerDids);

  Future<void> dispose();
}
```

### AuraQRParser

```dart
class AuraQRParser {
  static QRPresentation parse(String qrData);
}

class QRPresentation {
  final String holderDid;
  final String presentationId;
  final List<Credential> credentials;
  final DisclosureContext context;
  final int expiration;
  final String nonce;
  final String signature;

  String get payload; // JSON payload for verification
}
```

### VerificationResult

```dart
class VerificationResult {
  final bool valid;
  final String? error;
  final DateTime timestamp;
}

class CredentialResult {
  final bool valid;
  final bool revoked;
  final IssuerInfo issuer;
  final String? error;
}
```

## Widgets

### AuraQRScanner

Built-in QR scanner widget:

```dart
AuraQRScanner(
  onScan: (String qrData) async {
    final result = await verifier.verifyQR(qrData);
    // Handle result
  },
  onError: (Exception error) {
    print('Scan error: $error');
  },
  overlayColor: Colors.black54,
  markerColor: Colors.green,
  showTorchButton: true,
)
```

### VerificationStatusWidget

Display verification status:

```dart
VerificationStatusWidget(
  result: verificationResult,
  showDetails: true,
  onDismiss: () => setState(() => _result = null),
)
```

## Full Example

```dart
import 'package:flutter/material.dart';
import 'package:aura_verifier_sdk/aura_verifier_sdk.dart';

void main() {
  runApp(const AgeVerificationApp());
}

class AgeVerificationApp extends StatelessWidget {
  const AgeVerificationApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Age Verification',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const VerificationScreen(),
    );
  }
}

class VerificationScreen extends StatefulWidget {
  const VerificationScreen({super.key});

  @override
  State<VerificationScreen> createState() => _VerificationScreenState();
}

class _VerificationScreenState extends State<VerificationScreen> {
  late final AuraVerifier _verifier;
  bool _isScanning = false;
  bool _isVerifying = false;
  VerificationResult? _result;
  DisclosureContext? _context;

  @override
  void initState() {
    super.initState();
    _verifier = AuraVerifier(
      rpcEndpoint: 'https://testnet-rpc.aurablockchain.org',
      offlineConfig: OfflineConfig(
        enabled: true,
        cacheTtl: const Duration(hours: 24),
      ),
    );
    // Pre-fetch common issuers
    _verifier.prefetchIssuers(['did:aura:dmv', 'did:aura:state-id']);
  }

  @override
  void dispose() {
    _verifier.dispose();
    super.dispose();
  }

  Future<void> _handleScan(String qrData) async {
    setState(() {
      _isScanning = false;
      _isVerifying = true;
    });

    try {
      final qr = AuraQRParser.parse(qrData);
      final result = await _verifier.verifySignature(
        publicKey: qr.holderDid,
        message: qr.payload,
        signature: qr.signature,
      );

      setState(() {
        _result = result;
        _context = qr.context;
        _isVerifying = false;
      });
    } catch (e) {
      setState(() => _isVerifying = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  }

  void _reset() {
    setState(() {
      _result = null;
      _context = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isScanning) {
      return Scaffold(
        appBar: AppBar(title: const Text('Scan ID')),
        body: AuraQRScanner(
          onScan: _handleScan,
          onError: (e) => print('Scan error: $e'),
        ),
      );
    }

    if (_result != null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Result')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                _result!.valid ? Icons.check_circle : Icons.error,
                size: 100,
                color: _result!.valid ? Colors.green : Colors.red,
              ),
              const SizedBox(height: 20),
              Text(
                _result!.valid ? 'Verified!' : 'Verification Failed',
                style: const TextStyle(fontSize: 24),
              ),
              if (_result!.valid && _context?.showAgeOver21 == true)
                const Padding(
                  padding: EdgeInsets.all(16),
                  child: Text(
                    'Customer is 21+',
                    style: TextStyle(fontSize: 18, color: Colors.green),
                  ),
                ),
              const SizedBox(height: 40),
              ElevatedButton(
                onPressed: _reset,
                child: const Text('Scan Another'),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Age Verification')),
      body: Center(
        child: _isVerifying
            ? const CircularProgressIndicator()
            : ElevatedButton.icon(
                onPressed: () => setState(() => _isScanning = true),
                icon: const Icon(Icons.qr_code_scanner),
                label: const Text('Scan Customer ID'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 32,
                    vertical: 16,
                  ),
                ),
              ),
      ),
    );
  }
}
```

## Offline Mode

Configure offline verification with local caching:

```dart
final verifier = AuraVerifier(
  rpcEndpoint: 'https://testnet-rpc.aurablockchain.org',
  offlineConfig: OfflineConfig(
    enabled: true,
    cacheTtl: const Duration(hours: 24),
    maxCacheSize: 50 * 1024 * 1024, // 50 MB
  ),
);

// Pre-fetch issuers for offline use
await verifier.prefetchIssuers([
  'did:aura:dmv',
  'did:aura:passport',
  'did:aura:state-id',
]);

// Check cache status
final status = await verifier.getCacheStatus();
print('Cached ${status.issuerCount} issuers');
```

## Source Code

- **GitHub**: [github.com/aura-blockchain/aura-sdk/packages/flutter](https://github.com/aura-blockchain/aura-sdk/tree/main/packages/flutter)
- **pub.dev**: [aura_verifier_sdk](https://pub.dev/packages/aura_verifier_sdk)
