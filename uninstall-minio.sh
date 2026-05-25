#!/bin/bash

set -e

echo "🧨 Uninstalling MinIO..."

# -----------------------------

# VARIABLES (MATCH INSTALL)

# -----------------------------

MINIO_USER="minio-user"
MINIO_GROUP="minio-user"
MINIO_DATA_DIR="/mnt/minio-data"
MINIO_INSTALL_PATH="/usr/local/bin/minio"
MINIO_SERVICE_FILE="/etc/systemd/system/minio.service"
MINIO_ENV_FILE="/etc/default/minio"

# -----------------------------

# STOP & DISABLE SERVICE

# -----------------------------

echo "🛑 Stopping MinIO service..."
sudo systemctl stop minio || true
sudo systemctl disable minio || true

# -----------------------------

# REMOVE SYSTEMD SERVICE

# -----------------------------

echo "🧹 Removing service file..."
sudo rm -f $MINIO_SERVICE_FILE

# Reload systemd

sudo systemctl daemon-reload

# -----------------------------

# REMOVE ENV FILE

# -----------------------------

echo "🧹 Removing environment file..."
sudo rm -f $MINIO_ENV_FILE

# -----------------------------

# REMOVE BINARY

# -----------------------------

echo "🧹 Removing MinIO binary..."
sudo rm -f $MINIO_INSTALL_PATH

# -----------------------------

# REMOVE DATA DIRECTORY

# -----------------------------

echo "⚠️ Removing data directory..."
sudo rm -rf $MINIO_DATA_DIR

# -----------------------------

# REMOVE USER & GROUP

# -----------------------------

echo "👤 Removing user and group..."
sudo userdel $MINIO_USER || true
sudo groupdel $MINIO_GROUP || true

# -----------------------------

# OPTIONAL: REMOVE LOGS

# -----------------------------

echo "🧾 Removing logs..."
sudo journalctl --rotate
sudo journalctl --vacuum-time=1s

# -----------------------------

# DONE

# -----------------------------

echo ""
echo "✅ MinIO fully removed from system!"


