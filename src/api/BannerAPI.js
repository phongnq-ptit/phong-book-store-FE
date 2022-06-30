import { useState, useEffect } from 'react'
import axios from 'axios'

function BannerAPI() {
    const [banners, setBanners] = useState([]);

    const [callback, setCallBack] = useState(false);

    useEffect(() => {
        const getBanners = async () => {
            const result = await axios.get('/api/banner');

            setBanners(result.data);
        }

        getBanners();
    }, [callback]);


    return {
        banners: [banners, setBanners],
        callback: [callback, setCallBack]
    }

}

export default BannerAPI