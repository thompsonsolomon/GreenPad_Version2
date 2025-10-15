# Firebase Setup Guide

This guide will help you set up Firebase for the GreenPad Concepts website.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: "greenpad-concepts"
4. Follow the setup wizard

## Step 2: Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Create your first admin user:
   - Click "Users" tab
   - Click "Add user"
   - Enter email and password for admin access

## Step 3: Create Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select your preferred location
5. Click "Enable"

## Step 4: Set Up Firestore Security Rules

Replace the default rules with:

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - public read, admin write
    match /blogPosts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Contact submissions - admin only
    match /contactSubmissions/{submissionId} {
      allow read, write: if request.auth != null;
    }
    
    // Donations - admin only
    match /donations/{donationId} {
      allow read, write: if request.auth != null;
    }
  }
}
\`\`\`

## Step 5: Set Up Firebase Storage

1. In Firebase Console, go to "Storage"
2. Click "Get started"
3. Choose "Start in production mode"
4. Click "Done"

## Step 6: Set Up Storage Security Rules

Replace the default rules with:

\`\`\`
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
\`\`\`

## Step 7: Get Your Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app with nickname "greenpad-web"
5. Copy the configuration values

## Step 8: Configure Environment Variables

1. Create a \`.env\` file in your project root
2. Copy the contents from \`.env.example\`
3. Replace the placeholder values with your Firebase configuration:

\`\`\`env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
\`\`\`

## Step 9: Test Your Setup

1. Start your development server: \`npm run dev\`
2. Navigate to \`/admin\` and try logging in with your admin credentials
3. If successful, you should be redirected to the admin dashboard

## Firestore Collections Structure

### blogPosts
\`\`\`javascript
{
  title: string,
  content: string,
  excerpt: string,
  image: string,
  category: string,
  author: string,
  readTime: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
\`\`\`

### contactSubmissions
\`\`\`javascript
{
  name: string,
  email: string,
  subject: string,
  message: string,
  status: string, // "unread" | "read" | "responded"
  createdAt: timestamp
}
\`\`\`

### donations
\`\`\`javascript
{
  name: string,
  email: string,
  amount: number,
  type: string, // "one-time" | "monthly"
  status: string, // "pending" | "completed" | "failed"
  transactionId: string,
  createdAt: timestamp
}
\`\`\`

## Security Best Practices

1. Never commit your \`.env\` file to version control
2. Add \`.env\` to your \`.gitignore\` file
3. Use different Firebase projects for development and production
4. Regularly review your security rules
5. Monitor your Firebase usage in the console

## Troubleshooting

### Authentication Issues
- Verify email/password authentication is enabled
- Check that your admin user exists in Firebase Console
- Ensure environment variables are correctly set

### Firestore Issues
- Verify security rules are properly configured
- Check browser console for specific error messages
- Ensure Firestore is enabled in your Firebase project

### Storage Issues
- Verify Storage is enabled
- Check storage security rules
- Ensure you have sufficient storage quota

For more help, visit the [Firebase Documentation](https://firebase.google.com/docs)
