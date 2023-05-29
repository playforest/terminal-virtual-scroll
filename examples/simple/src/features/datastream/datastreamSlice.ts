import { createSlice } from '@reduxjs/toolkit'

type State = {
    name: string | null;
    data: string[];
    terminalRefreshRate: number;
}

const initialState: State = {
    name: null,
    data: [],
    terminalRefreshRate: 100
}

const datastreamSlice = createSlice({
    name: 'datastream',
    initialState,
    reducers: {
        saveDatastream: (state, { payload }) => {
            Object.assign(state, payload);
        },
        setTerminalRefreshRate: (state, { payload }) => {
            state.terminalRefreshRate = payload;
        },
        pushData: (state, { payload }: { payload: string }) => {
            console.log(`writing data: ${payload}`);
            state.data.push(payload);
        }
    }
})

export const { saveDatastream, setTerminalRefreshRate, pushData } = datastreamSlice.actions;
export default datastreamSlice.reducer;