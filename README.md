# **Course Management API**

A comprehensive RESTful API for managing courses, user authentication, and course purchases built with Node.js, Express.js, and MongoDB (Mongoose).

## **Features**

**User Authentication:** JWT-based authentication with access token
**Role-Based Access Control:** Separate permissions for users and administrators  
**Course Management:** Full CRUD operations for course catalog  
**Input Validation:** Comprehensive request validation and error handling  
**Security:** Password hashing with bcrypt and secure token management

## **Tech Stack**

**Backend:** Node.js, Express.js  
**Database:** MongoDB with Mongoose  
**Authentication:** JSON Web Tokens (JWT)  
**Security:** bcrypt for password hashing  
**Validation:** Express-validator  
**Environment:** dotenv for configuration

## **Installation guideline**

1. Clone the repository
2. Install dependencies - npm install
3. Environment Configuration

   > - Create .env file in the root of the project
   > - Update the .env file with the following
   >   > - **PORT=5000  
   >   >   MONGODB_URI=mongodb+srv://courseApiUser:qN7wl2Pe6YoGogWP@cluster0.o9ylutr.mongodb.net/? retryWrites=true&w=majority&appName=Cluster0  
   >   >   JWT_SECRET=tasnuva-islam-course-api  
   >   >   JWT_EXPIRE=30m  
   >   >   JWT_REFRESH_SECRET=tasnuva-refreshToken  
   >   >   JWT_REFRESH_EXPIRE=7d  
   >   >   NODE_ENV=development**

4. Start the server
   > - **npm start**
5. Verify installation
   > - Server should be running on http://localhost:5000
   > - check database connection in console logs

## **API endpoints with example requests/responses**

> - **Base URL: http://localhost:5000/api**
>
> * Admin username and password:
>   **{
>   "email": "tasnu@gmail.com",
>   "password": "Password123"
>   }**

## **Authentication Endpoints**

### User Register

POST method using **http://localhost:5000/api/auth/register** API  
**Request:**  
{  
 "name": "Sakib",  
 "email": "sakiba@gmail.com",  
 "password": "Password123"  
}  
**Response:**  
{  
 "success": true,  
 "message": "User registered successfully",  
 "data": {  
 "user": {  
 "name": "Sakib",  
 "email": "sakiba@gmail.com",  
 "role": "user",  
 "\_id": "68c5d634a5799e74c13d9107",  
 "createdAt": "2025-09-13T20:38:12.925Z",  
 "updatedAt": "2025-09-13T20:38:13.533Z",  
 "\_\_v": 1  
 },  
 "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM1ZDYzNGE1Nzk5ZTc0YzEzZDkxMDciLCJpYXQiOjE3NTc3OTU4OTN9.mPU6QT0nWu9imxwVinohhWfdDN1HuOkpqGBwJxqPFeI",
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM1ZDYzNGE1Nzk5ZTc0YzEzZDkxMDciLCJpYXQiOjE3NTc3OTU4OTN9.HSIETNovXbdk2NWnuFEI78TmsPeF0D5kgn9VC4cqOEk"  
 }  
}

### User Login

POST method using **http://localhost:5000/api/auth/login** API  
**Request:**  
 {  
 "email": "sakiba@gmail.com",  
 "password": "Password123"  
}  
**Response:**
{  
 "success": true,  
 "message": "Login successful",  
 "data": {  
 "user": {  
 "\_id": "68c5d634a5799e74c13d9107",  
 "name": "Sakib",  
 "email": "sakiba@gmail.com",  
 "role": "user",  
 "createdAt": "2025-09-13T20:38:12.925Z",  
 "updatedAt": "2025-09-13T20:40:19.798Z",  
 "\_\_v": 2  
 },  
 "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM1ZDYzNGE1Nzk5ZTc0YzEzZDkxMDciLCJpYXQiOjE3NTc3OTYwMTl9.eqKXjotdm5ODXzMOzNSp6Z02wlDaG3EC7Gppp_FWg7o",  
 "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM1ZDYzNGE1Nzk5ZTc0YzEzZDkxMDciLCJpYXQiOjE3NTc3OTYwMTl9.18RX5cAhGN7V_FWvo90yRxg71BHbJtgBn21XmMtfTY0"  
 }  
}

### Post a Course (Admin Only)

POST method using **http://localhost:5000/api/courses** API  
Provide Access token in the header (Select Authorization):  
"Authorization: Bearer <access_token>"  
**Request**  
{  
 "title": "Advanced Node.js",  
 "description": "Deep dive into Node.js concepts",  
 "price": 149.99,  
 "instructor": "John Expert"  
}

### Get All Courses

> - GET method using **http://localhost:5000/api/courses** API

### Get Single Course

> - GET method using **http://localhost:5000/api/courses/:id** API

### Delete Course (Admin Only)

> - DELETE method using **http://localhost:5000/api/courses/:id** API
>
> * Provide Access token in the header (Select Authorization):  
>   "Authorization: Bearer <access_token>"

### Purchase a Course

POST method using **http://localhost:5000/api/purchases** API  
Provide Access token in the header (Select Authorization):  
 "Authorization: Bearer <access_token>"  
**Request** (in body)
{  
 "courseId": "course_id"  
}

**Response**  
{  
 "success": true,  
 "message": "Course purchased successfully",  
 "data": {  
 "purchaseId": "purchase_id",  
 "userId": "user_id",  
 "courseId": "course_id",  
 "amount": 99.99,  
 "date": "2024-01-01T00:00:00.000Z"  
 }  
}

### Get Specific User's Purchased Courses

> - GET method using **http://localhost:5000/api/purchases/my-courses** API
>
> * Provide Access token in the header (Select Authorization):  
>    "Authorization: Bearer <access_token>"

### Logout

> - POST method using **http://localhost:5000/api/auth/logout** API
> - Provide Access token in the header (Select Authorization) --> Authorization: Bearer <access_token>
> - set the refresh token in body --> {"refreshToken" : <refresh_token>}
