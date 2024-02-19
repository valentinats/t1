import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import "./Products.css";
import logo from "../assets/logo.svg";
import catalogShoes from "../assets/catalog-product.png";

interface Product {
  id: string;
  title: string;
  price: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isValidProductName, setIsValidProductName] = useState(true);

  const handleSearch = debounce((query: string) => {
    if (!query.trim()) {
      setProducts([]);
      setIsValidProductName(true);
      return;
    }
    fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products);
          setIsValidProductName(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsValidProductName(false);
      });
  }, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleSearch(value);
  };

  useEffect(() => {
    handleSearch("");
  }, []);

  const renderMenu = () => {
    return (
      <div className="menu products-menu">
        <a className="menu__logo" href="/">
          <img src={logo} alt="Logo" />
        </a>
        <div className="menu__nav nav">
          <Link to="/">Back to site</Link>
        </div>
      </div>
    );
  };

  return (
    <div className="products">
      <div className="products__header">
        <div className="container">{renderMenu()}</div>
      </div>
      <section>
        <div className="container">
          <h2>All products</h2>
          <div className="search__form">
            <input
              type="text"
              className="input"
              name="searchForm"
              placeholder="Search by title"
              onChange={handleInputChange}
            ></input>
            {/* <button className="primary__btn products__btn btn">Search</button> */}
          </div>
          <ul className="products-list">
            {!products.length && isValidProductName && (
              <p>Enter a product name.</p>
            )}
            {products.length > 0
              ? products.map((product) => (
                <Link to={`/item/${product.id}`} key={product.id}>
                    <li
                      key={product.id}
                      className="products-list__item"
                      id={product.id}
                    >
                      <img
                        src={catalogShoes}
                        alt="Product photo"
                      />
                      <p className="item__title">{product.title}</p>
                      <p className="item__price">${product.price}</p>
                    </li>
                  </Link>
                ))
              : !isValidProductName && (
                  <p>Check the spelling of the product.</p>
                )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Products;
