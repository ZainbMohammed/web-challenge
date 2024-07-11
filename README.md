# Task Management Web Application

<img src='./frontend//tasks_managment/src/assets/readme-images/loogoo.jpg' width='120 px'>

## Live Link
https://tasksvaultt.netlify.app/login


## Table of Contents

- [About the Project](#about-the-project)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Setup / Installation](#setup--installation)
- [Features](#features)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [Security Vulnerabilities](#security-vulnerabilities)
- [License](#license)

## About the Project

The Tasks Management Web Application is designed to streamline task management processes. Users can create, update, prioritize, and track tasks efficiently through an intuitive interface.

## Screenshots

### Signup To mange tasks
![Signup Page](./frontend//tasks_managment/src/assets/readme-images/signup.png)



### Login
![Login Page](./frontend//tasks_managment/src/assets/readme-images/login.png)



### Get  Start To Create Tasks
![Slogan Page](./frontend//tasks_managment/src/assets/readme-images/slogan.png)


### Add Task
![Add Task Page](./frontend//tasks_managment/src/assets/readme-images/add-task.png)


### Displa All Tasks
![Slogan Page](./frontend//tasks_managment/src/assets/readme-images/tasks.png)


### Edit Task
![Slogan Page](./frontend//tasks_managment/src/assets/readme-images/edit-task.png)


### Delete Task
![Slogan Page](./frontend//tasks_managment/src/assets/readme-images/deleteTask.png)


### Search Task
![Slogan Page](./frontend//tasks_managment/src/assets/readme-images/no-result.png)


## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Netlify

## Setup / Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/Web_Developer_Challenge_Zainab.git
   cd Web_Developer_Challenge_Zainab
   ```

2. **Install dependencies:**

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend/tasks_managment
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory with the following variables:

   ```plaintext
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the backend server:**

   ```bash
   # In the backend directory
   npm start
   ```

5. **Start the frontend development server:**

   ```bash
   # In the frontend/tasks_managment directory
   npm run dev
   ```

6. **Access the application:**

   Open your web browser and go to `http://localhost:8000` to view the application.

## Features

- **Task Management**: Create, update, and delete tasks.
- **Authentication**: Secure login and registration using JWT.
- **Responsive UI**: Designed to work seamlessly on desktop and mobile devices.

## Contributing

Thank Rukn development team for considering contributing to this project! 

## Security Vulnerabilities

If you discover a security vulnerability or any bug, please report it via email to zain.mohh@gmail.com. 
## License

This project is self-developement for learning
