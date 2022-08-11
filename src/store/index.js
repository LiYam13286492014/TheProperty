import { configureStore } from '@reduxjs/toolkit'
import { createStoreHook } from 'react-redux'
import {loadingReducer} from '../reducer/isLoading'
import { collapsedReducer } from '../reducer/iscollapsed'
import { keyReducer } from '../reducer/keyControl'



export const store = configureStore({
    reducer:{
        loadingReducer,
        collapsedReducer,
        keyReducer
    }

})


export default store