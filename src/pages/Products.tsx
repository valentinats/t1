import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import header from "../components/Header/Header.module.css";
import catalog from "../components/Catalog/Catalog.module.css";
import styles from "./Products.module.css";
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
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [inputChanged, setInputChanged] = useState(false);

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
    setInputChanged(true);
    handleSearch(value);
  };

  const handleShowMore = () => {
    const currentLength = visibleProducts.length;
    const nextProducts = products.slice(currentLength, currentLength + 9);
    if (currentLength + 9 >= products.length) {
      setAllProductsLoaded(true);
    }
    setVisibleProducts([...visibleProducts, ...nextProducts]);
  };

  useEffect(() => {
    if (!isValidProductName || inputChanged) {
      setProducts([]);
      setAllProductsLoaded(false);
      setVisibleProducts([]);
      setInputChanged(false);
      return;
    }
    setVisibleProducts(products.slice(0, 9));
  }, [products, isValidProductName, inputChanged]);

  const renderMenu = () => {
    return (
      <div className={[header["menu"], styles.products__menu].join(" ")}>
        <a className={header.menu__logo} href="/">
          <img src={logo} alt="Logo" />
        </a>
        <div className={[header["menu__nav"], header.nav].join(" ")}>
          <Link to="/t1/">Back to site</Link>
        </div>
      </div>
    );
  };

  return (
    <div className="products">
      <div className={styles.products__header}>
        <div className={styles.container}>{renderMenu()}</div>
      </div>
      <section>
        <div className={styles.container}>
          <h2>All products</h2>
          <div className={styles.search__form}>
            <input
              type="text"
              className={styles.input}
              name="searchForm"
              placeholder="Search by title"
              onChange={handleInputChange}
            ></input>
          </div>
          <ul
            className={[catalog.products__list, styles.items__list].join(" ")}
          >
            {!products.length && isValidProductName && (
              <p>Enter a product name.</p>
            )}
            {visibleProducts.map((product) => (
              <li
                key={product.id}
                className={catalog.products__item}
                id={product.id}
              >
                <Link to={`/t1/item/${product.id}`} key={product.id}>
                  <img
                    src={catalogShoes}
                    className={styles.item__img}
                    alt="Product photo"
                  />
                  <p className={catalog.item__title}>{product.title}</p>
                </Link>
                <p className={catalog.item__title}>${product.price}</p>
              </li>
            ))}
          </ul>
          {!allProductsLoaded && products.length > 9 && (
            <button className={styles["primary__btn"]} onClick={handleShowMore}>
              Show more
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
