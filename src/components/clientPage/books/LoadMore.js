import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState';

function LoadMore() {
    const state = useContext(GlobalState);

    const [page, setPage] = state.bookAPI.page;

    const [result] = state.bookAPI.result;

    return (
        <div className="container p-4 text-center">
            {
                result < page * 9 ? ""
                    : <span className='btn btn-lg btn-info' onClick={() => setPage(page + 1)}>Xem thêm</span>
            }
        </div>
    )
}

export default LoadMore