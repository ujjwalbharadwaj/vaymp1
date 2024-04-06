import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { getAllProducts } from "../redux/actions/product";
import { categoriesData, productData,sleeveType,neckType,color,fabric,occasion,fit,gender } from "../static/data";


const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    color: [],
    size: [], // Updated to an array for checkbox values
    neckType: [],
    sleeveType: [], // Updated to an array for checkbox values
    gender: [],
    fabric:[],
    fit:[],
    occasion:[]
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Extract sizes from allProducts and remove duplicates
  const sizesFromStock = Array.from(
    new Set(
      allProducts.flatMap((product) =>
        product.stock.map((item) => item.size)
      )
    )
  );

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d = allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    // window.scrollTo(0,0);
  }, [allProducts]);

  const handleFilterChange = (key, value) => {
    if (key === "size" || key === "sleeveType" || key === "neckType"|| key === "fabric"|| key === "fit" || key === "gender"|| key === "occasion"|| key === "color") {
      // For size and sleeve type filters, toggle the selected value
      const updatedFilters = { ...filters };
      const index = updatedFilters[key].indexOf(value);
      if (index === -1) {
        updatedFilters[key].push(value);
      } else {
        updatedFilters[key].splice(index, 1);
      }
      setFilters(updatedFilters);
    } else {
      // For other filters, update normally
      setFilters({ ...filters, [key]: value });
    }
  };

  const handleSortChange = (sortBy, sortOrder) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  const applyFilters = () => {
    
    const queryParams = {
      category: filters.category,
      color: filters.color,
      size: filters.size, 
      neckType: filters.neckType,
      sleeveType: filters.sleeveType, 
      fabric: filters.fabric,
      occasion: filters.occasion, 
      fit: filters.fit, 
      gender: filters.gender,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };
    dispatch(getAllProducts(queryParams));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <div className={`${styles.filterContainer}`}>
            {/* Render filter options here */}
            <div>
              <label className="block mb-2">Category:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => handleFilterChange("category", e.target.value)}
                value={filters.category}
              >
                <option value="">All</option>
                {/* Render category options dynamically */}
                {/* Example: */}
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                {/* Add more options as needed */}
              </select>
            </div>
            {/* Add more filter options as needed */}
            {/* Example: */}
            {/* Size, Neck Type, Sleeve Type, Gender */}
            <div>
              <label className="block mb-2">Size:</label>
              {sizesFromStock.map((size, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={size}
                    name="size"
                    value={size}
                    onChange={(e) => handleFilterChange("size", e.target.value)}
                    checked={filters.size.includes(size)}
                  />
                  <label htmlFor={size} className="ml-2">{size}</label>
                </div>
              ))}
            </div>
            <div>
              <label className="block mb-2">Sleeve Type:</label>
              {sleeveType.map((option) => (
                <div key={option.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="sleeveType"
                    value={option.title}
                    onChange={(e) => handleFilterChange("sleeveType", e.target.value)}
                    checked={filters.sleeveType.includes(option.title)}
                  />
                  <label htmlFor={option.id} className="ml-2">{option.title}</label>
                </div>
              ))}
            </div>
            <div>
                <label className="block mb-2">Neck Type:</label>
                {neckType.map((option) => (
                  <div key={option.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={option.id}
                      name="neckType" // Make sure each checkbox has the same name
                      value={option.title}
                      onChange={(e) => handleFilterChange("neckType", e.target.value)}
                      checked={filters.neckType.includes(option.title)} // Check if the value is in the array
                    />
                    <label htmlFor={option.id} className="ml-2">{option.title}</label>
                  </div>
                ))}
              </div>

            <div>
              <label className="block mb-2">color Type:</label>
              {color.map((option) => (
                <div key={option.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="color"
                    value={option.name}
                    onChange={(e) => handleFilterChange("color", e.target.value)}
                    checked={filters.color.includes(option.name)}
                  />
                  <label htmlFor={option.id} className="ml-2">{option.name}</label>
                </div>
              ))}
            </div>
            <div>
              <label className="block mb-2">Fabric Type:</label>
              {fabric.map((option) => (
                <div key={option.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="fabric"
                    value={option.type}
                    onChange={(e) => handleFilterChange("fabric", e.target.value)}
                    checked={filters.fabric.includes(option.type)}
                  />
                  <label htmlFor={option.id} className="ml-2">{option.type}</label>
                </div>
              ))}
            </div>
            <div>
              <label className="block mb-2">fabric Type:</label>
              {fabric.map((option) => (
                <div key={option.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="fabric"
                    value={option.type}
                    onChange={(e) => handleFilterChange("fabric", e.target.value)}
                    checked={filters.fabric.includes(option.type)}
                  />
                  <label htmlFor={option.id} className="ml-2">{option.type}</label>
                </div>
              ))}
            </div>
            <div>
              <label className="block mb-2">occasion Type:</label>
              {occasion.map((option) => (
                <div key={option.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="occasion"
                    value={option.type}
                    onChange={(e) => handleFilterChange("occasion", e.target.value)}
                    checked={filters.occasion.includes(option.type)}
                  />
                  <label htmlFor={option.id} className="ml-2">{option.type}</label>
                </div>
              ))}
            </div>
            <div>
              <label className="block mb-2">fit Type:</label>
              {fit.map((option) => (
                <div key={option.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="fit"
                    value={option.type}
                    onChange={(e) => handleFilterChange("fit", e.target.value)}
                    checked={filters.fit.includes(option.type)}
                  />
                  <label htmlFor={option.id} className="ml-2">{option.type}</label>
                </div>
              ))}
            </div>
            <div>
              <label className="block mb-2">gender Type:</label>
              {gender.map((option) => (
                <div key={option.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="gender"
                    value={option.type}
                    onChange={(e) => handleFilterChange("gender", e.target.value)}
                    checked={filters.gender.includes(option.type)}
                  />
                  <label htmlFor={option.id} className="ml-2">{option.type}</label>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={applyFilters}>
            Apply Filters
          </button>
          <div className={`${styles.sortContainer} mt-5`}>
            {/* Render sort options here */}
            {/* Example: */}
            <div className="flex items-center mb-3">
              <label className="mr-3">Sort By:</label>
              <select
                className="p-2 border border-gray-300 rounded-md"
                onChange={(e) => handleSortChange(e.target.value, "asc")}
              >
                <option value="createdAt">Latest</option>
                <option value="price">Price (Low to High)</option>
                {/* Add more sort options as needed */}
              </select>
            </div>
            <div className="flex items-center">
              <label className="mr-3">Sort Order:</label>
              <select
                className="p-2 border border-gray-300 rounded-md"
                onChange={(e) => handleSortChange(sortBy, e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
            </div>
            {data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
