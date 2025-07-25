# 👨‍💼 Employetica - Employee Management System

**Employetica** is a modern, full-stack employee management web application where employees can track their work updates and HR executives can monitor their workflow, verify users, and manage salary payments. Admins can control user roles, adjust salaries, and manage payroll seamlessly.

> 🚀 Developed for **Assignment 12 (assignment12_category_004)** of the Programming Hero Web Development Course.

## 🔐 Admin Access

- **Admin Email:** `admin@employetica.com`
- **Admin Password:** `123QWE!`

## 🌐 Live Site

[🔗 Live Site](https://employetica.web.app/)
[  Backend Repo](https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-nurislam243)
---

## 🧩 Technologies Used (Client)

- **React JS** – Front-end library
- **Tailwind CSS** – Utility-first CSS framework
- **DaisyUI** – Tailwind-based UI component library
- **TanStack Query** – Efficient data fetching for GET operations
- **TanStack Table** – Powerful and flexible table rendering
- **Firebase Authentication** – Secure login & role management
- **React Router DOM** – Dynamic routing
- **SweetAlert2** – User-friendly toast/alert notifications
- **React DatePicker** – Date input for task forms
- **JWT (via Firebase Token)** – Role-based route protection
- **ImgBB** – Image uploading for user photos

---

## ✨ Key Features (Client Side)

1. 🔐 Secure registration and login system with role selection (Employee, HR only).
2. 👨‍💻 Employees can add/edit/delete their work hours in a worksheet.
3. 💵 Employees can see their own salary payment history with pagination.
4. 🧑‍💼 HR can view all employees, verify them, pay salary, and view individual progress.
5. 📈 Bar chart visualization of employee salary data using dynamic charting.
6. 📊 TanStack Table used for dynamic tables with filtering and sorting features.
7. 🚫 Admin can fire users and prevent login; can also promote employees to HR.
8. 📬 Contact form with message submission visible to Admin on dashboard.
9. ⚙️ Fully responsive design — mobile, tablet, and desktop compatible.
10. ✅ All sensitive operations (e.g. salary update, role change) protected via Firebase token & role-based backend middleware.

---

## 🧭 Navigation

- `/` — Home page with banner, services, testimonials, etc.
- `/dashboard` — Role-specific dashboard (Employee / HR / Admin)
- `/contact-us` — Contact form for visitors
- `/login` and `/register` — Authentication routes

---

## 🛡 Environment Variables Used

Client uses `.env` file to hide sensitive data:

## 📡 API Endpoints

### 🔐 Authentication
- `POST /jwt` — Generate JWT token after Firebase login
- `GET /logout` — Clear cookie and logout user

### 👤 Users
- `GET /users` — Get all users (admin only)
- `POST /users` — Save a new user
- `PATCH /users/role/:id` — Update user role (admin only)
- `DELETE /users/:id` — Delete a user

### 🛠️ Services
- `GET /services` — Get all services
- `GET /services/:id` — Get a single service
- `POST /services` — Add a new service (provider only)
- `DELETE /services/:id` — Delete service (provider or admin)

### 📅 Bookings
- `GET /bookings` — Get all bookings (admin/provider/user)
- `POST /bookings` — Create a new booking
- `PATCH /bookings/status/:id` — Update booking status (provider/admin)
- `DELETE /bookings/:id` — Cancel a booking

### ⭐ Reviews
- `GET /reviews` — Get all reviews for a service
- `POST /reviews` — Add a review (authenticated user)
- `DELETE /reviews/:id` — Delete a review

---

## 📁 Project Folder Structure

