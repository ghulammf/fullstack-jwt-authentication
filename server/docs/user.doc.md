# User API Documentation

## Get All User

Endpoint: GET /api/users

Authorization: Bearer ${access_token}

Response Body (success):

```json
{
  "status": "success",
  "message": "Users data have been successfully retrieved",
  "data": [
    {
      "username": "ahmadsolih",
      "email": "ahmadsolih@gmail.com",
      "createdAt": "2025-11-23 21:38:00"
    },
    {
      "username": "ahmadshidiq",
      "email": "ahmadshidiq@gmail.com",
      "createdAt": "2025-11-24 08:51:00"
    }
  ]
}
```

Response Body (error):

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

## Delete User

Endpoint: DELETE /api/users/:id

Authorization: Bearer ${access_token}

Response Body (success):

```json
{
  "status": "success",
  "message": "User deleted successfully"
}
```

Response Body (error):

```json
{
  "status": "error",
  "message": "User doesn't exist"
}
```
