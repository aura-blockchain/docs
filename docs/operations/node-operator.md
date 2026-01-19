---
sidebar_position: 2
---

# Node Operator Guide

This guide covers running and maintaining an AURA full node.

## Node Types

| Type | Purpose | Requirements |
|------|---------|--------------|
| Full Node | Sync and verify all blocks | Standard |
| Archive Node | Keep all historical state | High storage |
| Validator | Participate in consensus | High availability |
| Seed Node | Help peers discover network | Good connectivity |

## Installation

### From Binary

```bash
# Download binary
curl -LO https://artifacts.aurablockchain.org/v1.0.0-mvp/aurad-linux-amd64
chmod +x aurad-linux-amd64
mv aurad-linux-amd64 /usr/local/bin/aurad
```

### From Source

```bash
git clone https://github.com/aura-blockchain/aura.git
cd aura
make build-mvp
cp build/aurad /usr/local/bin/
```

## Configuration

### Initialize Node

```bash
aurad init my-node --chain-id aura-mvp-1
```

### Key Configuration Files

| File | Purpose |
|------|---------|
| `~/.aurad/config/config.toml` | CometBFT configuration |
| `~/.aurad/config/app.toml` | Application configuration |
| `~/.aurad/config/genesis.json` | Network genesis file |
| `~/.aurad/data/` | Blockchain data |

### Important Settings

**config.toml**:

```toml
# P2P settings - connect to sentry nodes
[p2p]
persistent_peers = "f5ce5e5ce5dd77bdbfd636fb8148756f6df9c531@158.69.119.76:26681,35fdadb8b017fc95023a384c7769b946f363294e@139.99.149.160:26681"
seeds = ""
max_num_inbound_peers = 40
max_num_outbound_peers = 10

# RPC settings
[rpc]
laddr = "tcp://127.0.0.1:26657"

# Mempool
[mempool]
size = 5000
```

**app.toml**:

```toml
# Pruning
pruning = "default"

# API settings
[api]
enable = true
address = "tcp://127.0.0.1:1317"

# gRPC settings
[grpc]
enable = true
address = "0.0.0.0:9090"
```

## State Sync

For faster sync, use state sync:

```toml
# In config.toml
[statesync]
enable = true
rpc_servers = "https://testnet-rpc.aurablockchain.org:443,https://testnet-rpc.aurablockchain.org:443"
trust_height = <recent_height>
trust_hash = "<block_hash>"
trust_period = "168h"
```

Get trust height and hash:

```bash
LATEST=$(curl -s https://testnet-rpc.aurablockchain.org/block | jq -r .result.block.header.height)
TRUST_HEIGHT=$((LATEST - 1000))
TRUST_HASH=$(curl -s "https://testnet-rpc.aurablockchain.org/block?height=$TRUST_HEIGHT" | jq -r .result.block_id.hash)
echo "trust_height = $TRUST_HEIGHT"
echo "trust_hash = \"$TRUST_HASH\""
```

## Maintenance

### Check Node Status

```bash
aurad status
```

### View Logs

```bash
journalctl -u aurad -f
```

### Restart Node

```bash
sudo systemctl restart aurad
```

### Export State

```bash
aurad export --height <height> > genesis-export.json
```

### Reset Node

```bash
aurad tendermint unsafe-reset-all
```

## Troubleshooting

### Node Won't Start

1. Check logs: `journalctl -u aurad -n 100`
2. Verify genesis: `aurad genesis validate`
3. Check disk space: `df -h`

### Node Not Syncing

1. Check peers: `curl localhost:26657/net_info`
2. Verify connectivity: `curl localhost:26657/status`
3. Try adding more peers

### Out of Memory

Increase pruning or add swap:

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## Backup

### What to Backup

- `~/.aurad/config/priv_validator_key.json` - **Critical**
- `~/.aurad/config/node_key.json` - Node identity
- `~/.aurad/data/priv_validator_state.json` - Validator state

### Backup Command

```bash
tar -czvf aura-backup-$(date +%Y%m%d).tar.gz \
  ~/.aurad/config/priv_validator_key.json \
  ~/.aurad/config/node_key.json
```
