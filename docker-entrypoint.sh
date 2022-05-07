#!/bin/sh

if [ ! -d node_modules/ ]; then
  echo "Packages installing..."
  npm install
else
  echo "=) Packages already!"
fi

exec "$@"