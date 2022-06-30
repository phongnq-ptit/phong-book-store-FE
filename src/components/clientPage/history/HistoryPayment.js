import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

function HistoryPayment() {

    const state = useContext(GlobalState);

    const [historyUser] = state.userAPI.historyUser;

    return (
        <div>
            <div className='container mt-5 cart-info'>
                <h2 className='text-center mb-4 font-weight-bold'>LỊCH SỬ ĐẶT HÀNG</h2>
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên KH</th>
                            <th scope="col">Địa Chỉ</th>
                            <th scope="col">SĐT</th>
                            <th scope="col">Ngày Đặt</th>
                            <th scope="col">Trạng Thái</th>
                            <th scope="col">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            historyUser.map((item, index) => {
                                let textStyle = item.status ? 'text-success font-weight-bold' : 'text-danger font-weight-bold';

                                return (
                                    <tr key={item._id} className='history-item__row'>
                                        <th scope="row">{index + 1}</th>
                                        <td className='text-capitalize text-success font-weight-bold'>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phone}</td>
                                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className={textStyle}>{item.status ? "Đã duyệt" : "Chưa duyệt"}</td>
                                        <td><Link to={`/detail_history/${item._id}`}>Chi Tiết</Link></td>
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

export default HistoryPayment