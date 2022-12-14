import React from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const ProductCard = (props) => {
  const { _id, title, img, price } = props.item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        _id,
        title,
        img,
        price,
      })
    );
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={img ? img.secure_url : "logo192.png"} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${_id}`}>{title}</Link>
        </h5>
        <div
          className=" d-flex align-items-center justify-content-between"
          style={{ flexDirection: "column" }}
        >
          <span className="product__price">Rs{price}</span>
          <button className="addTOCart__btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
