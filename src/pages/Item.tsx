import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Item.css";
import "./Products.css";
import logo from "../assets/logo.svg";
import cardShoes from "../assets/card-product.png";

interface Product {
  title: string;
  rating: number;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  description: string;
}

const Item = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const imagesArray = [
    cardShoes,
    cardShoes,
    cardShoes,
    cardShoes,
    cardShoes,
    cardShoes,
  ];

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data: Product) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const renderMenu = () => {
    return (
      <div className="menu products-menu">
        <a className="menu__logo" href="/">
          <img src={logo} alt="Logo" />
        </a>
        <div className="menu__nav nav">
          <Link to="/t1/">Back to site</Link>
        </div>
      </div>
    );
  };

  const calculateDiscountPrice = () => {
    if (product) {
      const discountPrice =
        product.price - product.price * (product.discountPercentage / 100);
      return discountPrice.toFixed(2).slice(0, -1);
    }
    return "";
  };

  return (
    <div className="products">
      <div className="products__header">
        <div className="container">{renderMenu()}</div>
      </div>
      <section className="product__item">
        <div className="container">
          <h2>Product {id}</h2>
          <div className="card">
            <div className="card__gallery">
              <img src={cardShoes} />
              <div className="card__carousel">
                {imagesArray.map((image, index) => (
                  <img key={index} src={image} />
                ))}
              </div>
            </div>
            <div className="card__info">
              {product ? (
                <>
                  <p className="card__title">{product.title}</p>
                  <ul className="card__desc">
                    <li>
                      Rating: <span>{product.rating}</span>
                    </li>
                    <li>
                      Base price: <span>{product.price}$</span>
                    </li>
                    <li>
                      Discount percentage:{" "}
                      <span>{product.discountPercentage}%</span>
                    </li>
                    <li>
                      Discount price: <span>{calculateDiscountPrice()}$</span>
                    </li>
                    <li>
                      Stock: <span>{product.stock}</span>
                    </li>
                    <li>
                      Brand: <span>{product.brand}</span>
                    </li>
                    <li>
                      Category: <span>{product.category}</span>
                    </li>
                    <li>
                      Description: <span>{product.description}</span>
                    </li>
                  </ul>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <p className="card__id">
              SKU ID: <span>{id}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Item;
