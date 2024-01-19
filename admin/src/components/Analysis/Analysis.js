import { faShoppingCart, faMoneyBill, faCookieBite, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import customAxios from "../../axios/customAxios";
import styles from './Analysis.module.css';
import { useEffect, useState } from "react";

const Analysis = () => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalInventory, setTotalInventory] = useState(0);
    const [topProducts, setTopProducts] = useState([]);

    const [timeRange, setTimeRange] = useState("year");
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const analyzeSales = async () => {
            const responseOrderCount = await customAxios.get(`/api/analysis/ordercount/${timeRange}`);
            if (responseOrderCount && responseOrderCount.data && responseOrderCount.data.success) {
                setTotalOrders(responseOrderCount.data.data);
            }

            const responseTotalRevenue = await customAxios.get(`/api/analysis/totalrevenue/${timeRange}`);
            if (responseTotalRevenue && responseTotalRevenue.data && responseTotalRevenue.data.success) {
                setTotalRevenue(responseTotalRevenue.data.data);
            }

            const responseInventory = await customAxios.get(`/api/analysis/inventory`);
            if (responseInventory && responseInventory.data && responseInventory.data.success) {
                setTotalInventory(responseInventory.data.data);
            }

            const responseTopProducts = await customAxios.get(`/api/analysis/top5bestsellingproducts/${timeRange}`);
            if (responseTopProducts && responseTopProducts.data && responseTopProducts.data.success) {
                setTopProducts(responseTopProducts.data.data);
            }

            if (timeRange !== "day" && timeRange !== "all") {
                const responseChartData = await customAxios.get(`/api/analysis/revenue/${timeRange}`);
                if (responseChartData && responseChartData.data && responseChartData.data.success) {
                    setChartData(responseChartData.data.data);
                }
            }
        }

        analyzeSales();
    }, [timeRange]);

    return (
        <div className={`col-9  ${styles.col9}`}>
            <div className={styles['analysis-container']}>
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-3">
                            <select
                                value={timeRange}
                                className={styles['filter']}
                                onChange={(e) => setTimeRange(e.target.value)}
                            >
                                <option value="day">Today</option>
                                <option value="week">This week</option>
                                <option value="month">This month</option>
                                <option value="year">This year</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-3 col-sm-6" >
                            <div className={`card ${styles['gradient-1']}`}>
                                <div className="card-body" style={{ fontFamily:timeRange }}>
                                    <h3 className="card-title text-white">Total Orders</h3>
                                    <div className="d-inline-block">
                                        <h2 className="text-white">{totalOrders}</h2>
                                    </div>
                                    <span className="float-right display-5 opacity-5">
                                        <FontAwesomeIcon
                                            icon={faShoppingCart}
                                            className={styles['shopping-cart-icon']}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className={`card ${styles['gradient-2']}`}>
                                <div className="card-body" style={{ fontFamily:timeRange }}>
                                    <h3 className="card-title text-white">Total Revenue</h3>
                                    <div className="d-inline-block">
                                        <h2 className="text-white">$ {totalRevenue.toFixed(2)}</h2>
                                        <p className="text-white mb-0"></p>
                                    </div>
                                    <span className="float-right display-5 opacity-5">
                                        <FontAwesomeIcon
                                            icon={faMoneyBill}
                                            className={styles['money-icon']}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row m-4">
                        <div className={`col-lg-6 col-sm-6 ${styles['chart']}`}>
                            {timeRange !== "day" && timeRange !== "all" &&
                                <LineChart width={650} height={200} data={chartData}  margin={{ top: 20, right: 30, left: 20, bottom: 5 }} style={{ background: '#f0f0f0', borderRadius: '10px'}}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            }
                        </div>
                    </div>
                    <div className="row mt-3">
                        <h2 className={styles['top-selling']}>Top Selling</h2>
                        <div className={styles['product-list']}>
                            {topProducts.map(product => (
                                <div className={`card ${styles['product-card']}`} >
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img src={product.productDetails[0].imgUrl} className={styles['product-img']} alt="" />
                                            <h5 className={styles['product-name']}>{product.productDetails[0].name}</h5>
                                            <p className="m-0">Sold: {product.totalQuantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analysis;