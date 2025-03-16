# Online Bike Shop

Welcome to the **Online Bike Shop** project! This repository contains the source code for a web application that allows users to browse, purchase, and manage bikes online. The project is primarily developed using TypeScript and PLpgSQL, with a focus on creating a reliable and user-friendly shopping experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure login and registration system for users.
- **Product Catalog**: Browse a wide range of bikes with detailed descriptions and images.
- **Shopping Cart**: Add bikes to the cart and proceed to checkout.
- **Order Management**: Track orders and view purchase history.
- **Admin Dashboard**: Manage products, orders, and users from an admin interface.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: TypeScript, React, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (PLpgSQL)
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Jest, Supertest

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/occxlnce/Online_Bike_Shop.git
   cd Online_Bike_Shop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Ensure you have PostgreSQL installed and running.
   - Create a new database and update the database configuration in `config/dbConfig.js`.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000`.

## Usage

### User Guide

1. **Register an account**:
   - Click on the 'Register' button on the homepage.
   - Fill in the required details and submit the form.

2. **Browse products**:
   - Navigate to the 'Shop' section to view available bikes.
   - Use filters and search to find specific products.

3. **Add to cart and checkout**:
   - Click 'Add to Cart' on the desired product.
   - Go to the 'Cart' page and proceed to checkout.

4. **Manage orders**:
   - View order history and track the status of current orders in the 'Orders' section.

### Admin Guide

1. **Access the Admin Dashboard**:
   - Log in with admin credentials.
   - Navigate to the 'Admin' section from the main menu.

2. **Manage products**:
   - Add, edit, or remove products from the catalog.

3. **Manage orders**:
   - View and update the status of customer orders.

4. **Manage users**:
   - View and manage registered users.

## Contributing

We welcome contributions to the Online Bike Shop project! To contribute, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**.
4. **Commit your changes**:
   ```bash
   git commit -m "Add your commit message"
   ```
5. **Push to the branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a pull request**.

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or suggestions, please reach out to:

- **Project Maintainer**: occxlnce
- **Email**: occxlnceoffice@gmail.com

Thank you for using the Online Bike Shop!
