# RestAPI using with jsonwebtoken authorization
RestAPI project using express, local mongodb and jsonwebtoken.

## Usage
Need local mongodb to store the data.
Mongodb run in port 27017.
After ensure mongodb is running, run this on terminal
```bash
npm start
```
after that, hit endpoint using postman to login.

## Login
If you want to use the authorization, after login copy that token and send it to header with auth-token parameter
```bash
key: auth-token 
value: (token when you login)
```
