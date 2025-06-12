
## 📚 School Location API

A simple Node.js API to store and retrieve schools with location data, and sort them by distance using geographical coordinates.

---

### 🚀 Features

* Add school with name, address, latitude, and longitude
* List nearby schools sorted by distance (Haversine formula)
* Input validation using Joi
* Centralized error handling
* MySQL database connection using `mysql2/promise`

---

### 📦 Installation

```bash
git clone https://github.com/your-username/school-api.git
cd school-api
npm install
```

---

### ⚙️ Setup

Create a `.env` file:

```env
HOST=localhost
USER=root
PASSWORD=your_mysql_password
DATABASE=school_db
PORT=3000
```

> Make sure the database `school_db` exists in your MySQL.
> You can create it manually using:

```sql
CREATE DATABASE school_db;
```

---

### 🧱 Create the `schools` table

This should be automatically created on server start. If not, use:

```sql
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT
);
```

---

### 🛠 Run the server

```bash
npm start
```

> Server will run on `http://localhost:3000` (or your `PORT`).

---

### 📮 API Endpoints

#### ➕ Add School

* **URL**: `/addSchool`
* **Method**: `POST`
* **Body (JSON)**:

```json
{
  "name": "Delhi Public School",
  "address": "Sector 62, Noida",
  "latitude": 28.620123,
  "longitude": 77.365123
}
```

* **Response**:

```json
{
  "message": "Data inserted Successfully",
  "status": 200,
  "data": { /* MySQL insert result */ }
}
```

---

#### 📍 List Nearby Schools

* **URL**: `/listSchools`
* **Method**: `GET`
* **Query Params**:

```
/listSchools?latitude=28.61&longitude=77.23
```

* **Response**:

```json
{
  "message": "Success",
  "status": 200,
  "data": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "distance_km": 1.23,
      ...
    },
    ...
  ]
}
```
