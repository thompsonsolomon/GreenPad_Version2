# Integration Setup Guide

This guide will help you set up all third-party integrations for the GreenPad Concepts website.

## 1. Paystack Integration (Payment Processing)

### Setup Steps:

1. **Create a Paystack Account**
   - Go to [Paystack](https://paystack.com/)
   - Sign up for an account
   - Complete the verification process

2. **Get Your API Keys**
   - Navigate to Settings > API Keys & Webhooks
   - Copy your **Public Key** (starts with `pk_`)
   - For production, use the live keys; for testing, use test keys

3. **Add to Environment Variables**
   \`\`\`env
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
   \`\`\`

4. **Test the Integration**
   - Use test card: 4084084084084081
   - Any future expiry date
   - Any CVV

### Features Implemented:
- One-time donations
- Monthly recurring donations
- Automatic donation record saving to Firebase
- Email confirmation to donors

---

## 2. EmailJS Integration (Email Service)

### Setup Steps:

1. **Create an EmailJS Account**
   - Go to [EmailJS](https://www.emailjs.com/)
   - Sign up for a free account

2. **Add an Email Service**
   - Go to Email Services
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the connection steps

3. **Create Email Templates**

   **Template 1: Contact Form**
   - Template ID: `contact_form`
   - Subject: `New Contact Message from {{from_name}}`
   - Content:
     \`\`\`
     Name: {{from_name}}
     Email: {{from_email}}
     Subject: {{subject}}
     
     Message:
     {{message}}
     \`\`\`
     

     

   **Template 2: Donation Confirmation**
   - Template ID: `donation_confirmation`
   - Subject: `Thank you for your donation!`
   - Content:
     \`\`\`
     Dear {{to_name}},
     
     Thank you for your generous {{donation_type}} donation of ${{donation_amount}}!
     
     Transaction ID: {{transaction_id}}
     
     Your support helps us create sustainable solutions for communities and the environment.
     
     Best regards,
     GreenPad Concepts Team
     \`\`\`

4. **Get Your Credentials**
   - Go to Account > General
   - Copy your **Public Key**
   - Copy your **Service ID**
   - Copy your **Template IDs**

5. **Add to Environment Variables**
   \`\`\`env
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   \`\`\`

### Features Implemented:
- Contact form email notifications
- Donation confirmation emails
- Automatic email sending on form submission

---

## 3. Cloudinary Integration (Image Upload)

### Setup Steps:

1. **Create a Cloudinary Account**
   - Go to [Cloudinary](https://cloudinary.com/)
   - Sign up for a free account

2. **Get Your Credentials**
   - Go to Dashboard
   - Copy your **Cloud Name**

3. **Create an Upload Preset**
   - Go to Settings > Upload
   - Scroll to "Upload presets"
   - Click "Add upload preset"
   - Set signing mode to "Unsigned"
   - Configure folder and transformations as needed
   - Save and copy the preset name

4. **Add to Environment Variables**
   \`\`\`env
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   \`\`\`

### Features Implemented:
- Blog post image uploads
- Automatic image optimization
- CDN delivery for fast loading

---

## 4. Google Maps Integration (Contact Page)

### Setup Steps:

1. **Get a Google Maps API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable "Maps JavaScript API" and "Maps Embed API"
   - Go to Credentials
   - Create API Key
   - Restrict the key to your domain for security

2. **Add to Environment Variables**
   \`\`\`env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   \`\`\`

3. **Update the Map Embed**
   - The map is already embedded in the Contact page
   - Update the coordinates in the iframe src if needed

### Features Implemented:
- Interactive map on contact page
- Office location display

---

## Complete .env File Example

\`\`\`env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Paystack Configuration
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Google Maps Configuration
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
\`\`\`

---

## Testing Your Integrations

### Test Paystack:
1. Go to `/donate`
2. Fill in donation details
3. Use test card: 4084084084084081
4. Verify donation appears in admin dashboard

### Test EmailJS:
1. Go to `/contact`
2. Fill in contact form
3. Submit and check your email
4. Verify submission appears in admin dashboard

### Test Cloudinary:
1. Login to admin dashboard
2. Create a new blog post
3. Upload an image
4. Verify image appears in the post

### Test Google Maps:
1. Go to `/contact`
2. Verify map loads correctly
3. Check that location is accurate

---

## Security Best Practices

1. **Never commit .env file to version control**
2. **Add .env to .gitignore**
3. **Use environment-specific keys** (test for development, live for production)
4. **Restrict API keys** to your domain in production
5. **Monitor usage** in each service dashboard
6. **Set up billing alerts** to avoid unexpected charges

---

## Troubleshooting

### Paystack Issues:
- Verify public key is correct
- Check browser console for errors
- Ensure Paystack script is loaded

### EmailJS Issues:
- Verify service ID and template ID
- Check email service connection
- Review EmailJS dashboard for failed sends

### Cloudinary Issues:
- Verify cloud name and upload preset
- Check upload preset is set to "unsigned"
- Review Cloudinary dashboard for uploads

### Google Maps Issues:
- Verify API key is enabled
- Check API restrictions
- Ensure billing is enabled on Google Cloud

---

For more help, refer to the official documentation:
- [Paystack Docs](https://paystack.com/docs)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Google Maps Docs](https://developers.google.com/maps/documentation)
