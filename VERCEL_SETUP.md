# Vercel Deployment Setup

## Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment with Resend email"
git push
```

## Step 2: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Select your repository: `smsh` or `saharamultispecialityhospital`
5. Click **"Import"**
6. Vercel will auto-detect Next.js settings

## Step 3: Add Environment Variables

**BEFORE clicking Deploy**, scroll down to **Environment Variables** section:

### Add This Variable:

| Name | Value |
|------|-------|
| `RESEND_API_KEY` | `re_your_actual_api_key_from_resend` |

**How to add:**
1. In the **Environment Variables** section
2. Enter **Key**: `RESEND_API_KEY`
3. Enter **Value**: Your Resend API key (from https://resend.com/api-keys)
4. Click **"Add"**

### Screenshot Guide:
```
┌─────────────────────────────────────────┐
│ Environment Variables (Optional)         │
├─────────────────────────────────────────┤
│ Key:   RESEND_API_KEY                   │
│ Value: re_123abc...                     │
│        [Add] button                      │
└─────────────────────────────────────────┘
```

## Step 4: Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build
3. Your site will be live at: `https://your-project.vercel.app`

## Step 5: Test Appointment Booking

Once deployed, test both methods:

### Test Form:
1. Open your live site
2. Click "Book Appointment" in header
3. Fill the form
4. Submit
5. Check **saharamedicoserajgarh@gmail.com**

### Test AI Assistant:
1. Click AI Assistant button
2. Say "I want to book an appointment"
3. Fill details in chat
4. Confirm
5. Check email

## Adding Environment Variables After Deployment

If you forgot to add them before deploying:

1. Go to your project in Vercel dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in left sidebar
4. Click **"Add New"**
5. Enter:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your API key
   - **Environments**: Select **Production**, **Preview**, **Development**
6. Click **"Save"**
7. Go to **"Deployments"** tab
8. Click **"..."** on latest deployment → **"Redeploy"**

## Custom Domain (Optional)

To use your domain (saharamultispecialityhospital.com):

1. In Vercel project, go to **"Settings"** → **"Domains"**
2. Click **"Add"**
3. Enter: `saharamultispecialityhospital.com`
4. Follow DNS instructions provided by Vercel
5. Add DNS records in your domain registrar:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`
6. Wait 24-48 hours for DNS propagation

## Troubleshooting

### Build Failed?
- Check build logs in Vercel dashboard
- Make sure all dependencies are in package.json
- Run `npm run build` locally first

### Emails Not Sending?
- Verify `RESEND_API_KEY` is set correctly
- Check Vercel Function Logs for errors
- Verify API key is valid in Resend dashboard
- Check you haven't exceeded free tier limits (3,000/month, 100/day)

### Environment Variable Not Working?
- Make sure you redeployed after adding the variable
- Check spelling: `RESEND_API_KEY` (all caps, underscore)
- Verify the variable is added to "Production" environment

## Success Checklist

✅ Code pushed to GitHub  
✅ Vercel project created  
✅ `RESEND_API_KEY` environment variable added  
✅ Deployment successful  
✅ Website loads correctly  
✅ Appointment form works and sends email  
✅ AI Assistant works and sends email  
✅ Emails received at saharamedicoserajgarh@gmail.com  

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Resend Dashboard**: https://resend.com/overview
- **Next.js Deployment Docs**: https://nextjs.org/docs/deployment

---

**Need Help?** Check Vercel deployment logs and Resend email logs for detailed error messages.
