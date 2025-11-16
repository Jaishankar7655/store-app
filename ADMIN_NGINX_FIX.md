# Admin Panel Nginx Configuration - Complete Fix

## समस्या
Admin panel का nginx configuration सही तरह से configure नहीं था, इसलिए 500 error आ रहा था।

## Fix किया गया

### 1. admin-panel/nginx.conf ✅
- `/admin` path को properly handle करने के लिए `alias` use किया
- `/admin/assets/` location add किया assets के लिए
- Proper MIME types add किए

### 2. Main nginx (nginx/conf.d/default.conf) ✅
- पहले से properly configured है

## अब क्या करना है

### Step 1: Admin Panel Rebuild करें

**Server पर ये commands चलाएं:**

```bash
# Containers बंद करें
docker compose down

# Admin panel rebuild करें (2-3 मिनट)
docker compose build --no-cache admin-panel

# Containers start करें
docker compose up -d

# Nginx restart करें
docker compose restart nginx
```

### Step 2: Verify

Build logs में check करें:
```bash
docker compose logs admin-panel | grep "Building with VITE_API_URL"
```

Should show: `Building with VITE_API_URL=http://135.13.9.61:8000/api`

### Step 3: Browser Cache Clear करें

- `Ctrl+Shift+R` (hard refresh)
- या Incognito mode use करें

### Step 4: Test करें

`http://135.13.9.61/admin` खोलें - अब 500 error नहीं आना चाहिए!

## क्या Fix हुआ?

1. **admin-panel/nginx.conf**:
   - `/admin` location properly configured with `alias`
   - `/admin/assets/` location add किया
   - Proper MIME types add किए

2. **Vite Build Structure**:
   - `base: '/admin/'` के साथ build करता है
   - Files `/admin/` folder में create होती हैं
   - Nginx अब इन files को properly serve करेगा

## Important

**Rebuild करना बहुत जरूरी है!** बिना rebuild के nginx configuration changes काम नहीं करेंगे क्योंकि:
- Container में पुराना nginx.conf file है
- Files `/admin/` folder में नहीं हैं (पुराना build)

Rebuild के बाद सब ठीक हो जाएगा!

