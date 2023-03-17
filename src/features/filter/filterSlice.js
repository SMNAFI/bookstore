import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'All',
  search: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    statusChanged: (state, action) => {
      state.status = action.payload
    },
    searched: (state, action) => {
      state.search = action.payload
    },
  },
})

export default filterSlice.reducer
export const { statusChanged, searched } = filterSlice.actions
