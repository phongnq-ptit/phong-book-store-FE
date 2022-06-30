import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="page-wrap d-flex flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <span className="display-1 d-block">404</span>
                        <div className="mb-4 lead">Không tìm thấy trang bạn đang tìm.</div>
                        <Link to='/' className="btn btn-link">Trở về trang chủ.</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound