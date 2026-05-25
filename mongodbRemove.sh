#!/bin/bash

echo "Removing GPG "
sudo rm -rf /usr/share/keyrings/mongodb-server-7.0.gpg

echo "Removing a repository "
sudo rm -rf /etc/apt/sources.list.d/mongodb-org-7.0.list

echo "Stopping MongoDB service"
sudo systemctl stop mongod 2>/dev/null

echo "Removing MongoDB packages"
sudo apt purge -y mongodb-org*
sudo apt purge -y mongodb-mongosh

echo "Removing data & logs"
sudo rm -rf /var/lib/mongodb
sudo rm -rf /var/log/mongodb

echo "Removing config files"
sudo rm -rf /etc/mongod.conf
sudo rm -rf /etc/systemd/system/mongod.service
sudo rm -rf /lib/systemd/system/mongod.service
sudo rm -rf /usr/lib/systemd/system/mongod.service
sudo rm -rf /tmp/mongodb-27017.sock

echo "Reloading systemd"
sudo systemctl daemon-reload

echo "Removing mongodb user"
sudo userdel -r mongodb 2>/dev/null

echo "Cleaning apt"
sudo apt autoremove -y
sudo apt clean

echo "Updating system"
sudo apt update

echo "Check mongod:"
which mongod

echo "Check mongosh:"
which mongosh

echo "Done ✅"
