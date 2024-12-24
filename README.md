# DuitTrack (This project is still a work in progress)
## DuitTrack is a personal budget tracking app designed to help Malaysians manage their finances effectively.

### Current Available Features
 - Add and delete expenses.
 - Organize expenses by categories.
 - Add, display, edit, and delete budget categories.
 - Backend API for managing user and budget categories data.


### Tech Stack:
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Others**: Chart.js



## Getting Started
Follow these instructions to set up the project locally.


### Prerequisites
Ensure you have the following installed:
 - Node.js (v12 or later)
 - npm
 - MySQL
 - Git


#### 1. Clone the repository

```bash
git clone https://github.com/Nurzarina/DuitTrack.git
cd DuitTrack
```


#### 2. Backend Setup

##### Step 1: Navigate to the Backend Directory
```bash
cd ../backend
```

##### Step 2: Install Dependencies
```bash
npm install
```

##### Step 3: Set up Environment Variables
1. In the backend folder, create a file named .env.
2. Add the following environment variables in the .env file:
```bash
MYSQLUSER = your_mysql_username
MYSQLHOST = your_mysql_host
MYSQLDATABASE = budget_tracker
MYSQLPASSWORD = your_mysql_password
JWT_SECRET = your_jwt_secret
```

##### Step 4: Configure the Database
 - Create a database in MySQL:
```sql
CREATE DATABASE budget_tracker
```

 - Run the following script to create tables:
```sql
CREATE TABLE users ( 
id INT AUTO_INCREMENT PRIMARY KEY, 
username VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL 
);

CREATE TABLE categories ( 
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
name VARCHAR(255) NOT NULL,
spending_limit VARCHAR(255) NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
 );

CREATE TABLE expenses (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
category_id INT NOT NULL, date DATE NOT NULL,
amount DECIMAL(10, 2) NOT NULL,
notes TEXT,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE );
```

##### Step 5: Run the Backend Server
```bash
nodemon server.js
```
Your backend will run at http://localhost:5000.


#### 3. Frontend Setup

##### Step 1: Navigate to the Frontend Directory
```bash
cd ../frontend
```

##### Step 2: Install Dependencies
```bash
npm install
```

##### Step 3: Run the Frontend Development Server
```bash
npm run dev
```


#### 4. Run the Application
 - Open the frontend URL: http://localhost:5173/
 - Use the application to manage expenses!


## Folder Structure
```php
DuitTrack/
├── backend/                     # Backend files
│   ├── config/
│   │   └── db.js                # Database connection configuration
│   ├── routes/                  # API routes
|   |   └── authRoutes.js
|   |   └── categoriesRoutes.js
|   |   └── dashboardRoutes.js 
│   │   └── expensesRoutes.js
│   └── server.js                # Main server file
├── frontend/                    # React frontend
│   ├── src/                     # React source code
│   │   ├── components/          # React components and pages
│   │   └── App.jsx              # Main application entry point
│   │   └── main.jsx             # React DOM entry point
│   └── public/                  # Public assets
│   └── package.json             # Dependencies and script definitions
├── Website Screenshots/         # Screenshots of current website progress            
└── README.md                    # Project documentation
```

## Acknowledgments
 - **React Bootstrap**: Used for frontend design components.
 - **MySQL**: Used for database management.
 - **Express.js**: Backend framework for handling server-side logic.
 - **Image Credit:**  
  The background image is provided by [Freepik](https://www.freepik.com/free-photo/closeup-shot-malaysian-riggit-bills_27738018.htm).

© 2024 DuitTrack. All rights reserved for the website's code and design. The background image is © Freepik and is used with attribution under their licensing terms.
