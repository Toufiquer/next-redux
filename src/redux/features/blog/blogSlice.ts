/*
|-----------------------------------------
| setting up BlogSlice for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

// If you want to update store then this file help you to update
import {initSingleBlogDataType} from '@/app/blog/page';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: {data: initSingleBlogDataType[]} = {
  data: [],
};

for (let i = 1; i <= 15; i++) {
  initialState.data.push({
    title: `Blog ${i}`,
    id: i,
  });
}
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<initSingleBlogDataType>) => {
      const idx = state.data.indexOf(action.payload);
      if (idx === -1) {
        state.data.push(action.payload);
      }
    },
    updateBlog: (state, action: PayloadAction<initSingleBlogDataType>) => {
      state.data = state.data.map(curr => {
        let result = {...curr};
        if (curr.id === action.payload.id) {
          result = action.payload;
        }
        return result;
      });
    },
    removeBlog: (state, action: PayloadAction<initSingleBlogDataType>) => {
      state.data = state.data.filter(curr => curr.id !== action.payload.id);
    },
    deleteAllBlog: () => initialState,
  },
});
export const {addBlog, updateBlog, deleteAllBlog, removeBlog} =
  blogSlice.actions;
export default blogSlice.reducer;
