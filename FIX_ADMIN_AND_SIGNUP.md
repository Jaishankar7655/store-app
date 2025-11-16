# Fix Admin Panel UI and Signup Issues

## Issues Fixed

### 1. Admin Panel UI Not Showing
**Problem**: Admin panel assets (CSS/JS) weren't loading when accessed at `/admin`

**Solution**: 
- Added `base: '/admin/'` to `vite.config.js` so Vite builds with the correct base path
- Added `basename="/admin"` to React Router in `App.jsx`
- Updated nginx configuration to properly proxy `/admin` requests

### 2. Signup Not Working
**Problem**: Frontend still using `localhost:8000` instead of public IP

**Solution**: Frontend containers need to be rebuilt with the correct API URL

## Steps to Fix

### Step 1: Rebuild All Frontend Containers

**Run this on your server:**

```bash
# Stop containers
docker-compose down

# Rebuild both frontend containers (takes 3-5 minutes)
docker-compose build --no-cache admin-panel customer-frontend

# Start all services
docker-compose up -d

# Verify the builds
docker-compose logs admin-panel | grep "Building with VITE_API_URL"
docker-compose logs customer-frontend | grep "Building with VITE_API_URL"
```

You should see:
- `Building with VITE_API_URL=http://135.13.9.61:8000/api`

### Step 2: Restart Nginx

Since we updated the nginx configuration:

```bash
docker-compose restart nginx
```

### Step 3: Clear Browser Cache

**IMPORTANT**: Clear your browser cache or use Incognito mode:

1. **Hard Refresh**: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. **Or Incognito Mode**: Open in private/incognito window
3. **Or Clear Cache**: `Ctrl+Shift+Delete` → Clear cached images and files

### Step 4: Test

1. **Admin Panel**: 
   - Go to `http://135.13.9.61/admin`
   - Should show login page with proper styling
   - Login with store manager credentials

2. **Customer Signup**:
   - Go to `http://135.13.9.61/register`
   - Open Developer Tools (F12) → Network tab
   - Try to register
   - Check request URL - should be `http://135.13.9.61:8000/api/auth/register/`

## What Changed

### Admin Panel (`admin-panel/`)
1. **vite.config.js**: Added `base: '/admin/'` for correct asset paths
2. **src/App.jsx**: Added `basename="/admin"` to Router
3. **nginx/conf.d/default.conf**: Simplified admin panel proxy configuration

### Customer Frontend
- Already has correct API URL fallback (`135.13.9.61:8000`)
- Just needs rebuild to include the changes

## Verify It's Working

### Check Admin Panel:
```bash
# Check if admin panel container is running
docker-compose ps admin-panel

# Check admin panel logs
docker-compose logs admin-panel --tail=20

# Test admin panel directly
curl http://135.13.9.61/admin
```

### Check Customer Frontend:
```bash
# Check if customer frontend container is running
docker-compose ps customer-frontend

# Check customer frontend logs
docker-compose logs customer-frontend --tail=20

# Test customer frontend directly
curl http://135.13.9.61/
```

## Troubleshooting

### Admin Panel Still Not Showing UI

1. **Check if assets are loading**:
   - Open `http://135.13.9.61/admin` in browser
   - Open Developer Tools (F12) → Network tab
   - Look for 404 errors on CSS/JS files
   - They should load from `/admin/assets/...`

2. **Verify the build**:
   ```bash
   docker-compose exec admin-panel ls -la /usr/share/nginx/html/
   docker-compose exec admin-panel cat /usr/share/nginx/html/index.html | grep "admin"
   ```

3. **Check nginx routing**:
   ```bash
   docker-compose logs nginx | grep admin
   ```

### Signup Still Not Working

1. **Check if backend is accessible**:
   ```bash
   curl http://135.13.9.61:8000/api/products/products/
   ```

2. **Check browser console**:
   - Open Developer Tools (F12) → Console tab
   - Look for errors
   - Check Network tab for failed requests

3. **Verify API URL in bundle**:
   ```bash
   docker-compose exec customer-frontend grep -r "135.13.9.61" /usr/share/nginx/html/assets/ | head -1
   ```

## One-Line Fix

```bash
docker-compose down && docker-compose build --no-cache admin-panel customer-frontend && docker-compose up -d && docker-compose restart nginx
```

Then clear your browser cache and test!

