 # VibeTube

VibeTube is a **YouTube-like web application** built with the MERN stack. Users can watch, upload, like, comment, and delete videos, as well as create tweets and subscribe to other users.

## 🚀 Tech Stack

**Frontend:** React, Tailwind CSS, React Router, Redux  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT tokens  
**Cloud Storage:** Cloudinary (videos, thumbnails, avatars, background images)

## ✨ Features

- **User Authentication:** Signup, login, logout, profile management  
- **Video Upload & Playback:** Upload and view videos  
- **User Profiles:** Explore user profiles and content  
- **Likes & Interactions:** Like videos, comment, and engage  
- **Tweets:** Create and like tweets  
- **Responsive Design:** Works on desktop and mobile  
- **Search & Filtering:** Easily find videos  
- **Subscribe:** Subscribe/unsubscribe to other users  
- **Subscriptions & Subscribers:** View subscribers and subscribed users  

## 🎯 Demo

- **Frontend:** [https://vibetube-v.netlify.app](https://vibetube-v.netlify.app)  
- **Backend:**  backend hosted on Render

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Vaibhavi-Bhosale/VibeTube.git
cd VibeTube/utube-backend
npm install
cd ../utube-frontend
npm install

```

Set up environment variables:

**Backend (`utube-backend/.env`)**

```env
# MongoDB connection string
MONGO_URL=your_mongo_db_connection_string

# CORS origin (frontend URL)
CORS_ORIGIN=http://localhost:5173

# JWT Access Token
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

# JWT Refresh Token
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Backend server port
PORT=5000
```
**Frontend (`utube-fronend/.env`)**

```env
# MongoDB connection string
VITE_API_BASE_URL=http://localhost:8000/api/v1

```

Run the project:

```bash
# Start Backend
cd utube-backend
npm run dev

# Start Frontend
cd ../utube-frontend
npm run dev
```
Open http://localhost:5173 in your browser.


## 🔮 Future Features

- **Comments & Replies:** Allow users to reply to comments and have threaded discussions.  
- **Playlist Creation:** Users can create, edit, and manage video playlists for better organization.  
- **AI-Driven Video Recommendations:** Personalized video suggestions using AI to enhance user engagement.  
- **Enhanced Responsiveness:** Optimized UI for all devices with smoother animations and transitions.  
- **Dark/Light Mode Toggle:** Give users the option to switch between dark and light themes.  
- **Advanced Search & Filters:** Search videos by tags, categories, or trending content.  
- **Video Analytics Dashboard:** Track video views, likes, and user engagement metrics.  
- **Notification System:** Real-time notifications for likes, comments, and new uploads from subscribed users.

  ---

## 🤝 Contributors

- **Vaibhavi Bhosale** – [GitHub](https://github.com/Vaibhavi-Bhosale)

> Feel free to contribute! Pull requests, issues, and suggestions are welcome.

