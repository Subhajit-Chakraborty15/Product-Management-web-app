# Product Management Web App

## 🚀 Features
- User authentication (JWT)
- Product CRUD operations
- Filtering and sorting
- Responsive Material-UI design
- Pagination

## 1. Clear Setup Instructions

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- Git

### Installation
bash

# Backend setup
cd backend
npm install
cp .env.example .env  # Update with your credentials
npm start

# Frontend setup (in new terminal)
cd ../frontend
npm install
npm start

Common Issues
Error	Solution
MongoDB connection failed	Verify MongoDB service is running
CORS errors	Check backend's CORS configuration
Invalid JWT	Ensure consistent JWT_SECRET
Missing dependencies	Run npm install in both folders
Port conflicts	Change PORT in .env (backend)

Deployment Considerations
Backend
Set production MongoDB URI

Configure HTTPS

Use process manager (PM2)

Set NODE_ENV=production

Frontend
Build with npm run build

Serve via Nginx/Apache

Configure proxy for API calls

Set base URL in Axios config
