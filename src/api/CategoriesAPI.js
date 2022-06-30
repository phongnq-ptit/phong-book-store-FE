import { useState, useEffect } from 'react'
import axios from 'axios'

function CategoriesAPI() {

    const [categories, setCategories] = useState([]);

    const [callback, setCallBack] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const result = await axios.get('/api/category');

                setCategories(result.data);
            } catch (error) {
                alert(error.response.data.msg);
            }
        }

        getCategories();
    }, [callback])


    return {
        categories: [categories, setCategories],
        callback: [callback, setCallBack]
    }
}

export default CategoriesAPI