#!/usr/bin/env bash
set -e

HOST_IP=$(ip route get 1.1.1.1 | awk '{print $7; exit}')

export REACT_NATIVE_PACKAGER_HOSTNAME=$HOST_IP

exec npx expo start
