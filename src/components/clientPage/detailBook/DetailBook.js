import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState'
import BookCard from '../books/BookCard';
import Footer from '../../footer/Footer';

function DetailBook() {

    const state = useContext(GlobalState);

    const [books] = state.bookAPI.books;

    const [detailBook, setDetailBook] = useState([]);

    const addCart = state.userAPI.addCart;

    const params = useParams();

    let cnt = 0;

    useEffect(() => {
        if (params.id) {
            const getDetailBook = () => {
                books.forEach(item => {
                    if (item._id === params.id) {
                        setDetailBook(item);
                    }
                });
            }

            getDetailBook();
        }
    }, [params.id, books]);

    if (detailBook.length === 0) return null;

    return (
        <>
            <div className='detail-book container d-flex .flex-row justify-content-around p-4'>
                <div className='detail-book__img'>
                    <img src={detailBook.image.url} alt="" />
                </div>

                <div className="detail-book__body">
                    <h3>{detailBook.title}</h3>
                    <p className='h4 my-2'>Tác Giả: {detailBook.author}</p>
                    <p>{detailBook.description}</p>
                    <span>{detailBook.sold} đã bán.</span>
                    <h4>Giá: {detailBook.price} VNĐ</h4>

                    <Link to='#!' class="btn btn-lg btn-outline-info" onClick={() => addCart(detailBook)}>Thêm Vào Giỏ</Link>
                </div>
            </div>

            <hr className='container' color='#ccc' />

            <div className='container'>
                <h4>Sách Cùng Thể Loại</h4>
                <div className='card-columns d-flex flex-row justify-content-around p-4'>
                    {
                        books.map((item) => {

                            return item.category === detailBook.category && item !== detailBook && cnt++ < 3 ?
                                <BookCard key={item._id} book={item} />
                                :
                                null
                        })
                    }
                </div>
            </div>

            <Footer />
        </>
    )
}

export default DetailBook