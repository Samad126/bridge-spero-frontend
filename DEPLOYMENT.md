# Deployment Configuration

## Environment Variables Setup

### GitHub Repository Secrets (Branch-Based)

You need to set up the following secrets in your GitHub repository:

**Path:** https://github.com/Samad126/bridge-spero-frontend/settings/secrets/actions

Click **New repository secret** and add these **4 secrets**:

#### Development Environment (dev branch):
1. **DEV_NEXT_PUBLIC_API_URL**
   - Value: `https://dev.bridgespero.com/api/v1`

2. **DEV_NEXT_PUBLIC_PAGE_URL**
   - Value: `https://dev.bridgespero.com`

#### Production Environment (master branch):
3. **PROD_NEXT_PUBLIC_API_URL**
   - Value: `https://bridgespero.com/api/v1`

4. **PROD_NEXT_PUBLIC_PAGE_URL**
   - Value: `https://bridgespero.com`

The GitHub Actions workflow automatically selects the correct secrets based on which branch is being built:
- `dev` branch → uses `DEV_*` secrets
- `master` branch → uses `PROD_*` secrets

### Local Docker Build

When building locally with Docker, pass the build arguments:

**For development:**
```bash
docker build . -t bridge-spero-dev \
  --build-arg NEXT_PUBLIC_API_URL="https://dev.bridgespero.com/api/v1" \
  --build-arg NEXT_PUBLIC_PAGE_URL="https://dev.bridgespero.com"
```

**For production:**
```bash
docker build . -t bridge-spero-prod \
  --build-arg NEXT_PUBLIC_API_URL="https://bridgespero.com/api/v1" \
  --build-arg NEXT_PUBLIC_PAGE_URL="https://bridgespero.com"
```

### Why This Is Required

Next.js inlines `NEXT_PUBLIC_*` environment variables at **build time** (not runtime). This means:

- These values must be available when running `next build` or `bun run build`
- They are embedded into the JavaScript bundle
- Client components cannot access runtime environment variables
- The server's environment variables at runtime don't affect client code

## Changes Made

1. **Removed `env` config from next.config.ts** - This was interfering with Next.js's automatic handling
2. **Updated Dockerfile** - Added ARG and ENV declarations for build-time variables
3. **Updated GitHub Actions** - Added branch-based logic to use different secrets for dev/prod
4. **Branch-based secrets** - Separate secrets for dev and production environments

## Testing

After deploying:

1. Open browser console on your deployed site
2. Check if images load correctly
3. Verify no "undefined" in image URLs
4. Check network tab to ensure API calls go to the correct domain

## Troubleshooting

If `process.env.NEXT_PUBLIC_PAGE_URL` is still undefined:

1. Verify the GitHub secrets are properly set
2. Check the GitHub Actions build logs to ensure env vars are passed
3. Ensure you've pushed the updated Dockerfile and workflow
4. Trigger a fresh build (the old cached image won't have the env vars)
