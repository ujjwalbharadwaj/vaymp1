import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SortOptions from "./SortOptions";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { getAllProducts } from "../redux/actions/product";
import { categoriesData, productData,sleeveType,neckType,color,fabric,occasion,fit,gender,size } from "../static/data";
import FilterOptions from "./FilterOptions";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    color: [],
    size: [], 
    neckType: [],
    sleeveType: [], 
    gender: [],
    fabric:[],
    fit:[],
    occasion:[]
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d = allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts]);

  const handleFilterChange = (key, value) => {
    if (key === "size" || key === "sleeveType" || key === "neckType"|| key === "fabric"|| key === "fit" || key === "gender"|| key === "occasion"|| key === "color") {
      const updatedFilters = { ...filters };
      const index = updatedFilters[key].indexOf(value);
      if (index === -1) {
        updatedFilters[key].push(value);
      } else {
        updatedFilters[key].splice(index, 1);
      }
      setFilters(updatedFilters);
    } else {
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
    setShowFilters(false);
  };

  // State to manage dropdown visibility
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  return (
    <>
  {isLoading ? (
    <Loader />
  ) : (
    <div>
      <Header activeHeading={3} />
      <div className="flex">
        {/* Filters Dropdown */}
        <div className="relative w-1/2 p-4 z-10">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-gray-200 py-2 px-4 rounded-md shadow-md flex items-center justify-between"
          >
            <span className="font-semibold">Filters</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform transform ${
                showFilters ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.293 5.293a1 1 0 011.414 0L12 7.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {showFilters && (
            <div className="absolute top-full left-0 w-full bg-white py-2 px-4 shadow-md rounded-b-md">
              <FilterOptions
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                  sizesFromStock={size} // Updated prop name here
                  color={color}
                  sleeveType={sleeveType}
                  neckType={neckType}
                  fabric={fabric}
                  occasion={occasion}
                  fit={fit}
                  gender={gender}
/>

              <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={applyFilters}>
                Apply Filters
              </button>
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-1/2 p-4 z-10">
          <button
            onClick={() => setShowSort(!showSort)}
            className="w-full bg-gray-200 py-2 px-4 rounded-md shadow-md flex items-center justify-between"
          >
            <span className="font-semibold">Sort</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform transform ${
                showSort ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.293 5.293a1 1 0 011.414 0L12 7.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {showSort && (
            <div className="absolute top-full left-0 w-full bg-white py-2 px-4 shadow-md rounded-b-md">
              <SortOptions
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSortChange={handleSortChange}
              />
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {data &&
            data.map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
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