import React, { useEffect, useState } from "react";
import "./styles.css";

export default function LoadMoreData() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );

      const result = await response.json();

      if (result && result.products && result.products.length > 0) {
        setProducts((prevData) => [...prevData, ...result.products]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]); // Fetch products whenever count changes

  useEffect(() => {
    // Disable button when 100 products are loaded
    setDisableButton(products.length >= 100);
  }, [products]); // Update button disable state whenever products change

  return (
    <div className="load-more-container">
      {loading ? (
        <div>Loading data! Please wait.</div>
      ) : (
        <div className="product-container">
          {products.map((item) => (
            <div className="product" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      )}
      <div className="button-container">
        <button disabled={disableButton} onClick={() => setCount(count + 1)}>
          Load More Products
        </button>
        {disableButton && <p>You have reached 100 products</p>}
      </div>
    </div>
  );
}
