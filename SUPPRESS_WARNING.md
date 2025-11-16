# Suppress pkg_resources Deprecation Warning

## The Warning

You're seeing this warning:
```
UserWarning: pkg_resources is deprecated as an API. 
The pkg_resources package is slated for removal as early as 2025-11-30. 
Refrain from using this package or pin to Setuptools<81.
```

## What It Means

- **This is just a warning, not an error** - your application is working fine
- The warning comes from `rest_framework_simplejwt` library, not your code
- It's using the deprecated `pkg_resources` API from setuptools

## The Fix

I've updated `backend/requirements.txt` to pin setuptools to `<81.0.0`:
```
setuptools>=65.5.0,<81.0.0
```

## Apply the Fix

Rebuild the backend container:

```bash
# Rebuild backend with updated requirements
docker-compose build --no-cache backend

# Restart backend
docker-compose up -d backend
```

Or rebuild everything:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## After Rebuild

The warning should be gone. If you still see it, it's harmless and won't affect functionality.

## Note

This warning will eventually be fixed when `rest_framework_simplejwt` updates their code to not use `pkg_resources`. Until then, pinning setuptools <81.0.0 suppresses the warning.

