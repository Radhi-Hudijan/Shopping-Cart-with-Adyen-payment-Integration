import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Link, useParams } from "react-router-dom";
import Colors from "./Colors";
import "../css/Details.css";

const Details = () => {
  const { addCart, products } = useContext(DataContext);

  const [productState, setProductState] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getProduct = () => {
      if (id) {
        const res = products;
        const data = res.filter((item) => {
          return item._id === id;
        });
        setProductState(data);
      }
    };

    getProduct();
  }, [id, products]);

  return (
    <>
      {productState.map((item) => (
        <div className="details" key={item._id}>
          <img src={item.src} alt="" />
          <div className="box">
            <div className="row">
              <h2>{item.title}</h2>
              <span>€{item.price}</span>
            </div>
            <Colors colors={item.colors} />
            <p>{item.description}</p>
            <p>{item.content}</p>
            <Link to="/cart" className="cart" onClick={() => addCart(item._id)}>
              Add to cart
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Details;
