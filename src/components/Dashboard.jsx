import React, { useState, useEffect } from "react";
import { ref, push, get, set } from "firebase/database";
import { auth, database } from "../firebase";
import QRCode from "qrcode.react";

const Dashboard = ({ userId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showQRMap, setShowQRMap] = useState({});
  const [products, setProducts] = useState([]);

  const addProduct = () => {
    const productData = {
      name,
      description,
      batchNumber,
    };

    const db = ref(database, `users/${userId}/products`);
    const newProductRef = push(db);

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

  const toggleQRCode = (productId) => {
    const updatedShowQRMap = { ...showQRMap };
    updatedShowQRMap[productId] = !updatedShowQRMap[productId];
    setShowQRMap(updatedShowQRMap);
  };

  const hideQRCode = (productId) => {
    const updatedShowQRMap = { ...showQRMap };
    updatedShowQRMap[productId] = false;
    setShowQRMap(updatedShowQRMap);
  };

  const showProducts = () => {
    const db = ref(database, `users/${userId}/products`);
    get(db)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const productData = snapshot.val();
          const productArray = Object.values(productData);
          const initialShowQRMap = productArray.reduce((acc, product) => {
            acc[product.name] = false;
            return acc;
          }, {});
          setShowQRMap(initialShowQRMap);
          setProducts(productArray);
        } else {
          console.log("No products available");
        }
        setShowTable(true);
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
            {showTable && (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Batch Number</th>
                    <th>QR Code</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.batchNumber}</td>
                      <td>
                        {showQRMap[product.name] ? (
                          <div>
                            <QRCode value={JSON.stringify(product)} size={128} />
                            <button onClick={() => hideQRCode(product.name)}>
                              Hide QR Code
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => toggleQRCode(product.name)}>
                            Show QR Code
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
