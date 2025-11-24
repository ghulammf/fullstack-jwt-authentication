# Products API Documentation

## Create Product

Endpoint: POST /api/products

Authorization: Header ${accessToken}

Request Body:

```json
{
  "name": "Samsung J2",
  "price": 3000000,
  "stock": 2
}
```

Response Body (success):

```json
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Samsung J2",
    "price": 3000000,
    "stock": 2,
    "createdAt": "2025-11-24 09:26:00",
    "updatedAt": "2025-11-24 09:26:00"
  }
}
```

Response Body (error):

```json
{
  "status": "error",
  "error": "Product name can't be empty"
}
```

## Get All Products

Endpoint: GET /api/products

Authorization: Bearer ${accessToken}

Response Body (success):

```json
{
  "status": "success",
  "message": "Products data retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Samsung J2",
      "price": 3000000,
      "stock": 2,
      "createdAt": "2025-11-24 09:26:00",
      "updatedAt": "2025-11-24 09:26:00"
    },
    {
      "id": 2,
      "name": "Samsung A22",
      "price": 3500000,
      "stock": 3,
      "createdAt": "2025-11-24 09:26:00",
      "updatedAt": "2025-11-24 09:26:00"
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

## Get Product

Endpoint: GET /api/products/:id

Resnponse Body (success):

```json
{
  "status": "success",
  "message": "Product retrieved successfully",
  "data": {
    "id": 1,
    "name": "Samsung J2",
    "price": 3000000,
    "stock": 2,
    "createdAt": "2025-11-24 09:26:00",
    "updatedAt": "2025-11-24 09:26:00"
  }
}
```

Response Body (error):

```json
{
  "status": "error",
  "message": "Product doesn't exist"
}
```

## Update Product

Endpoint: PUT /api/products/:id

Authorization: Header ${accessToken}

Request Body:

```json
{
  "name": "Samsung J2",
  "price": 3000000,
  "stock": 4
}
```

Response Body (success):

```json
{
  "status": "success",
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "Samsung J2",
    "price": 3000000,
    "stock": 4,
    "createdAt": "2025-11-24 09:26:00",
    "updatedAt": "2025-11-24 09:40:00"
  }
}
```

Response Body (error):

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

## Delete Product

Endpoint: DELETE /api/products/:id

Authorization: Bearer ${accessToken}

Response Body (success):

```json
{
  "status": "success",
  "message": "Product deleted successfully"
}
```

Response Body (error):

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```
