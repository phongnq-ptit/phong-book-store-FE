import { useState, useEffect } from 'react'
import axios from 'axios'

function UserAPI(token) {

    const [isLogged, setIsLogged] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);

    const [users, setUsers] = useState([]);

    const [userInfo, setUserInfo] = useState([]);

    const [cart, setCart] = useState([]);

    const [history, setHistory] = useState([]);

    const [historyUser, setHistoryUser] = useState([]);

    const [status, setStatus] = useState('');

    const [callback, setCallBack] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const result = await axios.get('/user/info', {
                        headers: {
                            Authorization: token
                        }
                    });

                    setIsLogged(true);

                    setUserInfo(result.data);

                    setCart(result.data.cart);

                    result.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

                } catch (error) {
                    alert(error.response.data.msg);
                }
            }

            getUser();
        }
    }, [token]);

    useEffect(() => {
        if (token && isAdmin) {
            const getAllUsers = async () => {
                const result = await axios.get('/user', {
                    headers: { Authorization: token }
                });

                setUsers(result.data);
            }

            getAllUsers();
        }
    }, [token, isAdmin]);

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    try {
                        const result = await axios.get(`/api/payment?${status}`, {
                            headers: { Authorization: token }
                        });

                        setHistory(result.data.reverse());
                    } catch (error) {
                        alert(error.response.data.msg);
                    }
                } else {
                    try {
                        const result = await axios.get('/user/history', {
                            headers: { Authorization: token }
                        });

                        setHistoryUser(result.data.reverse());
                    } catch (error) {
                        alert(error.response.data.msg);
                    }
                }
            }

            getHistory();
        }
    }, [token, isAdmin, callback, status]);

    const addCart = async (book) => {
        if (!isLogged)
            return alert("Cần Đăng Nhập Để Sử Dụng Tính Năng Này!!");

        const check = cart.every((item) => {
            return item._id !== book._id;
        });

        if (check) {
            setCart([...cart, { ...book, quantity: 1 }]);

            await axios.patch('/user/addcart', { cart: [...cart, { ...book, quantity: 1 }] }, {
                headers: { Authorization: token }
            });

            alert("Thêm vào giỏ hàng thành công!!");

        } else {
            return alert("Quyển sách này đã có trong giỏ hàng!!");
        }
    }


    return {
        users: [users, setUsers],
        userInfo: [userInfo, setUserInfo],
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        historyUser: [historyUser, setHistoryUser],
        callback: [callback, setCallBack],
        status: [status, setStatus]
    }
}

export default UserAPI