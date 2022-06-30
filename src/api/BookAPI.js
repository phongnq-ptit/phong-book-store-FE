import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductAPI() {

    const [books, setBooks] = useState([]);

    const [callback, setCallback] = useState(false);

    const [category, setCategory] = useState('');

    const [sort, setSort] = useState('');

    const [search, setSearch] = useState('');

    const [page, setPage] = useState(1);

    const [result, setResult] = useState(0);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const result = await axios.get(`/api/book?limit=${page * 12}&${category}&${sort}&title[regex]=${search}`);

                setBooks(result.data.books);
                setResult(result.data.result);
            } catch (error) {
                alert(error.response.data.msg);
            }
        }

        getBooks();
    }, [callback, page, sort, search, category]);

    return {
        books: [books, setBooks],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default ProductAPI