import React from 'react'
import styles from './Home.module.css'

import Banner01 from '../../assets/imgs/Banner01.png'
import Banner02 from '../../assets/imgs/Banner02.png'
import Banner03 from '../../assets/imgs/Banner03.png'
import Banner04 from '../../assets/imgs/Banner04.png'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col'>
                    <div className='position-relative'>
                        <img src={Banner01} className='img-fluid rounded-2' alt="Banner01" />
                        <div className={`${styles['position-absolute']} position-absolute`}>
                            <h1 style={{ textShadow: '2px 2px 4px #000000' }}>Luxury Cookies</h1>
                            <p className='m-0'>The best Cookies you’ll ever taste.</p>
                            <p>Not let the name deceive you, We also serve bread and pantries.</p>
                            <Link to="/product" className='btn btn-primary btn-sm' style={{ backgroundColor: '#965C5Bdb', border: '1px solid #D9D9D9' }}> Let’s try some </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-sm-6 mt-5'>
                    <h1 className={`${styles['middleTemplate']} mt-5`}>
                        Luxury Cookies
                    </h1>
                    <h1 className={`${styles['middleTemplate']} mt-2`}>
                        Welcome
                    </h1>
                    <p className={styles.middleTemplate}>Lorem ipsum dolor sit amet consectetur. Purus nisl sit id aliquam lectus. Morbi rutrum viverra blandit posuere ipsum pellentesque.</p>
                    <div className='d-flex justify-content-center mt-5'>
                        <button type='button' className='btn btn-primary btn-sm' style={{ backgroundColor: '#965C5Bdb', border: '1px solid #D9D9D9' }}>More about us</button>
                    </div>
                </div>
                <div className='col-sm-6'>
                    <div className='d-flex justify-content-end mt-5'>
                        <img src={Banner02} alt='Banner02' className='img-fluid' />
                    </div>
                </div>
            </div>

            <div className='row'>
                <h1 className={`${styles['middleTemplate']} p-3`}
                >Specialties </h1>
                <div className='row'>
                    <div className='col sm-4'>
                        <div className='d-flex justify-content-center'>
                            <div className='card' style={{ width: 350 }}>
                                <img src={Banner03} className='card-img-top img-fluid' alt='Banner03' />
                                <div className='card-body'>
                                    <h4 className='card-title'>Chocolate Bread</h4>
                                    <p className='card-text'>Lorem ipsum dolor sit amet consectetur. Purus nisl sit id aliquam lectus. Morbi rutrum viverra blandit posuere ipsum pellentesque.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col sm-4'>
                        <div className='d-flex justify-content-center'>
                            <div className='card' style={{ width: 350 }}>
                                <img src={Banner04} className='card-img-top img-fluid' alt='Banner04' />
                                <div className='card-body'>
                                    <h4 className='card-title'>Cinnamon bun</h4>
                                    <p className='card-text'>Lorem ipsum dolor sit amet consectetur. Purus nisl sit id aliquam lectus. Morbi rutrum viverra blandit posuere ipsum pellentesque.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col sm-4'>
                        <div className='d-flex justify-content-center'>
                            <div className='card' style={{ width: 350 }}>
                                <img src={Banner03} className='card-img-top img-fluid' alt='Banner03' />
                                <div className='card-body'>
                                    <h4 className='card-title'>Chocolate chip cookies</h4>
                                    <p className='card-text'>Lorem ipsum dolor sit amet consectetur. Purus nisl sit id aliquam lectus. Morbi rutrum viverra blandit posuere ipsum pellentesque.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}