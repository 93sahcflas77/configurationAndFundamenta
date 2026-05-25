#!/bin/bash

set -e  # Exit on error

echo "🚀 Step 1: Import MongoDB GPG key"
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo "📦 Step 2: Add MongoDB repository"
echo "deb [ arch=amd64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list > /dev/null

echo "🔄 Step 3: Update package list"
sudo apt update

echo "⬇️ Step 4: Install MongoDB"
sudo apt install -y mongodb-org

echo "▶️ Step 5: Start MongoDB service"
sudo systemctl start mongod

echo "🔁 Step 6: Enable MongoDB on boot"
sudo systemctl enable mongod

echo "📊 Step 7: Check MongoDB status"
sudo systemctl status mongod --no-pager

echo "🔍 Step 8: Check MongoDB version"
mongod --version

echo "🧪 Step 9: Test Mongo Shell"
mongosh --eval 'db.runCommand({ connectionStatus: 1 })'

echo "✅ MongoDB installation completed successfully!"
