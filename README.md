# PLETHORA // Public Diary

<img src="./frontend/public/og-preview.gif" alt="Header image" width="100%" height="auto">

**Current Build:** v1.0.0-alpha or something (August 2026)

**State:** Under development

## Description

Plethora is a digital release valve designed for the public, anonymous offloading of personal burdens—whether emotional, relational, or existential. It's built on the premise that while the things we carry feel deeply isolating, the act of releasing them doesn't have to be.

Rather than siloing user data or encouraging curated highlight reels, Plethora forces users into a shared, uncurated stream of human experience. The visual language reflects this tension: a glitched, tech nature aesthetic layered over minimalist brutalism. It’s raw, stark, and unpolished by design, stripping away the noise of typical social platforms to leave only the unvarnished signal.

---

## Premise & Structural Constraints

This architecture was shaped by three specific constraints that dictate both the system's structure and the user's psychology:

*   **The Human Truth: "No one should do this alone"**
    This is the foundation of the platform. Plethora exists because carrying things in isolation is inherently heavy. The app provides a space to externalize internal weight.
*   **The Behavioral Twist: "Every action is publicly visible"**
    Total anonymity meets total exposure. When an issue is uploaded, it isn't locked away; it is thrust out into the open. You are completely unnamed, but you are entirely perceived. This creates a strange, shared vulnerability—everyone is speaking into the void, but the void is watching back.
*   **The Build Constraint: "There is no search bar"**
    This is the most critical structural mechanism of the app. By removing the ability to search, we remove the user's ability to curate, filter, or hunt for specific content. You cannot seek out people who share your exact problem. Instead, you are confronted with a collective, uncurated stream of human experience exactly as it arrives. It forces serendipity, demands presence, and prevents the platform from becoming a tool for confirmation bias.

---

## Table of Contents

- [Description](#description)
- [Premise & Structural Constraints](#premise--structural-constraints)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Data Model](#data-model)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)

---

## How It Works

Plethora operates on a decoupled client-server architecture, prioritizing raw CSS mechanics and optimized relational databases over bloated JavaScript libraries.

*   **Unified Auth Flow:** A single-card interface morphs dynamically between Login and Signup modes without page reloads. This is achieved mathematically by placing conditional inputs inside a CSS Grid and animating `grid-template-rows` from `0fr` to `1fr`.
*   **Cryptographic Handshakes:** The platform supports traditional email authentication alongside direct Google OAuth integration, dynamically mapping Google profiles to the internal database.
*   **Session Broadcasting:** A global React Context (`AuthContext`) tracks the browser's `localStorage` to keep the application state fully self-aware. If a session is active, the DOM automatically re-renders global elements (like shifting the Navbar from "Sign In" to "Account").
*   **Database Normalization:** To prevent data anomalies, Usernames are strictly stored in the `users` table. Entries and comments tie back via `user_id`. Furthermore, drafts and published posts share the same database tables, utilizing a `status ENUM` to eliminate schema drift.
*   **Cascading Deletes:** Foreign keys utilize `ON DELETE CASCADE`. If a node (user) is deleted, the database automatically burns down their entire data tree (entries, comments, likes) at the root level.

---

## Tech Stack

| **Frontend** | **Purpose** | **Backend** | **Purpose** |
| :--- | :--- | :--- | :--- |
| **React (Vite)** | UI framework & component library | **Node.js** | Runtime environment |
| **React Router** | SPA Navigation & Route Protection | **Express.js** | HTTP routing and middleware |
| **React Context** | Global state management (Auth) | **MySQL2** | Relational Database Driver |
| **Vanilla CSS** | Glassmorphism & Grid animations | **Google OAuth** | Identity Verification |

---

## Setup & Installation

To spin up the machine locally, you must boot the Database, the Engine, and the Grid in sequence.

### Prerequisites
*   Node.js (v18 or higher)
*   A local MySQL server (e.g., XAMPP or MAMP)

### 1. Ignite the Vault (Database)
1. Start your local Apache and MySQL modules.
2. Open your database manager (like phpMyAdmin) and create a new database named exactly: `plethora`.
3. Locate the `schema.sql` file in the `backend/` directory of this repository.
4. Run the SQL script inside the `plethora` database to inject the table architecture.

### 2. Ignite the Engine (Backend)
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the Node/Express server
node server.js
```

### 3. Ignite the Grid (Frontend)
```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Boot the Vite development server
npm run dev
```

---

## Environment Configuration

Create `.env` files in both the `frontend` and `backend` directories. Ensure these are added to your `.gitignore`.

**In `backend/.env`:**
| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Server port | `5000` |
| `DB_HOST` | Database host | `localhost` |
| `DB_USER` | MySQL Username | `root` |
| `DB_PASSWORD` | MySQL Password | *(Leave blank if using default XAMPP)* |
| `DB_NAME` | Database container | `plethora` |

**In `frontend/.env`:**
| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `123456789-abc.apps.googleusercontent.com` |

---

## API Endpoints

**Base URL:** `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/status` | Verify database connection pool | None |
| `POST` | `/signup` | Register a new user | `{ username, email, password }` |
| `POST` | `/login` | Authenticate existing user | `{ email, password }` |
| `POST` | `/google-auth` | Verify token & handle OAuth login/signup | `{ accessToken }` |

---

## Data Model

The relational blueprint is designed for structural efficiency and cascading integrity. 

### Users Schema
```sql
id INT AUTO_INCREMENT PRIMARY KEY
username VARCHAR(50) UNIQUE NOT NULL
email VARCHAR(255) UNIQUE NOT NULL
password_hash VARCHAR(255) NULL
created_at TIMESTAMP
```

### Entries Schema
*(Handles both published posts and private drafts via the `status` enum)*
```sql
id INT AUTO_INCREMENT PRIMARY KEY
user_id INT NOT NULL (FOREIGN KEY ON DELETE CASCADE)
title VARCHAR(255)
content TEXT
status ENUM('draft', 'published') DEFAULT 'draft'
created_at TIMESTAMP
updated_at TIMESTAMP
```

### Comments Schema
```sql
id INT AUTO_INCREMENT PRIMARY KEY
user_id INT NOT NULL (FOREIGN KEY ON DELETE CASCADE)
entry_id INT NOT NULL (FOREIGN KEY ON DELETE CASCADE)
content TEXT
status ENUM('draft', 'published') DEFAULT 'draft'
created_at TIMESTAMP
```

### Likes Schema
*(Junction table preventing duplicate actions via a composite primary key)*
```sql
user_id INT NOT NULL (FOREIGN KEY ON DELETE CASCADE)
entry_id INT NOT NULL (FOREIGN KEY ON DELETE CASCADE)
PRIMARY KEY (user_id, entry_id)
```

---

## Project Structure

```text
plethora/
├── frontend/                     # React (Vite) client
│   ├── public/                   # Static assets (images, fonts, SVGs)
│   ├── src/
│   │   ├── assets/               # Local images & backgrounds
│   │   ├── components/           # Reusable UI components (Navbar)
│   │   ├── context/              # Global state (AuthContext)
│   │   ├── pages/                # Route views (Auth, Discover, Share, Legal)
│   │   ├── App.jsx               # Route definitions
│   │   └── main.jsx              # React entry point & Providers
│   └── package.json
│
├── backend/                      # Node.js + Express engine
│   ├── schema.sql                # Master database architecture
│   ├── server.js                 # Express app setup & API routing
│   └── package.json
│
├── .gitignore                    # Root ignore rules
└── README.md                     # This file
```

---

## License & Contact

Designed and developed by **BVLTRA**. 

This project's license is to be determined.


