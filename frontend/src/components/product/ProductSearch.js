import { Fragment, useEffect, useState } from "react";
import MetaData from ".././layouts/MetaData";
import { getProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from ".././layouts/Loader";
import Product from ".././product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

export default function ProductSearch() {

    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
    const [currentPage, setCurrentPage] = useState(0);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState(null);
    const [rating, setRating] = useState(0);

    const { keyword } = useParams();
    const categories = ['Electronics', 'Mobile Phones', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home Decor'];

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo);
    }

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: "bottom-right"
            })
        }

        dispatch(getProducts(keyword, price, category, rating, currentPage))
    }, [error, dispatch, currentPage, keyword, price, category, rating])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <h1 id="products_heading">Search Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            <div className="col-6 col-md-3 mb-5 mt-5">
                                {/* Filter */}
                                <div className="px-5">
                                    <Slider
                                        range={true}
                                        marks={
                                            {
                                                1: "$1",
                                                1000: "$1000"
                                            }
                                        }
                                        min={1}
                                        max={1000}
                                        defaultValue={price}
                                        onChangeComplete={(price) => {
                                            setPrice(price)
                                        }}
                                        handleRender={
                                            renderProps => {
                                                return (
                                                    <Tooltip overlay={`$${renderProps.props["aria-valuenow"]}`}>
                                                        <div {...renderProps.props}></div>
                                                    </Tooltip>
                                                )
                                            }
                                        }
                                    />
                                </div>
                                <hr className="my-4 border" />
                                {/* Category filter */}
                                <div className="mt-4">
                                    <h3 className="mb-3">Categories</h3>
                                    <ul className="pl-0">
                                        {categories.map(category =>
                                            <li
                                                style={{
                                                    cursor: "pointer",
                                                    listStyleType: "none"
                                                }}
                                                key={category}
                                                onClick={() => {
                                                    setCategory(category)
                                                }}
                                            >
                                                {category}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <hr className="my-4 border" />
                                {/* Ratings filter */}
                                <div className="mt-4">
                                    <h4 className="mb-3">Ratings</h4>
                                    <ul className="pl-0">
                                        {[5,4,3,2,1].map(star =>
                                            <li
                                                style={{
                                                    cursor: "pointer",
                                                    listStyleType: "none"
                                                }}
                                                key={star}
                                                onClick={() => {
                                                    setRating(star)
                                                }}
                                            >
                                                <div className="rating-outer">
                                                    <div className="rating-inner" style={{
                                                        width:`${star * 20}%`
                                                    }}></div>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-6 col-md-9">
                                <div className="row">
                                    {products && products.map(product => (
                                        <Product col={4} key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>


                        </div>
                    </section>

                    {productsCount > 0 && productsCount > resPerPage ?
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'} />
                        </div>
                        : null}

                </Fragment>
            }
        </Fragment>
    )
}