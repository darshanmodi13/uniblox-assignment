# Uniblox E-Commerce Platform

A full-stack e-commerce platform built with modern web technologies. The platform includes product browsing, shopping cart functionality, coupon system, order management, and an admin dashboard.

## 🚀 Links

- **Git Repository**: [https://github.com/darshanmodi13/uniblox-assignment.git](https://github.com/darshanmodi13/uniblox-assignment.git)
- **Postman Collection**: [Postman Collection URL](https://darshanmodi300-7909464.postman.co/workspace/Darshan's-Workspace~2f594e4c-f830-4d13-8d46-61ac1e3939c7/collection/51084460-b334f629-9757-4b6f-af0a-d21639528e46?action=share&creator=51084460&active-environment=51084460-de0d4b91-e496-4f44-a7f8-92e9308f5275)
- **Backend Hosted URL**: [Backend Deployment URL](https://uniblox-assignment-jl5q.onrender.com)
- **Frontend Hosted URL**: [Frontend Deployment URL](https://uniblox-assignment-one.vercel.app/)

## 📋 Table of Contents

- [Backend](#backend)
- [Frontend](#frontend)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Backend

A robust REST API built with Node.js, TypeScript, and Express.js for managing the e-commerce platform's data and business logic.

### Backend Features

- **Product Management**: Retrieve product listings with pricing, stock, and ratings
- **Order Processing**: Create and manage customer orders with discount calculations
- **Coupon System**: Generate, validate, and apply discount coupons
- **Input Validation**: Comprehensive request validation using Zod schemas
- **Error Handling**: Centralized error handling with custom error classes
- **Security**: Helmet for security headers, CORS support, HPP protection
- **Performance**: Compression middleware for optimized responses

### Backend Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Validation**: Zod
- **Testing**: Jest with Supertest
- **Linting**: ESLint with TypeScript rules
- **Security**: Helmet, CORS, HPP
- **Development**: Nodemon, ts-node

## Frontend

A modern React-based user interface built with Next.js, featuring a responsive design and intuitive user experience.

### Frontend Features

- **Product Catalog**: Browse products with images, prices, and ratings
- **Shopping Cart**: Add/remove items, apply coupons, calculate totals
- **Admin Dashboard**: Manage coupons, view orders, monitor statistics
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Client-side validation with React Hook Form and Zod
- **State Management**: React Query for server state, Context API for cart
- **UI Components**: Radix UI components with custom styling

### Frontend Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query, Context API
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **UI Library**: Radix UI
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Features

### Core Features

- 🛍️ **Product Browsing**: View product catalog with images and details
- 🛒 **Shopping Cart**: Add items, manage quantities, apply discounts
- 🎫 **Coupon System**: Generate and validate discount coupons
- 📊 **Admin Dashboard**: Monitor orders, manage coupons, view statistics
- 💳 **Order Management**: Create orders with automatic discount application
- 🔒 **Input Validation**: Comprehensive validation on both client and server
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

### Business Logic

- **Smart Coupons**: Coupons are generated based on order intervals (every nth order)
- **Discount Calculation**: Automatic discount application during checkout
- **Stock Management**: Track product inventory and availability
- **Order History**: Complete order tracking and management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/darshanmodi13/uniblox-assignment.git
   cd uniblox-assignment
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. Create environment files (optional):
   - Backend: Create `.env` in `backend/` directory
   - Frontend: Create `.env.local` in `frontend/` directory

## Usage

### Development

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

   Backend will run on `http://localhost:8080`

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

### Production

1. Build and start the backend:

   ```bash
   cd backend
   npm run build
   npm start
   ```

2. Build and start the frontend:
   ```bash
   cd frontend
   npm run build
   npm start
   ```

## API Endpoints

### Health Check

- `GET /api/health` - Check server status

### Products

- `GET /api/products` - Get all products

### Coupons

- `POST /api/coupons/create` - Create a new coupon
  - Body: `{ "nthOrder": number, "code": string }`
- `GET /api/coupons/list` - Get all coupons
- `POST /api/coupons/validate` - Validate a coupon code
  - Body: `{ "code": string, "userId": string }`

### Orders

- `POST /api/orders/create` - Create a new order
  - Body: `{ "userId": string, "items": OrderItem[], "couponCode": string? }`
- `GET /api/orders/list` - Get all orders

## Data Types

### Product

```typescript
{
	id: string;
	name: string;
	description: string;
	image: string;
	price: number;
	sellingPrice: number;
	stock: number;
	rating: number;
}
```

### Coupon

```typescript
{
	code: string;
	nthOrder: number;
	discountPercent: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}
```

### Order

```typescript
{
  orderId: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  discountApplied: boolean;
  discountAmount: number;
  finalAmount: number;
  couponCode: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

## Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Testing

```bash
cd frontend
npm run lint
```

## Code Quality

### Backend

```bash
cd backend
npm run lint    # Check linting
npm run build   # Build TypeScript
```

### Frontend

```bash
cd frontend
npm run lint    # Check linting
npm run build   # Build for production
```

## Error Handling

### Backend

- Custom `AppError` class with status codes
- Zod validation error handling
- Centralized error middleware
- 404 handling for unknown routes

### Frontend

- React Query error boundaries
- Form validation with error messages
- Toast notifications for user feedback
- Loading states for better UX

## Security Features

### Backend

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **HPP**: HTTP parameter pollution protection
- **Input Validation**: Zod schema validation

### Frontend

- **TypeScript**: Type safety
- **Input Sanitization**: Form validation
- **Secure HTTP**: Axios with proper error handling
