import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState'

function OrderDetail() {
    const state = useContext(GlobalState);

    const [token] = state.token;

    const [history] = state.userAPI.history;

    const [callback, setCallBack] = state.userAPI.callback;

    const [detailOrder, setDetailOrder] = useState({});

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            const getDetailOrder = () => {
                history.forEach(item => {
                    if (item._id === params.id) {
                        setDetailOrder(item);
                        return;
                    }
                });
            }

            getDetailOrder();
        }
    }, [params.id, history]);

    const confirmOrder = async () => {
        try {
            if (detailOrder.status === true) return alert("Đơn hàng đã được duyệt trước đó!!");

            const result = await axios.patch(`/api/payment/${detailOrder._id}`, { status: true }, {
                headers: { Authorization: token }
            });

            alert(result.data.msg);
            setCallBack(!callback);
            window.location.href = `/detail_order/${detailOrder._id}`;
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    let textStyle = detailOrder.status ? 'text-success font-weight-bold' : 'text-danger font-weight-bold';

    if (detailOrder.cart === undefined) return null;

    const total = detailOrder.cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    return (
        <>
            <h2 className='text-center mb-4 font-weight-bold mt-5'>Thông Tin Chi Tiết Đơn Hàng</h2>

            <div className='container mt-5 cart-info'>
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">Tên KH</th>
                            <th scope="col">Địa Chỉ</th>
                            <th scope="col">SĐT</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Ngày đặt</th>
                            <th scope="col">Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={detailOrder._id} className='history-item__row'>
                            <td className='text-capitalize text-success font-weight-bold'>{detailOrder.name}</td>
                            <td>{detailOrder.address}</td>
                            <td>{detailOrder.phone}</td>
                            <td className='text-success font-weight-bold'>{total}</td>
                            <td>{new Date(detailOrder.createdAt).toLocaleDateString()}</td>
                            <td className={textStyle}>{detailOrder.status ? "Đã duyệt" : "Chưa duyệt"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='container mt-5 cart-info'>
                <h4 className='text-center mb-4 font-weight-bold mt-5'>Sản phẩm đã đặt</h4>
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tiêu đề</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            detailOrder.cart.map((item, index) => {
                                return (
                                    <tr key={item._id} className='cart-item__row'>
                                        <th scope="row">{index + 1}</th>
                                        <td className='cart-item__img'><img className='img-thumbnail' src={item.image.url} alt="" /></td>
                                        <td className='text-capitalize text-success font-weight-bold'>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td className='text-success font-weight-bold'>{item.quantity * item.price} VNĐ</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <hr className='container my-5' color='#ccc' />
            <div className="text-center mb-5">
                <span className="btn btn-info btn-lg" onClick={confirmOrder}>Xác Nhận Đơn Hàng</span>
            </div>
        </>
    )
}

export default OrderDetail