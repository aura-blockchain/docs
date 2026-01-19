---
sidebar_position: 99
---

# AURA Public Endpoints

Public API endpoints for connecting to the AURA MVP testnet.

## Chain Information

| Property | Value |
|----------|-------|
| Chain ID | `aura-mvp-1` |
| Version | v1.0.0-mvp |
| Status | Live |
| Native Token | AURA (uaura) |

**Links**: [Website](https://aurablockchain.org) | [Discord](https://discord.gg/RwQ8pma6) | [GitHub](https://github.com/aura-blockchain)

## Public Endpoints

| Service | URL |
|---------|-----|
| RPC | `https://testnet-rpc.aurablockchain.org` |
| REST API | `https://testnet-api.aurablockchain.org` |
| gRPC | `testnet-grpc.aurablockchain.org:443` |
| WebSocket | `wss://testnet-ws.aurablockchain.org` |

## Explorer & Tools

| Service | URL |
|---------|-----|
| Block Explorer | https://testnet-explorer.aurablockchain.org |
| Faucet | https://testnet-faucet.aurablockchain.org |

## Sentry Node Architecture

The MVP testnet uses **sentry nodes** for DDoS protection. External nodes connect to sentry nodes, NOT directly to validators.

### Sentry Nodes (P2P)

| Sentry | Address | Node ID |
|--------|---------|---------|
| sentry-1 | 158.69.119.76:26681 | f5ce5e5ce5dd77bdbfd636fb8148756f6df9c531 |
| sentry-2 | 139.99.149.160:26681 | 35fdadb8b017fc95023a384c7769b946f363294e |

### Persistent Peers String
```
f5ce5e5ce5dd77bdbfd636fb8148756f6df9c531@158.69.119.76:26681,35fdadb8b017fc95023a384c7769b946f363294e@139.99.149.160:26681
```

### Configure Peers
```bash
PEERS="f5ce5e5ce5dd77bdbfd636fb8148756f6df9c531@158.69.119.76:26681,35fdadb8b017fc95023a384c7769b946f363294e@139.99.149.160:26681"
sed -i "s/^persistent_peers = .*/persistent_peers = \"$PEERS\"/" ~/.aura/config/config.toml
```

## Quick Commands

```bash
# Check sync status
curl -s https://testnet-rpc.aurablockchain.org/status | jq '.result.sync_info'

# Get latest block height
curl -s https://testnet-rpc.aurablockchain.org/status | jq -r '.result.sync_info.latest_block_height'

# Get peer count
curl -s https://testnet-rpc.aurablockchain.org/net_info | jq '.result.n_peers'

# Get node info
curl -s https://testnet-api.aurablockchain.org/cosmos/base/tendermint/v1beta1/node_info
```

## Machine-Readable Files

| File | URL |
|------|-----|
| genesis.json | https://artifacts.aurablockchain.org/mvp/genesis.json |
| peers.txt | https://artifacts.aurablockchain.org/mvp/peers.txt |
| network-info.json | https://artifacts.aurablockchain.org/mvp/network-info.json |
