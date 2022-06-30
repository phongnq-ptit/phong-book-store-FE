import React, { useState, useContext } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState';

const blankBook = {
    title: '',
    price: 0,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id repellendus eum tenetur autem fugit ducimus eveniet distinctio numquam at, aspernatur a deserunt eius, quas minima maxime quasi, quia enim atque.',
    author: '',
    category: ''
}

function AddBook() {

    const state = useContext(GlobalState);

    const [token] = state.token;

    const [isAdmin] = state.userAPI.isAdmin;

    const [categories] = state.categoriesAPI.categories;

    const [callback, setCallback] = state.bookAPI.callback;

    const [newBook, setNewBook] = useState(blankBook);

    const [image, setImage] = useState(false);

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

        setNewBook({
            ...newBook,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!isAdmin) return alert("Không đủ quyền để thao tác!!!");

            if (!image) return alert("Không có ảnh được tải lên!!");

            const result = await axios.post('/api/book', { ...newBook, image }, {
                headers: { Authorization: token }
            });

            alert(result.data.msg);

            setCallback(!callback);
            setImage(false);
            setNewBook(blankBook);

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
                        value={newBook.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="author">Tác giả:</label>
                    <input type="text" name='author' id='author' required
                        value={newBook.author} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Giá tiền:</label>
                    <input type="number" name='price' id='price' required
                        value={newBook.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Mô tả:</label>
                    <textarea type="text" name='description' id='description' required
                        value={newBook.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories" className='mr-3'>Thể loại: </label>
                    <select name="category" value={newBook.category} onChange={handleChangeInput}>
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

                <button type='submit'>Thêm</button>
            </form>
        </div>
    )
}

export default AddBook