# Vercel Deployment Guide

## Overview
This application has been restructured to work with Vercel's serverless architecture. The main changes include:

1. **API Routes**: Converted Express routes to Vercel serverless functions
2. **Storage**: Created a Vercel-compatible storage solution
3. **Build Process**: Updated build scripts for Vercel deployment

## What Changed

### Before (Traditional Server)
- `server/index.ts` - Express server listening on port 5000
- `server/routes.ts` - Express route handlers
- `server/storage.ts` - In-memory storage (not suitable for serverless)

### After (Vercel Serverless)
- `api/` directory - Contains all API endpoints as serverless functions
- `vercel.json` - Vercel configuration
- Updated `package.json` scripts

## API Endpoints

The following API endpoints are now available as serverless functions:

- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get specific product
- `GET /api/categories` - Get all categories  
- `GET /api/categories/[slug]` - Get specific category
- `POST /api/newsletter` - Newsletter subscription

## Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
vercel
```

### 4. Follow the prompts:
- Set up and deploy? → Yes
- Which scope? → Select your account
- Link to existing project? → No
- Project name? → innovora-market (or your preferred name)
- In which directory is your code located? → ./ (current directory)
- Want to override the settings? → No

### 5. For Production Deployment
```bash
vercel --prod
```

## Important Notes

### Storage Limitations
- The current storage is still in-memory and will reset between function calls
- **For production, you should use a proper database** like:
  - PostgreSQL (with Neon, Supabase, or Railway)
  - MongoDB Atlas
  - PlanetScale
  - Vercel KV (Redis)

### Environment Variables
If you need to add environment variables:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add any required variables

### Custom Domain
To use a custom domain:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain

## Local Development

For local development, you can still use:
```bash
npm run dev
```

This will run the traditional Express server locally.

## Troubleshooting

### Common Issues

1. **Build Errors**: Make sure all dependencies are installed
2. **API Not Working**: Check that the `api/` directory is properly structured
3. **CORS Issues**: The API functions include CORS headers, but you may need to adjust them for your domain

### Debugging

- Check Vercel function logs in the dashboard
- Use `vercel logs` command for real-time logs
- Test API endpoints individually using tools like Postman or curl

## Next Steps

1. **Database Integration**: Replace in-memory storage with a real database
2. **Authentication**: Add user authentication (consider Auth0, NextAuth, or Clerk)
3. **File Uploads**: Add image upload functionality (consider Cloudinary or AWS S3)
4. **Performance**: Implement caching strategies for better performance

## Support

If you encounter issues:
1. Check Vercel documentation: https://vercel.com/docs
2. Review Vercel function logs
3. Ensure all dependencies are properly installed
4. Verify the `vercel.json` configuration is correct
