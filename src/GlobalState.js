import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import BannerAPI from './api/BannerAPI';
import UserAPI from './api/UserAPI';
import BookAPI from './api/BookAPI';
import CategoriesAPI from './api/CategoriesAPI';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {

    const [token, setToken] = useState(false);

    useEffect(() => {
        const login = localStorage.getItem('login');

        if (login) {
            const refreshToken = async () => {
                const result = await axios.get('/user/refresh_token');

                setToken(result.data.accesstoken);

                setTimeout(() => {
                    refreshToken();
                }, 10 * 60 * 1000);
            }

            refreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        bannerAPI: BannerAPI(),
        userAPI: UserAPI(token),
        bookAPI: BookAPI(),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}