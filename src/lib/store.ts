import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/lib/features/counter/counterSlice'
import themeConfigReducer from '@/lib/features/themeConfig/themeConfigSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            themeConfig: themeConfigReducer,
            counter: counterReducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']