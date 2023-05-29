import { configureStore } from '@reduxjs/toolkit';
import datastreamReducer from './features/datastream/datastreamSlice'

export const store = configureStore({
    reducer: {
        datastream: datastreamReducer
    }
})