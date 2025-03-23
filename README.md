# 📦 Product, Category, and Inventory API

A simple RESTful API for managing product categories, products, and inventory. Features include low stock reporting and inventory tracking.

---

## 🚀 Installation & Setup

### ✅ **Clone the Repository**
```bash
git clone https://github.com/yourusername/product-inventory-api.git
cd product-inventory-api
```

### ✅ **Install Dependencies**
```bash
npm install
```

### ✅ **Environment Variables**
Create a `.env` file in the root directory and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### ✅ **Run the Server**
```bash
npm run dev
```
Server runs by default on `http://localhost:3000`

---

## ⚙️ **API Base URL**
```
http://localhost:3000/api
```

---

## 📑 **Features**
✅ Category Management  
✅ Product Management  
✅ Inventory Management  
✅ Low Stock Reporting  
✅ Prevents duplicate product-color inventory entries  

---

## 📄 **API Documentation**
Detailed API documentation including example requests and responses is available via Postman.

👉 **View the API Documentation on Postman:**  
[🔗 Product, Category & Inventory API Documentation (Postman)](https://web.postman.co/workspace/My-Workspace~59f468e1-3767-484c-8073-da65c916de33/collection/42357137-0711e0c3-ef92-4a83-b63d-da5fbaf505a4?action=share&source=copy-link&creator=42357137)

---

## 🛠 **Available Scripts**
- `npm run dev` - Runs the server in development mode using nodemon
- `npm start` - Runs the server in production mode

---

## 🏗 **Tech Stack**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Postman (API Documentation)

---

## 📬 **Contributing**
Pull requests are welcome!  
Feel free to fork the repo and submit a PR.

---

## 🧠 **Future Improvements**
- Admin authentication & authorization
- Pagination for product & category listings
- Swagger API documentation
- Tests (Jest or Mocha)

---

