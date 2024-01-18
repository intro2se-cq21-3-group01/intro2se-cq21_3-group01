import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.css';

import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Header = () => {
    const [isShowPopup, setIsShowPopup] = useState(false);

    const { user, logout } = useAuth();
    const { cartItems, subTotalPrice } = useCart();

    const handleLogout = () => {
        logout();
        toast.success('Log out successfully !')
    }

    return (
        <div className={` ${styles['header']} container-fluid`}>
            <nav className={` ${styles['navbar']} navbar navbar-expand-lg`}>
                <div className="container-fluid justify-between">
                    <Link className={` ${styles['navbar-brand']} navbar-brand ms-4`} to="/">
                        <svg width="216" height="35" viewBox="0 0 216 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.352 25.2578C5.72 25.2578 4.46 25.0778 3.572 24.7178C2.684 24.3578 2.072 23.8538 1.736 23.2058C1.4 22.5578 1.232 21.7898 1.232 20.9018C1.232 20.4698 1.268 19.9898 1.34 19.4618C1.412 18.9098 1.496 18.2858 1.592 17.5898C2.024 14.9498 2.24 12.6098 2.24 10.5698C2.24 9.22579 2.18 8.08579 2.06 7.14979C1.964 6.18979 1.652 5.27779 1.124 4.41379C1.028 4.26979 0.944 4.12579 0.872 3.98179C0.8 3.81379 0.764 3.68179 0.764 3.58579C0.764 3.29779 0.932 2.99779 1.268 2.68579C1.604 2.37379 2.012 2.10979 2.492 1.89379C2.972 1.67779 3.428 1.56979 3.86 1.56979C4.676 1.56979 5.18 1.89379 5.372 2.54179C5.588 3.18979 5.696 4.11379 5.696 5.31379C5.696 5.76979 5.648 6.50179 5.552 7.50979C5.456 8.49379 5.312 9.75379 5.12 11.2898C4.928 12.7778 4.784 14.0618 4.688 15.1418C4.592 16.2218 4.544 17.0858 4.544 17.7338C4.544 18.6938 4.652 19.4258 4.868 19.9298C5.108 20.4098 5.492 20.7458 6.02 20.9378C6.548 21.1298 7.292 21.2258 8.252 21.2258C9.284 21.2258 10.268 21.1418 11.204 20.9738C12.14 20.7818 13.052 20.4938 13.94 20.1098C14.06 20.0618 14.168 20.0258 14.264 20.0018C14.36 19.9778 14.444 19.9658 14.516 19.9658C14.732 19.9658 14.936 20.0978 15.128 20.3618C15.32 20.6258 15.416 20.9978 15.416 21.4778C15.416 22.5338 14.84 23.3618 13.688 23.9618C12.152 24.8258 10.04 25.2578 7.352 25.2578ZM20.5828 25.2578C19.3828 25.2578 18.4468 24.9098 17.7748 24.2138C17.1268 23.5178 16.8028 22.5098 16.8028 21.1898C16.8028 20.2538 16.9348 19.2938 17.1988 18.3098C17.3188 17.9018 17.4148 17.4938 17.4868 17.0858C17.5588 16.6778 17.5948 16.2698 17.5948 15.8618C17.5948 14.8058 17.2708 14.1218 16.6228 13.8098C15.9988 13.4738 15.6868 13.1138 15.6868 12.7298C15.6868 12.3458 15.8428 11.9618 16.1548 11.5778C16.4908 11.1938 16.8988 10.8818 17.3788 10.6418C17.8588 10.3778 18.3388 10.2458 18.8188 10.2458C20.1868 10.2458 20.8708 11.3618 20.8708 13.5938C20.8708 14.3138 20.8108 14.9858 20.6908 15.6098C20.5948 16.2098 20.4748 16.7858 20.3308 17.3378C20.2348 17.7218 20.1508 18.1058 20.0788 18.4898C20.0308 18.8738 20.0068 19.2098 20.0068 19.4978C20.0068 20.6978 20.5948 21.2978 21.7708 21.2978C22.8748 21.2978 23.9068 20.7098 24.8668 19.5338C25.8268 18.3578 26.6188 16.7138 27.2428 14.6018L27.2068 13.9178C27.1588 12.7178 27.3628 11.8058 27.8188 11.1818C28.2988 10.5578 28.9948 10.2458 29.9068 10.2458C30.6988 10.2458 31.0948 10.4978 31.0948 11.0018C31.0948 11.1698 31.0588 11.3858 30.9868 11.6498C30.9388 11.9138 30.8548 12.2258 30.7348 12.5858C30.4948 13.4738 30.2908 14.4218 30.1228 15.4298C29.9548 16.4138 29.8708 17.3258 29.8708 18.1658C29.8708 19.1018 30.0148 19.8818 30.3028 20.5058C30.5908 21.1058 31.1308 21.5138 31.9228 21.7298C32.1388 21.7538 32.3068 21.8258 32.4268 21.9458C32.5708 22.0418 32.6428 22.2578 32.6428 22.5938C32.6428 23.1698 32.4028 23.7338 31.9228 24.2858C31.4428 24.8378 30.7468 25.1138 29.8348 25.1138C28.0828 25.1138 27.2068 23.8778 27.2068 21.4058C27.2068 20.9738 27.2428 20.3258 27.3148 19.4618L27.2428 19.4258C25.7308 23.3138 23.5108 25.2578 20.5828 25.2578ZM36.0485 25.1498C35.2565 25.1498 34.5965 24.9458 34.0685 24.5378C33.5645 24.1298 33.3125 23.5538 33.3125 22.8098C33.3125 22.0418 33.5405 21.4178 33.9965 20.9378C34.4765 20.4338 34.9085 20.1818 35.2925 20.1818C35.5565 20.1818 35.7485 20.3258 35.8685 20.6138C36.0125 20.8778 36.1925 21.0578 36.4085 21.1538C36.6245 21.2498 36.8405 21.2978 37.0565 21.2978C37.6805 21.2978 38.2325 20.9978 38.7125 20.3978C39.1925 19.7978 39.6365 18.9818 40.0445 17.9498C39.6605 16.8938 39.1205 15.9938 38.4245 15.2498C37.7285 14.4818 36.8765 14.0978 35.8685 14.0978C35.7245 14.0978 35.6045 14.1098 35.5085 14.1338C35.4125 14.1338 35.3285 14.1338 35.2565 14.1338C35.0885 14.1338 34.9085 14.0258 34.7165 13.8098C34.5245 13.5698 34.4285 13.1858 34.4285 12.6578C34.4285 11.8178 34.7045 11.1938 35.2565 10.7858C35.8085 10.3778 36.4205 10.1738 37.0925 10.1738C38.1005 10.1738 39.0245 10.6178 39.8645 11.5058C40.7045 12.3698 41.3885 13.4738 41.9165 14.8178C42.3725 13.9778 42.9125 13.2098 43.5365 12.5138C44.1845 11.7938 44.8685 11.2298 45.5885 10.8218C46.3325 10.3898 47.0525 10.1738 47.7485 10.1738C48.3965 10.1738 48.8525 10.3418 49.1165 10.6778C49.3805 10.9898 49.5125 11.3498 49.5125 11.7578C49.5125 12.1418 49.4285 12.5378 49.2605 12.9458C49.0925 13.3538 48.8885 13.7018 48.6485 13.9898C48.4085 14.2778 48.1565 14.4218 47.8925 14.4218C47.7485 14.4218 47.5805 14.3858 47.3885 14.3138C47.2205 14.2658 47.0165 14.2178 46.7765 14.1698C46.5365 14.0978 46.2845 14.0618 46.0205 14.0618C45.4205 14.0618 44.8925 14.2898 44.4365 14.7458C44.0045 15.2018 43.4765 16.0298 42.8525 17.2298C43.1165 17.8778 43.4645 18.5138 43.8965 19.1378C44.3285 19.7378 44.8445 20.2418 45.4445 20.6498C46.0685 21.0578 46.7765 21.2618 47.5685 21.2618C47.7125 21.2618 47.8445 21.2618 47.9645 21.2618C48.0845 21.2378 48.1925 21.2258 48.2885 21.2258C48.4325 21.2258 48.5405 21.2858 48.6125 21.4058C48.7085 21.5018 48.7565 21.7298 48.7565 22.0898C48.7565 22.5218 48.6725 22.9778 48.5045 23.4578C48.3365 23.9138 48.0365 24.3098 47.6045 24.6458C47.1725 24.9818 46.5485 25.1498 45.7325 25.1498C44.8445 25.1498 44.1005 24.9218 43.5005 24.4658C42.9005 24.0098 42.4085 23.4098 42.0245 22.6658C41.6645 21.9218 41.3525 21.1418 41.0885 20.3258C40.4405 21.7178 39.7445 22.8698 39.0005 23.7818C38.2805 24.6938 37.2965 25.1498 36.0485 25.1498ZM55.7039 25.2578C54.5039 25.2578 53.5679 24.9098 52.8959 24.2138C52.2479 23.5178 51.9239 22.5098 51.9239 21.1898C51.9239 20.2538 52.0559 19.2938 52.3199 18.3098C52.4399 17.9018 52.5359 17.4938 52.6079 17.0858C52.6799 16.6778 52.7159 16.2698 52.7159 15.8618C52.7159 14.8058 52.3919 14.1218 51.7439 13.8098C51.1199 13.4738 50.8079 13.1138 50.8079 12.7298C50.8079 12.3458 50.9639 11.9618 51.2759 11.5778C51.6119 11.1938 52.0199 10.8818 52.4999 10.6418C52.9799 10.3778 53.4599 10.2458 53.9399 10.2458C55.3079 10.2458 55.9919 11.3618 55.9919 13.5938C55.9919 14.3138 55.9319 14.9858 55.8119 15.6098C55.7159 16.2098 55.5959 16.7858 55.4519 17.3378C55.3559 17.7218 55.2719 18.1058 55.1999 18.4898C55.1519 18.8738 55.1279 19.2098 55.1279 19.4978C55.1279 20.6978 55.7159 21.2978 56.8919 21.2978C57.9959 21.2978 59.0279 20.7098 59.9879 19.5338C60.9479 18.3578 61.7399 16.7138 62.3639 14.6018L62.3279 13.9178C62.2799 12.7178 62.4839 11.8058 62.9399 11.1818C63.4199 10.5578 64.1159 10.2458 65.0279 10.2458C65.8199 10.2458 66.2159 10.4978 66.2159 11.0018C66.2159 11.1698 66.1799 11.3858 66.1079 11.6498C66.0599 11.9138 65.9759 12.2258 65.8559 12.5858C65.6159 13.4738 65.4119 14.4218 65.2439 15.4298C65.0759 16.4138 64.9919 17.3258 64.9919 18.1658C64.9919 19.1018 65.1359 19.8818 65.4239 20.5058C65.7119 21.1058 66.2519 21.5138 67.0439 21.7298C67.2599 21.7538 67.4279 21.8258 67.5479 21.9458C67.6919 22.0418 67.7639 22.2578 67.7639 22.5938C67.7639 23.1698 67.5239 23.7338 67.0439 24.2858C66.5639 24.8378 65.8679 25.1138 64.9559 25.1138C63.2039 25.1138 62.3279 23.8778 62.3279 21.4058C62.3279 20.9738 62.3639 20.3258 62.4359 19.4618L62.3639 19.4258C60.8519 23.3138 58.6319 25.2578 55.7039 25.2578ZM71.9616 25.1858C71.5776 25.1858 71.2656 25.1138 71.0256 24.9698C70.8096 24.8498 70.7376 24.6338 70.8096 24.3218C71.0736 23.2898 71.2896 22.2458 71.4576 21.1898C71.6496 20.1098 71.7456 19.0778 71.7456 18.0938C71.7456 16.8218 71.6616 15.8978 71.4936 15.3218C71.3496 14.7218 71.1456 14.3138 70.8816 14.0978C70.6176 13.8578 70.2936 13.6778 69.9096 13.5578C69.7416 13.4858 69.5856 13.3898 69.4416 13.2698C69.3216 13.1498 69.2616 12.9818 69.2616 12.7658C69.2616 12.4298 69.3936 12.0578 69.6576 11.6498C69.9216 11.2418 70.2936 10.8938 70.7736 10.6058C71.2536 10.2938 71.8056 10.1378 72.4296 10.1378C73.2456 10.1378 73.8096 10.4258 74.1216 11.0018C74.4576 11.5538 74.6256 12.2858 74.6256 13.1978C75.0576 12.2378 75.5856 11.4818 76.2096 10.9298C76.8576 10.3538 77.6616 10.0658 78.6216 10.0658C79.2696 10.0658 79.8096 10.2098 80.2416 10.4978C80.6736 10.7858 80.8896 11.2538 80.8896 11.9018C80.8896 12.5498 80.6736 13.1618 80.2416 13.7378C79.8336 14.2898 79.4136 14.5658 78.9816 14.5658C78.9096 14.5658 78.8256 14.5538 78.7296 14.5298C78.6336 14.5058 78.5496 14.4458 78.4776 14.3498C78.1656 13.9658 77.7816 13.7738 77.3256 13.7738C76.6296 13.7738 76.0176 14.2298 75.4896 15.1418C74.9616 16.0538 74.6736 17.3138 74.6256 18.9218C74.6496 19.5218 74.6616 20.1338 74.6616 20.7578C74.6856 21.3818 74.6976 21.8378 74.6976 22.1258C74.6976 23.0138 74.4456 23.7458 73.9416 24.3218C73.4616 24.8978 72.8016 25.1858 71.9616 25.1858ZM83.5362 34.7258C82.5522 34.7258 81.7122 34.4618 81.0162 33.9338C80.2962 33.4058 79.9362 32.6978 79.9362 31.8098C79.9362 31.1138 80.1522 30.5138 80.5842 30.0098C80.9922 29.5298 81.5082 29.2898 82.1322 29.2898C82.4202 29.2898 82.6242 29.3378 82.7442 29.4338C82.8642 29.5298 82.9602 29.6378 83.0322 29.7578C83.2242 30.0698 83.4402 30.3338 83.6802 30.5498C83.9442 30.7898 84.2922 30.9098 84.7242 30.9098C85.3002 30.9098 85.8522 30.7058 86.3802 30.2978C86.9322 29.8898 87.4362 29.4218 87.8922 28.8938C88.3002 28.4378 88.7922 27.7778 89.3682 26.9138C89.9442 26.0738 90.5202 25.1138 91.0962 24.0338C90.5682 24.4898 90.0762 24.8138 89.6202 25.0058C89.1642 25.2218 88.7322 25.3298 88.3242 25.3298C87.8202 25.3298 87.3282 25.1498 86.8482 24.7898C86.3682 24.4058 86.0682 23.6978 85.9482 22.6658C85.8762 21.8738 85.7322 20.9978 85.5162 20.0378C85.3242 19.0778 85.0722 18.1538 84.7602 17.2658C84.4722 16.3538 84.1122 15.5858 83.6802 14.9618C83.5122 14.6738 83.3202 14.4578 83.1042 14.3138C82.8882 14.1698 82.5762 14.0738 82.1682 14.0258C81.8802 14.0018 81.6882 13.9178 81.5922 13.7738C81.5202 13.6298 81.4842 13.4018 81.4842 13.0898C81.4842 12.2258 81.7242 11.5298 82.2042 11.0018C82.6842 10.4738 83.3322 10.2098 84.1482 10.2098C85.1322 10.2098 85.8402 10.5938 86.2722 11.3618C86.7042 12.1058 87.0762 13.0178 87.3882 14.0978C87.5082 14.5298 87.6282 15.1058 87.7482 15.8258C87.8922 16.5218 88.0122 17.2778 88.1082 18.0938C88.2282 18.9098 88.3122 19.6898 88.3602 20.4338C88.3842 20.9618 88.6842 21.2258 89.2602 21.2258C90.0282 21.2258 90.7602 20.9858 91.4562 20.5058C92.1522 20.0258 92.7162 19.4018 93.1482 18.6338C93.6042 17.8658 93.8322 17.0618 93.8322 16.2218C93.8322 15.7418 93.7722 15.3098 93.6522 14.9258C93.5322 14.5418 93.3282 14.2058 93.0402 13.9178C92.8002 13.6298 92.6082 13.4018 92.4642 13.2338C92.3202 13.0418 92.2482 12.8258 92.2482 12.5858C92.2482 12.1778 92.4402 11.7938 92.8242 11.4338C93.2082 11.0738 93.6642 10.7738 94.1922 10.5338C94.7442 10.2938 95.2242 10.1738 95.6322 10.1738C96.3522 10.1738 96.8322 10.5218 97.0722 11.2178C97.3122 11.8898 97.3722 12.6338 97.2522 13.4498C97.1082 14.5778 96.8202 15.9098 96.3882 17.4458C95.9562 18.9818 95.3922 20.5898 94.6962 22.2698C94.0242 23.9498 93.2442 25.5698 92.3562 27.1298C91.4922 28.7138 90.5682 30.0938 89.5842 31.2698C88.7442 32.3018 87.8082 33.1298 86.7762 33.7538C85.7442 34.4018 84.6642 34.7258 83.5362 34.7258ZM117.714 25.2578C116.01 25.2578 114.51 24.8738 113.214 24.1058C111.942 23.3378 110.958 22.2458 110.262 20.8298C109.566 19.4138 109.218 17.7338 109.218 15.7898C109.218 13.9418 109.518 12.1658 110.118 10.4618C110.718 8.75779 111.582 7.23379 112.71 5.88979C113.838 4.54579 115.194 3.47779 116.778 2.68579C118.362 1.89379 120.15 1.49779 122.142 1.49779C123.63 1.49779 124.854 1.72579 125.814 2.18179C126.774 2.63779 127.254 3.30979 127.254 4.19779C127.254 4.62979 127.134 5.06179 126.894 5.49379C126.678 5.90179 126.39 6.24979 126.03 6.53779C125.67 6.82579 125.298 6.96979 124.914 6.96979C124.674 6.96979 124.482 6.90979 124.338 6.78979C123.69 6.35779 123.054 6.04579 122.43 5.85379C121.806 5.63779 121.086 5.52979 120.27 5.52979C118.566 5.52979 117.126 5.92579 115.95 6.71779C114.774 7.48579 113.874 8.50579 113.25 9.77779C112.65 11.0498 112.35 12.4298 112.35 13.9178C112.35 15.3578 112.626 16.6298 113.178 17.7338C113.73 18.8378 114.498 19.7018 115.482 20.3258C116.466 20.9498 117.618 21.2618 118.938 21.2618C119.994 21.2618 121.014 21.0578 121.998 20.6498C123.006 20.2178 123.894 19.6298 124.662 18.8858C124.998 18.5738 125.334 18.4178 125.67 18.4178C125.958 18.4178 126.162 18.5378 126.282 18.7778C126.402 19.0178 126.462 19.2578 126.462 19.4978C126.462 19.9058 126.342 20.3738 126.102 20.9018C125.862 21.4058 125.49 21.9098 124.986 22.4138C124.098 23.3018 123.006 23.9978 121.71 24.5018C120.414 25.0058 119.082 25.2578 117.714 25.2578ZM134.411 25.2578C132.755 25.2578 131.423 24.8138 130.415 23.9258C129.431 23.0138 128.939 21.6818 128.939 19.9298C128.939 19.1138 129.047 18.3218 129.263 17.5538C129.503 16.7858 129.815 16.0658 130.199 15.3938C129.815 15.6338 129.527 15.7538 129.335 15.7538C129.047 15.7538 128.843 15.5978 128.723 15.2858C128.627 14.9498 128.579 14.6258 128.579 14.3138C128.579 13.7618 128.687 13.3298 128.903 13.0178C129.143 12.6818 129.371 12.4298 129.587 12.2618C130.091 11.8298 130.883 11.3618 131.963 10.8578C133.043 10.3298 134.339 10.0658 135.851 10.0658C137.915 10.0658 139.511 10.6418 140.639 11.7938C141.791 12.9458 142.367 14.5538 142.367 16.6178C142.367 18.2258 142.031 19.6898 141.359 21.0098C140.687 22.3058 139.751 23.3378 138.551 24.1058C137.375 24.8738 135.995 25.2578 134.411 25.2578ZM135.527 21.5858C136.727 21.5858 137.735 21.2138 138.551 20.4698C139.391 19.7018 139.811 18.6938 139.811 17.4458C139.811 16.1498 139.391 15.2258 138.551 14.6738C137.711 14.1218 136.739 13.8458 135.635 13.8458C135.131 13.8458 134.675 13.8938 134.267 13.9898C133.859 14.0858 133.475 14.2058 133.115 14.3498C132.779 14.8298 132.479 15.3698 132.215 15.9698C131.951 16.5698 131.819 17.2298 131.819 17.9498C131.819 19.1498 132.179 20.0618 132.899 20.6858C133.619 21.2858 134.495 21.5858 135.527 21.5858ZM150.829 25.2578C149.173 25.2578 147.841 24.8138 146.833 23.9258C145.849 23.0138 145.357 21.6818 145.357 19.9298C145.357 19.1138 145.465 18.3218 145.681 17.5538C145.921 16.7858 146.233 16.0658 146.617 15.3938C146.233 15.6338 145.945 15.7538 145.753 15.7538C145.465 15.7538 145.261 15.5978 145.141 15.2858C145.045 14.9498 144.997 14.6258 144.997 14.3138C144.997 13.7618 145.105 13.3298 145.321 13.0178C145.561 12.6818 145.789 12.4298 146.005 12.2618C146.509 11.8298 147.301 11.3618 148.381 10.8578C149.461 10.3298 150.757 10.0658 152.269 10.0658C154.333 10.0658 155.929 10.6418 157.057 11.7938C158.209 12.9458 158.785 14.5538 158.785 16.6178C158.785 18.2258 158.449 19.6898 157.777 21.0098C157.105 22.3058 156.169 23.3378 154.969 24.1058C153.793 24.8738 152.413 25.2578 150.829 25.2578ZM151.945 21.5858C153.145 21.5858 154.153 21.2138 154.969 20.4698C155.809 19.7018 156.229 18.6938 156.229 17.4458C156.229 16.1498 155.809 15.2258 154.969 14.6738C154.129 14.1218 153.157 13.8458 152.053 13.8458C151.549 13.8458 151.093 13.8938 150.685 13.9898C150.277 14.0858 149.893 14.2058 149.533 14.3498C149.197 14.8298 148.897 15.3698 148.633 15.9698C148.369 16.5698 148.237 17.2298 148.237 17.9498C148.237 19.1498 148.597 20.0618 149.317 20.6858C150.037 21.2858 150.913 21.5858 151.945 21.5858ZM162.927 25.1858C162.663 25.1858 162.411 25.1018 162.171 24.9338C161.931 24.7898 161.835 24.5858 161.883 24.3218C162.243 22.4018 162.543 20.4578 162.783 18.4898C163.047 16.4978 163.179 14.4938 163.179 12.4778C163.179 10.7018 163.119 9.09379 162.999 7.65379C162.879 6.21379 162.495 4.83379 161.847 3.51379C161.727 3.24979 161.631 3.02179 161.559 2.82979C161.487 2.63779 161.451 2.45779 161.451 2.28979C161.451 1.83379 161.715 1.38979 162.243 0.957793C162.771 0.525794 163.335 0.309795 163.935 0.309795C164.799 0.309795 165.387 0.837794 165.699 1.89379C166.011 2.94979 166.167 4.50979 166.167 6.57379C166.167 9.04579 166.023 11.2058 165.735 13.0538C165.447 14.8778 165.195 16.2698 164.979 17.2298L165.123 17.3018C165.603 16.1258 166.215 14.9978 166.959 13.9178C167.703 12.8138 168.555 11.9018 169.515 11.1818C170.499 10.4618 171.567 10.1018 172.719 10.1018C173.847 10.1018 174.711 10.4378 175.311 11.1098C175.935 11.7818 176.247 12.5858 176.247 13.5218C176.247 14.6258 175.851 15.6098 175.059 16.4738C174.267 17.3378 173.235 18.0578 171.963 18.6338C172.275 19.4498 172.719 20.0978 173.295 20.5778C173.871 21.0338 174.603 21.2618 175.491 21.2618C175.779 21.2618 176.019 21.2378 176.211 21.1898C176.523 21.1178 176.679 21.4178 176.679 22.0898C176.679 22.4738 176.607 22.9058 176.463 23.3858C176.319 23.8658 176.031 24.2858 175.599 24.6458C175.191 24.9818 174.567 25.1498 173.727 25.1498C172.599 25.1498 171.675 24.8258 170.955 24.1778C170.259 23.5058 169.707 22.6898 169.299 21.7298C168.915 20.7458 168.615 19.7738 168.399 18.8138C168.207 17.9258 168.507 17.4578 169.299 17.4098C170.139 17.3138 170.847 17.0618 171.423 16.6538C171.999 16.2458 172.287 15.7058 172.287 15.0338C172.287 14.2658 171.915 13.8818 171.171 13.8818C170.691 13.8818 170.199 14.0618 169.695 14.4218C169.215 14.7578 168.759 15.1658 168.327 15.6458C167.919 16.1258 167.583 16.5938 167.319 17.0498C166.959 17.6738 166.647 18.2858 166.383 18.8858C166.119 19.4858 165.903 20.0858 165.735 20.6858V22.1258C165.735 23.0138 165.471 23.7458 164.943 24.3218C164.439 24.8978 163.767 25.1858 162.927 25.1858ZM182.583 6.89779C181.911 6.87379 181.371 6.66979 180.963 6.28579C180.555 5.90179 180.351 5.36179 180.351 4.66579C180.375 3.92179 180.627 3.32179 181.107 2.86579C181.587 2.38579 182.199 2.15779 182.943 2.18179C183.639 2.20579 184.179 2.40979 184.563 2.79379C184.971 3.17779 185.163 3.71779 185.139 4.41379C185.115 5.13379 184.875 5.73379 184.419 6.21379C183.963 6.66979 183.351 6.89779 182.583 6.89779ZM182.619 25.1498C181.899 25.1498 181.335 24.9578 180.927 24.5738C180.519 24.1658 180.315 23.4818 180.315 22.5218C180.315 21.9698 180.363 21.4298 180.459 20.9018C180.579 20.3738 180.711 19.8578 180.855 19.3538C181.023 18.8258 181.155 18.2858 181.251 17.7338C181.371 17.1818 181.431 16.5938 181.431 15.9698C181.431 15.5378 181.371 15.1298 181.251 14.7458C181.131 14.3378 180.867 14.0378 180.459 13.8458C180.147 13.6778 179.871 13.5098 179.631 13.3418C179.415 13.1498 179.307 12.9098 179.307 12.6218C179.307 12.2858 179.463 11.9258 179.775 11.5418C180.087 11.1578 180.495 10.8338 180.999 10.5698C181.527 10.2818 182.067 10.1378 182.619 10.1378C183.219 10.1378 183.651 10.2938 183.915 10.6058C184.203 10.9178 184.395 11.3138 184.491 11.7938C184.587 12.2738 184.635 12.7658 184.635 13.2698C184.635 14.0378 184.575 14.7938 184.455 15.5378C184.335 16.2578 184.215 16.9298 184.095 17.5538C183.999 18.0098 183.927 18.4298 183.879 18.8138C183.831 19.1978 183.807 19.5578 183.807 19.8938C183.807 20.4938 183.951 20.9498 184.239 21.2618C184.527 21.5498 184.935 21.8258 185.463 22.0898C185.679 22.2098 185.787 22.3898 185.787 22.6298C185.787 22.8218 185.691 23.1218 185.499 23.5298C185.307 23.9378 184.971 24.3098 184.491 24.6458C184.035 24.9818 183.411 25.1498 182.619 25.1498ZM194.141 25.2578C192.317 25.2578 190.889 24.7418 189.857 23.7098C188.849 22.6538 188.345 21.1898 188.345 19.3178C188.345 17.6138 188.717 16.0658 189.461 14.6738C190.205 13.2818 191.201 12.1778 192.449 11.3618C193.721 10.5218 195.113 10.1018 196.625 10.1018C198.065 10.1018 199.217 10.4618 200.081 11.1818C200.945 11.8778 201.377 12.8138 201.377 13.9898C201.377 14.9258 201.089 15.7898 200.513 16.5818C199.937 17.3738 199.169 18.0098 198.209 18.4898C197.249 18.9458 196.181 19.1738 195.005 19.1738C193.565 19.1738 192.389 18.8498 191.477 18.2018C191.501 19.3058 191.873 20.1938 192.593 20.8658C193.337 21.5378 194.285 21.8738 195.437 21.8738C196.133 21.8738 196.841 21.7538 197.561 21.5138C198.305 21.2498 198.941 20.9018 199.469 20.4698C199.805 20.1818 200.117 20.0378 200.405 20.0378C200.645 20.0378 200.837 20.1218 200.981 20.2898C201.149 20.4338 201.233 20.6258 201.233 20.8658C201.233 21.3938 200.777 22.0898 199.865 22.9538C198.257 24.4898 196.349 25.2578 194.141 25.2578ZM194.681 16.7978C195.545 16.7978 196.265 16.6178 196.841 16.2578C197.417 15.8978 197.705 15.4418 197.705 14.8898C197.705 14.4338 197.513 14.0858 197.129 13.8458C196.745 13.5818 196.217 13.4498 195.545 13.4498C194.657 13.4498 193.877 13.6898 193.205 14.1698C192.557 14.6258 192.089 15.2738 191.801 16.1138C192.137 16.3298 192.569 16.4978 193.097 16.6178C193.625 16.7378 194.153 16.7978 194.681 16.7978ZM208.886 25.2578C207.998 25.2578 207.17 25.1258 206.402 24.8618C205.634 24.5978 205.01 24.2258 204.53 23.7458C204.05 23.2658 203.81 22.6898 203.81 22.0178C203.81 21.6578 203.894 21.3218 204.062 21.0098C204.254 20.6738 204.554 20.5058 204.962 20.5058C205.178 20.5058 205.406 20.5658 205.646 20.6858C206.078 20.9258 206.63 21.1538 207.302 21.3698C207.974 21.5618 208.682 21.6578 209.426 21.6578C210.266 21.6578 211.01 21.5378 211.658 21.2978C212.306 21.0578 212.63 20.7218 212.63 20.2898C212.63 19.9538 212.378 19.7138 211.874 19.5698C211.394 19.4258 210.578 19.2698 209.426 19.1018C208.634 18.9578 207.866 18.7898 207.122 18.5978C206.378 18.4058 205.766 18.0818 205.286 17.6258C204.806 17.1458 204.566 16.4498 204.566 15.5378C204.566 14.6498 204.806 13.7978 205.286 12.9818C205.79 12.1418 206.534 11.4458 207.518 10.8938C208.502 10.3418 209.702 10.0658 211.118 10.0658C211.862 10.0658 212.582 10.1498 213.278 10.3178C213.974 10.4858 214.55 10.7378 215.006 11.0738C215.462 11.4098 215.69 11.8298 215.69 12.3338C215.69 12.7658 215.534 13.1618 215.222 13.5218C214.934 13.8818 214.586 14.1818 214.178 14.4218C213.794 14.6378 213.47 14.7458 213.206 14.7458C213.014 14.7458 212.786 14.6138 212.522 14.3498C212.114 14.0138 211.658 13.7858 211.154 13.6658C210.674 13.5218 210.194 13.4498 209.714 13.4498C208.994 13.4498 208.406 13.5578 207.95 13.7738C207.518 13.9898 207.302 14.2658 207.302 14.6018C207.302 14.9138 207.482 15.1658 207.842 15.3578C208.226 15.5498 208.694 15.6938 209.246 15.7898C209.798 15.8618 210.326 15.9338 210.83 16.0058C212.222 16.1978 213.326 16.5338 214.142 17.0138C214.958 17.4698 215.366 18.2858 215.366 19.4618C215.366 20.3738 215.102 21.2858 214.574 22.1978C214.07 23.0858 213.326 23.8178 212.342 24.3938C211.382 24.9698 210.23 25.2578 208.886 25.2578Z" fill="url(#paint0_linear_108_163)" />
                            <defs>
                                <linearGradient id="paint0_linear_108_163" x1="-25.9946" y1="-8.21022" x2="218.141" y2="26.6371" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#3431C0" />
                                    <stop offset="1" stopColor="#2D2C4F" stopOpacity="0.73" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </Link>
                    <div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                            aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarScroll" style={{ marginTop: '7px' }}>
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <li className="nav-item" style={{ fontSize: '18px' }}>
                                    <NavLink className="nav-link" aria-current="page" activeClassName="active" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item" style={{ fontSize: '18px' }}>
                                    <NavLink className="nav-link" activeClassName="active" to="/aboutus">About Us</NavLink>
                                </li>
                                <li className="nav-item" style={{ fontSize: '18px' }}>
                                    <NavLink className="nav-link" activeClassName="active" to="/product">Product</NavLink>
                                </li>
                                <span className={styles.slice}></span>
                                <li className="nav-item" style={{ fontSize: '18px' }}>
                                    <div className="contain-fluid d-flex">
                                        <div className={styles.cart}>
                                            <FontAwesomeIcon icon={faCartShopping} />
                                        </div>
                                        <NavLink className="nav-link" activeClassName="active" to="/cart">Cart</NavLink>
                                    </div>
                                </li>
                                {cartItems && cartItems.length > 0 &&
                                    <span className={styles.slice}></span>
                                }
                                <li className="nav-item">
                                    {cartItems && cartItems.length > 0 &&
                                        <>
                                            <div className={styles['cart-quantity']}>{cartItems.length} items</div>
                                            <div className={styles['cart-total-price']}>$ {subTotalPrice}</div>
                                        </>
                                    }
                                </li>
                                <span className={styles.slice}></span>
                                <li className="nav-item" style={{ fontSize: '18px' }}>
                                    <div className="contain-fluid d-flex">
                                        <div className={styles.user}>
                                            <FontAwesomeIcon
                                                icon={faUser}
                                                onClick={() => setIsShowPopup(!isShowPopup)}
                                            />
                                            {isShowPopup && user.isAuthenticated &&
                                                <div className={styles.popup} id="popup">
                                                    <ul>
                                                        <Link
                                                            to="/login"
                                                            onClick={handleLogout}
                                                            className={styles['popup-item']}
                                                        >
                                                            <li> Log out</li>
                                                        </Link>


                                                        <Link
                                                            to="/user/profile"
                                                            className={styles['popup-item']}
                                                        >
                                                            <li>Profile</li>
                                                        </Link>

                                                        <Link
                                                            to="/user/orders"
                                                            className={styles['popup-item']}
                                                        >
                                                            <li>Orders</li>
                                                        </Link>

                                                        <Link
                                                            to="/user/change-password"
                                                            className={styles['popup-item']}
                                                        >
                                                            <li>Change password</li>
                                                        </Link>
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                        {user.isAuthenticated ?
                                            <p
                                                className="nav-link"
                                                to="/product"
                                            > Hi, {user.username}
                                            </p>
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
