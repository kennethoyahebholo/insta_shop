# INSTASHOP

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Assumptions](#assumptions)
3. [Running the Application Locally](#running-the-application-locally)
4. [Folder Structure](#folder-structure)
5. [Technologies Used](#technologies-used)

## Setup Instructions

1. **Clone the repository**

   First, clone the repository from GitHub:

   ```bash
   git clone https://github.com/kennethoyahebholo/insta_shop.git
   ```

2. **Change Directory**

   Navigate to the project directory using the following command:

   ```bash
   cd insta_shop
   ```

3. **Install Dependencies**

   The project uses npm to manage dependencies. Run one of the following commands to install the necessary dependencies:

   ```bash
   npm install
   ```

## Assumptions

Before running the application, please ensure the following:

- **Node.js** version 18 or later is installed on your machine.
- The application is designed to run in a local development environment using **Node.js** and **Next Js Typescript**.

## Running the Application Locally

1. Start the development server

After installing dependencies, you can start the development server by running:

```bash
npm run dev
```

2. Build the project for production

```bash
npm run build
```

## Folder Structure

Here is an overview of the folder structure:

### Explanation:

- **/src**: Contains all the source code for the application.
  - **/components**: React components used across the app.
  - **/utils**: Helper functions and utilities.
- **/public**: Contains static assets like `index.html`, images, etc.
- **/package.json**: Project dependencies, scripts, and metadata.

## Technologies Used

The following technologies were used to build and maintain this project:

- **Next Js**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript that enhances development with type safety.
- **Tailwind Css**: A modular CSS solution for scoped and reusable styles within React components.
- **Context Api**: A global state management solution.
- **Prettier**: An opinionated code formatter to ensure consistent code style across the project.
- **ESLint**: A static analysis tool to identify and fix problematic patterns in JavaScript/TypeScript code.
- **VSCode**: A powerful code editor used for development, with features like IntelliSense, debugging, and Git integration.
- **Yup**: A JavaScript schema validation library used for form validation and ensuring data integrity.
- **Formik**: A library for building forms in React with minimal effort, including validation and state management.
- **React-Toastify**: A library for displaying notifications (toast messages) in a React app with customizable features.
