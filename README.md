# Factura Management System

This project is a Factura Management System built with Django for the backend and React with Material-UI for the frontend.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [SQL Server Setup](#sql-server-setup)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## Requirements

- Python 3.8+
- Node.js 14+
- npm or yarn
- SQL Server

## Installation

### Backend Setup

1.  **Clone the repository:**

       git clone https://github.com/sahinmeric/django_project.git
**
       cd **django_project**

2.  **Create and activate a virtual environment:**

        python -m venv env

        source env/bin/activate # On Windows use env\Scripts\activate

3.  **Install the dependencies:**

4.  **Configure the database:**

      Update the `DATABASES` setting in `settings.py` to match your SQL Server configuration.

5.  **Apply the database migrations:**

        python manage.py makemigrations

        python manage.py migrate`

6.  **Create a superuser:**

    `python manage.py createsuperuser`

7.  **Run the development server:**

    `python manage.py runserver`

### Frontend Setup

1.  **Navigate to the frontend directory:**

    `cd frontend`

2.  **Install the dependencies:**

    `npm install  # or yarn install`

3.  **Start the development server:**

    `npm start  # or yarn start`

### SQL Server Setup

1.  **Download SQL Server:**

    You can download SQL Server from the official Microsoft website. Choose the version that suits your needs (e.g., SQL Server Express for development purposes). [Download SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

2.  **Install SQL Server:**

    Follow the installation instructions provided by Microsoft. During installation, you will be asked to configure the server name and authentication mode. It's recommended to use mixed mode authentication (SQL Server and Windows Authentication).

3.  **Install SQL Server Management Studio (SSMS):**

    SSMS is a free tool provided by Microsoft for managing SQL Server. You can download it from the link below: [Download SSMS](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)

4.  **Create a Database:**

    After installing SSMS, open it and connect to your SQL Server instance. Create a new database named `SIMBA_PRUEBA` (or any other name you prefer).

    sql

    `CREATE DATABASE SIMBA_PRUEBA;`

5.  **Create Tables:**

    Use the following SQL script to create the necessary tables in your database. Adjust the script according to your data model if necessary.

    sql

        -- Example table creation script
        CREATE TABLE dbo.CLIENTES (
        EMPRESA INT NOT NULL,
        ID_CLIENTE INT PRIMARY KEY,
        CLIENTE VARCHAR(255),
        TIPO CHAR(1),
        NOMBRE VARCHAR(255),
        TELEFONO VARCHAR(50),
        CORREO VARCHAR(255),
        DIRECCION VARCHAR(255),
        PAGINAWEB VARCHAR(255),
        FECHA_CREACION DATETIME,
        ESTADO CHAR(1)
        );
    
        CREATE TABLE dbo.MAE_FACTURA (
        EMPRESA INT NOT NULL,
        ID_FACTURA INT PRIMARY KEY,
        FECHA_FACTURA DATE,
        ID_CLIENTE INT,
        OBSERVACIONES TEXT,
        TOTAL DECIMAL(18, 2),
        FECHA_AUDITORIA DATETIME,
        NUMERO INT
        );
    
        CREATE TABLE dbo.DET_FACTURA (
        EMPRESA INT NOT NULL,
        ID_FACTURA INT NOT NULL,
        CONSECUTIVO INT PRIMARY KEY,
        ID_PRODUCTO INT,
        CANTIDAD DECIMAL(20, 2),
        PRECIO DECIMAL(20, 2),
        SUB_TOTAL DECIMAL(20, 2)
        );`

## Running the Project

1.  **Start the backend server:**

    `python manage.py runserver`

2.  **Start the frontend server:**

        `cd frontend

    npm start # or yarn start`

3.  **Access the application:**

    Open your web browser and go to `http://localhost:3000`.

## API Endpoints

- **GET /api/empresas/** - List all empresas
- **GET /api/clientes/** - List all clientes
- **GET /api/clientes/empresa/:id/** - List clientes by empresa
- **GET /api/productos/** - List all productos
- **GET /api/facturas/** - List all facturas
- **GET /api/facturas/:id/** - Retrieve a single factura by ID
- **POST /api/facturas/** - Create a new factura
- **PUT /api/facturas/:id/** - Update a factura by ID

## Usage

### Backend

- The backend server is configured to run on `http://127.0.0.1:8000`.
- Use Django admin to manage data: `http://127.0.0.1:8000/admin`.

### Frontend

- The frontend server runs on `http://localhost:3000`.
- Navigate through the app to manage `empresas`, `clientes`, `productos`, `facturas` and Crear nueva factura

### Note

- Ensure CORS is configured correctly for local development by adding `http://localhost:3000` to the `CORS_ALLOWED_ORIGINS` in `settings.py`.

  python

      `CORS_ALLOWED_ORIGINS = [
      'http://localhost:3000',
      'http://127.0.0.1:8000' # If needed for backend API access
      ]`
  
      `INSTALLED_APPS = [
      'corsheaders',
      ...
      ]`
    
      `MIDDLEWARE = [
      'corsheaders.middleware.CorsMiddleware',
      ...
      ]`

## License

This project is licensed under the MIT License. See the LICENSE file for details.
