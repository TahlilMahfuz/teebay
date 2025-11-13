# 🛍️ Teebay - Marketplace Platform

> A modern full-stack marketplace application for buying, selling, and renting products with real-time synchronization and secure authentication.

![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)
![GraphQL](https://img.shields.io/badge/GraphQL-Latest-e10098.svg)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)

---

## Overview

**Teebay** is a comprehensive marketplace platform that enables users to buy, sell, and rent products seamlessly. Built with modern technologies, it provides a secure, scalable, and user-friendly experience with real-time data synchronization between client and server.

### Key Highlights

- 🔐 Secure JWT-based authentication
- 📊 Real-time data synchronization with polling
- 🎨 Modern UI with Mantine component library
- 🚀 GraphQL API for efficient data fetching
- 🐳 Docker containerization for easy deployment
- ✅ Comprehensive test coverage with Jest & Supertest

---

## Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) | UI Library |
| ![Apollo Client](https://img.shields.io/badge/-Apollo%20Client-311C87?logo=apollographql&logoColor=white) | GraphQL Client |
| ![Mantine](https://img.shields.io/badge/-Mantine-339AF0?logo=mantine&logoColor=white) | Component Library |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | Build Tool |

### Backend

| Technology | Purpose |
|-----------|---------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | Runtime |
| ![Apollo Server](https://img.shields.io/badge/-Apollo%20Server-311C87?logo=apollographql&logoColor=white) | GraphQL Server |
| ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white) | ORM |
| ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white) | Database |

### DevOps & Testing

| Technology | Purpose |
|-----------|---------|
| ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white) | Containerization |
| ![Jest](https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white) | Unit Testing |
| ![Supertest](https://img.shields.io/badge/-Supertest-000000?logo=npm&logoColor=white) | GraphQL Endpoint Testing |

---

## Features

### Authentication & Authorization

- **User Registration** with comprehensive input validation
- **Secure Login** with JWT token-based authentication
- **Protected Routes** - Only authenticated users can perform certain actions
- **JWT Context** - Token automatically included in all GraphQL requests
- **Session Management** - Automatic token validation on each request

### Product Management

- **Add Products** - Create new products (authenticated users only)
- **Edit Products** - Modify product details (owner only)
- **Delete Products** - Remove products from marketplace (owner only)
- **View Tracking** - Automatic view count updates stored in database
- **Product Visibility** - Edit/Delete buttons hidden for non-owners

### Purchase System

- **Buy Products** - Secure purchase functionality
- **Ownership Validation** - Users cannot buy their own products
- **Purchase Status** - Buy button disabled if product already sold
- **Transaction History** - Track all purchases in user activity

### Rental System

- **Rent Products** - Flexible rental options
- **Overlap Prevention** - Prevents overlapping rental periods
- **Ownership Validation** - Users cannot rent their own products
- **Rental History** - Complete rental tracking in user activity

### User Activity Dashboard

- **Purchase History** - View all bought products with details
- **Sales History** - Track all sold products
- **Rental History** - Monitor rented products
- **Lending History** - Track lent products
- **Activity Disabled** - Dashboard unavailable for non-authenticated users

### Data Synchronization

- **Client-Server Polling** - Real-time data consistency checks
- **Automatic Sync** - Detects and resolves inconsistencies
- **State Management** - Maintains accurate state across sessions

---

## Project Structure

```bash
teebay/
├── 🟡 🚫 **.gitignore**
├── 📂 client/
│   ├── 📂 .vite/
│   │   └── 📂 deps/
│   │   │   ├── ⚙️ _metadata.json
│   │   │   └── 🔴 📦 **package.json**
│   ├── 🟡 🐳 **Dockerfile**
│   ├── 📜 eslint.config.js
│   ├── 🌐 index.html
│   ├── 🟡 🔒 **package-lock.json**
│   ├── 🔴 📦 **package.json**
│   ├── 📜 postcss.config.js
│   ├── 📁 src/
│   │   ├── ⚛️ App.tsx
│   │   ├── 🧩 components/
│   │   │   ├── 📂 card/
│   │   │   ├── 📂 modals/
│   │   │   ├── 📂 slides/
│   │   │   └── 📂 tables/
│   │   ├── 📂 contexts/
│   │   ├── 🎨 index.css
│   │   ├── 📚 lib/
│   │   ├── ⚛️ main.tsx
│   │   ├── 📄 pages/
│   │   ├── 📂 services/
│   │   └── 🔷 vite-env.d.ts
│   ├── 🟡 🎨 **tailwind.config.js**
│   ├── ⚙️ tsconfig.app.json
│   ├── 🟡 🔷 **tsconfig.json**
│   ├── ⚙️ tsconfig.node.json
│   └── 🔷 vite.config.ts
├── 🟡 🐳 **docker-compose.yml**
├── 📖 documentation.md
├── 🟡 🔒 **package-lock.json**
├── 📖 project_structure.md
├── 🔴 📖 **README.md**
└── 📂 server/
│   ├── 🟡 🚫 **.gitignore**
│   ├── 📜 babel.config.js
│   ├── 🟡 🐳 **Dockerfile**
│   ├── 📄 jest.config.mjs
│   ├── 🟡 🔒 **package-lock.json**
│   ├── 🔴 📦 **package.json**
│   ├── 📂 prisma/
│   │   ├── 📂 migrations/
│   │   ├── 📄 schema.prisma
│   │   └── 📜 seed.js
│   ├── 📁 src/
│   │   ├── ⚙️ config/
│   │   │   └── 📜 db.js
│   │   ├── 📂 graphql/
│   │   │   ├── 📂 resolvers/
│   │   │   ├── 📜 schema.js
│   │   │   └── 📂 typeDefs/
│   │   ├── 📜 index.js
│   │   ├── 📂 middleware/
│   │   ├── 📂 modules/
│   │   │   ├── 📂 product/
│   │   │   │   ├── 📂 repository/
│   │   │   │   └── 📂 service/
│   │   │   └── 📂 user/
│   │   └── 🔧 utils/
│   └── 📂 test/
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **Docker** & **Docker Compose**
- **Git**
- **npm** or **yarn** package manager

### Clone the Repository

```bash
git clone https://github.com/yourusername/teebay.git
cd teebay
```

---

## Installation

### Step 1: Environment Configuration

Create three `.env` files for Client, Server, and Teebay folder:

#### Client `.env` (client/.env)

```env
VITE_GRAPHQL_ENDPOINT=
```

#### Server `.env` (server/.env)

```env
DATABASE_URL=
PORT=
JWT_SECRET=
```

#### Teebay `.env`

```env
# Teebay .env
DATABASE_URL=postgresql://{username}:{password}@postgres:5432/teebay_db?schema=public
PORT=4000

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=teebay_db
```

### Step 2: Build and Run with Docker

```bash
docker compose up --build
```

This command will:

- Build Docker images for client and server
- Start PostgreSQL database
- Start Apollo Server on port 4000
- Start React client on port 5173

---

## Running the Application

### Access Points

Once the application is running:

- **Client (React)**: [http://localhost:5173](http://localhost:5173)
- **Apollo Server**: [http://localhost:4000](http://localhost:4000)
- **GraphQL Playground**: [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Development Mode

For local development without Docker:

```bash
# Terminal 1 - Start Server
cd server
npm install
npm run dev

# Terminal 2 - Start Client
cd client
npm install
npm run dev
```

---

## API Documentation

### Authentication Flow

```bash
1. User Registration/Login
   ↓
2. JWT Token Generated
   ↓
3. Token Stored in Apollo Client Context
   ↓
4. Token Included in Every GraphQL Request
   ↓
5. Server Validates Token
   ↓
6. Request Processed or Rejected
```

## Testing

### Prerequisites

Before running tests, ensure your database is properly set up:

```bash
cd server
npx prisma migrate reset
npx prisma db seed
```

These commands will:

- Reset the database to a clean state
- Apply all migrations
- Seed the database with initial test data

### Running Tests

```bash
cd server
npm run test
```

### Test Results

All tests are passing with comprehensive coverage across the application:

| Metric | Result |
|--------|--------|
| **Test Suites** | 8 passed, 8 total ✅ |
| **Tests** | 30 passed, 30 total ✅ |
| **Execution Time** | 2.007s |
| **Snapshots** | 0 total |

### Code Coverage

| Coverage Type | Percentage |
|---------------|-----------|
| **Statements** | 85.88% |
| **Branches** | 75% |
| **Functions** | 87.8% |
| **Lines** | 89.85% |

### Coverage by Module

| Module | Statements | Branches | Functions | Lines | Notes |
|--------|-----------|----------|-----------|-------|-------|
| **config** | 100% | 100% | 100% | 100% | ✅ Full coverage |
| **modules/product/repository** | 84.33% | 64.7% | 88% | 88.88% | - |
| **modules/product/service** | 81.63% | 81.81% | 87.5% | 85.71% | - |
| **modules/user** | 100% | 100% | 100% | 100% | ✅ Full coverage |
| **utils** | 88.88% | 66.66% | 75% | 100% | - |

### Test Suites

The project includes 8 comprehensive test suites:

- ✅ **buyProduct.test.js** - Purchase functionality
- ✅ **userActivity.test.js** - User activity tracking
- ✅ **deleteProduct.test.js** - Product deletion
- ✅ **loginUser.test.js** - User authentication
- ✅ **rentProduct.test.js** - Rental functionality
- ✅ **editProduct.test.js** - Product editing
- ✅ **createProduct.test.js** - Product creation
- ✅ **registerUser.test.js** - User registration

### Test Coverage Details

#### High Coverage Areas (100%)

- Database configuration
- User repository and service layer
- Rental product transactions

#### Areas for Improvement

- Product repository (70.96% statements, 30% branches)
- Rent product service (71.42% statements)
- Hash utility (88.88% statements, 66.66% branches)

---

## Contributing

*Made with 💪✨ Effort & Dedication by K.M. Tahlil Mahfuz Faruk*

---
