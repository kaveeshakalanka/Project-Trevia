# 🛍️ Trevia - Fashion E-Commerce Platform

A modern, full-stack e-commerce application built with **Spring Boot** and **React**. Trevia provides a complete online shopping experience with user authentication, product browsing, cart management, and order processing.
---
![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17
- **Database**: MySQL 8.0
- **Security**: Spring Security
- **ORM**: Spring Data JPA / Hibernate
- **Session**: Spring Session JDBC
- **Cloud Storage**: Cloudinary (image uploads)

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Icons**: React Icons

---
## 📁 Project Structure

```
Trevia/
├── backend/
│   └── src/main/java/com/trevia/trevia_catalog/
│       ├── config/          # Security, CORS, Password config
│       ├── controller/      # REST API endpoints
│       ├── dto/             # Data Transfer Objects
│       ├── entity/          # JPA Entities
│       ├── exception/       # Custom exceptions
│       ├── repository/      # Data access layer
│       ├── security/        # Auth filters, services
│       ├── service/         # Business logic
│       └── util/            # Utility classes
│
├── frontend/
│   └── src/
│       ├── api/             # Axios API clients
│       ├── components/      # Reusable UI components
│       ├── context/         # React Context (Auth, Cart)
│       ├── pages/           # Page components
│       │   ├── admin/       # Admin dashboard pages
│       │   └── supplier/    # Supplier pages
│       └── utils/           # Helper functions
│
└── README.md
```
## ✨ Features

### 👤 User Management
- User registration and authentication
- Role-based access control (User, Admin, Supplier)
- Session-based authentication with secure cookies
- Profile management

### 🛒 Shopping Experience
- Browse products by category (Men, Women, Kids, Unisex, Accessories)
- Search products with real-time filtering
- Size selection for clothing items
- Shopping cart with quantity management
- Multiple payment options (Card / Cash on Delivery)

### 📦 Order Management
- Secure checkout process
- Order history with status tracking
- Real-time order notifications
- Admin order management dashboard

### 👨‍💼 Admin Dashboard
- Product CRUD operations
- Category management
- User management
- Order status updates (Pending → Shipped → Delivered)
- Delete orders

### 📊 Supplier Features
- Warehouse management
- Inventory tracking
- Stock level monitoring

---

## 🔒 Security Features

| Feature | Implementation |
|---------|----------------|
| SQL Injection Protection | Spring Data JPA (parameterized queries) |
| Password Security | BCrypt hashing |
| CSRF Protection | Cookie-based tokens |
| Rate Limiting | 100 requests/minute per IP |
| Input Validation | Jakarta Bean Validation |
| Role-Based Access | Spring Security |


### Backend Setup

1. **Create the database**
   ```sql
   CREATE DATABASE treviadb;
   ```

2. **Configure database connection** (optional - defaults work for local MySQL)
   
   Edit `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/treviadb
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
   **Environment Variables**
   # Cloudinary
  ```
  CLOUDINARY_CLOUD_NAME=djh4uce6p
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
```


3. **Run the backend**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
The frontend will start on `http://localhost:8080`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The frontend will start on `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/signin` | User login |
| POST | `/api/auth/logout` | User logout |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products (paginated) |
| GET | `/api/products?search=shirt` | Search products |
| GET | `/api/products?category=Men` | Filter by category |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/{id}` | Update product (Admin) |
| DELETE | `/api/products/{id}` | Delete product (Admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/my-orders` | Get user's orders |
| POST | `/api/orders` | Place new order |
| GET | `/api/orders` | Get all orders (Admin) |
| PUT | `/api/orders/{id}/status` | Update order status (Admin) |
| DELETE | `/api/orders/{id}` | Delete order (Admin) |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |
| POST | `/api/categories` | Create category (Admin) |

---

## 🖼️ Image Uploads

Product images are stored using **Cloudinary** cloud storage:
- Maximum file size: 10MB
- Supported formats: JPG, PNG, WebP
- Automatic optimization and CDN delivery

---

## 🧪 Development Notes

### Database Configuration
- Development: `spring.jpa.hibernate.ddl-auto=update`
- Production: `spring.jpa.hibernate.ddl-auto=validate`

### CORS
Configured in `SecurityConfig.java` for local development on ports 5173, 5174, 5175.
Update the `corsConfigurationSource()` bean in `SecurityConfig.java` for production origins.

---

## 📄 License

This project is developed for educational purposes as part of the NSBM Green University curriculum.

---
<p align="center">
  Made with using Spring Boot & React
</p>
