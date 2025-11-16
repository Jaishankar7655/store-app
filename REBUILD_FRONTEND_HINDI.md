# Frontend Rebuild करें - localhost की जगह IP Address

## समस्या
Frontend अभी भी `http://localhost:8000/api/auth/register/` को call कर रहा है, IP address `135.13.9.61:8000` नहीं।

## कारण
Frontend containers में पुराना JavaScript bundle है जिसमें `localhost:8000` hardcoded है। Source code update हो गया है, लेकिन containers rebuild नहीं हुए हैं।

## समाधान - Rebuild करें

**Server पर ये commands चलाएं:**

```bash
# Containers बंद करें
docker compose down

# Frontend containers rebuild करें (3-5 मिनट लगेंगे)
docker compose build --no-cache customer-frontend admin-panel

# सभी containers start करें
docker compose up -d
```

## Rebuild के बाद

1. **Browser cache clear करें** (बहुत जरूरी!):
   - `Ctrl+Shift+R` दबाएं (hard refresh), या
   - Incognito/Private mode use करें, या
   - Cache clear करें: `Ctrl+Shift+Delete` → Cached images clear करें

2. **Test करें**:
   - `http://135.13.9.61/register` खोलें
   - Developer Tools (F12) → Network tab खोलें
   - Register करने की कोशिश करें
   - Request URL check करें - यह होना चाहिए: `http://135.13.9.61:8000/api/auth/register/` (localhost नहीं!)

## क्यों जरूरी है?

- Vite JavaScript bundle में API URL **build time** पर embed करता है
- आपके containers पुराने code से build हुए थे
- Source code update से कुछ नहीं होगा जब तक containers rebuild नहीं होते
- Rebuild करने से नया bundle बनेगा जिसमें `135.13.9.61:8000` होगा

## Verify करें

Rebuild के बाद logs में यह दिखना चाहिए:
```
Building with VITE_API_URL=http://135.13.9.61:8000/api
```

## Important

**बिना rebuild के frontend हमेशा `localhost:8000` को call करेगा** क्योंकि वह container के अंदर JavaScript bundle में hardcoded है। Rebuild करना ही solution है!

