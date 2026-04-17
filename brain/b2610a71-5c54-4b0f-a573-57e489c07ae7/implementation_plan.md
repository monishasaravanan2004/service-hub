# Goal Description

Build a comprehensive Online Service Booking System frontend using HTML, CSS, and JavaScript. The system will simulate a backend using LocalStorage and Dummy Data. It will provide a modern, responsive, and professional UI complete with distinct dashboards for Clients, Service Providers, and Admins.

## Proposed Changes

We will create a structured web application using Vanilla HTML, CSS, and JavaScript. The application will be organized modularly to be maintainable and beginner-friendly.

### Architecture & Tech Stack
- **Frontend:** HTML5, modern CSS3 (Custom Properties/Variables, Flexbox, Grid, no Tailwind), Vanilla JavaScript (ES6+).
- **State Management:** LocalStorage API to simulate a database.
- **Routing:** Since there are many pages, we will implement a lightweight Single Page Application (SPA) architecture using a hash-based router. This is the optimal way to manage complex LocalStorage state (authentication, bookings) without losing it or having to parse it on 18 different page loads. It also allows for smooth page transitions.
- **Styling:** A central design system with modern colors, typography (e.g., Inter/Outfit), card layouts, and subtle animations for a premium feel. 

### Directory Structure
```text
service_booking_system/
├── index.html               (Main entry and SPA shell)
├── assets/                  (Images, icons, generated mockups)
├── css/
│   ├── style.css            (Global styles, typography, variables)
│   ├── components.css       (Buttons, inputs, cards, badges)
│   └── layout.css           (Header, footer, navigation, grids)
├── data/
│   └── dummy_data.js        (Initial mock dataset for providers, services, etc.)
├── js/
│   ├── app.js               (Main initialization and router)
│   ├── store.js             (LocalStorage wrapper, handle CRUD operations)
│   ├── auth.js              (Session management, login/logout logic)
│   ├── components/          (Functions to generate HTML for reusable UI parts)
│   │   ├── header.js
│   │   ├── providerCard.js
│   │   └── reviewItem.js
│   └── pages/               (Page-specific rendering and logic)
│       ├── home.js
│       ├── search.js
│       ├── dashboards/      (admin.js, client.js, provider.js)
│       └── authPages.js     (Login/Signup rendering for all roles)
```

### Key Modules

#### `store.js` (The Mock Database)
Will initialize LocalStorage with dummy data if empty. The main entities are:
- `users`: (Role: admin, client, provider, auth credentials).
- `providers`: Profile details (Service type, area, rating, availability, pricing, bio).
- `bookings`: Service requests linking a client and provider (Status: pending, confirmed, in-progress, completed).
- `reviews`: Ratings and feedback left by clients for completed bookings.
- `services`: Categories (Electrician, Plumber, AC Repair, etc.).

#### 10 Core Workflows & Pages
1. **Public/Landing:** Home (Hero, Categories, Top Providers), About, Services list.
2. **Auth:** Dynamic login/signup for Client/Provider, and Login for Admin.
3. **Search & Discovery:** Search bar resolving to a Results page with filters (Area, Service, Rating). **(Crucial requirement constraint met)**
4. **Provider Details:** Full profile view with reviews, experience, and availability.
5. **Booking Flow:** Form to select date/time/address and submit booking request.
6. **Client Dashboard:** Manage profile, view booking history, and submit reviews for completed jobs.
7. **Provider Dashboard:** View requests, Accept/Reject, change status to In Progress / Completed, edit profile and availability.
8. **Admin Dashboard:** View all clients, manage (approve/block) providers, manage categories, oversee all bookings.

## User Review Required

> [!IMPORTANT]  
> 1. **Routing Approach:** I have proposed a Single Page Application (SPA) approach using a simple Vanilla JS router for this project. Given the complexity of sharing state (login status, booking data) across 18+ different views, an SPA is much cleaner than 18 separate HTML files. Is an SPA approach using Vanilla JS acceptable to you?
> 2. **Build Tooling:** To keep things as simple and "beginner-friendly" as possible, I can build this without any bundlers (no Vite/NPM required, just dropping the files in a folder and using a basic local server to view). Please confirm if you want a pure HTML/CSS/JS without build tools.

## Open Questions

> [!NOTE]  
> Do you have a specific color theme in mind, or should I design a premium, trustworthy palette (e.g., Primary Royal Blue paired with dark grays and clean white backgrounds)?

## Verification Plan

### Manual Verification
- Verify the UI aesthetics: Clean, card-based layout, modern colors, and mobile responsiveness.
- Complete the full happy-path flow: 
    1. Register as Client.
    2. Search for "Plumber" in an area.
    3. View the provider's details and reviews.
    4. Book the service.
    5. Register as the Provider, view the incoming booking, and Accept it.
    6. Mark as Completed.
    7. Client logs back in and leaves a Review.
- Verify Admin capabilities (view counts, block users).
- Validate that all Data persists and updates accurately across page navigations using LocalStorage representations.
