#!/bin/bash

# Script to verify the frontend build has the correct API URL

echo "🔍 Verifying Frontend Build..."
echo ""

# Check if containers are running
if ! docker-compose ps | grep -q "customer-frontend.*Up"; then
    echo "❌ Customer frontend container is not running!"
    echo "   Run: docker-compose up -d"
    exit 1
fi

echo "✅ Containers are running"
echo ""

# Check if the built bundle contains the public IP
echo "🔍 Checking if built bundle contains public IP (135.13.9.61)..."
if docker-compose exec -T customer-frontend grep -r "135.13.9.61" /usr/share/nginx/html/assets/ 2>/dev/null | head -1 > /dev/null; then
    echo "✅ Found public IP in built bundle!"
    docker-compose exec -T customer-frontend grep -r "135.13.9.61" /usr/share/nginx/html/assets/ 2>/dev/null | head -1
else
    echo "❌ Public IP NOT found in built bundle!"
    echo "   The bundle still contains localhost. You need to rebuild:"
    echo "   docker-compose build --no-cache customer-frontend"
    exit 1
fi

echo ""

# Check if localhost is still in the bundle
echo "🔍 Checking if localhost:8000 is still in bundle..."
if docker-compose exec -T customer-frontend grep -r "localhost:8000" /usr/share/nginx/html/assets/ 2>/dev/null | head -1 > /dev/null; then
    echo "⚠️  WARNING: localhost:8000 still found in bundle!"
    echo "   This might cause issues. Rebuild with:"
    echo "   docker-compose build --no-cache customer-frontend"
    docker-compose exec -T customer-frontend grep -r "localhost:8000" /usr/share/nginx/html/assets/ 2>/dev/null | head -1
else
    echo "✅ No localhost:8000 found in bundle (good!)"
fi

echo ""
echo "🔍 Testing backend accessibility..."
if curl -s -f http://135.13.9.61:8000/api/products/products/ > /dev/null; then
    echo "✅ Backend is accessible at http://135.13.9.61:8000"
else
    echo "❌ Backend is NOT accessible at http://135.13.9.61:8000"
    echo "   Check firewall rules and backend logs"
fi

echo ""
echo "✅ Verification complete!"

