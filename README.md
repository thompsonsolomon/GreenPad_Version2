# GreenPad Concepts - NGO Website

A modern, responsive website for GreenPad Concepts NGO built with Vite, React, and Tailwind CSS.

## Features

- 🌿 Modern, clean design inspired by environmental themes
- 📱 Fully responsive across all devices
- 🎨 Smooth animations with Framer Motion
- 🔥 Firebase integration for authentication and database
- 💳 Paystack payment integration for donations
- 📧 EmailJS for contact form
- 🖼️ Cloudinary for media management
- 🗺️ Google Maps integration
- 📝 Blog with CRUD operations
- 🔐 Admin dashboard with authentication

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository or extract the ZIP file

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env\` file in the root directory and add your API keys:
\`\`\`env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset

VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key

VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open your browser and navigate to \`http://localhost:3000\`

## Building for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the \`dist\` directory.

## Project Structure

\`\`\`
src/
├── components/       # Reusable components
├── pages/           # Page components
│   └── admin/       # Admin pages
├── config/          # Configuration files
├── utils/           # Utility functions
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
\`\`\`

## Technologies Used

- **Vite** - Build tool
- **React** - UI library
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Firebase** - Authentication & Database
- **Cloudinary** - Media storage
- **Paystack** - Payment processing
- **EmailJS** - Email service
- **Lucide React** - Icons

## License

MIT License
