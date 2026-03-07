# FoodLink 🌱

Smart Food Waste Redistribution Platform connecting Restaurants, NGOs, and Volunteers.

## Project Structure

This is a full-stack platform consisting of:
- **Backend:** Node.js, Express, MongoDB Atlas, Socket.io
- **Frontend:** HTML, Vanilla JS, CSS, Leaflet Maps

## Getting Started

1. Set up your MongoDB Atlas cluster and acquire a connection string.
2. Navigate to `backend/` and copy `.env.example` to `.env`. Update variables.
3. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
5. Serve the `frontend/` directory using a local web server (e.g., VS Code Live Server, or Python's `http.server`). It relies on `http://localhost:5000/api` natively.

## Deployment Notes
- Backend is configured to be easily deployable to Render (set environment variables).
- Frontend static files can be natively deployed on Vercel.

## Hackathon Features
- Fully mapped schema and MVC architecture
- Role-based real-time socket updates for Pickups and Deliveries
- Secure JWT based authentication
- Interactive Leaflet-based Live Map of donations
