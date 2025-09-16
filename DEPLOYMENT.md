# Deploying BookValley on Vercel

This guide outlines the steps to deploy the BookValley application (frontend and backend) on Vercel.

## Prerequisites

- [Vercel account](https://vercel.com/signup)
- [GitHub account](https://github.com/signup) (for connecting your repository)
- MongoDB Atlas account for database hosting

## Deployment Steps

### Step 1: Prepare Your Repository

Ensure your repository is properly structured with:

- Frontend and backend as separate directories
- Vercel configuration files in place (already added to this repo)
- Environment variable examples (.env.example files) available

### Step 2: Deploy the Backend

1. Log in to your Vercel account
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:

   - Select the `/backend` directory as the Root Directory
   - Set Framework Preset to "Other"
   - Set Build Command to `npm install`
   - Set Output Directory to `.` (dot)

5. Configure environment variables:

   - Add all variables from `backend/.env.example` with your actual values
   - Ensure `MONGODB_URI` is set to your MongoDB Atlas connection string
   - Set `FRONTEND_URL` to include your Vercel frontend domain once deployed

6. Click "Deploy"
7. Note the deployment URL (e.g., `https://bookvalley-backend.vercel.app`)

### Step 3: Deploy the Frontend

1. In Vercel, click "Add New" → "Project"
2. Import the same GitHub repository
3. Configure the project:

   - Select the `/frontend` directory as the Root Directory
   - Vercel should auto-detect Vite.js
   - Build Command should be `npm run build`
   - Output Directory should be `dist`

4. Configure environment variables:

   - Add `VITE_API_URL` with the value of your backend URL followed by `/api`
     Example: `https://bookvalley-backend.vercel.app/api`

5. Click "Deploy"

### Step 4: Verify CORS Configuration

1. After deployment, check if the frontend can communicate with the backend
2. If there are CORS errors:
   - Go to your backend project settings in Vercel
   - Update the `FRONTEND_URL` environment variable to include the actual frontend domain
   - Redeploy the backend

### Step 5: Connect Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain and follow the DNS configuration instructions

## Troubleshooting

### API Connection Issues

- Verify that `VITE_API_URL` is correctly set in the frontend
- Check the Network tab in browser DevTools for CORS errors
- Ensure MongoDB Atlas IP whitelist allows connections from Vercel

### Build Errors

- Check Vercel build logs for any package installation issues
- Ensure all dependencies are properly listed in package.json

### Database Connection Issues

- Verify the MongoDB connection string is correct
- Ensure your MongoDB Atlas cluster is properly configured for Vercel

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
