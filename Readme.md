# Video Hosting & Social Backend

A complete backend for a video-hosting platform with social features — built with Node.js, Express, and MongoDB. Users can upload videos, comment, like, tweet, build playlists, subscribe to channels, and view channel analytics.

This project follows production-style patterns: centralized error handling, JWT-based auth with access/refresh tokens, file uploads via Multer + Cloudinary, and MongoDB aggregation pipelines for nested/joined data.

## Data Model

📌 **Model diagram:** [https://app.eraser.io/workspace/KeCUWXpYEuy3c0ZhLt0H?origin=share]

> Replace this with your own model link (e.g. from [Eraser.io](https://eraser.io), [dbdiagram.io](https://dbdiagram.io), or a diagram you've drawn) once you have one hosted.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (access + refresh tokens), bcrypt for password hashing
- **File storage:** Multer (local temp) → Cloudinary (persistent)
- **Pagination:** mongoose-aggregate-paginate-v2

## Features

- **Auth** — register, login, logout, refresh access token, change password
- **Users** — update account details, avatar/cover image upload, channel profile, watch history
- **Videos** — upload, publish/unpublish, update, delete, search/sort/paginate, view count tracking
- **Comments** — add, edit, delete, paginated comments per video
- **Likes** — toggle likes on videos, comments, and tweets
- **Tweets** — create, edit, delete short text posts
- **Playlists** — create, update, delete, add/remove videos
- **Subscriptions** — subscribe/unsubscribe to channels, view subscriber and subscription lists
- **Dashboard** — channel stats (total views, subscribers, videos, likes) and channel video list
- **Healthcheck** — simple uptime endpoint

## Project Structure

```
src/
├── controllers/       # Route handler logic
│   ├── comment.controller.js
│   ├── dashboard.controller.js
│   ├── healthcheck.controller.js
│   ├── like.controller.js
│   ├── playlist.controller.js
│   ├── subscription.controller.js
│   ├── tweet.controller.js
│   ├── user.controller.js
│   └── video.controller.js
├── db/
│   └── index.js        # MongoDB connection
├── middlewares/
│   ├── auth.middleware.js
│   └── multer.middleware.js
├── models/
│   ├── comment.model.js
│   ├── like.model.js
│   ├── playlist.model.js
│   ├── subscription.model.js
│   ├── tweet.model.js
│   ├── user.model.js
│   └── video.model.js
├── routes/
│   ├── comment.routes.js
│   ├── dashboard.routes.js
│   ├── healthcheck.routes.js
│   ├── like.routes.js
│   ├── playlist.routes.js
│   ├── subscription.routes.js
│   ├── tweet.routes.js
│   ├── user.routes.js
│   └── video.routes.js
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   └── cloudinary.js
├── app.js
├── constants.js
└── index.js
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account (for file storage)

### Installation

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
npm install
```

### Environment Variables

Create a `.env` file in the root directory (use `.env.sample` as a reference):

```env
PORT=8001
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run the server

```bash
npm run dev
```

Server runs at `http://localhost:8001` by default.

## API Overview

All routes are prefixed with `/api/v1`.

| Resource | Base Route |
|---|---|
| Users / Auth | `/users` |
| Videos | `/videos` |
| Comments | `/comments` |
| Likes | `/likes` |
| Tweets | `/tweets` |
| Playlists | `/playlist` |
| Subscriptions | `/subscriptions` |
| Dashboard | `/dashboard` |
| Healthcheck | `/healthcheck` |

Most routes are protected by JWT auth (`verifyJWT` middleware) and require a valid access token, sent either as a cookie or an `Authorization: Bearer <token>` header.

## License

This project is open source and available under the [MIT License](LICENSE).
