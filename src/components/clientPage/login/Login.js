import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const loginSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/user/login', { ...user });

            localStorage.setItem('login', true);

            window.location.href = '/';
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const onChangeInput = (event) => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    return (
        <>
            <div className='text-center login-form container my-5 vh-100'>
                <form className="form-signin text-center">
                    <h1>Phong Book Store</h1>
                    <h5 className="mb-3 font-weight-normal">Vui lòng đăng nhập</h5>

                    <input type="email" id="inputEmail" className="form-control mt-3 w-50 mx-auto " placeholder="Địa chỉ Email"
                        name='email' required="" value={user.email} onChange={onChangeInput} />

                    <input type="password" id="inputPassword" className="form-control mt-3 w-50 mx-auto " placeholder="Mật khẩu"
                        name='password' required="" value={user.password} onChange={onChangeInput} />

                    <span className="btn btn-lg btn-block btn-primary mt-3 w-50 mx-auto" onClick={loginSubmit}>Đăng Nhập</span>
                </form>

                <hr color='#ccc' />
                <span>Bạn chưa có tài khoản ? </span>
                <Link to='/register' className="btn btn-lg btn-primary btn-block mt-3 w-50 mx-auto" >Đăng Ký</Link>
            </div>
        </>
    )
}

export default Login