# Attendance Frontend

## Description

The **Attendance Frontend** project is a web application designed to manage attendance for employees. It provides a simple and user-friendly interface with the following features:

- **Login**: Basic user authentication.
- **Dashboard 1**: Allows users (employees) to mark their attendance for any given day.
- **Dashboard 2**: Provides a history view of attendance records, where users can track their past attendance.
- **Role-based Access**: Users can have one of two roles:
  - **Employee**: Can mark attendance and view their history.
  - **Admin**: Can view and correct attendance records of all employees.

The project is designed for demo purposes and is intended to be a starting point for more complex attendance systems.

---

## Features

- **User Authentication**: Login functionality for both employees and admins.
- **Mark Attendance**: Employees can mark their attendance for any given day.
- **View Attendance History**: Employees can view a history of their attendance records.
- **Admin Role**: Admins can view and correct any employee's attendance record.
- **Responsive Design**: Interface is designed to be used on both desktop and mobile devices.

---

## Installation

To run the project locally, follow these steps:

### Prerequisites

- Ensure that you have **Node.js** and **npm** installed on your machine.

### Steps

1. Clone the repository to your local machine:

  ```bash
  git clone <repository-url>
  cd attendance-frontend
  ```

2. Install the required dependencies:

  ```bash
  npm install
  ```

3. Start the development server:

  ```bash
  npm start
  ```

---

## Usage

Once the app is running, you can access the following features:

### Login:
  Navigate to the login page to authenticate as either an employee or admin.
  Employees can mark their attendance on the "Attendance Dashboard."
  Admins have additional privileges to view and modify all employees' attendance records.

  Dashboard 1 - Mark Attendance:
  Employees can mark their attendance for the current day by clicking the "Mark Attendance" button. After marking attendance, the employee will see a confirmation message.

  Dashboard 2 - Attendance History:
  Employees can view their historical attendance records in the "Attendance History" section.
  Admins can also view all employee attendance records and make corrections if necessary.


## License

  This project is licensed under the MIT License