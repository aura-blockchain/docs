# Quick Start

Get started with AURA testnet in minutes.

## Network Architecture

The MVP testnet uses a **sentry node architecture** for DDoS protection. Your node connects to public sentry nodes, not directly to validators.

## Join the Testnet

### 1. Initialize Node

```bash
aurad init my-node --chain-id aura-mvp-1
```

### 2. Download Genesis

```bash
curl -o ~/.aura/config/genesis.json \
  https://artifacts.aurablockchain.org/mvp/genesis.json
```

### 3. Configure Peers

Connect to sentry nodes in `~/.aura/config/config.toml`:

```bash
PEERS="f5ce5e5ce5dd77bdbfd636fb8148756f6df9c531@158.69.119.76:26681,35fdadb8b017fc95023a384c7769b946f363294e@139.99.149.160:26681"
sed -i "s/^persistent_peers = .*/persistent_peers = \"$PEERS\"/" ~/.aura/config/config.toml
```

### 4. Start Node

```bash
aurad start
```

## Create a Wallet

```bash
# Create new wallet
aurad keys add my-wallet

# Or recover from mnemonic
aurad keys add my-wallet --recover
```

## Get Testnet Tokens

Visit the [faucet](https://testnet-faucet.aurablockchain.org) to request testnet tokens.

Or use the CLI:

```bash
curl -X POST https://testnet-faucet.aurablockchain.org/api/faucet \
  -H "Content-Type: application/json" \
  -d '{"address": "aura1..."}'
```

## Query Balance

```bash
aurad query bank balances aura1...
```

## Send Tokens

```bash
aurad tx bank send my-wallet aura1... 1000000uaura \
  --chain-id aura-mvp-1 \
  --fees 5000uaura
```

## Next Steps

- [MVP Modules](../mvp/modules.md) - Learn about available modules
- [CLI Reference](../mvp/cli-reference.md) - Full command reference
- [Validator Setup](../operations/validator-setup.md) - Run a validator
