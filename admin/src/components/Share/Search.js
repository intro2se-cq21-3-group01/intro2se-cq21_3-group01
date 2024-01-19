import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.css'

function Search({ handlerSearch }) {
    const [search, setSearch] = useState('')

    const delaySearchTextTimeOut = useRef(null)

    const onChangeText = (e) => {
        const value = e.target.value

        setSearch(value)

        console.log(search)

        if (handlerSearch) {

            //Nếu người dùng đang nhập thì mình clear cái giây đó
            if (delaySearchTextTimeOut.current) {
                clearTimeout(delaySearchTextTimeOut.current)
            }

            delaySearchTextTimeOut.current = setTimeout(() => {
                handlerSearch(value)
            }, 300)

        }
    }
    return (
        <div className='d-flex'>
            <form className={`d-flex ${styles.formSearch2}`} role="search">
                <div className={styles["iconSearch2"]} type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                <input className={`form-control ms-2 ${styles.formControl} ${styles["iconSearch3"]}`} type="text" placeholder="Enter Search!" aria-label="Search" value={search} onChange={onChangeText} />
            </form>
        </div>
        // <div>
             
        //     {/* <input className="form-control w-40" type="text" placeholder="Enter Search!" value={search} onChange={onChangeText} /> */}
        // </div>
    );
}

export default Search;