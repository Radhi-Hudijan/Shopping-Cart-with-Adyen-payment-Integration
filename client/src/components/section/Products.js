import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import "../css/Products.css";

const Products = () => {
  const { products, addCart } = useContext(DataContext);

  return (
    <div id="product">
      {products.map((product) => (
        <div className="card" key={product._id}>
          <Link to={`/product/${product._id}`}>
            <img src={product.src} alt="" />
          </Link>
          <div className="content">
            <h3>
              <Link to={`/product/${product._id}`}>{product.title}</Link>
            </h3>
            <span>€{product.price}</span>
            <p>{product.description}</p>
            <button onClick={() => addCart(product._id)}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
