import { configureStore } from '@reduxjs/toolkit'
import { createStoreHook } from 'react-redux'
import {loadingReducer} from '../reducer/isLoading'
import { collapsedReducer } from '../reducer/iscollapsed'



export const store = configureStore({
    reducer:{
        loadingReducer,
        collapsedReducer
    }

})


export default store