Pastebin-like Application (Full Stack)

A simple Pastebin-style full-stack application that allows users to create, view, and retrieve pastes with optional expiry time and view limits.
The application consists of a backend API and a frontend UI, both documented here.

🚀 Running the App Locally

Prerequisites
Node.js (v18+ recommended)
An Upstash Redis account (free tier is sufficient)

1️⃣ Clone the repository
git clone https://github.com/Santosh-Kusma/pastebin-lite.git
cd pastebin-lite

2️⃣ Backend setup
cd backend
npm install


Create a .env file in the backend folder:
PORT=3000
UPSTASH_REDIS_URL=your_upstash_redis_url
UPSTASH_REDIS_TOKEN=your_upstash_redis_token

# Optional: enables deterministic time for testing
TEST_MODE=1

Start the backend:
npm run start

Backend runs at:
http://localhost:3000

3️⃣ Frontend setup
cd ../frontend
npm install

Create a .env file in the frontend folder:
VITE_SERVER_URL=http://localhost:3000

Start the frontend:
npm run dev

Frontend runs at:
http://localhost:5173


🧠 Important Design Decisions

1️⃣ Deterministic Time for Testing
When TEST_MODE=1 is enabled and requests include:

x-test-now-ms: <milliseconds since epoch>

this value is treated as the current time for expiry logic only.
This allows automated tests to simulate time progression predictably.

2️⃣ Clear Separation of Concerns
Controllers → HTTP request/response handling
Services → business logic (expiry, view limits)
Repositories → Redis access
Utilities → shared helpers (time handling, HTML rendering)

3️⃣ API vs Web Routes
/api/* routes return JSON responses
/p/:id returns HTML for browser viewing


📌 Summary
Full-stack Pastebin-style app (Frontend + Backend)
Persistent storage using Redis (Upstash)
Deterministic expiry support for reliable testing
Secure HTML rendering
Serverless-friendly design
Clean, maintainable architecture

Author
Santosh Kusma

