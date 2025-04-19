#!/usr/bin/env bash
set -e

HOST_IP=${REACT_NATIVE_PACKAGER_HOSTNAME:-127.0.0.1}

export REACT_NATIVE_PACKAGER_HOSTNAME=$HOST_IP

exec npx expo start --lan

