# CRM Frontend for Sports Management App

This repository contains the frontend for a CRM system designed to manage sports venues, bookings, teams, user profiles, and more. The application allows users to interact with various features of the platform, such as booking sports venues, managing teams, and viewing user profiles.

## Features
- User registration and login
- View and manage user profiles
- Browse available sports venues and their facilities
- Make and manage bookings for sports facilities
- Create and manage teams
- View and upload photos related to venues and users
- Submit and view reviews for venues
- Handle payments for bookings
- Track user stats, including achievements and rank

## Data Source

For development purposes, the frontend fetches data from static JSON files located in the `public/data` folder. Below is a sample of the data structures used in the app:

### Users Table
```json
{
  "users": {
    "id": "uuid",
    "email": "string",
    "password_hash": "string",
    "first_name": "string",
    "last_name": "string",
    "photo_url": "string",
    "birth_date": "date",
    "created_at": "timestamp",
    "last_login": "timestamp",
    "is_active": "boolean"
  }
}
```
### User Profiles Table
```json
{
  "user_profiles": {
    "id": "uuid",
    "user_id": "uuid (ref: users.id)",
    "bio": "string",
    "skill_level": "enum (beginner, intermediate, advanced)",
    "preferred_sports": "jsonb array",
    "location": "jsonb (latitude, longitude)",
    "availability": "jsonb (weekday schedule)",
    "rating": "decimal",
    "updated_at": "timestamp"
  }
}
```
### Sports Venues Table
```json
{
  "venues": {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "address": "string",
    "location": "jsonb (latitude, longitude)",
    "contact_phone": "string",
    "email": "string",
    "opening_hours": "jsonb (weekday schedule)",
    "features": "jsonb array",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "is_active": "boolean"
  }
}
```

### Venue Facilities Table

```json
{
  "venue_facilities": {
    "id": "uuid",
    "venue_id": "uuid (ref: venues.id)",
    "sport_type": "string",
    "capacity": "integer",
    "hourly_rate": "decimal",
    "currency": "string",
    "amenities": "jsonb array",
    "photos": "jsonb array (urls)"
  }
}
```

### Bookings Table
```json
{
  "bookings": {
    "id": "uuid",
    "venue_id": "uuid (ref: venues.id)",
    "facility_id": "uuid (ref: venue_facilities.id)",
    "user_id": "uuid (ref: users.id)",
    "start_time": "timestamp",
    "end_time": "timestamp",
    "status": "enum (pending, confirmed, cancelled)",
    "total_amount": "decimal",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```
## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crm-frontend.git
   cd crm-frontend
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
   ```

## Folder Structure
- public/data: Contains static JSON data files.
- src: Contains the React components, pages, and logic for handling the app's features.