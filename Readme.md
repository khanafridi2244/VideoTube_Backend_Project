# 🎥 Video Hosting Backend API

A robust and scalable backend project built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. This project powers a video hosting platform similar to YouTube, providing all essential backend functionalities required for a modern video-sharing application.

## 🚀 Features

* User Authentication & Authorization
* Secure Login and Registration
* JWT-based Authentication
* Access Token & Refresh Token Management
* Password Hashing with Bcrypt
* Video Upload and Management
* Like & Dislike Videos
* Comment and Reply System
* Subscribe & Unsubscribe Channels
* User Profile Management
* Watch History Tracking
* Playlist Management
* File Upload Handling
* RESTful API Architecture
* Error Handling Middleware
* Data Validation
* Secure Routes and Protected Endpoints

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Tokens (JWT)
* Bcrypt

### Other Tools & Libraries

* Multer
* Cloudinary
* Cookie Parser
* CORS
* Dotenv
* Mongoose Aggregation Pipeline

## 📂 Project Structure

```bash
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── db/
├── constants/
├── validators/
└── app.js
```

## 🔐 Authentication Flow

1. User registers an account.
2. Password is hashed using Bcrypt before storing.
3. User logs in and receives:

   * Access Token
   * Refresh Token
4. Protected routes are accessed using JWT authentication.
5. Refresh tokens are used to generate new access tokens securely.

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd project-name

# Install dependencies
npm install

# Create environment file
.env

# Start development server
npm run dev
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📚 Learning Outcomes

This project demonstrates industry-standard backend development practices, including:

* Authentication & Authorization
* Secure Password Management
* Token-Based Security
* REST API Development
* Database Design & Relationships
* Middleware Implementation
* Error Handling
* File Upload Management
* Scalable Project Architecture

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository, create a new branch, and submit a pull request.

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
