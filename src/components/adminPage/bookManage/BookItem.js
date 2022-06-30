import React from 'react'
import { Link } from 'react-router-dom'

function BookItem({ book, deleteBook, handleCheck }) {
    return (
        <div className='book-manage__card mb-3'>
            <input type="checkbox" checked={book.checked} onChange={() => handleCheck(book._id)} />

            <img src={book.image.url} alt={book.description} />

            <div className='book-manage__card-box'>
                <h5 className='mt-2' title={book.title}>{book.title}</h5>
                <span>{book.price} VND</span>
                <p className='d-inline-block text-truncate'>{book.description}</p>
            </div>

            <div className='row-btn'>
                <Link className='btn-delete' to='#!' onClick={() => deleteBook(book._id, book.image.public_id)}>
                    Xóa
                </Link>
                <Link className='btn-edit' to={`/edit_book/${book._id}`}>
                    Sửa
                </Link>
            </div>
        </div>
    )
}

export default BookItem