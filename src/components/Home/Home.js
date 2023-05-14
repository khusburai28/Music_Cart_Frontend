import React, {useState, useEffect} from 'react'
import styles from "./Home.module.css"
import data from "../../assets/data.json";
import girl from "../../assets/images/girl_image.svg";
import {
  BsSearch,
  BsFillGridFill,
  BsGrid,
  BsHddStackFill,
  BsHddStack,
  BsCartPlus,
  BsCart3,
} from "react-icons/bs";

import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";

import { CiGrid2H } from "react-icons/ci";
import {
  typeOptions,
  priceOptions,
  colorOptions,
  companyOptions,
  sortOptions,
} from "../../assets/filterData.js";
import ProductGridView from "./ProductGridView.js";
import ProductStackView from './ProductStackView';
import {Link} from "react-router-dom";
import Loader from "../Layout/Loader.js";
import { useLocation } from 'react-router-dom';

import { getAllProduct } from '../../redux/actions/product';
import { useDispatch, useSelector } from 'react-redux';
import MobileFooter from '../Layout/MobileFooter';
import MobileHeader from '../Layout/MobileHeader';


const Home = () => {

  const [grid, setGrid] = useState(true)
  const [headphoneType, setHeadphoneType] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [company, setCompany] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");
  
  
  let {pathname} = useLocation();

  const dispatch = useDispatch();
  const {products, loading} = useSelector((state) => state.product);


  const handleClick = (pro) => {
    dispatch({ type: "PushBread", payload: { name: pro.name, path: `/product/${pro._id}` } });
  }

  useEffect(() => {
    let price_range = price.split('-');
    // price_range = price_range.map((price) => parseInt(price));
    if(price_range.length == 1)price_range=["0", "1000000"];
    console.log(keyword, headphoneType, price_range, color, company, sort);
    dispatch(getAllProduct(keyword, headphoneType, price_range, color, company, sort));
  }, [keyword, headphoneType, price, color, company, sort]);

  useEffect(()=>{
    dispatch({type: "ResetBreat"});
  }, [pathname]);

  return (
    <div className={styles.container}>
      <MobileHeader />
      <div className={styles.addvertisment}>
        <img className={styles.girlImage} src={girl} alt="girl image" />
        <h1>Grab upto 50% off on Selected headphones</h1>
        <button>buy Now</button>
      </div>

      <div className={styles.search}>
        <BsSearch />
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className={styles.tools}>
        <div onClick={() => setGrid(!grid)} className={styles.toggleGrid}>
          <div>{grid ? <BsFillGridFill /> : <BsGrid />}</div>
          <div>{!grid ? <BsHddStackFill /> : <BsHddStack />}</div>
        </div>

        <div className={styles.filters}>
          {/*headphone type */}
          <select onChange={(e) => setHeadphoneType(e.target.value)}>
            <option value="">Headphones Type</option>
            {typeOptions.map((option, index) => {
              return (
                <option className={styles.op} key={index}>
                  {option}
                </option>
              );
            })}
          </select>
          {/*company */}
          <select onChange={(e) => setCompany(e.target.value)}>
            <option value="">company</option>
            {companyOptions.map((option, index) => {
              return (
                <option className={styles.op} key={index}>
                  {option}
                </option>
              );
            })}
          </select>
          {/*color */}
          <select onChange={(e) => setColor(e.target.value)}>
            <option value="">color</option>
            {colorOptions.map((option, index) => {
              return (
                <option className={styles.op} key={index}>
                  {option}
                </option>
              );
            })}
          </select>
          {/*price */}
          <select onChange={(e) => setPrice(e.target.value)}>
            <option value="">price</option>
            {priceOptions.map((option, index) => {
              return (
                <option className={styles.op} key={index}>
                  {option}
                </option>
              );
            })}
          </select>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">sort By</option>
            {sortOptions.map((option, index) => {
              return (
                <option value={option?.val} className={styles.op} key={index}>
                  {option?.display}
                </option>
              );
            })}
          </select>
        </div>

        {/*add sort by */}
      </div>

      {/* displaying products */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {grid ? (
            <div className={styles.Products_gridView}>
              {products?.map((product, index) => (
                <Link
                  onClick={() => handleClick(product)}
                  key={index}
                  to={`/product/${product._id}`}
                >
                  <ProductGridView
                    className={styles.item}
                    key={index}
                    product={product}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.Products_stackView}>
              {products?.map((product, index) => (
                <ProductStackView
                  className={styles.item}
                  key={index}
                  product={product}
                />
              ))}
            </div>
          )}
        </>
      )}
      {/* mobile view footer */}
      <MobileFooter />
    </div>
  );
}

export default Home