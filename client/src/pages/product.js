import Filter from "../components/Filter/Filter";
import ProductList from "../components/ProductList/ProductList";

const categories = [
    {
        name: 'Cookie 1',
        quantity: 10
    },
    {
        name: 'Cookie 2',
        quantity: 20
    },
    {
        name: 'Cookie 3',
        quantity: 30
    },
    {
        name: 'Cookie 4',
        quantity: 40
    },
];

const ProductPage = () => {
    return (
        <div className="product-page">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <Filter
                            categories={categories}
                        />
                    </div>
                    <div className="col-9">
                        <ProductList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;