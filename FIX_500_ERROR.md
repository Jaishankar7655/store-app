# Fix 500 Internal Server Error - Admin Panel

## समस्या
`http://135.13.9.61/admin` पर 500 Internal Server Error आ रहा है।

## कारण
1. Admin panel container rebuild नहीं हुआ है (base path के साथ)
2. Nginx configuration में proxy_pass issue था

## समाधान

### Step 1: Nginx Configuration Fix ✅
मैंने nginx configuration fix कर दी है। अब आपको admin panel container rebuild करना होगा।

### Step 2: Admin Panel Rebuild करें

**Server पर ये commands चलाएं:**

```bash
# Containers बंद करें
docker compose down

# Admin panel rebuild करें (2-3 मिनट लगेंगे)
docker compose build --no-cache admin-panel

# सभी containers start करें
docker compose up -d

# Nginx restart करें (config changes के लिए)
docker compose restart nginx
```

### Step 3: Test करें

1. **Browser cache clear करें**:
   - `Ctrl+Shift+R` (hard refresh), या
   - Incognito mode use करें

2. **Admin panel खोलें**:
   - `http://135.13.9.61/admin`
   - Login page दिखना चाहिए (500 error नहीं)

## क्या Fix हुआ?

1. **nginx/conf.d/default.conf**: proxy_pass को fix किया - अब `/admin` requests सही तरह से admin-panel container को जाएंगी
2. **admin-panel/nginx.conf**: `/admin` path handle करने के लिए configure किया

## Important

**Admin panel container rebuild करना बहुत जरूरी है** क्योंकि:
- Vite `base: '/admin/'` के साथ build करता है
- Files `/admin/` folder में create होती हैं
- पुराना container में यह structure नहीं है

Rebuild के बाद 500 error fix हो जाएगा!

