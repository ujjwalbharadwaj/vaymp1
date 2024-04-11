import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { getAllProducts } from "../redux/actions/product";
import { categoriesData, sleeveType, neckType, color, fabric, occasion, fit, gender, size } from "../static/data"; // Assuming data is imported correctly

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoriesParam = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    category: categoriesParam ? categoriesParam.split(',') : [], // Parse categoriesParam if present
    color: [],
    size: [], 
    neckType: [],
    sleeveType: [], 
    gender: [],
    fabric:[],
    fit:[],
    occasion:[],
    sortBy: "",
    sortOrder: "desc", // Default sort order is descending
    customerRating: [],
    priceRange: [],
  });

  useEffect(() => {
    if (categoriesParam === null) {
      setData(allProducts);
    } else {
      const filteredData = allProducts.filter((item) => filters.category.includes(item.category));
      setData(filteredData);
    }
  }, [allProducts, categoriesParam, filters.category]);

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters };
  
    if (
      key === "size" ||
      key === "sleeveType" ||
      key === "neckType" ||
      key === "fabric" ||
      key === "fit" ||
      key === "gender" ||
      key === "occasion" ||
      key === "color"
    ) {
      const index = updatedFilters[key].indexOf(value);
      if (index === -1) {
        updatedFilters[key].push(value);
      } else {
        updatedFilters[key].splice(index, 1);
      }
    } else if (key === "priceRange" || key === "customerRating") {
      const index = updatedFilters[key].indexOf(value);
      if (index === -1) {
        updatedFilters[key].push(value);
      } else {
        updatedFilters[key].splice(index, 1);
      }
    } else if (key === "category") {
      const index = updatedFilters[key].indexOf(value);
      if (index === -1) {
        updatedFilters[key].push(value);
      } else {
        updatedFilters[key].splice(index, 1);
      }
    } else {
      updatedFilters[key] = value;
    }
  
    setFilters(updatedFilters);
  };
  

  const applyFilters = () => {
    let categoryParam = "";
  if (Array.isArray(filters.category)) {
    categoryParam = filters.category.join(','); // Convert array to comma-separated string
  } else if (typeof filters.category === "string") {
    categoryParam = filters.category;
  }
    const queryParams = {
      category: categoryParam,
      color: filters.color,
      size: filters.size,
      neckType: filters.neckType,
      sleeveType: filters.sleeveType,
      fabric: filters.fabric,
      occasion: filters.occasion,
      fit: filters.fit,
      gender: filters.gender,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      customerRating: filters.customerRating,
      priceRange: filters.priceRange,
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
          <div>
              <label className="block mb-2">Category:</label>
              {categoriesData.map((category) => (
                <div key={category.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={category.id}
                    value={category.title}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    checked={filters.category.includes(category.title)}
                  />
                  <label htmlFor={category.id} className="ml-2">{category.title}</label>
                </div>
              ))}
            </div>
            {/* Add more filter options here */}
            <div>
              <label className="block mb-2">Size:</label>
              {size.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="size"
                    value={option.type}
                    onChange={(e) => handleFilterChange("size", e.target.value)}
                    checked={filters.size.includes(option.type)}
                  />
                  <label htmlFor={option.id} className="ml-2">{option.type}</label>
                </div>
              ))}
            </div>
            <div>
              <label className="block mb-2">Size:</label>
              {size.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="size"
                    value={option.type}
                    onChange={(e) => handleFilterChange("size", e.target.value)}
                    checked={filters.size.includes(option.type)}
                  />
                  <label htmlFor={option.id} className="ml-2">{option.type}</label>
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
          <div className={`${styles.sortContainer}`}>
            <label className="block mb-2">Sort By:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              value={filters.sortBy}
            >
              <option value="">Select</option>
              <option value="priceHighToLow">Price (High to Low)</option>
              <option value="priceLowToHigh">Price (Low to High)</option>
              <option value="latest">Latest</option>
            </select>
          </div>
          <div className={`${styles.ratingContainer}`}>
        <label className="block mb-2">Customer Rating:</label>
        <div className="flex flex-wrap">
          <input
            type="checkbox"
            id="rating4"
            value="4-5"
            checked={filters.customerRating.includes("4-5")}
            onChange={(e) => handleFilterChange("customerRating", e.target.value)}
          />
          <label htmlFor="rating4" className="mr-4">
            4 and above
          </label>

          <input
            type="checkbox"
            id="rating3to4"
            value="3-4"
            checked={filters.customerRating.includes("3-4")}
            onChange={(e) => handleFilterChange("customerRating", e.target.value)}
          />
          <label htmlFor="rating3to4" className="mr-4">
            3 to 4
          </label>

          <input
            type="checkbox"
            id="rating3below"
            value="1-3"
            checked={filters.customerRating.includes("1-3")}
            onChange={(e) => handleFilterChange("customerRating", e.target.value)}
          />
          <label htmlFor="rating3below">3 and below</label>
        </div>
      </div>
      <div className={`${styles.priceRangeContainer}`}>
        <label className="block mb-2">Price Range:</label>
        <div className="flex flex-wrap">
          <input
            type="checkbox"
            id="price1-199"
            value="1-199"
            checked={filters.priceRange.includes("1-199")}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          />
          <label htmlFor="price1-199" className="mr-4">
            1 - 199
          </label>
          <input
            type="checkbox"
            id="price200-499"
            value="200-499"
            checked={filters.priceRange.includes("200-499")}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          />
          <label htmlFor="price500-999" className="mr-4">
            200 - 499
          </label>
          <input
            type="checkbox"
            id="price500-999"
            value="500-999"
            checked={filters.priceRange.includes("500-999")}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          />
          <label htmlFor="price500-999" className="mr-4">
            500 - 999
          </label>
          <input
            type="checkbox"
            id="price1000-1999"
            value="1000-1999"
            checked={filters.priceRange.includes("1000-1999")}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          />
          <label htmlFor="price1000-1999" className="mr-4">
            1000 - 1999
          </label>
          <input
            type="checkbox"
            id="price2000-3999"
            value="2000-3999"
            checked={filters.priceRange.includes("2000-3999")}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          />
          <label htmlFor="price2000-3999" className="mr-4">
            2000 - 3999
          </label>
          <input
            type="checkbox"
            id="price4000-4999"
            value="4000-4999"
            checked={filters.priceRange.includes("4000-4999")}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          />
          <label htmlFor="price4000-4999" className="mr-4">
            4000 - 4999
          </label><input
            type="checkbox"
            id="price5000-9999"
            value="5000-9999"
            checked={filters.priceRange.includes("5000-9999")}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          />
          <label htmlFor="price5000-9999" className="mr-4">
          5000-9999
          </label>
          <input
            type="checkbox"
            id="price10000-1000000000"
            value="10000-1000000000"
            checked={filters.priceRange.includes("10000-1000000000")}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          />
          <label htmlFor="price10000-1000000000" className="mr-4">
            10000 and above
          </label>
        </div>
      </div>
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={applyFilters}>
            Apply Filters
          </button>
          {/* Render product cards based on filtered data */}
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
