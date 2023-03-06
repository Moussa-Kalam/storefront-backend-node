# Storefront Backend Project
This is a RESTful JSON API built with Node and Postgres. This API allows the user to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. 

## Getting Started
1. Clone this repository by running the following command in your terminal at the project root.
```
git clone https://github.com/Moussa-Kalam/storefront-backend-node.git
```

2. Run `yarn` to install the required dependencies.

3. Rename the `example.env` file to `.env` and replace the values in angle brackets with your own values.

4. Ensure that you have either `docker` installed on your machine or a local instance of `PostgreSQL` installed.

5. If you're using `docker`, there is a `docker-compose.yml` file available at the project root. Run the following command to start the docker instance:
```
docker-compose up
```

6. If you're using a local instance of `PostgreSQL`, first check if the service is running either from the services window or by running the following command for Linux systems:
```
systemctl status postgresql
```

7. To create the database, run the migration:
```
db-migrate up
```

8. To run the tests, run the following command:
```
yarn test
```

9. To start the server, run the following command: 
```
yarn watch
```




## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- bcrypt for password hashing


## Storefront Endpoints

### Products

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/products | Retrieve a list of products |
| POST | /api/products | Create a new product |
| GET | /api/products/1 | Retrieve a specific product |

### Users 

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/users | Retrieve a list of users |
| POST | /api/users | Register a user |
| GET | /api/users/1 | Retrieve a specific user |

