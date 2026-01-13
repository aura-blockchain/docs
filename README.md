# AURA Blockchain Documentation

Official documentation for [AURA Blockchain](https://aurablockchain.org) - a credential verification network built on Cosmos SDK.

## View Documentation

**Live Site**: https://docs.aurablockchain.org

## Local Development

### Prerequisites

- Python 3.8+
- pip

### Setup

```bash
# Install dependencies
pip install mkdocs-material pymdown-extensions

# Serve locally
mkdocs serve

# Build static site
mkdocs build
```

Visit http://localhost:8000 to preview.

## Structure

```
docs/
├── getting-started/   # Installation, quickstart guides
├── mvp/               # MVP testnet documentation
├── operations/        # Node operator guides
├── api/               # API reference
└── security/          # Security policies
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md).

### Quick Edits

1. Fork this repository
2. Edit markdown files in `docs/`
3. Submit a pull request

### Adding New Pages

1. Create `.md` file in appropriate directory
2. Add entry to `mkdocs.yml` nav section
3. Submit pull request

## Testnet Information

**Chain ID**: `aura-mvp-1`

**Sentry Nodes** (connect here, not to validators):
```
f5ce5e5ce5dd77bdbfd636fb8148756f6df9c531@158.69.119.76:26681
35fdadb8b017fc95023a384c7769b946f363294e@139.99.149.160:26681
```

**Public Endpoints**:
- RPC: https://testnet-rpc.aurablockchain.org
- REST: https://testnet-api.aurablockchain.org
- Explorer: https://testnet-explorer.aurablockchain.org
- Faucet: https://testnet-faucet.aurablockchain.org

## License

Content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
