import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

function BookCard({ book }) {

    const state = useContext(GlobalState);

    const addCart = state.userAPI.addCart;
    return (
        <div className="book-card card" >
            <img className="card-img-top" src={book.image.url} alt="" />
            <div className="card-body">
                <Link to={`/detail_book/${book._id}`}><h5 className="card-title">{book.title}</h5></Link>
                <p className="card-text h5 pb-2">Tác giả: {book.author}</p>
                <p className="card-text pb-2 text-truncate">{book.description}</p>
                <div className='d-flex flex-wrap justify-content-around align-items-center'>
                    <p className="card-text book-price pt-2">{book.price} VNĐ</p>
                    <Link to='#!' className="btn btn-outline-info" onClick={() => addCart(book)} >Thêm vào giỏ</Link>
                </div>
            </div>
        </div>
    )
}

export default BookCard