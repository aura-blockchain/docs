# Installation

This guide covers installing the AURA blockchain binary.

## Prerequisites

- Go 1.21 or later
- Git
- Make

## Build from Source

```bash
# Clone the repository
git clone https://github.com/aura-blockchain/aura.git
cd aura

# Build the MVP binary
make build-mvp

# Verify installation
./build/aurad version
```

## Download Pre-built Binary

Pre-built binaries are available for major platforms:

| Platform | Download |
|----------|----------|
| Linux (amd64) | [aurad-linux-amd64](https://artifacts.aurablockchain.org/v1.0.0-mvp/aurad-linux-amd64) |
| Linux (arm64) | [aurad-linux-arm64](https://artifacts.aurablockchain.org/v1.0.0-mvp/aurad-linux-arm64) |
| macOS (amd64) | [aurad-darwin-amd64](https://artifacts.aurablockchain.org/v1.0.0-mvp/aurad-darwin-amd64) |
| macOS (arm64) | [aurad-darwin-arm64](https://artifacts.aurablockchain.org/v1.0.0-mvp/aurad-darwin-arm64) |

### Verify Checksums

```bash
# Download checksums
curl -O https://artifacts.aurablockchain.org/v1.0.0-mvp/SHA256SUMS

# Verify
sha256sum -c SHA256SUMS
```

## System Requirements

### Minimum (Testnet)

- CPU: 2 cores
- RAM: 4 GB
- Storage: 50 GB SSD
- Network: 10 Mbps

### Recommended (Production)

- CPU: 4+ cores
- RAM: 16 GB
- Storage: 200 GB NVMe SSD
- Network: 100 Mbps
