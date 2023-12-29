import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.css';

import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();

    const handleLogout = () => {
        logout();
    }

    return (
        <div className={` ${styles['header']} container-fluid`}>
            <nav className={` ${styles['navbar']} navbar navbar-expand-lg`}>
                <div className="container-fluid justify-between">
                    <Link className={` ${styles['navbar-brand']} navbar-brand ms-4`} to="/">Luxury Cookies</Link>
                    <div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                            aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/product">Product</Link>
                                </li>
                                <span className={styles.slice}></span>
                                <li className="nav-item">
                                    {cartItems && cartItems.length > 0 &&
                                        <div className={styles['count-item']}>{cartItems.length}</div>
                                    }
                                </li>
                                <li className="nav-item">
                                    <div className="contain-fluid d-flex">
                                        <div className={styles.cart}>
                                            <FontAwesomeIcon icon={faCartShopping} />
                                        </div>
                                        <Link className="nav-link" to="/cart">Cart</Link>
                                    </div>
                                </li>
                                <span className={styles.slice}></span>
                                <li className="nav-item">
                                    <div className="contain-fluid d-flex">
                                        <div className={styles.cart}>
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        {user.isAuthenticated ?
                                            <Link
                                                className="nav-link"
                                                to="/product"
                                                onClick={handleLogout}>Log out
                                            </Link>
                                            :
                                            <Link className="nav-link" to="/login">Sign in</Link>
                                        }

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
