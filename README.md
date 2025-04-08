
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

![Screenshot 2025-04-09 020725](https://github.com/user-attachments/assets/f507d03f-af4e-4931-aa21-eee05d3cd3d6)
![Screenshot 2025-04-09 022503](https://github.com/user-attachments/assets/c044c5d2-eba1-4bcc-af25-e79d571c17a2)
![Screenshot 2025-04-09 022754](https://github.com/user-attachments/assets/17377fb1-fb19-4ae8-9cc8-05756b5ef23a)
![Screenshot 2025-04-09 022818](https://github.com/user-attachments/assets/3eadb66f-57f4-4da4-a1b1-738f3fdc8020)
![Screenshot 2025-04-09 023730](https://github.com/user-attachments/assets/f3231b66-d4bc-4089-940e-9926984b91e0)
