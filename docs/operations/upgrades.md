# Upgrade Procedures

This guide covers upgrading AURA nodes between versions.

## Upgrade Types

| Type | Description | Downtime |
|------|-------------|----------|
| Soft Upgrade | Binary replacement, no state migration | Minutes |
| Hard Upgrade | State migration required | Hours |
| Emergency | Security patch | Varies |

## Using Cosmovisor

Cosmovisor automates binary upgrades via governance proposals.

### Install Cosmovisor

```bash
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
```

### Directory Structure

```
~/.aurad/
├── cosmovisor/
│   ├── genesis/
│   │   └── bin/
│   │       └── aurad
│   └── upgrades/
│       └── v2.0.0/
│           └── bin/
│               └── aurad
```

### Configure Systemd

```ini
[Unit]
Description=AURA Validator (Cosmovisor)
After=network-online.target

[Service]
User=ubuntu
Environment="DAEMON_NAME=aurad"
Environment="DAEMON_HOME=/home/ubuntu/.aurad"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
ExecStart=/home/ubuntu/go/bin/cosmovisor run start
Restart=always

[Install]
WantedBy=multi-user.target
```

## Manual Upgrade

### 1. Stop the Node

```bash
sudo systemctl stop aurad
```

### 2. Backup

```bash
cp -r ~/.aurad ~/.aurad-backup-$(date +%Y%m%d)
```

### 3. Replace Binary

```bash
# Download new binary
curl -LO https://artifacts.aurablockchain.org/v2.0.0/aurad-linux-amd64

# Verify checksum
sha256sum aurad-linux-amd64

# Install
chmod +x aurad-linux-amd64
sudo mv aurad-linux-amd64 /usr/local/bin/aurad

# Verify version
aurad version
```

### 4. Migrate (if required)

Some upgrades require state migration:

```bash
aurad migrate ~/.aurad/data/priv_validator_state.json
```

### 5. Restart

```bash
sudo systemctl start aurad
```

### 6. Verify

```bash
aurad status
journalctl -u aurad -f
```

## Governance Upgrades

For coordinated network upgrades:

### 1. Submit Upgrade Proposal

```bash
aurad tx gov submit-proposal software-upgrade v2.0.0 \
  --title "Upgrade to v2.0.0" \
  --description "This upgrade adds..." \
  --upgrade-height 100000 \
  --deposit 10000000uaura \
  --from validator-key
```

### 2. Vote

```bash
aurad tx gov vote <proposal-id> yes --from validator-key
```

### 3. Prepare Binary

Before the upgrade height, place the new binary:

```bash
mkdir -p ~/.aurad/cosmovisor/upgrades/v2.0.0/bin
cp aurad-v2.0.0 ~/.aurad/cosmovisor/upgrades/v2.0.0/bin/aurad
```

### 4. Chain Halts at Upgrade Height

The chain will automatically halt. Cosmovisor will switch binaries and restart.

## Rollback

If an upgrade fails:

### 1. Stop Node

```bash
sudo systemctl stop aurad
```

### 2. Restore Backup

```bash
rm -rf ~/.aurad
mv ~/.aurad-backup-YYYYMMDD ~/.aurad
```

### 3. Restore Old Binary

```bash
sudo mv /usr/local/bin/aurad-old /usr/local/bin/aurad
```

### 4. Restart

```bash
sudo systemctl start aurad
```

## Version History

| Version | Date | Notes |
|---------|------|-------|
| v1.0.0-mvp | 2026-01-13 | Initial MVP release |

## Emergency Procedures

For security vulnerabilities:

1. **Monitor announcements** - Watch GitHub and Discord
2. **Prepare quickly** - Download and verify patches immediately
3. **Coordinate** - Follow network coordinator instructions
4. **Communicate** - Report issues to the team
