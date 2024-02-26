import React, { useState, useEffect } from "react";
import styles from "./Catalog.module.css";
import shoes from "../../assets/product.png";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
}

interface ProductItemProps {
  product: Product;
}

const Catalog: React.FC = () => {
  return (
    <section id="catalog" className={styles.catalog}>
      <div className={styles.container}>
        <h2>Catalog</h2>
        <CatalogList />
      </div>
    </section>
  );
};

const CatalogList: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("smartphones");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => {
        console.log(error);
        setError("API connection error.");
      });

    handleApplyButtonClick();
  }, []);

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
  };

  const handleApplyButtonClick = () => {
    if (selectedCategory) {
      setIsLoading(true);

      fetch(`https://dummyjson.com/products/category/${selectedCategory}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch products");
          }
          return res.json();
        })
        .then((data) => {
          setProducts(data.products);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError("API connection error.");
        });
    }
  };

  const handleResetButtonClick = () => {
    setSelectedCategory("");
    setProducts([]);
  };

  return (
    <div className={styles.catalog__list}>
      <div className={styles.catalog__parameters}>
        <p className={styles.parameters__title}>
          Selection <br /> by parameters
        </p>
        <p className={styles.table__title}>Category</p>
        <table aria-label="Selecting parameters for the list of products">
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={1} className="loading__row">
                  <div className={styles.load__row}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={1} className="error__row">
                  <p>{error}</p>
                </td>
              </tr>
            ) : (
              categories.map((category, index) => (
                <tr key={index}>
                  <th
                    onClick={() => handleCategorySelection(category)}
                    className={selectedCategory === category ? "selected" : ""}
                    style={{
                      background:
                        selectedCategory === category ? "#d1d1d1" : "",
                    }}
                  >
                    {category}
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <button
          className={[styles['apply__btn'], styles.btn].join(' ')}
          aria-label="The button for applying the selected parameters"
          onClick={handleApplyButtonClick}
        >
          Apply
        </button>
        <button
          className={[styles['reset__btn'], styles.btn].join(' ')}
          aria-label="Reset button for selected parameters"
          onClick={handleResetButtonClick}
        >
          Reset
        </button>
      </div>
      {isLoading ? (
        <div className={styles.load__row}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : selectedCategory ? (
        <ProductsList products={products} selectedCategory={selectedCategory} />
      ) : (
        <p>Select a category to see products.</p>
      )}
    </div>
  );
};

const ProductsList: React.FC<{
  products: Product[];
  selectedCategory: string;
}> = ({ products }) => {
  if (!products.length) {
    return <p>Apply the selected category.</p>;
  }

  return (
    <div>
      <ul className={styles.products__list}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
      {/* <button
        className={[styles['load__btn'], styles.btn].join(' ')}
        aria-label="A button to open the list of products"
      >
        Show more
      </button> */}
    </div>
  );
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <li className={styles.products__item} id={product.id}>
      <img src={shoes} alt="Product photo" />
      <p className={styles.item__title}>{product.title}</p>
      <p className={styles.item__price}>{product.price} $</p>
    </li>
  );
};

export default Catalog;
