import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

function EditBook() {

    const state = useContext(GlobalState);

    const [token] = state.token;

    const [books] = state.bookAPI.books;

    const [isAdmin] = state.userAPI.isAdmin;

    const [categories] = state.categoriesAPI.categories;

    const [callback, setCallback] = state.bookAPI.callback;

    const [book, setBook] = useState([]);

    const [image, setImage] = useState(false);

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            const getBook = () => {
                books.forEach(item => {
                    if (item._id === params.id) {
                        setBook(item);
                        setImage(item.image);
                        return;
                    }
                });
            }

            getBook();
        }
    }, [params.id, books]);

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

    const handleChangeInput = (event) => {
        const { name, value } = event.target;

        setBook({
            ...book,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!isAdmin) return alert("Không đủ quyền để thao tác!!!");

            if (!image) return alert("Không có ảnh được tải lên!!");

            const result = await axios.put(`/api/book/${book._id}`, { ...book, image }, {
                headers: { Authorization: token }
            });

            alert(result.data.msg);

            setCallback(!callback);
            setImage(false);
            setBook([]);

            window.location.href = '/books_manage';
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const styleUpload = {
        display: image ? 'block' : 'none'
    }

    return (
        <div className='add-book container mt-5'>
            <div className="upload">
                <input type="file" className="file_up" name='file' onChange={handleUpload} />

                <div className="file_img" style={styleUpload}>
                    <img src={image ? image.url : ''} alt="" />
                    <span onClick={handleDestroy}>X</span>
                </div>

            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="title">Tiêu đề</label>
                    <input type="text" name='title' id='title' required
                        value={book.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="author">Tác giả:</label>
                    <input type="text" name='author' id='author' required
                        value={book.author} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Giá tiền:</label>
                    <input type="number" name='price' id='price' required
                        value={book.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Mô tả:</label>
                    <textarea type="text" name='description' id='description' required
                        value={book.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories" className='mr-3'>Thể loại: </label>
                    <select name="category" value={book.category} onChange={handleChangeInput}>
                        <option value="">Vui lòng chọn thể loại</option>
                        {
                            categories.map((item) => {
                                return (
                                    <option value={item._id} key={item._id} >
                                        {item.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>

                <button type='submit'>Cập Nhật</button>
            </form>
        </div>
    )
}

export default EditBook