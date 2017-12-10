# Node Token Authentication

This project demonstrates a simple API Gateway using Node.js and [JSON Web Tokens](https://jwt.io/)

The central purpose of an API Gateway is authentication and authorization.

Simply put, authentication is just verifying the identity of the user; in other words, it's basically user login.  Authorization is controlling which resources an authenticated user can access.

With JWT-based authorization, we can provide fine grained API access control.  This is a typical business case, as we commonly want to give users access to only those resources that they have paid for.

### Authentication
Send a `POST` request to `http://localhost:8080/api/public/apigw` with `x-www-form-urlencoded` header set to:
```
{ name: 'Superman', password: 'password' }
```
If authenticated, you will get back a JSON response like this:
```
{
    "success": true,
    "message": "Authentication successful. You must re-authenticate after 24 hrs.",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTI4NTcwODcsImV4cCI6MTUxMjk0MzQ4N30.6MaWpFsjtT0bhcvam6BhTJXIBQpFqYo2wwfN5ZTWuUo"
}
```

### Authorization
Send a `GET` request to a REST API (`http://localhost:8080/api/private/hello`, for example) with the `x-access-token` header set to
the token received when authenticating.