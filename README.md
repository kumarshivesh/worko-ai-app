# Worko API Application

This is a RESTful API using Node.js with an MVC architecture, implementing CRUD operations, JWT-based authentication, and input validation with Express and Joi. Achieved over 90% test coverage using Jest for comprehensive unit testing.

## Prerequisites

- Node.js 
- MongoDB

## Getting Started

Follow these steps to clone and run the application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/kumarshivesh/worko-ai-app.git
cd worko-ai-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following:

```bash
PORT=3000
DB_URI="mongodb+srv://mrperfectkhan007:RMHkDNQwLyH2Trlm@cluster0.1gu3aat.mongodb.net"
JWT_SECRET=44d43e9db45986f20064d91722e3ec968341c9878b1f185553f71f442363dc9e8985c24331f2f4a3ee14b60f19d85c87471d804dc1568dfd391c34dad1579df1
```


### 4. Run the Application

Start the development server.

```bash
npm start
```

## Run Testing

```bash
npm test
```


## App Demo

<!-- Refer this YouTube video for App demo

[![Postman Lite Demo](https://i.ibb.co/rMm5c5Y/postman-lite-thumbnail.png)](https://youtu.be/lRdpPOqZ8Ec?si=UC8d1gZaz8HgsovM) -->

Your server is running and successfully connected to MongoDB. Here are the next steps you can take to test your API and ensure everything is working correctly:

### Generate and Use JWT for Authentication

```bash
node scripts/generateToken.js
```

### 1. Making a GET Request (users list)

1. Open Postman and create a new request.
2. Select the Method: Choose `GET` from the dropdown menu.
3. Enter the URL: Type http://localhost:3000/worko/user into the URL field. 
4. Add the `Authorization` header with the `Bearer token`.
5. Select `Body` as `none`.
6. Send the Request: Click the "Send Request" button.
7. View the Response: Verify the response.

### 2. Making a GET Request (user details)

1. Open Postman and create a new request.
2. Select the Method: Choose `GET` from the dropdown menu.
3. Enter the URL: Type http://localhost:3000/worko/user/:userId into the URL field. Replace `:userId` with an actual user ID. 
4. Add the `Authorization` header with the `Bearer token`.
5. Select `Body` as `none`.
6. Send the Request: Click the "Send Request" button.
7. View the Response: Verify the response.

### 3. Making a POST Request

1. Open Postman and create a new request.
2. Select the Method: Choose `POST` from the dropdown menu.
3. Enter the URL: Type http://localhost:3000/worko/user into the URL field.
4. Add the `Authorization` header with the `Bearer token`.
5. Select `Body` as `raw (JSON)`. Paste the follwing in the `Body`:
```
{
  "email": "test3@email.com",
  "name": "Test User 3",
  "age": 33,
  "city": "Test City 3",
  "zipCode": "000003"
}
```
6. Send the Request: Click the "Send Request" button.
7. View the Response: Verify the response.

### 4. Making a PUT Request

1. Open Postman and create a new request.
2. Select the Method: Choose `PUT` from the dropdown menu.
3. Enter the URL: Type http://localhost:3000/worko/user/:userId into the URL field. Replace `:userId` with an actual user ID. 
4. Add the `Authorization` header with the `Bearer token`.
5. Select `Body` as `raw (JSON)`. Paste the follwing in the `Body`:
```
{
  "email": "test3@email.com",
  "name": "Test User 3",
  "age": 34,
  "city": "Test City 3",
  "zipCode": "000003"
}
```
6. Send the Request: Click the "Send Request" button.
7. View the Response: Verify the response.

### 5. Making a PATCH Request

1. Open Postman and create a new request.
2. Select the Method: Choose `PATCH` from the dropdown menu.
3. Enter the URL: Type http://localhost:3000/worko/user/:userId into the URL field. Replace `:userId` with an actual user ID. 
4. Add the `Authorization` header with the `Bearer token`.
5. Select `Body` as `raw (JSON)`. Paste the follwing in the `Body`:
```
{
  "age": 35
}
```
6. Send the Request: Click the "Send Request" button.
7. View the Response: Verify the response.

### 6. Making a DELETE Request (user details)

1. Open Postman and create a new request.
2. Select the Method: Choose `DELETE` from the dropdown menu.
3. Enter the URL: Type http://localhost:3000/worko/user/:userId into the URL field. Replace `:userId` with an actual user ID. 
4. Add the `Authorization` header with the `Bearer token`.
5. Select `Body` as `none`.
6. Send the Request: Click the "Send Request" button.
7. View the Response: Verify the response.


## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
[Node.js](https://nodejs.org/en)
[express.js](https://expressjs.com/)
[Mongoose](https://mongoosejs.com/)

