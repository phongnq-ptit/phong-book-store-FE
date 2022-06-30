import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState'
import BookItem from './BookItem';
import Filters from '../../clientPage/books/Filters';
import LoadMore from '../../clientPage/books/LoadMore';

function BookManage() {

    const state = useContext(GlobalState);

    const [token] = state.token;

    const [books, setBooks] = state.bookAPI.books;

    const [callback, setCallback] = state.bookAPI.callback;

    const [isCheck, setIsCheck] = useState(false);

    const deleteBook = async (id, public_id) => {
        try {
            if (window.confirm("Bạn chắc muốn xóa sản phẩm này chứ??")) {

                await axios.post('/api/destroy', { public_id: public_id }, {
                    headers: { Authorization: token }
                });

                const deleteBook = await axios.delete(`/api/book/${id}`, {
                    headers: { Authorization: token }
                });

                alert(deleteBook.data.msg);

                setCallback(!callback);
            }
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const handleCheck = (id) => {
        books.forEach(item => {
            if (item._id === id) {
                item.checked = !item.checked;
            }
        });

        setBooks([...books]);
    }

    const checkAll = () => {
        books.forEach((item) => {
            item.checked = !isCheck;
        });

        setBooks([...books]);
        setIsCheck(!isCheck);
    }

    const deleteAll = () => {
        if (window.confirm("Bạn có chắc muốn xóa những sản phẩm đã chọn chứ?")) {
            books.forEach(async (item) => {
                if (item.checked) {
                    await axios.post('/api/destroy', { public_id: item.image.public_id }, {
                        headers: { Authorization: token }
                    });

                    await axios.delete(`/api/book/${item._id}`, {
                        headers: { Authorization: token }
                    });

                    setCallback(!callback);
                }
            });
        }
    }

    return (
        <>
            <div className="container mt-5">
                <Filters />
            </div>
            <div className="delete-all">
                <span>Chọn tất cả</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Xóa tất cả</button>
            </div>

            <div className='book-manage p-3 mt-4'>
                {
                    books.map((item) => {
                        return <BookItem key={item._id} book={item} deleteBook={deleteBook} handleCheck={handleCheck} />
                    })
                }
                <Link to='/add_book' className='add-book__btn'>+</Link>

            </div>

            <LoadMore />
        </>
    )
}

export default BookManage