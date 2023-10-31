import React, { useState, useEffect } from "react";
import { ref, push, get, set } from "firebase/database";
import { auth, database } from "../firebase"; // Make sure to import the `database` object

const Dashboard = ({ userId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);

  // Function to add a product to the user's data node in the database
  const addProduct = () => {
    const productData = {
      name,
      description,
      batchNumber,
    };

    const db = ref(database, `users/${userId}/products`);
    const newProductRef = push(db); // Generate a unique key for the product

    set(newProductRef, productData)
      .then(() => {
        console.log("Product added successfully!");
        setName("");
        setDescription("");
        setBatchNumber("");
      })
      .catch((error) => {
        console.error("Error adding product: ", error);
      });
  };

  // Function to retrieve and display products from the user's data node
  const showProducts = () => {
    const db = ref(database, `users/${userId}/products`);
    get(db)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const productData = snapshot.val();
          const productArray = Object.values(productData);
          setProducts(productArray);
        } else {
          console.log("No products available");
        }
      })
      .catch((error) => {
        console.error("Error getting products: ", error);
      });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {showAddProduct ? (
          <div>
            <h2>Add Product</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Batch Number"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
            />
            <button onClick={addProduct}>Add Product</button>
          </div>
        ) : (
          <div>
            <h2>Show Products</h2>
            <button onClick={showProducts}>Show Products</button>
            <ul>
              {products.map((product, index) => (
                <li key={index}>
                  Name: {product.name}, Description: {product.description}, Batch Number: {product.batchNumber}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={() => setShowAddProduct(!showAddProduct)}>
          {showAddProduct ? "Show Products" : "Add Product"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
