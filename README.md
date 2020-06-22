# restapi-nodejs-mysql

## Usage

To start app, enter command `npm run dev` or `npm run start`

## Configuration
### Setting up database
1. **Create a table**

Create a table by running the following query

```
CREATE TABLE enroll(
    roll_no INT PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(30)
);
```

2. **Connect to database**

In `config.js`, enter database, host, user and password values.
************


