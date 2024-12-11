# **Bike Store - Backend API**

**Bike Store** is a backend API for managing a Bike Store, developed using **Express**, **TypeScript**, and **MongoDB**. The API provides features for managing bike products, processing orders, and tracking inventory, all with robust validation and error handling.

## **Live Demo**

[Live Link](https://your-api-link.com/) _(Replace with your actual live demo link)_

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)

## **Project Overview**

The **Bike Store** API allows you to manage bike products and customer orders. It supports CRUD operations for products, tracks inventory, and calculates revenue from orders. Built with **Express** for the backend and **MongoDB** for storage, this API ensures seamless management of bike data.

## **Objectives**

- **Manage Bike Products**: Add, update, delete, and retrieve bike products.
- **Order Management**: Handle customer orders, track product inventory, and update stock levels.
- **Revenue Calculation**: Calculate total revenue from all orders using MongoDB aggregation.
- **Data Integrity**: Use Mongoose schema validation to ensure correct data handling.
- **Error Handling**: Robust error handling for common issues like insufficient stock or invalid input.

## **Core Features**

1. **Product Management**:
   - Add, update, delete, and retrieve bike products with detailed information (name, brand, price, category, etc.).
2. **Order Management**:
   - Place orders with validation for available stock.
   - Inventory is updated automatically when an order is placed.
3. **Revenue Calculation**:

   - Calculate total revenue from all completed orders using MongoDB aggregation.

4. **Error Handling**:
   - Returns appropriate error messages for validation issues (e.g., invalid data, insufficient stock) and ensures smooth API usage.

## **Technology Stack**

- **Frontend**: N/A (Backend API)
- **Backend**: Express.js, TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: N/A (API doesn't include user authentication)
- **Validation**: Mongoose schema validation
- **Deployment**: (Provide if deployed on a cloud platform like Heroku, Vercel, etc.)

## **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/bike-store-backend.git


   cd bike-store-backend

   npm install
   ```
