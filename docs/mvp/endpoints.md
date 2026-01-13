# Testnet Endpoints

Public endpoints for the AURA MVP testnet.

## Public Endpoints

| Service | URL |
|---------|-----|
| RPC | `https://testnet-rpc.aurablockchain.org` |
| REST API | `https://testnet-api.aurablockchain.org` |
| gRPC | `testnet-grpc.aurablockchain.org:443` |
| WebSocket | `wss://testnet-ws.aurablockchain.org/websocket` |
| Explorer | `https://testnet-explorer.aurablockchain.org` |
| Faucet | `https://testnet-faucet.aurablockchain.org` |

## RPC Endpoints

### Status
```bash
curl https://testnet-rpc.aurablockchain.org/status
```

### Latest Block
```bash
curl https://testnet-rpc.aurablockchain.org/block
```

### Validators
```bash
curl https://testnet-rpc.aurablockchain.org/validators
```

### Network Info
```bash
curl https://testnet-rpc.aurablockchain.org/net_info
```

## REST API Endpoints

### Node Info
```bash
curl https://testnet-api.aurablockchain.org/cosmos/base/tendermint/v1beta1/node_info
```

### Latest Block
```bash
curl https://testnet-api.aurablockchain.org/cosmos/base/tendermint/v1beta1/blocks/latest
```

### Account Balance
```bash
curl https://testnet-api.aurablockchain.org/cosmos/bank/v1beta1/balances/{address}
```

### Validators
```bash
curl https://testnet-api.aurablockchain.org/cosmos/staking/v1beta1/validators
```

## gRPC

Connect via gRPC for efficient queries:

```bash
grpcurl -plaintext testnet-grpc.aurablockchain.org:443 list
```

## WebSocket

Subscribe to events:

```javascript
const ws = new WebSocket('wss://testnet-ws.aurablockchain.org/websocket');
ws.send(JSON.stringify({
  jsonrpc: '2.0',
  method: 'subscribe',
  params: ["tm.event='NewBlock'"],
  id: 1
}));
```

## Rate Limits

Public endpoints have rate limits to ensure fair usage:

| Endpoint | Limit |
|----------|-------|
| RPC | 100 req/min |
| REST API | 100 req/min |
| gRPC | 100 req/min |
| WebSocket | 10 connections |

For higher limits, please contact the team.

## Sentry Nodes

The MVP testnet uses **sentry node architecture**. Connect to these public sentry nodes:

| Sentry | Address | Node ID |
|--------|---------|---------|
| sentry-1 | 158.69.119.76:26681 | f5ce5e5ce5dd77bdbfd636fb8148756f6df9c531 |
| sentry-2 | 139.99.149.160:26681 | 35fdadb8b017fc95023a384c7769b946f363294e |

Add to your `config.toml`:

```bash
PEERS="f5ce5e5ce5dd77bdbfd636fb8148756f6df9c531@158.69.119.76:26681,35fdadb8b017fc95023a384c7769b946f363294e@139.99.149.160:26681"
sed -i "s/^persistent_peers = .*/persistent_peers = \"$PEERS\"/" ~/.aura/config/config.toml
```

Get network info from [R2 artifacts](https://artifacts.aurablockchain.org/mvp/network-info.json).
