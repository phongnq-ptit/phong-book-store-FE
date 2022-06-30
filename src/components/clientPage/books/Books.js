import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import Filters from './Filters';
import BookCard from './BookCard';
import LoadMore from './LoadMore';
import Footer from '../../footer/Footer';

function Books() {

    const state = useContext(GlobalState);

    const [books] = state.bookAPI.books;

    return (
        <>
            <div className="container">
                <Filters />
            </div>
            <div className='books container card-columns p-2'>
                {
                    books.map((item) => {
                        return (
                            <BookCard key={item._id} book={item} />
                        )
                    })
                }
            </div>

            <LoadMore />

            <Footer />
        </>
    )
}

export default Books