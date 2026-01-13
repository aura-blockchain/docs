# Contributing to AURA Documentation

Thank you for your interest in improving AURA documentation!

## Quick Edits

For small fixes (typos, clarifications):

1. Fork this repository
2. Edit the markdown file directly on GitHub
3. Submit a pull request

## Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/docs.git
cd docs

# Install dependencies
pip install mkdocs-material pymdown-extensions

# Start local server
mkdocs serve
```

Visit http://localhost:8000 to preview changes.

## Adding New Pages

1. Create a `.md` file in the appropriate `docs/` subdirectory
2. Add an entry to `mkdocs.yml` in the `nav` section
3. Submit a pull request

## Style Guide

- Use clear, concise language
- Include code examples where helpful
- Keep commands copy-paste ready
- Test all code snippets before submitting

## Documentation Structure

```
docs/
├── getting-started/   # Installation, quickstart
├── mvp/               # MVP testnet docs
├── operations/        # Node operator guides
├── api/               # API reference
└── security/          # Security policies
```

## Questions?

- Open an issue for documentation requests
- Join our [Discord](https://discord.gg/RwQ8pma6) for discussion
