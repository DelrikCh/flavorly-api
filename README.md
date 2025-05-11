# Flavorly API
Flavorly API is a Node.js-based backend service designed to manage and serve data for the Flavorly application. It provides endpoints for handling various functionalities such as user management, creating recipes, favoriting recipes, and accessing a wide variety of recipes.

## Features

- RESTful API built with Node.js and Express.
- User authentication and authorization.
- CRUD operations for managing resources.
- Scalable and modular architecture.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/your-username/flavorly-api.git
  cd flavorly-api
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Set up environment variables:
  Copy the `.env.example` file to `.env` in the root directory and configure the required variables:
  ```bash
  cp .env.example .env
  ```
  Edit the `.env` file to provide the necessary values for your environment:

## Usage

### Development
Start the development server:
```bash
npm run dev
```

### Production
Build and start the production server:
```bash
npm run build
npm start
```

## API Endpoints

All API endpoints are documented in the Swagger UI. Once the server is running, you can access the Swagger documentation at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.
