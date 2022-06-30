import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'

function Cart() {

    const state = useContext(GlobalState);

    const [token] = state.token;

    const [cart, setCart] = state.userAPI.cart;

    const [callback, setCallBack] = state.userAPI.callback;

    const [total, setTotal] = useState(0);

    const [cartForm, setCartForm] = useState({
        recipientName: '',
        phone: '',
        address: '',
        methodPayment: 0
    });

    useEffect(() => {
        const getTotal = () => {
            const result = cart.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);

            setTotal(result);
        }

        getTotal();
    }, [cart])

    const updateCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        });
    }

    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1;
            }
        });

        setCart([...cart]);
        updateCart(cart);
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id && item.quantity > 1) {
                item.quantity -= 1;
            }
        });

        setCart([...cart]);
        updateCart(cart);
    }

    const removeBook = (id) => {
        if (window.confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng chứ??")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1);
                }
            });

            setCart([...cart]);
            updateCart(cart);
        }
    }

    const onChangeInput = (event) => {
        const { name, value } = event.target;

        setCartForm({
            ...cartForm,
            [name]: value
        });
    }

    const payment = async () => {
        const { recipientName, phone, address, methodPayment } = cartForm;

        if (recipientName.length === 0 || phone.length === 0 || address.length === 0) {
            alert("Cần nhập đủ thông tin để thanh toán!!");
        } else if (methodPayment === 0) {
            alert("Cần chọn hình thức thanh toán");
        } else if (cart.length === 0) {
            alert("Giỏ hàng của bạn đang trống!!");
        } else {
            const res = await axios.post('/api/payment', { name: recipientName, phone, address, cart }, {
                headers: { Authorization: token }
            });

            setCart([]);
            updateCart([]);
            setCartForm({
                recipientName: '',
                phone: '',
                address: '',
                methodPayment: 0
            });
            setCallBack(!callback);

            alert(res.data.msg);
        }
    }

    const classNameBS = cart.length <= 1 ? "container-fuild fixed-bottom" : "container-fuild";

    return (
        <>
            <div className='container mt-5 cart-info'>
                <h2 className='text-center mb-4 font-weight-bold'>GIỎ HÀNG</h2>
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tiêu đề</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Thao tác</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => {
                                return (
                                    <tr key={item._id} className='cart-item__row'>
                                        <th scope="row">{index + 1}</th>
                                        <td className='cart-item__img'><img className='img-thumbnail' src={item.image.url} alt="" /></td>
                                        <td className='text-capitalize text-success font-weight-bold'>{item.title}</td>
                                        <td>
                                            <div className="cart-item__amount">
                                                <button onClick={() => decrement(item._id)}> - </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => increment(item._id)}> + </button>
                                            </div>
                                        </td>
                                        <td className='text-success font-weight-bold'>{item.quantity * item.price} VNĐ</td>
                                        <td><button className='btn btn-danger px-3' onClick={() => removeBook(item._id)}>Xóa</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className={classNameBS}>
                <div className="container">

                    <div className='d-flex justify-content-center'>
                        <div className="input-group my-3 mr-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Tên</span>
                            </div>
                            <input type="text" className="form-control" name='recipientName' value={cartForm.recipientName}
                                onChange={onChangeInput} placeholder="Tên người nhận" aria-describedby="basic-addon1" />
                        </div>

                        <div className="input-group my-3 mr-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">SĐT</span>
                            </div>
                            <input type="text" className="form-control" name='phone' value={cartForm.phone}
                                onChange={onChangeInput} placeholder="SĐT người nhận" aria-describedby="basic-addon1" />
                        </div>

                        <div className="input-group my-3 mr-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Địa chỉ</span>
                            </div>
                            <input type="text" className="form-control" name='address' value={cartForm.address}
                                onChange={onChangeInput} placeholder="Địa chỉ người nhận" aria-describedby="basic-addon1" />
                        </div>
                    </div>

                    <div className='my-2'>
                        <label className='mr-4 h6'>Hình thức thanh toán: </label>
                        <select name="methodPayment" value={cartForm.methodPayment} onChange={onChangeInput}>
                            <option value="0">None</option>
                            <option value="1">Thanh toán khi nhận hàng</option>
                        </select>
                    </div>

                    <div className='d-flex justify-content-between p-3'>
                        <h3 className='text-danger font-weight-bold'>Tổng Tiền: {total} VNĐ</h3>
                        <span className='btn btn-success btn-lg' onClick={() => payment()}>Thanh toán</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart