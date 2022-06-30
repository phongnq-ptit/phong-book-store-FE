import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="container-fuild pt-5 pb-2 bg-dark text-light">
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md">
                        <h5>Liên Hệ</h5>
                        <ul className="list-unstyled text-small">
                            <li><Link className="text-muted" to='/'>Facebook</Link></li>
                            <li><Link className="text-muted" to='/'>Email: ngphonga4@gmail.com</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Phía Back-End</h5>
                        <ul className="list-unstyled text-small">
                            <li><Link className="text-muted" to='/'>NodeJS</Link></li>
                            <li><Link className="text-muted" to='/'>Express</Link></li>
                            <li><Link className="text-muted" to='/'>MongoDB</Link></li>
                            <li><Link className="text-muted" to='/'>JWT</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Phía Front-End</h5>
                        <ul className="list-unstyled text-small">
                            <li><Link className="text-muted" to='/'>ReactJS</Link></li>
                            <li><Link className="text-muted" to='/'>ContextAPI</Link></li>
                            <li><Link className="text-muted" to='/'>Bootstrap</Link></li>
                        </ul>
                    </div>
                </div>

                <hr color='#ccc' />

                <p className="copyright-text text-center">Copyright &copy; 2022 NGUYEN QUOC PHONG</p>
            </div>
        </footer>
    )
}

export default Footer