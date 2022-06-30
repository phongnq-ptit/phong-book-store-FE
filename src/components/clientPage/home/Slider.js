import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

function Slider() {

    const state = useContext(GlobalState);

    const [banners] = state.bannerAPI.banners;

    return (
        <div className='slider-client'>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {
                        banners.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <div className="carousel-item active" key={item._id}>
                                        <img className="d-block w-100" src={item.image.url} alt='' />
                                    </div>
                                )
                            }
                            return (
                                <div className="carousel-item" key={item._id}>
                                    <img className="d-block w-100" src={item.image.url} alt='' />
                                </div>
                            )

                        })
                    }

                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}

export default Slider