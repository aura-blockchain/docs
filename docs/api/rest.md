---
sidebar_position: 1
---

# REST API

The AURA REST API provides HTTP endpoints for querying blockchain state.

## Base URL

```
https://testnet-api.aurablockchain.org
```

## Authentication

No authentication required for read operations.

## Endpoints

### Node Info

```http
GET /cosmos/base/tendermint/v1beta1/node_info
```

**Response**:
```json
{
  "default_node_info": {
    "network": "aura-mvp-1",
    "version": "0.38.0"
  },
  "application_version": {
    "name": "aura",
    "version": "1.0.0-mvp"
  }
}
```

### Latest Block

```http
GET /cosmos/base/tendermint/v1beta1/blocks/latest
```

### Block by Height

```http
GET /cosmos/base/tendermint/v1beta1/blocks/{height}
```

### Account Balance

```http
GET /cosmos/bank/v1beta1/balances/{address}
```

**Response**:
```json
{
  "balances": [
    {
      "denom": "uaura",
      "amount": "1000000000"
    }
  ]
}
```

### All Balances (Paginated)

```http
GET /cosmos/bank/v1beta1/balances/{address}?pagination.limit=100
```

### Validators

```http
GET /cosmos/staking/v1beta1/validators
```

**Query Parameters**:

| Parameter | Description |
|-----------|-------------|
| `status` | Filter by status: `BOND_STATUS_BONDED`, `BOND_STATUS_UNBONDED` |
| `pagination.limit` | Number of results |
| `pagination.offset` | Offset for pagination |

### Single Validator

```http
GET /cosmos/staking/v1beta1/validators/{validator_addr}
```

### Delegations

```http
GET /cosmos/staking/v1beta1/delegations/{delegator_addr}
```

### Governance Proposals

```http
GET /cosmos/gov/v1beta1/proposals
```

### Single Proposal

```http
GET /cosmos/gov/v1beta1/proposals/{proposal_id}
```

### Transaction by Hash

```http
GET /cosmos/tx/v1beta1/txs/{hash}
```

### Search Transactions

```http
GET /cosmos/tx/v1beta1/txs?events={event}
```

**Example**:
```bash
curl "https://testnet-api.aurablockchain.org/cosmos/tx/v1beta1/txs?events=transfer.recipient='aura1...'"
```

## AURA-Specific Endpoints

### Identity

```http
GET /aura/identity/v1/did/{did}
```

### Credentials

```http
GET /aura/vcregistry/v1/credential/{id}
```

### Data Registry

```http
GET /aura/dataregistry/v1/item/{id}
```

## Broadcasting Transactions

### Simulate

```http
POST /cosmos/tx/v1beta1/simulate
Content-Type: application/json

{
  "tx_bytes": "base64_encoded_tx"
}
```

### Broadcast

```http
POST /cosmos/tx/v1beta1/txs
Content-Type: application/json

{
  "tx_bytes": "base64_encoded_tx",
  "mode": "BROADCAST_MODE_SYNC"
}
```

**Modes**:

| Mode | Description |
|------|-------------|
| `BROADCAST_MODE_SYNC` | Wait for CheckTx |
| `BROADCAST_MODE_ASYNC` | Return immediately |
| `BROADCAST_MODE_BLOCK` | Wait for block inclusion |

## Error Responses

```json
{
  "code": 5,
  "message": "not found",
  "details": []
}
```

| Code | Description |
|------|-------------|
| 2 | Unknown error |
| 3 | Invalid argument |
| 5 | Not found |
| 11 | Out of range |

## Rate Limiting

- 100 requests per minute per IP
- 429 status code when exceeded

## SDK Examples

### JavaScript

```javascript
const response = await fetch(
  'https://testnet-api.aurablockchain.org/cosmos/bank/v1beta1/balances/aura1...'
);
const data = await response.json();
console.log(data.balances);
```

### Python

```python
import requests

response = requests.get(
    'https://testnet-api.aurablockchain.org/cosmos/bank/v1beta1/balances/aura1...'
)
print(response.json()['balances'])
```

### curl

```bash
curl -s https://testnet-api.aurablockchain.org/cosmos/bank/v1beta1/balances/aura1... | jq
```
