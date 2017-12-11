# Simple API Gateway based on JWT bearer tokens

This project demonstrates a simple API Gateway using Node.js and [JSON Web Tokens](https://jwt.io/)

The central purpose of an API Gateway is authentication and authorization.

Simply put, authentication is just verifying the identity of the user; in other words, it's basically user login.  Authorization is controlling which resources an authenticated user can access.

With JWT-based authorization, we can provide fine grained API access control.  This is a typical business case, as we commonly want to give users access to only those resources that they have paid for.

### Create a User who can access certain APIs
#### Request
HTTP Method & URL: `POST http://localhost:8080/apis/public/createuser`
Headers: `Content-Type: application/json`
Body: `{"name":"name", "password": "password", "apis": ["/apis/private/hello"]}`

#### Response
```
{
    "success": true,
    "message": "Created new user."
}
```

### User Authentication & Authorization
#### Request
HTTP Method & URL: `POST http://localhost:8080/apis/public/apigw`
Headers: `Content-Type: application/json`
Body: `{"name":"name", "password": "password"}`

#### Response
```
{
    "success": true,
    "message": "Authenticated. You must re-authenticate after 24 hrs.",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlzIjpbIi9hcGlzL3ByaXZhdGUvZ29vZGJ5ZSJdLCJpYXQiOjE1MTI5NTI0MjQsImV4cCI6MTUxMzAzODgyNH0.pKVj1Y0Pfg7Dc066qnbamBi7NPqZmZRbnwFMz_eBSts"
}
```

### Access an Authorized API
#### Request
HTTP Method & URL: `GET http://localhost:8080/apis/private/hello`
Headers: `x-access-token`: JWT-based bearer token received when authenticating at `http://localhost:8080/apis/public/apigw`

#### Response
`{ success: true, message: "Hello!" }`

### Access an Un-authorized API
#### Request
HTTP Method & URL: `GET http://localhost:8080/apis/private/goodbye`
Headers: `x-access-token`: JWT-based bearer token received when authenticating at `http://localhost:8080/apis/public/apigw`

#### Response
```
{
    "success": false,
    "message": "User not authorized for API: /apis/private/hello"
}
```