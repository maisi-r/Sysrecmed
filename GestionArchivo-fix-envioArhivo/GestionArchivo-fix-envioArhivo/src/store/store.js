import { configureStore } from '@reduxjs/toolkit'
import { addtionalInformationFileApi } from './apis/additionalInformationFileApi';
import { fileApi } from './apis/fileApi';
import { systemApi } from './apis/systemApi';

export const store = configureStore({
    reducer: {
        [fileApi.reducerPath]: fileApi.reducer,
        [addtionalInformationFileApi.reducerPath]: addtionalInformationFileApi.reducer,
        [systemApi.reducerPath]: systemApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(fileApi.middleware)
        .concat(addtionalInformationFileApi.middleware)
        .concat(systemApi.middleware)
});
