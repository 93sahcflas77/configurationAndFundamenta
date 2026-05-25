#!/bin/bash

# ==============================
# CONFIG
# ==============================
REPO_URL="https://github.com/93sahcflas77/advanced-git-hooks-workflow.git"
PROJECT_DIR="backend"
LOG_FILE="setup.log"

# ==============================
# UTILS
# ==============================

log() {
  echo "[INFO] $1"
  echo "[INFO] $1" >> $LOG_FILE
}

error() {
  echo "[ERROR] $1"
  echo "[ERROR] $1" >> $LOG_FILE
  exit 1
}

check_command() {
  command -v $1 >/dev/null 2>&1 || error "$1 is not installed. Please install it first."
}

# ==============================
# PRE-CHECKS
# ==============================

log "Checking required tools..."

check_command git
check_command npm
check_command node

# Optional: VS Code
if ! command -v code >/dev/null 2>&1; then
  log "VS Code CLI not found (optional). Skipping..."
fi

# ==============================
# CLONE REPO
# ==============================

if [ -d "$PROJECT_DIR" ]; then
  log "Directory already exists: $PROJECT_DIR"
else
  log "Cloning repository..."
  git clone "$REPO_URL" "$PROJECT_DIR" || error "Git clone failed"
fi

cd "$PROJECT_DIR" || error "Failed to enter directory"

# ==============================
# OPEN IN VS CODE (optional)
# ==============================

if command -v code >/dev/null 2>&1; then
  log "Opening project in VS Code..."
  code .
fi

# ==============================
# FETCH ALL BRANCHES
# ==============================

log "Fetching all remote branches..."
git fetch --all

# ==============================
# CREATE LOCAL BRANCHES
# ==============================

create_branch() {
  BRANCH=$1

  if git show-ref --verify --quiet refs/heads/$BRANCH; then
    log "Branch already exists: $BRANCH"
  else
    log "Creating branch: $BRANCH"
    git checkout -b "$BRANCH" "origin/$BRANCH" || error "Failed to create $BRANCH"
  fi
}

create_branch "template/modular-monolithic"
create_branch "template/monolithic-modular-swagger-structure"
create_branch "template/monolithic-architecture-api-versioning"
create_branch "template/monolithic-architecture"
create_branch "bff-server"

# ==============================
# SWITCH TO MAIN WORKING BRANCH
# ==============================

log "Switching to template/monolithic-architecture..."
git checkout template/monolithic-architecture || error "Checkout failed"

# ==============================
# INSTALL DEPENDENCIES
# ==============================

log "Installing npm dependencies..."
npm install || error "npm install failed"

# ==============================
# DONE
# ==============================

# ==============================
# RUN DEV SERVER (FOREGROUND)
# ==============================

log "Starting development server (foreground mode)..."

# Check if script exists
if npm run | grep -q "dev"; then
  log "Running npm run dev..."

  npm run dev

else
  error "'npm run dev' script not found in package.json"
fi


log "Setup completed successfully 🚀"
