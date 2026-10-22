#!/usr/bin/env bash

set -e
source "$HOME/.nvm/nvm.sh"
nvm use --silent default
exec yarn "$@"
