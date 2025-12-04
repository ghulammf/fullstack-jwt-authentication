# User API Specification

## Register User

Endpoint: POST /api/auth/register

Request Body:

```json
{
  "username": "ahmadsolih",
  "email": "ahmadsolih@gmail.com",
  "password": "ahmad_secret",
  "confirm_password": "ahmad_secret"
}
```

Response Body (success):

```json
{
  "status": "success",
  "message": "Register successfully",
  "data": {
    "username": "ahmadsolih",
    "email": "ahmadsolih@gmail.com",
    "role": "user",
    "createdAt": "2025-11-23 21:38:00",
    "updatedAt": "2025-11-23 21:39:00"
  }
}
```

Response Body (error):

```json
{
  "status": "error",
  "message": "username already exist, try another"
}
```

## Login User

Endpoint: POST /api/auth/login

Request Body:

```json
{
  "username": "ahmadsolih",
  "password": "ahmad_secret"
}
```

Response (success):

Header

```json
cookie:
"refreshToken": "def50200f49f3f3e277085787114b03650200f49f3f3e277085787114b03b"
```

Body

```json
{
  "status": "success",
  "message": "Login successfully",
  "user": {
    "username": "ahmadsolih",
    "email": "ahmadsolih@gmail.com",
    "role": "user"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.bV2q4Gv5Z2a-rC-3D5FwX9E8jX7kY9aZ6c8bH0eL3wM"
}
```

Response Body (error):

```json
{
  "status": "error",
  "message": "Username or Password is wrong"
}
```

## Logout User

Endpoint: POST /api/auth/logout

Authorization: Bearer ${access_token}

Response Body (success):

```json
{
  "status": "success",
  "message": "Logout successfully"
}
```

Response Body (error):

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

## refresh Token

Endpoint: POST /api/auth/refresh-token

Response (succes):

Header

```json
cookie:
  "refreshToken": "def50200f49f3f3e277085787114b03650200f49f3f3e277085787114b03b"
```

Body

```json
{
  "status": "success",
  "message": "New accessToken retrieved successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.bV2q4Gv5Z2a-rC-3D5FwX9E8jX7kY9aZ6c8bH0eL3wM"
}
```

Response Body (error):

```json
"status": "error",
"message": "Invalid or expired refresh token"
```
