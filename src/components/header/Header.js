import React, { useContext } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

function Header() {

    const state = useContext(GlobalState);

    const [isLogged, setIsLogged] = state.userAPI.isLogged;

    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

    const [userInfo, setUserInfo] = state.userAPI.userInfo;

    const [cart] = state.userAPI.cart;

    const logoutUser = async () => {
        await axios.get('/user/logout');

        localStorage.removeItem('login');

        setIsLogged(false);
        setIsAdmin(false);
        setUserInfo([]);

        window.location.href = '/';
    }

    return (
        <header className='container-fluid bg-dark '>
            <div className='container'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
                    <div><Link className="navbar-brand text-logo" to='/' >{isAdmin ? 'Phong Book ADMIN' : 'Phong Book'}</Link></div>

                    {
                        isAdmin ?
                            <div>
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item mr-3">
                                        <Link className="nav-link" to='/' >Khách Hàng</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mr-3" to="/books_manage">Sản Phẩm</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mr-3" to="/order">Đơn Hàng</Link>
                                    </li>
                                </ul>
                            </div>
                            :
                            <div>
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item mr-3">
                                        <Link className="nav-link" to='/' >Trang Chủ</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mr-3" to="/book">Sản Phẩm</Link>
                                    </li>
                                </ul>
                            </div>
                    }

                    <div>
                        <ul className="navbar-nav mr-auto">
                            {
                                isLogged ?
                                    <li className="nav-item dropdown">
                                        <a href='#!' className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {userInfo.name}
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            {
                                                isAdmin ?
                                                    <>
                                                        <Link className="dropdown-item" to='/category'>QL Thể Loại</Link>
                                                        <Link className="dropdown-item" to='/banner_manage'>QL Banner</Link>
                                                        <Link className="dropdown-item" to='/' onClick={logoutUser}>Đăng xuất</Link>
                                                    </>
                                                    :
                                                    <>
                                                        <Link className="dropdown-item" to='/history'>Lịch sử đơn hàng</Link>
                                                        <Link className="dropdown-item" to='/' onClick={logoutUser}>Đăng xuất</Link>
                                                    </>
                                            }
                                        </div>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/login' >Đăng Nhập</Link>
                                    </li>
                            }

                            {
                                !isAdmin &&
                                <div className="nav-item cart-icon" color='#ccc'>
                                    <span className='p-2 inline'>{cart.length}</span>
                                    <Link className="nav-link" to="/cart">
                                        Giỏ Hàng
                                    </Link>
                                </div>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header