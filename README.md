# Backend Lab 2

## About the Project

This is a NestJS project that provides a simple API for managing users, categories, and records. It is built with a modular architecture, with separate modules for each of the main features.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/matshp0/backend-lab2
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

## Usage

To run the application in development mode, use the following command:

```bash
npm run start:dev
```

The application will be running on `http://localhost:3000`.

## API Endpoints

### Users

| Method   | Endpoint         | Description         |
| -------- | ---------------- | ------------------- |
| `GET`    | `/users`         | Get all users       |
| `GET`    | `/users/:userId` | Get a user by ID    |
| `POST`   | `/users`         | Create a new user   |
| `DELETE` | `/users/:userId` | Delete a user by ID |

### Categories

| Method   | Endpoint          | Description             |
| -------- | ----------------- | ----------------------- |
| `POST`   | `/categories`     | Create a new category   |
| `GET`    | `/categories/:id` | Get a category by ID    |
| `DELETE` | `/categories/:id` | Delete a category by ID |

### Records

| Method   | Endpoint      | Description                           |
| -------- | ------------- | ------------------------------------- |
| `POST`   | `/record`     | Create a new record                   |
| `GET`    | `/record`     | Get all records with optional filters |
| `GET`    | `/record/:id` | Get a record by ID                    |
| `DELETE` | `/record/:id` | Delete a record by ID                 |

## Technologies

- [NestJS](https://nestjs.com/)
- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
