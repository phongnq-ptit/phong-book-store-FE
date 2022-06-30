import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { GlobalState } from '../GlobalState'
import NotFound from './not_found/NotFound'
import Home from './clientPage/home/Home'
import Login from './clientPage/login/Login'
import Register from './clientPage/register/Register'
import Books from './clientPage/books/Books'
import DetailBook from './clientPage/detailBook/DetailBook'
import Cart from './clientPage/cart/Cart'
import HistoryPayment from './clientPage/history/HistoryPayment'
import DetailPayment from './clientPage/history/DetailPayment'
import UserManage from './adminPage/userManage/UserManage'
import CategoryManage from './adminPage/categoryManage/CategoryManage'
import BannerManage from './adminPage/bannerManage/BannerManage'
import OrderManage from './adminPage/orderManage/OrderManage'
import OrderDetail from './adminPage/orderManage/OrderDetail'
import BookManage from './adminPage/bookManage/BookManage'
import AddBook from './adminPage/bookManage/AddBook'
import EditBook from './adminPage/bookManage/EditBook'

function ClientPage() {

    const state = useContext(GlobalState);

    const [isLogged] = state.userAPI.isLogged;

    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <Routes>
            {/* ----------- Client Page ------------------- */}

            <Route path='/' element={isAdmin ? <UserManage /> : <Home />} />

            <Route path='/login' element={isLogged ? <NotFound /> : <Login />} />

            <Route path='/register' element={isLogged ? <NotFound /> : <Register />} />

            <Route path='/book' element={<Books />} />

            <Route path='/detail_book/:id' element={<DetailBook />} />

            <Route path='/cart' element={<Cart />} />

            <Route path='/history' element={isLogged ? <HistoryPayment /> : <NotFound />} />

            <Route path='/detail_history/:id' element={isLogged ? <DetailPayment /> : <NotFound />} />



            {/* ----------- Admin Page ------------------- */}

            <Route path='/admin' element={isAdmin ? <UserManage /> : <Login />} />

            <Route path='/category' element={isAdmin ? <CategoryManage /> : <NotFound />} />

            <Route path='/banner_manage' element={isAdmin ? <BannerManage /> : <NotFound />} />

            <Route path='/order' element={isAdmin ? <OrderManage /> : <NotFound />} />

            <Route path='/detail_order/:id' element={isAdmin ? <OrderDetail /> : <NotFound />} />

            <Route path='/books_manage' element={isAdmin ? <BookManage /> : <NotFound />} />

            <Route path='/add_book' element={isAdmin ? <AddBook /> : <NotFound />} />

            <Route path='/edit_book/:id' element={isAdmin ? <EditBook /> : <NotFound />} />

            {/* ----------- Not Found ------------------- */}
            <Route path='*' element={<NotFound />} />

        </Routes>
    )
}

export default ClientPage