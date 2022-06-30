import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

function OrderManage() {

    const state = useContext(GlobalState);

    const [history] = state.userAPI.history;

    const [status, setStatus] = state.userAPI.status;

    const handleStatus = (event) => {
        setStatus(event.target.value);
    }

    return (
        <div>
            <div className='container mt-5 cart-info'>

                <h2 className='text-center mb-4 font-weight-bold'>CÁC ĐƠN ĐẶT HÀNG</h2>

                <div className='p-4'>
                    <span className='font-weight-bold'>Lọc theo trạng thái: </span>
                    <select name='status' value={status} onChange={handleStatus}>
                        <option value=''>Tất cả trạng thái</option>
                        <option value='status=true'>Đã duyệt</option>
                        <option value='status=false'>Chưa duyệt</option>
                    </select>
                </div>

                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tài Khoản Đặt Hàng</th>
                            <th scope="col">Ngày Đặt</th>
                            <th scope="col">Trạng Thái</th>
                            <th scope="col">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map((item, index) => {
                                let textStyle = item.status ? 'text-success font-weight-bold' : 'text-danger font-weight-bold';

                                return (
                                    <tr key={item._id} className='history-item__row'>
                                        <th scope="row">{index + 1}</th>
                                        <td className='text-capitalize text-success font-weight-bold'>{item.email}</td>
                                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className={textStyle}>{item.status ? "Đã duyệt" : "Chưa duyệt"}</td>
                                        <td><Link to={`/detail_order/${item._id}`}>Chi Tiết</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderManage