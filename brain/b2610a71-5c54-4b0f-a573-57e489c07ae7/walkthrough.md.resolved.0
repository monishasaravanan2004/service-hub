# Online Service Booking System - Project Walkthrough

The **ServiceHub** frontend has been successfully implemented! It's a completely standalone, beginner-friendly HTML/CSS/JS application that uses `LocalStorage` to simulate a real database.

## System Features

- **Dynamic SPA Routing:** Navigating between 18 distinct views without clunky page reloads.
- **Premium Design:** Features a modern aesthetic, custom responsive CSS (Grid/Flexbox), smooth hover animations, and beautiful placeholder imagery.
- **Robust Mock Database (`store.js`):** Handles all CRUD (Create, Read, Update, Delete) operations for users, providers, bookings, services, and reviews.

## The Walkthrough

### 1. Landing & Search
When a user opens `index.html`, they are greeted by a beautiful **Hero Section** with a quick-search component.
- The user can explore dynamically generated **Service Cards** (each with a relevant, high-quality Unsplash image).
- Using the Search Bar takes them to the **Search Results Page** (`#search`), where they can filter providers by service category, specific area (e.g., "Downtown"), and Minimum Rating over a grid of matching providers.
*(Constraint Met: Searching a particular area displays all matching nearby providers with complete details).*

### 2. Authentication Flow
- Clients and Providers have dedicated signup options in the **Auth Module** (`#signup`).
- The Client signup creates a standard user, while the Provider signup automatically prepares an empty **Vendor Profile** ready to be filled out.
- The Admin login (`admin@servicehub.com` / `password`) routes securely to the Admin Dashboard.

### 3. Client Experience
- **Booking Flow:** Upon viewing a Provider's profile, a client sees their bio, past reviews, experience, and availability. They can pick a date/time and submit a booking request.
- **Dashboard (`#dashboard/client`):** The client can track the status of their requests (Pending -> Confirmed -> Completed). Once a service is completed, a "Leave Review" button elegantly appears, allowing them to rate and comment on the provider securely.

### 4. Provider Experience
- **Manage Requests (`#dashboard/provider`):** Providers see incoming bookings and can explicitly **Accept** or **Reject** them. After accepting, they can mark the job as **Completed**.
- **Edit Profile:** Providers have a dedicated panel to edit their Experience, Price per Hour, Categories, Working Hours, and easily toggle their **Availability status** to show up correctly in search results.

### 5. Admin Capabilities
- **Overview (`#dashboard/admin`):** The Admin sees a high-level summary of total users and system revenue.
- They have a robust view of all providers where they can **Block or Approve** them.
- They can monitor the entire platform's real-time booking ledger.

## Try It Out

You can easily run this on your local machine with absolutely no build steps:
```bash
# Navigate to the project directory
cd C:\Users\monis\.gemini\antigravity\scratch\service_booking_system

# Start a simple python web server
python -m http.server 8000
```
Then simply open `http://localhost:8000` in your browser!

### Test Accounts (Password: `password`)
- **Admin:** `admin@servicehub.com`
- **Client:** `john@gmail.com`
- **Provider:** `mike@spark.com` or `pro@plumber.com`

Enjoy your new, highly responsive Service Marketplace!
