import { createSlice } from '@reduxjs/toolkit'
import { ALBUM_API } from '../apis/endpoints'
const initialState = {
  listResponse: [],
  listApiResponse: [],
  loading: false,
  numOfItems: 10
}

export const listSLice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    callListApi: (state) => {
      state.loading = true
    },
    saveListApiResponseSuccess: (state, { payload }) => {
      state.listApiResponse = payload;
      state.loading = false
    },
    listSuccess: (state, { payload }) => {
      state.listResponse = payload;
    },
    numOfItemsToShow: (state, { payload }) => {
      state.numOfItems = payload;
    }
  }
})
export async function fetchApi(dispatch, num) {
  dispatch(callListApi());
  const results = await fetch(ALBUM_API + num);
  const results2 = await results.json();
  dispatch(saveListApiResponseSuccess(results2))
}
export const listSelector = (state) => state.list;
export const { listSuccess, saveListApiResponseSuccess, callListApi, numOfItemsToShow } = listSLice.actions;

export default listSLice.reducer