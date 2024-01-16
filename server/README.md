[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13041585&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# Branded-Things API Documentation

## Endpoints :

List of available endpoints:

<!-- Users Endpoints -->

- `POST /login`
- `POST /register`
<!-- Public Products Endpoints -->
- `GET /pub`
- `GET /pub/:id`
<!-- Products Endpoints -->
- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `PATCH /products/:id/imgUrl`
<!-- Category Endpoints -->
- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

&nbsp;

## 1. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 2. POST /register

- Description:
  This endpoint allows an admin user to create new staff/user. Only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email format must be an Email"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password must be at least 5 characters long"
}

```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
OR
{
  "message": "This Email is already exist"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 3. GET /pub/products

Description:

- Get all products from database for public

Request:

- query:

```json
{
  "search": "string"
}
OR
{
  "filter": "number"
}
OR
{
  "sort": "string"
}
OR
{
  "sort": "-string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully get the data"
},
[
   {
        "id": 2,
        "name": "Regular Fit Corduroy Shirt",
        "description": "Regular-fit shirt in soft cotton corduroy with a turn-down collar, classic front, open chest pocket and yoke at the back. Long sleeves with buttoned cuffs and a sleeve placket with a link button. Rounded hem.",
        "price": 430000,
        "stock": 6,
        "imgUrl": "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/2b13b8e121a0d6bc92821cc8b65eb7ca87663cc7_xxl-1.jpg",
        "categoryId": 2,
        "authorId": 2,
        "createdAt": "2023-11-27T16:26:27.439Z",
        "updatedAt": "2023-11-27T16:26:27.439Z"
     },
     {
        "id": 8,
        "name": "test create new data",
        "description": "halo dek",
        "price": 900000,
        "stock": 12,
        "imgUrl": "https://res.cloudinary.com/dgdw9kklq/image/upload/v1701271393/uploaded-img-ch1/minimalism-sunset-simple-background-wallpaper-bf8c923f9dc915f8b76d721474d3c050.jpg.jpg",
        "categoryId": 2,
        "authorId": 2,
        "createdAt": "2023-11-29T07:17:27.112Z",
        "updatedAt": "2023-11-29T15:23:16.452Z"
    }
  ...,
]
```

&nbsp;

## 4. GET /pub/products/:id

Description:

- Get products by id for public

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 8,
  "name": "test create new data",
  "description": "halo dek",
  "price": 900000,
  "stock": 12,
  "imgUrl": "https://res.cloudinary.com/dgdw9kklq/image/upload/v1701271393/uploaded-img-ch1/minimalism-sunset-simple-background-wallpaper-bf8c923f9dc915f8b76d721474d3c050.jpg.jpg",
  "categoryId": 2,
  "authorId": 2,
  "createdAt": "2023-11-29T07:17:27.112Z",
  "updatedAt": "2023-11-29T15:23:16.452Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 5. GET /products

Description:

- Get all products with password hidden from database, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully get the data"
},
[
        {
        "id": 8,
        "name": "test create new data",
        "description": "halo dek",
        "price": 900000,
        "stock": 12,
        "imgUrl": "https://res.cloudinary.com/dgdw9kklq/image/upload/v1701271393/uploaded-img-ch1/minimalism-sunset-simple-background-wallpaper-bf8c923f9dc915f8b76d721474d3c050.jpg.jpg",
        "categoryId": 2,
        "authorId": 2,
        "createdAt": "2023-11-29T07:17:27.112Z",
        "updatedAt": "2023-11-29T15:23:16.452Z",
        "User": {
            "id": 2,
            "username": "andrehaha55",
            "email": "andrehaha666@gmail.com",
            "role": "Staff",
            "phoneNumber": "347-575-1799",
            "address": "72691 Fulton Way",
            "createdAt": "2023-11-27T16:18:42.647Z",
            "updatedAt": "2023-11-27T16:18:42.647Z"
            }
        }
  ...,
]
```

&nbsp;

## 6. POST /products

- Description:
  This endpoint allows an admin user to create new product. Only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
  "createdAt": "integer",
  "updatedAt": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 15,
  "name": "test create new data staff only 22",
  "description": "halo dekssss",
  "price": 9000002,
  "stock": 121,
  "imgUrl": "www.facebook.com",
  "categoryId": 2,
  "authorId": 20,
  "createdAt": "2023-11-30T06:30:15.156Z",
  "updatedAt": "2023-11-30T06:30:15.156Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Product name is required"
}
OR
{
  "message": "Description name is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Price must be at least 0"
}
OR
{
  "message": "Category Id is required"
}
OR
{
  "message": "Author Id is required"
}

```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 7. GET /products/:id

Description:

- Get products by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 20,
  "name": "test create new data staff only 22",
  "description": "halo dekssss",
  "price": 9000002,
  "stock": 121,
  "imgUrl": "www.facebook.com",
  "categoryId": 2,
  "authorId": 20,
  "createdAt": "2023-11-30T06:30:18.328Z",
  "updatedAt": "2023-11-30T06:30:18.328Z"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 8. PUT /products/:id

Description:

- Update products by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success update product by id ${id}"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 9. DELETE /products/:id

Description:

- Delete products by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success delete product by id ${id}"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 10. PATCH /products/:id/imgUrl

Description:

- Delete products by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully Upload Image"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 11. GET /categories

Description:

- Get all categories from database, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success getting data"
},
[
        {
            "id": 1,
            "name": "Loose Fit",
            "createdAt": "2023-11-27T16:22:47.452Z",
            "updatedAt": "2023-11-27T16:22:47.452Z"
        },
        {
            "id": 2,
            "name": "Turquoise",
            "createdAt": "2023-11-27T16:22:47.452Z",
            "updatedAt": "2023-11-27T16:22:47.452Z"
        }
  ...,
]
```

&nbsp;

## 12. POST /categories

- Description:
  This endpoint allows an admin user to create new categories. Only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 3,
  "name": "corduroy",
  "updatedAt": "2023-11-30T16:17:54.598Z",
  "createdAt": "2023-11-30T16:17:54.598Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Category Name is required"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 13. PUT /categories/:id

Description:

- Update categories by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success update category by id ${id}"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 14. DELETE /categories/:id

Description:

- Delete categories by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success delete category id ${id}"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
