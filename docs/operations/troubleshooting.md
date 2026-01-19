---
sidebar_position: 4
---

# Troubleshooting

Common issues and solutions for AURA node operators.

## Node Issues

### Node Won't Start

**Symptom**: `aurad start` exits immediately

**Solutions**:

1. Check logs:
   ```bash
   journalctl -u aurad -n 100 --no-pager
   ```

2. Validate genesis:
   ```bash
   aurad genesis validate
   ```

3. Check port conflicts:
   ```bash
   netstat -tlnp | grep -E "26656|26657|1317|9090"
   ```

4. Verify permissions:
   ```bash
   ls -la ~/.aurad/
   ```

### Node Not Syncing

**Symptom**: Block height not increasing

**Solutions**:

1. Check peer connections:
   ```bash
   curl localhost:26657/net_info | jq '.result.n_peers'
   ```

2. Add more peers to `config.toml`

3. Check firewall:
   ```bash
   sudo ufw status
   ```

4. Try state sync for faster catch-up

### Out of Memory

**Symptom**: Node killed by OOM killer

**Solutions**:

1. Add swap:
   ```bash
   sudo fallocate -l 4G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

2. Increase pruning:
   ```toml
   # In app.toml
   pruning = "everything"
   ```

3. Reduce mempool size:
   ```toml
   # In config.toml
   [mempool]
   size = 1000
   ```

### Disk Full

**Symptom**: Write errors in logs

**Solutions**:

1. Check disk usage:
   ```bash
   df -h
   du -sh ~/.aurad/*
   ```

2. Enable pruning

3. Compact database:
   ```bash
   aurad tendermint compact-db
   ```

## Validator Issues

### Validator Jailed

**Symptom**: Validator not in active set, status shows jailed

**Cause**: Missed too many blocks or double-signed

**Solution**:

1. Check signing info:
   ```bash
   aurad query slashing signing-info $(aurad tendermint show-validator)
   ```

2. Wait for jail period to expire

3. Unjail:
   ```bash
   aurad tx slashing unjail --from validator-key --chain-id aura-mvp-1
   ```

### Missing Blocks

**Symptom**: Validator missing pre-commits

**Solutions**:

1. Check system time:
   ```bash
   timedatectl status
   ```

2. Sync time:
   ```bash
   sudo timedatectl set-ntp true
   ```

3. Check network latency to peers

4. Ensure adequate resources

### Double Signing

**Warning**: Double signing results in permanent slashing

**Prevention**:

1. Never run two validators with the same key
2. Use a sentry node architecture
3. Backup `priv_validator_state.json` carefully

## Transaction Issues

### Transaction Not Included

**Symptom**: Transaction pending but not confirmed

**Solutions**:

1. Check gas:
   ```bash
   aurad tx bank send ... --gas auto --gas-adjustment 1.5
   ```

2. Increase fees:
   ```bash
   --gas-prices 0.05uaura
   ```

3. Check account sequence:
   ```bash
   aurad query account <address>
   ```

### Sequence Mismatch

**Symptom**: "account sequence mismatch" error

**Solution**:

Wait for pending transactions to confirm, or specify sequence:
```bash
--sequence <correct_sequence>
```

## Network Issues

### Can't Connect to Peers

**Solutions**:

1. Check firewall allows P2P port (26656)

2. Verify persistent_peers format:
   ```
   node_id@ip:port
   ```

3. Try seeds instead of persistent_peers

### Connection Refused to RPC

**Symptom**: `curl: (7) Failed to connect`

**Solutions**:

1. Check RPC is bound correctly:
   ```toml
   [rpc]
   laddr = "tcp://0.0.0.0:26657"
   ```

2. Check firewall

3. Verify node is running

## Database Issues

### Corrupted Database

**Symptom**: Panic on startup, database errors

**Solutions**:

1. Try unsafe reset:
   ```bash
   aurad tendermint unsafe-reset-all
   ```

2. Restore from backup

3. Use state sync to resync

### WAL Errors

**Symptom**: WAL-related errors in logs

**Solution**:

```bash
aurad tendermint unsafe-reset-all --keep-addr-book
```

## Getting Help

If you can't resolve an issue:

1. Check [GitHub Issues](https://github.com/aura-blockchain/aura/issues)
2. Search existing discussions
3. Open a new issue with:
   - Node version (`aurad version`)
   - Full error logs
   - Steps to reproduce
   - System specs
