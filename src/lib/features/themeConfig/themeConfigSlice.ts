import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type themMode = 'dark' | 'light'

export interface ThemeConfig {
    themeMode: themMode
}

const initialState: ThemeConfig = {
    themeMode: 'dark'
}

export const themeConfigSlice = createSlice({
    name: 'themeConfig',
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<themMode>) => { state.themeMode = action.payload },
    }
})

export const { setThemeMode } = themeConfigSlice.actions
export default themeConfigSlice.reducer
