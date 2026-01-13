# Validator Setup Guide

This guide walks through setting up a validator node on the AURA MVP testnet.

## Prerequisites

- A fully synced full node
- At least 1,000,000 uaura (1 AURA) for staking
- Reliable server with good uptime

## Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 4 cores | 8 cores |
| RAM | 8 GB | 16 GB |
| Storage | 100 GB SSD | 500 GB NVMe |
| Network | 100 Mbps | 1 Gbps |

## Step 1: Set Up Full Node

If you haven't already, set up and sync a full node:

```bash
# Initialize
aurad init my-validator --chain-id aura-mvp-1

# Download genesis
curl -o ~/.aurad/config/genesis.json \
  https://artifacts.aurablockchain.org/aura-mvp-1/genesis.json

# Configure peers
# Edit ~/.aurad/config/config.toml and add persistent_peers

# Start and sync
aurad start
```

Wait for your node to fully sync before proceeding.

## Step 2: Create Validator Key

```bash
aurad keys add validator-key
```

!!! warning "Backup your mnemonic"
    Save the mnemonic phrase securely. You will need it to recover your validator key.

Get your validator address:

```bash
aurad keys show validator-key -a
```

## Step 3: Fund Your Account

Use the [faucet](https://testnet-faucet.aurablockchain.org) to get testnet tokens.

Verify your balance:

```bash
aurad query bank balances $(aurad keys show validator-key -a)
```

## Step 4: Create Validator

```bash
aurad tx staking create-validator \
  --amount 1000000uaura \
  --pubkey $(aurad tendermint show-validator) \
  --moniker "my-validator" \
  --chain-id aura-mvp-1 \
  --commission-rate 0.10 \
  --commission-max-rate 0.20 \
  --commission-max-change-rate 0.01 \
  --min-self-delegation 1 \
  --from validator-key \
  --gas auto \
  --gas-adjustment 1.2 \
  --gas-prices 0.025uaura
```

### Parameters Explained

| Parameter | Description |
|-----------|-------------|
| `--amount` | Initial self-delegation amount |
| `--pubkey` | Validator's consensus public key |
| `--moniker` | Human-readable name for your validator |
| `--commission-rate` | Initial commission rate (10% = 0.10) |
| `--commission-max-rate` | Maximum commission rate |
| `--commission-max-change-rate` | Maximum daily commission change |
| `--min-self-delegation` | Minimum self-delegation required |

## Step 5: Verify Validator

Check your validator status:

```bash
aurad query staking validator $(aurad keys show validator-key --bech val -a)
```

View in the active set:

```bash
aurad query staking validators --status bonded
```

## Monitoring

### Check Signing Status

```bash
aurad query slashing signing-info $(aurad tendermint show-validator)
```

### View Missed Blocks

If your validator misses too many blocks, it will be jailed. Monitor:

```bash
aurad query slashing params
```

### Unjail Validator

If jailed for downtime:

```bash
aurad tx slashing unjail --from validator-key --chain-id aura-mvp-1
```

## Systemd Service

Create a systemd service for automatic restarts:

```ini
[Unit]
Description=AURA Validator
After=network-online.target
Wants=network-online.target

[Service]
User=ubuntu
ExecStart=/usr/local/bin/aurad start
Restart=always
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
```

Save to `/etc/systemd/system/aurad.service` and enable:

```bash
sudo systemctl daemon-reload
sudo systemctl enable aurad
sudo systemctl start aurad
```

## Security Best Practices

1. **Use a sentry node architecture** - Don't expose validator directly
2. **Enable firewall** - Only open necessary ports
3. **Use key management** - Consider using a hardware security module
4. **Monitor uptime** - Set up alerts for downtime
5. **Keep software updated** - Apply security patches promptly
