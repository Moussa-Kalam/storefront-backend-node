# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index - `([GET] /products)`
- Show - `([GET] /products/1)`     
- Create [token required] - `([POST] /products)`
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] - `([GET] /users)`
- Show [token required] - `([GET] /users/1)`
- Create N[token required] - `([GET] /users)`

#### Orders
- Current Order by user (args: user id)[token required] - `([GET] /current-order/1)`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

```
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL
);
```

#### User
- id
- firstName
- lastName
- password

```
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    user_password TEXT NOT NULL
);
```

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    status VARCHAR(10) NOT NULL
);
```

