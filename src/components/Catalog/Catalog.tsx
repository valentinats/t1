import React, { useState, useEffect } from "react";
import "./Catalog.css";
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
    <section id="catalog" className="catalog">
      <div className="container">
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
    <div className="catalog-list">
      <div className="catalog__parameters">
        <p className="parameters__title">
          Selection <br /> by parameters
        </p>
        <p className="table__title">Category</p>
        <table aria-label="Selecting parameters for the list of products">
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={1} className="loading-row">
                  <div className="load-row">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={1} className="error-row">
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
          className="apply__btn btn"
          aria-label="The button for applying the selected parameters"
          onClick={handleApplyButtonClick}
        >
          Apply
        </button>
        <button
          className="reset__btn btn"
          aria-label="Reset button for selected parameters"
          onClick={handleResetButtonClick}
        >
          Reset
        </button>
      </div>
      {isLoading ? (
        <div className="load-row">
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
      <ul className="products-list">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
      {/* <button
        className="load-more__btn btn"
        aria-label="A button to open the list of products"
      >
        Show more
      </button> */}
    </div>
  );
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <li className="products-list__item" id={product.id}>
      <img src={shoes} alt="Product photo" />
      <p className="item__title">{product.title}</p>
      <p className="item__price">{product.price} $</p>
    </li>
  );
};

export default Catalog;
