# 📚 Book Review API

A RESTful API for managing users, books, and reviews, built with **Node.js**, **Express**, **MongoDB**, and **JWT** authentication.

---

## 🚀 Features

- User Signup & Login with JWT authentication
- Add, view, and search books
- Add, update, delete reviews with average rating computation
- Protected routes for authenticated operations
- Pagination and filtering support

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for auth

---

## 📁 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/book-review-api.git
cd book-review-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a .env File
#### Create a .env file in the root directory based on the provided .env.example.

```bash
PORT=3000
MONGO_URI=mongoDb_URI
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Server

```bash
# For development with auto-reload
npm run dev

# Or normal start
npm start
```
---

### Sample User Credentials
```json
{
  "email": "testuser@example.com",
  "password": "test1234"
}
```
--- 

## API Usage (Via Postman)

### Auth Routes

#### 1. POST/signup
```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "test1234"
}
```

#### 2. POST/login
```json
{
  "email": "testuser@example.com",
  "password": "test1234"
}
```
#### Response
```json
{
   "message": "User registered successfully/ User Logged In", 
  "token": "jwt-token",
  "userId": "..."
}
```

### Book Routes

#### 1. Add Book (auth required)
#### POST/books

#### Headers : Authorization: Bearer <token>
#### Paste the token received after signing up/logging in
```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Drama",
  "description": "The story of a young shepherd Santiago"
}
```
#### 2. Get all books
#### GET/books
#### Optional Query Params: ?author=JK&genre=Fantasy&page=1&limit=10


#### 3. Search Books
#### GET /books/search?q=alchemist


#### 4. Get Book by ID
#### GET /books/:id
#### Put the id received after adding a book


### Review Routes

#### 1. Add Review to Book
#### POST /:bookId/reviews
#### Headers : Authorization: Bearer <token>
```json
{
  "rating": 4,
  "comment": "Great read!"
}
```
#### 2. Update Review
#### PUT /reviews/:reviewId
#### Headers : Authorization: Bearer <token>
```json
{
  "rating": 5,
  "comment": "Even better on second read."
}
```

#### 3. Delete Review
#### DELETE /reviews/:reviewId
#### Headers : Authorization: Bearer <token>

---

## Design Decisions & Assumptions
- MongoDB ObjectIds are used as unique identifiers for users, books, and reviews.

- JWT is stored in the Authorization header using the Bearer <token> format.

- Only authenticated users can add/update/delete books or reviews.

- Reviews are tied to both the user and the book.

- The codebase has been well-structured with seperate files for each functionality.

- Routes logic written seperately in controller directory to enhance code-readability.
 
---

## Database Schema

### User Schema
```js
{
  name: String,
  email: { type: String, unique: true },
  password: String
}
```

### Book Schema
```js
{
  title: String,
  author: String,
  genre: String,
  description: String,
  createdBy: ObjectId (User)
}
```

### Review Schema
```js
{
  rating: Number (1–5),
  comment: String,
  book: ObjectId (Book),
  user: ObjectId (User)
}
```
---

## Folder Structure
```pgsql
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── reviewController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Review.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── reviewRoutes.js
├── .env.example
├── app.js
└── README.md
```
---

THANK YOU<br>
Made by Sarthak Jain<br>
Contact me in-case of any queries or suggestions.<br>
Email - sarthakjain3241@gmail.com