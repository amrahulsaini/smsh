# Email Setup Instructions

The appointment booking system automatically sends emails to **saharamedicoserajgarh@gmail.com** when patients book appointments through either the AI Assistant OR the appointment form.

## Resend Setup (FREE - 3,000 emails/month)

### 1. Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy your API key

### 2. Add API Key to Project

1. Open `.env.local` file in project root
2. Replace `your_resend_api_key_here` with your actual API key:
   ```
   RESEND_API_KEY=re_123456789abcdef
   ```
3. Save the file

### 3. Restart Development Server

```bash
npm run dev
```

### 4. Test Both Booking Methods

**Method 1: Form**
1. Click "Book Appointment" button in header
2. Fill out the form
3. Submit

**Method 2: AI Assistant**
1. Click AI Assistant button
2. Say "I want to book an appointment"
3. Answer all questions
4. Confirm booking

Check **saharamedicoserajgarh@gmail.com** inbox for professional HTML emails!

## Email Features

✅ **Professional HTML email** with hospital branding  
✅ **Both booking methods** work (form + AI)  
✅ **Patient details** (name, phone, email)  
✅ **Appointment details** (department, date, time)  
✅ **Additional message** from patient  
✅ **Action reminder** to contact patient  
✅ **Automatic fallback** to mailto: if API fails  
✅ **100% FREE** - 3,000 emails/month, 100/day

## Production Deployment

For Vercel/Netlify:

1. Add environment variable in hosting dashboard:
   - `RESEND_API_KEY=your_actual_api_key`
2. Deploy the project
3. Both booking methods will work automatically

## Troubleshooting

**Error: "Email service not configured"**
- Check `.env.local` file exists with correct API key
- Restart dev server after adding credentials

**Emails not received?**
- Check spam folder
- Verify API key is valid in Resend dashboard
- Check console for error messages
- Free tier limits: 3,000/month, 100/day

**Want custom domain email?**
- In Resend dashboard, add your domain
- Verify DNS records
- Update API route `from` field to use your domain

That's it! The system is ready with BOTH booking options using Resend API.
