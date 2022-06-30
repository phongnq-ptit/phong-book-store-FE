import React, { useContext, useState } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'

function BannerManage() {

    const state = useContext(GlobalState);

    const [token] = state.token;

    const [isAdmin] = state.userAPI.isAdmin;

    const [image, setImage] = useState(false);

    const [banners] = state.bannerAPI.banners;

    const [callback, setCallBack] = state.bannerAPI.callback;

    const handleUpload = async (event) => {
        event.preventDefault();
        try {
            if (!isAdmin) return alert("Không đủ quyền để thao tác!");

            const file = event.target.files[0];

            if (!file) return alert("Tệp không tồn tại!!");

            if (file.size > 1024 * 1024) return alert("Tệp lớn hơn 1MB!!");

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("Tệp không đúng định dạng JPG/PNG !!");

            let formData = new FormData();
            formData.append('file', file);

            const result_img = await axios.post('/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: token
                }
            });

            setImage(result_img.data);
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("Không đủ quyền để thao tác!");

            await axios.post('/api/destroy', { public_id: image.public_id }, {
                headers: { Authorization: token }
            });

            setImage(false);
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const addBanner = async () => {
        try {
            const result_data = await axios.post('/api/banner', { image }, {
                headers: { Authorization: token }
            });

            setCallBack(!callback);
            setImage(false);
            alert(result_data.data.msg);
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const deleteBanner = async (id, public_id) => {
        try {
            if (window.confirm('Bạn có chắc muốn xóa Banner này không?')) {
                await axios.post('/api/destroy', { public_id: public_id }, {
                    headers: { Authorization: token }
                });

                const result = await axios.delete(`/api/banner/${id}`, {
                    headers: { Authorization: token }
                });

                alert(result.data.msg);
                setCallBack(!callback);
            }
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const styleUpload = {
        display: image ? 'block' : 'none'
    }

    return (
        <>
            <div className='p-3 banner-manage'>
                {
                    banners.map((item) => {
                        return (
                            <div key={item._id} className="upload-banner">
                                <div className="file_img-banner">
                                    <img src={item.image.url} alt="" />
                                    <span onClick={() => deleteBanner(item._id, item.image.public_id)}>X</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div >
            <hr color='#ccc' className='container' />
            <div className="mb-5 d-flex justify-content-center">
                <div className="upload-banner p-3">
                    <input type="file" id="file_up-banner" name='file' onChange={handleUpload} />
                    <div className="file_img-banner" style={styleUpload}>
                        <img src={image ? image.url : ''} alt="" />
                        <span onClick={handleDestroy}>X</span>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <span className='btn btn-info mb-5' onClick={addBanner}> Thêm Banner</span>
            </div>
        </>
    )
}

export default BannerManage