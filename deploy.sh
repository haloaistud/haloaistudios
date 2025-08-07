#!/bin/bash

# HaloAI Studios Hub Deployment Script
# This script builds and deploys the entire application

set -e  # Exit on any error

echo "🚀 HaloAI Studios Hub - Deployment Script"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js version: $(node --version)"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "npm version: $(npm --version)"
}

# Install frontend dependencies
install_frontend() {
    print_status "Installing frontend dependencies..."
    cd frontend
    
    if [ ! -d "node_modules" ]; then
        npm install
        print_success "Frontend dependencies installed"
    else
        print_warning "Frontend dependencies already installed, skipping..."
    fi
    
    cd ..
}

# Install backend dependencies
install_backend() {
    print_status "Installing backend dependencies..."
    cd backend
    
    if [ ! -d "node_modules" ]; then
        npm install
        print_success "Backend dependencies installed"
    else
        print_warning "Backend dependencies already installed, skipping..."
    fi
    
    cd ..
}

# Run frontend tests
test_frontend() {
    print_status "Running frontend tests..."
    cd frontend
    
    if npm test -- --watchAll=false --passWithNoTests; then
        print_success "Frontend tests passed"
    else
        print_error "Frontend tests failed"
        exit 1
    fi
    
    cd ..
}

# Run backend tests
test_backend() {
    print_status "Running backend tests..."
    cd backend
    
    if npm test; then
        print_success "Backend tests passed"
    else
        print_error "Backend tests failed"
        exit 1
    fi
    
    cd ..
}

# Build frontend
build_frontend() {
    print_status "Building frontend for production..."
    cd frontend
    
    if npm run build; then
        print_success "Frontend built successfully"
        print_status "Build output: frontend/build/"
    else
        print_error "Frontend build failed"
        exit 1
    fi
    
    cd ..
}

# Start backend server
start_backend() {
    print_status "Starting backend server..."
    cd backend
    
    # Check if backend is already running
    if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
        print_warning "Backend is already running on port 5000"
    else
        print_status "Starting backend server on port 5000..."
        npm start &
        BACKEND_PID=$!
        
        # Wait for backend to start
        sleep 5
        
        if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
            print_success "Backend server started successfully"
        else
            print_error "Backend server failed to start"
            exit 1
        fi
    fi
    
    cd ..
}

# Start frontend development server
start_frontend() {
    print_status "Starting frontend development server..."
    cd frontend
    
    print_status "Frontend will be available at: http://localhost:3000"
    print_status "Backend API will be available at: http://localhost:5000"
    print_status "Press Ctrl+C to stop both servers"
    
    npm start
}

# Deploy to production
deploy_production() {
    print_status "Deploying to production..."
    
    # Build frontend
    build_frontend
    
    # Create deployment directory
    DEPLOY_DIR="deployment-$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$DEPLOY_DIR"
    
    # Copy backend
    cp -r backend "$DEPLOY_DIR/"
    
    # Copy frontend build
    cp -r frontend/build "$DEPLOY_DIR/frontend-public"
    
    # Create deployment package
    tar -czf "$DEPLOY_DIR.tar.gz" "$DEPLOY_DIR"
    
    print_success "Deployment package created: $DEPLOY_DIR.tar.gz"
    print_status "Contents:"
    print_status "  - Backend: $DEPLOY_DIR/backend/"
    print_status "  - Frontend: $DEPLOY_DIR/frontend-public/"
    
    # Cleanup
    rm -rf "$DEPLOY_DIR"
}

# Show usage
show_usage() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  install     Install all dependencies"
    echo "  test        Run all tests"
    echo "  build       Build frontend for production"
    echo "  start       Start development servers"
    echo "  deploy      Create production deployment package"
    echo "  all         Run install, test, build, and start"
    echo ""
    echo "Examples:"
    echo "  $0 install"
    echo "  $0 test"
    echo "  $0 start"
    echo "  $0 deploy"
}

# Main script
main() {
    case "${1:-all}" in
        "install")
            check_node
            check_npm
            install_frontend
            install_backend
            print_success "Installation completed successfully!"
            ;;
        "test")
            test_frontend
            test_backend
            print_success "All tests passed!"
            ;;
        "build")
            build_frontend
            print_success "Build completed successfully!"
            ;;
        "start")
            start_backend
            start_frontend
            ;;
        "deploy")
            check_node
            check_npm
            install_frontend
            install_backend
            test_frontend
            test_backend
            deploy_production
            print_success "Deployment completed successfully!"
            ;;
        "all")
            check_node
            check_npm
            install_frontend
            install_backend
            test_frontend
            test_backend
            build_frontend
            start_backend
            start_frontend
            ;;
        *)
            show_usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"