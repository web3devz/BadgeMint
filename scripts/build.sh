#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "🛠️  Building BadgeMint"
sui move build --path contracts "$@"
