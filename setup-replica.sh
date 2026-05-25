#!/bin/bash

echo "🚀 MongoDB Replica Set Setup Starting..."

# ==============================

# VARIABLES

# ==============================

BASE_DIR="/data/mongodb"
LOG_DIR="/var/log/mongodb"
CONFIG_DIR="/etc/mongodb-rs"
REPLICA_NAME="rs0"

PORTS=(27018 27019)

# ==============================

# INSTALL MONGODB (if not exists)

# ==============================

if ! command -v mongod &> /dev/null
then
echo "📦 Installing MongoDB..."

```
sudo apt update

curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] \
https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt update
sudo apt install -y mongodb-org
```

fi

# ==============================

# CREATE DIRECTORIES

# ==============================

echo "📁 Creating directories..."

sudo mkdir -p $BASE_DIR/rs1 $BASE_DIR/rs2 $BASE_DIR/rs3
sudo mkdir -p $LOG_DIR
sudo mkdir -p $CONFIG_DIR

sudo chown -R $USER:$USER $BASE_DIR
sudo chown -R $USER:$USER $LOG_DIR
sudo chown -R $USER:$USER $CONFIG_DIR

# ==============================

# CLEAN OLD SOCKETS

# ==============================

echo "🧹 Cleaning old sockets..."
sudo rm -f /tmp/mongodb-*.sock

# ==============================

# CREATE CONFIG FILES (FIXED ✅)

# ==============================

echo "⚙️ Creating config files..."

for i in 1 2 3
do
PORT=${PORTS[$((i-1))]}

cat <<EOF > $CONFIG_DIR/mongod-rs$i.conf
systemLog:
destination: file
path: $LOG_DIR/rs$i.log
logAppend: true

storage:
dbPath: $BASE_DIR/rs$i

net:
bindIp: 127.0.0.1
port: $PORT

replication:
replSetName: $REPLICA_NAME

processManagement:
fork: true
EOF

done

# ==============================

# STOP OLD MONGODB (if running)

# ==============================

echo "🛑 Stopping old MongoDB processes..."
pkill mongod || true

sleep 2

# ==============================

# START NODES

# ==============================

echo "▶️ Starting MongoDB nodes..."

mongod --config $CONFIG_DIR/mongod-rs2.conf
mongod --config $CONFIG_DIR/mongod-rs3.conf

sleep 5

# ==============================

# INIT REPLICA SET

# ==============================

echo "🔗 Initializing Replica Set..."

mongosh --port 27017 <<EOF
try {
rs.initiate({
_id: "$REPLICA_NAME",
members: [
{ _id: 0, host: "127.0.0.1:27017" },
{ _id: 1, host: "127.0.0.1:27018" },
{ _id: 2, host: "127.0.0.1:27019" }
]
});
} catch (e) {
print("Replica set may already be initialized");
}
EOF

echo "✅ Replica Set Setup Complete!"

echo "📊 Check status:"
echo "mongosh --port 27017 --eval 'rs.status()'"
