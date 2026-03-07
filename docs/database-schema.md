# Database Schema 

The primary entities defined via Mongoose Schema:

## User
- `name`, `email`, `password` (hashed)
- `role`: string enum `['restaurant', 'ngo', 'volunteer']`
- `location`: nested object `{lat, lng, address}`

## FoodListing
- `restaurantId`: Ref<User>
- `foodType`: string
- `quantity`: string
- `pickupTime`: Date
- `location`: nested object `{lat, lng, address}`
- `status`: enum `['Available', 'Reserved', 'PickedUp', 'Delivered']`

## Pickup
- `ngoId`: Ref<User>
- `foodListingId`: Ref<FoodListing>
- `status`: enum `['Pending', 'Accepted', 'Completed', 'Cancelled']`

## Delivery
- `volunteerId`: Ref<User>
- `pickupId`: Ref<Pickup>
- `status`: enum `['Pending', 'InTransit', 'Delivered', 'Cancelled']`
- `startedAt`, `completedAt`: Date
