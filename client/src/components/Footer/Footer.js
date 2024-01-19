import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook, faSquareInstagram, faSquareYoutube } from '@fortawesome/free-brands-svg-icons';
import cookies1Img from '../../assets/imgs/cookies1.jpg';
import cookies2Img from '../../assets/imgs/cookies2.jpg';
import cookies3Img from '../../assets/imgs/cookies3.jpg';
import cookies4Img from '../../assets/imgs/cookies4.jpg';
import cookies5Img from '../../assets/imgs/cookies5.jpg';
import cookies6Img from '../../assets/imgs/cookies6.jpg';
import cookies7Img from '../../assets/imgs/cookies7.jpg';
import cookies8Img from '../../assets/imgs/cookies8.jpg';
import cookies9Img from '../../assets/imgs/cookies9.jpg';

import styles from './Footer.module.css';

const Footer = () => {
    return (
        <>
            <div className={`${styles.footer} container-fluid`}>
                <div className="row d-flex justify-content-around">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-logo">
                            <h1>Contact Us</h1>
                            <div className="d-flex">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <h6>8th Floor, 370 Hudson St, New York, VietNam</h6>
                            </div>
                            <div className="d-flex">
                                <FontAwesomeIcon icon={faPhone} />
                                <h6>0866677777</h6>
                            </div>
                            <div className="d-flex">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <h6>Linda@gmail.com</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <h1>Opening Hours</h1>
                        <div className={styles.set}>
                            <div className="set1">
                                <h6>Monday-Friday: </h6>
                            </div>
                            <div className="set1">
                                <h6>8:30 AM - 18:00 PM</h6>
                            </div>
                            <div className="set1">
                                <h6 htmlFor="soTN">Saturday: </h6>
                            </div>
                            <div className="set1">
                                <h6 htmlFor="soTH">8:30 AM - 18:00 PM</h6>
                            </div>
                            <div className="set1">
                                <h6 htmlFor="soTH">Sunday: </h6>
                            </div>
                            <div className="set1">
                                <h6 htmlFor="soTH">8:30 AM - 18:00 PM</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6">
                        <h1>Gallery</h1>
                        <div className={styles.footerSet}>
                            <div className="set4">
                                <img className={styles.set3} src={cookies1Img} alt="" />
                            </div>
                            <div className="set4">
                                <img className={styles.set3} src={cookies2Img} alt="" />
                            </div>
                            <div className="set4">
                                <img className={styles.set3} src={cookies3Img} alt="" />
                            </div>
                            <div className="set4">
                                <img className={styles.set3} src={cookies4Img} alt="" />
                            </div>
                            <div className="set4">
                                <img className={styles.set3} src={cookies5Img} alt="" />
                            </div>
                            <div className="set4">
                                <img className={styles.set3} src={cookies6Img} alt="" />
                            </div>
                            <div className="set4">
                                <img className={styles.set3} src={cookies7Img} alt="" />
                            </div>
                            <div className="set4">
                                <img className={styles.set3} src={cookies8Img} alt="" />
                            </div>
                            <div className="set4">
                                <img className={styles.set3} src={cookies9Img} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className="row d-flex justify-content-between" style={{ backgroundColor: '#111111' }}>
                    <div className="col-lg-3 col-md-6">
                        <div className={styles['footer-social-media']}>
                            <span className={styles['social-media']}>
                                <FontAwesomeIcon icon={faSquareFacebook} />
                            </span>
                            <span className={styles['social-media']}>
                                <FontAwesomeIcon icon={faSquareInstagram} />
                            </span>
                            <span className={styles['social-media']}>
                                <FontAwesomeIcon icon={faSquareYoutube} />
                            </span>
                        </div>
                    </div>
                    <div className={`col-lg-5 col-md-3 ${styles['textEdit']}`}>
                        Copyright © 2023 All rights reserved | <i className={styles['titleText']}>Luxury cookies</i>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;