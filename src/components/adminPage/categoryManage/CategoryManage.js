import React, { useContext, useState } from 'react'
import axios from 'axios';
import { GlobalState } from '../../../GlobalState'

function CategoryManage() {

    const state = useContext(GlobalState);

    const [token] = state.token;

    const [categories] = state.categoriesAPI.categories;

    const [callback, setCallBack] = state.categoriesAPI.callback;

    const [category, setCategory] = useState('');

    const [onEdit, setOnEdit] = useState(false);

    const [id, setID] = useState('');

    const createAndEditCategory = async (event) => {
        event.preventDefault();
        try {
            if (onEdit) {
                const result = await axios.put(`/api/category/${id}`, { name: category }, {
                    headers: { Authorization: token }
                });

                alert(result.data.msg);
            } else {
                const result = await axios.post('/api/category', { name: category }, {
                    headers: { Authorization: token }
                });

                alert(result.data.msg);
            }

            setOnEdit(false);
            setCategory('');
            setCallBack(!callback);
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const editCategory = (id, name) => {
        setID(id);
        setCategory(name);
        setOnEdit(true);
    }

    const deleteCategory = async (id) => {
        try {
            if (window.confirm("Bạn có chắc sẽ xóa thể loại này không!")) {
                const result = await axios.delete(`/api/category/${id}`, {
                    headers: { Authorization: token }
                });

                setCallBack(!callback);

                alert(result.data.msg);
            }
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    return (
        <div>
            <div className='categories container my-5'>
                <form onSubmit={createAndEditCategory}>
                    <label htmlFor="category">Thể Loại</label>
                    <input type="text" name='category' value={category} required
                        onChange={(event) => { return setCategory(event.target.value) }} />

                    <button type="submit">{onEdit ? 'Cập Nhật' : 'Thêm'}</button>
                </form>

                <div className="categories-col">
                    {
                        categories.map((item) => {
                            return (
                                <div className="categories-row" key={item._id}>
                                    <p>{item.name}</p>
                                    <div>
                                        <button onClick={() => editCategory(item._id, item.name)}>Sửa</button>
                                        <button onClick={() => deleteCategory(item._id)} >Xóa</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryManage