import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'

function UserManage() {

    const state = useContext(GlobalState);

    const [users] = state.userAPI.users;

    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        const getAdmins = () => {
            users.forEach((item, index) => {
                if (item.role === 1) {
                    setAdmin(item);
                    return;
                }
            });
        }

        getAdmins();
    }, [users])


    if (users.length === 0) return null;

    return (
        <div className='container mt-5 cart-info'>
            <h2 className='text-center mb-4 font-weight-bold'>TÀI KHOẢN TRONG HỆ THỐNG</h2>
            <span className='h5'>Có {users.length} tài khoản đã đăng ký!</span>
            <table className="table table-hover text-center mt-4">
                <thead>
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Ngày Đăng ký</th>
                        <th scope="col">Chức Vụ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={admin._id} className='history-item__row'>
                        <td className='text-info font-weight-bold'>{admin.email}</td>
                        <td>{admin.name}</td>
                        <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                        <td className='text-success font-weight-bold'>Admin</td>
                    </tr>
                    {
                        users.map((item, index) => {
                            return item.role !== 1 &&
                                <tr key={item._id} className='history-item__row'>
                                    <td className='text-info font-weight-bold'>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className='text-secondary font-weight-bold'>User</td>
                                </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserManage