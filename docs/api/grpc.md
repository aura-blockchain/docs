# gRPC API

AURA provides gRPC endpoints for efficient programmatic access.

## Endpoint

```
testnet-grpc.aurablockchain.org:443
```

## Using grpcurl

### List Services

```bash
grpcurl testnet-grpc.aurablockchain.org:443 list
```

### Describe Service

```bash
grpcurl testnet-grpc.aurablockchain.org:443 describe cosmos.bank.v1beta1.Query
```

### Query Balance

```bash
grpcurl -d '{"address": "aura1..."}' \
  testnet-grpc.aurablockchain.org:443 \
  cosmos.bank.v1beta1.Query/AllBalances
```

### Query Validators

```bash
grpcurl testnet-grpc.aurablockchain.org:443 \
  cosmos.staking.v1beta1.Query/Validators
```

## Available Services

### Cosmos SDK

| Service | Description |
|---------|-------------|
| `cosmos.auth.v1beta1.Query` | Account queries |
| `cosmos.bank.v1beta1.Query` | Balance queries |
| `cosmos.staking.v1beta1.Query` | Staking queries |
| `cosmos.gov.v1beta1.Query` | Governance queries |
| `cosmos.distribution.v1beta1.Query` | Distribution queries |
| `cosmos.slashing.v1beta1.Query` | Slashing queries |
| `cosmos.tx.v1beta1.Service` | Transaction service |

### AURA Modules

| Service | Description |
|---------|-------------|
| `aura.identity.v1.Query` | Identity queries |
| `aura.vcregistry.v1.Query` | Credential queries |
| `aura.dataregistry.v1.Query` | Data registry queries |
| `aura.compliance.v1.Query` | Compliance queries |

## Example Queries

### Get Account

```bash
grpcurl -d '{"address": "aura1..."}' \
  testnet-grpc.aurablockchain.org:443 \
  cosmos.auth.v1beta1.Query/Account
```

### Get Delegation

```bash
grpcurl -d '{"delegator_addr": "aura1...", "validator_addr": "auravaloper1..."}' \
  testnet-grpc.aurablockchain.org:443 \
  cosmos.staking.v1beta1.Query/Delegation
```

### Get Proposal

```bash
grpcurl -d '{"proposal_id": "1"}' \
  testnet-grpc.aurablockchain.org:443 \
  cosmos.gov.v1beta1.Query/Proposal
```

## Client Libraries

### Go

```go
import (
    "google.golang.org/grpc"
    banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
)

conn, _ := grpc.Dial("testnet-grpc.aurablockchain.org:443", grpc.WithInsecure())
client := banktypes.NewQueryClient(conn)

resp, _ := client.AllBalances(context.Background(), &banktypes.QueryAllBalancesRequest{
    Address: "aura1...",
})
```

### JavaScript

```javascript
const { createProtobufRpcClient, QueryClient } = require('@cosmjs/stargate');
const { Tendermint34Client } = require('@cosmjs/tendermint-rpc');

const tmClient = await Tendermint34Client.connect('https://testnet-rpc.aurablockchain.org');
const queryClient = new QueryClient(tmClient);
const rpcClient = createProtobufRpcClient(queryClient);
```

### Python

```python
import grpc
from cosmos.bank.v1beta1 import query_pb2, query_pb2_grpc

channel = grpc.secure_channel('testnet-grpc.aurablockchain.org:443', grpc.ssl_channel_credentials())
stub = query_pb2_grpc.QueryStub(channel)

response = stub.AllBalances(query_pb2.QueryAllBalancesRequest(address='aura1...'))
print(response.balances)
```

## Streaming

gRPC supports streaming for real-time updates:

```bash
# Subscribe to new blocks
grpcurl testnet-grpc.aurablockchain.org:443 \
  cosmos.base.tendermint.v1beta1.Service/GetLatestBlock
```

## Error Codes

| Code | Description |
|------|-------------|
| 0 | OK |
| 1 | Cancelled |
| 2 | Unknown |
| 3 | Invalid argument |
| 5 | Not found |
| 14 | Unavailable |

## Performance Tips

1. **Reuse connections** - gRPC connections are expensive to establish
2. **Use streaming** - For real-time data, use streaming endpoints
3. **Batch requests** - Combine multiple queries when possible
4. **Handle retries** - Implement exponential backoff for failures
