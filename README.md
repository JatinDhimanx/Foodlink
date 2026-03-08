FoodLink 🌱
Smart Food Waste Redistribution Platform

FoodLink is a real-time food redistribution platform that connects Restaurants, NGOs, and Volunteers to reduce food waste and ensure surplus food reaches people who need it.

Every day, large amounts of food are wasted while many communities still face food insecurity. FoodLink creates a coordinated network that redistributes surplus food efficiently.

👥 Team Members

Jatin – Backend Development

Sneha – Frontend Development

Sanny – UI/UX & Testing


🚨 Problem

Restaurants and food providers often have surplus food that goes to waste due to the lack of an efficient redistribution system.

At the same time, NGOs and community organizations struggle to find reliable sources of food for people in need.

This disconnect results in:

Large amounts of food waste

Inefficient food redistribution

Communities lacking access to available food resources

💡 Solution

FoodLink provides a centralized platform where surplus food can be shared and redistributed quickly through a structured workflow.

Workflow
Restaurant uploads surplus food
        ↓
NGO views and claims the food
        ↓
Volunteer accepts delivery task
        ↓
Food is delivered to communities

✨ Key Features

Role-based system (Restaurant / NGO / Volunteer)

Restaurant food listing system

NGOs can claim available food

Volunteers can accept delivery tasks

Map-based food pickup tracking

Secure authentication using JWT

Real-time updates using Socket.io

🗺 Map-Based Coordination

FoodLink integrates Leaflet.js with OpenStreetMap to show food pickup locations on a live map.

This allows volunteers and NGOs to easily locate nearby food donations and coordinate pickups.

🛠 Tech Stack
Frontend

HTML

CSS

JavaScript

Leaflet.js

Backend

Node.js

Express.js

Database

MongoDB (Mongoose)

Real-Time Communication

Socket.io

1️⃣ Register or Login

Users can sign up by selecting one of the roles:

Restaurant

NGO

Volunteer

2️⃣ Restaurant Uploads Food

Restaurants can add surplus food listings by entering:

Food type

Quantity

Pickup time

Location

3️⃣ NGO Claims Food

NGOs can view available food listings and claim food that they want to redistribute.

4️⃣ Volunteer Accepts Delivery

Volunteers can see pending delivery tasks and accept them to pick up food from restaurants and deliver it to NGOs.

5️⃣ Map View

The platform shows pickup locations on a map interface, helping volunteers find the exact location for pickup and delivery.

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/JatinDhimanx/Foodlink.git
2️⃣ Setup Environment Variables

Inside the backend folder:

cp .env.example .env

Update MongoDB connection string and JWT secret.

3️⃣ Install Dependencies
cd backend
npm install
4️⃣ Run the Server
npm run dev

Server will run on:

http://localhost:5000
5️⃣ Run the Frontend

Serve the frontend folder using:

VS Code Live Server

Python HTTP server

Example:

python -m http.server
🌍 Impact

FoodLink helps reduce food waste while improving food accessibility for communities in need. By connecting restaurants, NGOs, and volunteers, the platform creates a collaborative network that ensures surplus food is used effectively instead of being discarded.

🔮 Future Improvements

AI-based food demand prediction

Route optimization for volunteers

Mobile application support

Food redistribution analytics dashboard
