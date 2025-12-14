#!/bin/bash

# TSUK - Setup and Development Helper Script
# This script automates common tasks

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored messages
print_header() {
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BLUE}$1${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

# Show menu
show_menu() {
  echo ""
  echo -e "${BLUE}Available Commands:${NC}"
  echo "  1) Install dependencies (npm install)"
  echo "  2) Start development server (npm run dev)"
  echo "  3) Build for production (npm run build)"
  echo "  4) Setup Prisma (generate + migrate)"
  echo "  5) Seed database with sample data"
  echo "  6) Open Prisma Studio (database GUI)"
  echo "  7) Create .env.local from template"
  echo "  8) Run type checking"
  echo "  9) Clean build files"
  echo "  0) Exit"
  echo ""
}

# Install dependencies
install_deps() {
  print_header "Installing Dependencies"
  if npm install; then
    print_success "Dependencies installed"
  else
    print_error "Failed to install dependencies"
    exit 1
  fi
}

# Start dev server
start_dev() {
  print_header "Starting Development Server"
  print_warning "Press Ctrl+C to stop"
  npm run dev
}

# Build for production
build_prod() {
  print_header "Building for Production"
  if npm run build; then
    print_success "Build completed successfully"
  else
    print_error "Build failed"
    exit 1
  fi
}

# Setup Prisma
setup_prisma() {
  print_header "Setting Up Prisma"
  
  echo "Generating Prisma Client..."
  npx prisma generate
  print_success "Prisma Client generated"
  
  echo ""
  echo "Running database migrations..."
  npx prisma migrate dev --name init
  print_success "Migrations completed"
}

# Seed database
seed_database() {
  print_header "Seeding Database"
  
  if npm run prisma:seed; then
    print_success "Database seeded with sample data"
  else
    print_warning "Seeding completed with warnings"
  fi
}

# Open Prisma Studio
open_studio() {
  print_header "Opening Prisma Studio"
  print_warning "Prisma Studio will open in your browser"
  npx prisma studio
}

# Create .env.local
create_env() {
  print_header "Creating .env.local"
  
  if [ -f .env.local ]; then
    print_warning ".env.local already exists"
    read -p "Do you want to overwrite it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      return
    fi
  fi
  
  if [ ! -f .env.example ]; then
    print_error ".env.example not found"
    return
  fi
  
  cp .env.example .env.local
  print_success ".env.local created"
  print_warning "Please edit .env.local with your configuration"
}

# Type checking
check_types() {
  print_header "Running Type Checking"
  
  if npx tsc --noEmit; then
    print_success "No type errors found"
  else
    print_error "Type errors found"
    exit 1
  fi
}

# Clean build
clean_build() {
  print_header "Cleaning Build Files"
  
  rm -rf .next
  rm -rf out
  rm -rf build
  
  print_success "Build files cleaned"
}

# Main menu loop
main() {
  print_header "TSUK Development Helper"
  
  while true; do
    show_menu
    read -p "Select an option (0-9): " choice
    
    case $choice in
      1) install_deps ;;
      2) start_dev ;;
      3) build_prod ;;
      4) setup_prisma ;;
      5) seed_database ;;
      6) open_studio ;;
      7) create_env ;;
      8) check_types ;;
      9) clean_build ;;
      0) 
        print_success "Goodbye!"
        exit 0
        ;;
      *)
        print_error "Invalid option"
        ;;
    esac
  done
}

# Run main function
main
