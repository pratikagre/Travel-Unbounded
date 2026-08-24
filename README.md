# Travel Unbounded Website (Phase 1 Assignment)

Travel Unbounded is a full-stack, responsive travel agency website built using **Next.js (App Router)**, **Tailwind CSS**, and **MongoDB**. The platform showcases domestic (India) and international destination packages, highlights the company story and locations, and persists booking leads through a fully validated travel enquiry form with local and server-side validation.

---

## 🚀 Live Demo & Repository
- **Live Deployed App (Vercel):** [https://travel-unbounded.vercel.app](https://travel-unbounded.vercel.app) *(or your Vercel deployment link)*
- **GitHub Repository:** [https://github.com/pratikagre/Talk-a-Tive](https://github.com/pratikagre/Talk-a-Tive)

---

## 🛠️ Tech Stack
- **Frontend Framework:** Next.js 16 (App Router)
- **Styling & Icons:** Tailwind CSS v4, Lucide React
- **Database:** MongoDB (via Mongoose ODM)
- **Backend APIs:** Next.js Route Handlers (`/api/enquiry`)
- **Server Environment:** Node.js v22
- **Deployment:** Vercel (recommended)

---

## ✨ Features
1. **Responsive Home Page:**
   - Full-width hero banner with a call to action.
   - Domestic (India) packages section featuring Kerala, Himachal Pradesh, Ladakh, Andaman, and Goa.
   - International packages section featuring Kenya, Vietnam, Tanzania, Iceland, and Sri Lanka.
   - Reusable card component architecture detailing pricing, country tags, descriptions, and custom "Enquire" buttons.
2. **About Us Page:**
   - Full story of the company rephrased for engagement.
   - Detailed office addresses for Bengaluru HQ, Kochi Office, and Nairobi Office with Google Maps quick links.
   - "Why Choose Us" core values block.
3. **Contact / Plan Trip Page:**
   - Custom booking enquiry form with client-side field validation.
   - **Pre-filling Query Logic:** Clicking "Enquire" on any destination card pre-selects the destination of interest automatically.
   - Custom country code telephone selector (e.g. +91, +1, +44, +254, etc.).
   - Client-side validation: Required checks, email validation, phone digit constraint (7-15 digits), and travel date in the future.
   - Proper UI loading, success state, and error toast elements (avoiding default browser `alert()`).
4. **Server-Side Validation:**
   - Strict API-level validation verifying all submitted data (phone digits, email format, future dates, people bounds, hotel enum types) before database insertion.
5. **Bonus Admin Dashboard (`/admin`):**
   - High-level analytics cards: Total Leads, Total Travelers, Hotel Selection breakdown.
   - Real-time tabular display of all leads sorted by newest first (`createdAt: -1`).
   - Dynamic search filters: Filter by Name/Email/Destination, Destination Category, and Hotel Class.
   - Manual data refresh capability.

---

## 📂 Project Structure
```
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout with Navbar and Footer
│   │   ├── page.js                # Home Page (Hero, grids, cards)
│   │   ├── about/
│   │   │   └── page.js            # About Page (Story, values, offices)
│   │   ├── contact/
│   │   │   └── page.js            # Contact Page (Suspense boundary, details)
│   │   ├── admin/
│   │   │   └── page.js            # Admin Dashboard (Analytics, table)
│   │   └── api/
│   │       └── enquiry/
│   │           └── route.js       # API route for GET & POST enquiries
│   ├── components/
│   │   ├── Navbar.js              # Responsive Header with Mobile Menu
│   │   ├── Footer.js              # Footer with links and addresses
│   │   ├── DestinationCard.js     # Reusable destination package card
│   │   ├── BookingForm.js         # Validated React form component
│   │   └── Toast.js               # Success/Error notification banner
│   ├── data/
│   │   └── destinations.js        # Hardcoded local packages JSON/JS array
│   └── lib/
│       ├── db.js                  # Next.js hot-reload safe MongoDB connection
│       └── models/
│           └── Enquiry.js         # Mongoose schema for enquiries
├── .env.example                   # Template env configurations
├── .env.local                     # Local secrets (ignored in git)
├── jsconfig.json                  # Absolute imports configuration (@/*)
├── package.json                   # Project scripts and dependencies
└── README.md                      # Documentation
```

---

## 🔧 Local Installation & Setup

### Prerequisites
- Node.js v18+ (Node v20+ recommended)
- Local MongoDB running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection string.

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/pratikagre/Talk-a-Tive.git
   cd Talk-a-Tive
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env.local` file in the root folder (modeled after `.env.example`):
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/travel_unbounded
   # For production deployment, use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/travel_unbounded?retryWrites=true&w=majority
   ```
4. **Run the local development server:**
   ```bash
   npm run dev
   ```
5. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 API Endpoints

### `POST /api/enquiry`
- **Description:** Submits and validates a booking lead before saving to the database.
- **Payload:**
  ```json
  {
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "countryCode": "+91",
    "contactNumber": "9876543210",
    "dateOfTravel": "2026-10-15",
    "numberOfPeople": 2,
    "hotelCategory": "Deluxe",
    "numberOfChildren": 1,
    "destination": "Kerala"
  }
  ```
- **Responses:**
  - `201 Created` (Success): `{ "success": true, "message": "Enquiry submitted successfully", "data": {...} }`
  - `400 Bad Request` (Invalid input): `{ "success": false, "errors": ["Date of travel must be in the future."] }`
  - `500 Internal Server Error` (Database or server down): `{ "success": false, "errors": ["Internal Server Error..."] }`

### `GET /api/enquiry`
- **Description:** Returns all stored enquiries from the database, sorted newest first.
- **Response:**
  - `200 OK`: `{ "success": true, "data": [...] }`

---

## 🛠️ Automated & Manual Verification
To ensure production quality, local tests are included:
1. **Database Test:** `scratch/test_db.js` connects, inserts, queries, and cleans up dummy data to verify the mongoose schema and connection logic.
2. **API Validations Test:** `scratch/test_api.js` spawns test cases against `/api/enquiry` (both valid and invalid payloads) to verify that bad requests are rejected with status 400 and helpful descriptions, and valid requests are stored with status 201.
3. Run test suites locally using:
   ```bash
   # Run DB Connection test
   node --env-file=.env.local src/lib/db.js # or self-contained script

   # Run API validations test
   node scratch/test_api.js
   ```

---

## 💡 Assumptions Made & Features Skipped
- **Admin Authentication:** For the scope of Phase 1, access control (e.g. login/passwords, NextAuth) has been omitted on the `/admin` page to allow easy verification of lead persistence by the evaluation team. In a production build, this route would be restricted by middleware and roles.
- **Destination Data:** Kept static inside `src/data/destinations.js` as allowed by section 3.1 & 9, avoiding database roundtrips for packages.
- **Country Dialing Codes:** Populated a list of common country codes natively inside `components/BookingForm.js` to ensure zero-dependency, styling-consistent layout compatibility.
