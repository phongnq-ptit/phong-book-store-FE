import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        tryPassword: ''
    })

    const registerSubmit = async (event) => {
        event.preventDefault();

        if ((user.name.length === 0 || user.email.length === 0 || user.password.length === 0 || user.tryPassword.length === 0)) {
            alert('Cần nhập đủ thông tin để đăng ký!');
        } else if (user.password !== user.tryPassword) {
            alert('Mật khẩu nhập lại phải trùng nhau!');
        } else {
            try {
                await axios.post('/user/register', { name: user.name, email: user.email, password: user.password });

                window.location.href = '/login';
            } catch (error) {
                alert(error.response.data.msg);
            }
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
                    <h1 className='mb-4'>Phong Book Store</h1>

                    <input type="text" name='name' className="form-control mt-3 w-50 mx-auto "
                        placeholder="Tên người dùng" required="" onChange={onChangeInput} />

                    <input type="email" name='email' className="form-control mt-3 w-50 mx-auto "
                        placeholder="Địa chỉ Email" required="" onChange={onChangeInput} />

                    <input type="password" name='password' className="form-control mt-3 w-50 mx-auto "
                        placeholder="Mật khẩu" required="" onChange={onChangeInput} />

                    <input type="password" name='tryPassword' className="form-control mt-3 w-50 mx-auto "
                        placeholder="Nhập lại Mật khẩu" required="" onChange={onChangeInput} />

                    <span className="btn btn-lg btn-primary btn-block mt-3 w-50 mx-auto " onClick={registerSubmit}>Đăng Ký</span>
                </form>

                <hr color='#ccc' />
                <span>Bạn đã có tài khoản ? </span>
                <Link to='/login' className="btn btn-lg btn-primary btn-block mt-3 w-50 mx-auto" >Đăng Nhập</Link>
            </div>
        </>
    )
}

export default Register