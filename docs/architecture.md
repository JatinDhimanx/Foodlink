# FoodLink Architecture

## Core Tech Stack
- **Frontend**: Vanilla JS (ES6 Modules), HTML5, CSS3, Leaflet Maps
- **Backend API**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Real-Time Communication**: Socket.io

## Design Patterns
1. **Model-View-Controller (MVC) + Service Layer Architecture**:
   Express routing is separated into `routes/`, standard HTTP request handling into `controllers/`, and all heavy business logic (DB queries, socket broadcasts) are within `services/`.
2. **Event-Driven Pub-Sub**:
   Socket.io is used alongside traditional APIs. For example, when a Restaurant confirms a Food Listing via REST API, the `foodService` emits a room-based broadcast to connected NGOs.

## Authentication & Role Based Access
JSON Web Tokens (JWT) are employed. Users have an enum `role`: (`restaurant`, `ngo`, `volunteer`). Requests are guarded using `protect` and `authorize` middlewares.
