#!/bin/bash

set -e

echo "🚀 Installing MinIO..."

# -----------------------------

# VARIABLES (EDIT IF NEEDED)

# -----------------------------

MINIO_USER="minio-user"
MINIO_GROUP="minio-user"
MINIO_DATA_DIR="/mnt/minio-data"
MINIO_INSTALL_PATH="/usr/local/bin/minio"
MINIO_SERVICE_FILE="/etc/systemd/system/minio.service"

MINIO_ROOT_USER="admin"
MINIO_ROOT_PASSWORD="StrongPassword@123"

# -----------------------------

# CREATE USER & GROUP

# -----------------------------

echo "👤 Creating MinIO user..."
sudo useradd -r $MINIO_USER -s /sbin/nologin || true

# -----------------------------

# DOWNLOAD MINIO

# -----------------------------

echo "⬇️ Downloading MinIO..."
wget https://dl.min.io/server/minio/release/linux-amd64/minio

chmod +x minio
sudo mv minio $MINIO_INSTALL_PATH

# -----------------------------

# CREATE DATA DIRECTORY

# -----------------------------

echo "📁 Creating data directory..."
sudo mkdir -p $MINIO_DATA_DIR
sudo chown -R $MINIO_USER:$MINIO_GROUP $MINIO_DATA_DIR

# -----------------------------

# CREATE ENV FILE

# -----------------------------

echo "⚙️ Creating environment file..."
sudo bash -c "cat > /etc/default/minio" <<EOF
MINIO_ROOT_USER=$MINIO_ROOT_USER
MINIO_ROOT_PASSWORD=$MINIO_ROOT_PASSWORD
MINIO_VOLUMES=$MINIO_DATA_DIR
MINIO_OPTS="--console-address :9001"
EOF

# -----------------------------

# CREATE SYSTEMD SERVICE

# -----------------------------

echo "⚙️ Creating systemd service..."
sudo bash -c "cat > $MINIO_SERVICE_FILE" <<EOF
[Unit]
Description=MinIO Object Storage
Documentation=https://min.io/docs/
After=network.target

[Service]
User=$MINIO_USER
Group=$MINIO_GROUP
EnvironmentFile=/etc/default/minio
ExecStart=$MINIO_INSTALL_PATH server $MINIO_VOLUMES $MINIO_OPTS
Restart=always
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF

# -----------------------------

# RELOAD SYSTEMD

# -----------------------------

echo "🔄 Reloading systemd..."
sudo systemctl daemon-reexec
sudo systemctl daemon-reload

# -----------------------------

# ENABLE & START SERVICE

# -----------------------------

echo "▶️ Starting MinIO..."
sudo systemctl enable minio
sudo systemctl start minio

# -----------------------------

# FIREWALL (OPTIONAL)

# -----------------------------

echo "🔥 Opening ports..."
sudo ufw allow 9000 || true
sudo ufw allow 9001 || true

# -----------------------------

# STATUS

# -----------------------------

echo "📊 Checking status..."
sudo systemctl status minio --no-pager

echo ""
echo "✅ MinIO Installed Successfully!"
echo "🌐 API: http://localhost:9000"
echo "🌐 Console: http://localhost:9001"
echo "👤 Username: $MINIO_ROOT_USER"
echo "🔑 Password: $MINIO_ROOT_PASSWORD"

