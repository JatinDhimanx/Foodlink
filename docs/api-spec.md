# FoodLink API Specification

### Authentication
- `POST /api/auth/register` : Create a user. Body: `{name, email, password, role, location}`
- `POST /api/auth/login` : Return a JWT. Body: `{email, password}`
- `GET /api/auth/me` : Return current user (Bearer token required).

### Food Listings
- `POST /api/food/` (Restaurant Only) : List new surplus. Body: `{foodType, quantity, pickupTime, location}`
- `GET /api/food/available` : Return all food listings with status `Available`.
- `GET /api/food/my-listings` (Restaurant Only): List history.

### Pickups
- `POST /api/pickups/request` (NGO Only): Claim food. Body: `{foodListingId}`
- `GET /api/pickups/my-pickups` (NGO Only)
- `GET /api/pickups/pending` (Volunteer Only): Unclaimed deliveries.

### Deliveries
- `POST /api/deliveries/accept` (Volunteer Only): Acknowledge task. Body `{pickupId}`
- `PUT /api/deliveries/:id/status` (Volunteer Only): Body: `{status}` ('InTransit', 'Delivered')
- `GET /api/deliveries/my-deliveries` (Volunteer Only): Active volunteer delivery backlog.
