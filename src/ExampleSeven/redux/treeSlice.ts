import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTreeData, TreeNode } from '../utils/treeDummyApi';

interface TreeState {
  data: TreeNode | null;
  loading: boolean;
  error: string | null;
}

const initialState: TreeState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchTree = createAsyncThunk(
  'tree/fetch',
  async () => {
    const response = await getTreeData();
    return response;
  }
);

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTree.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTree.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTree.rejected, state => {
        state.loading = false;
        state.error = 'Unable to load tree data';
      });
  },
});

export default treeSlice.reducer;


// ==================================================
// 📁 src/redux/treeSlice.ts
// ==================================================
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export interface TreeState {
//   data: any;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TreeState = {
//   data: null,
//   loading: false,
//   error: null,
// };

// export const fetchTree = createAsyncThunk(
//   'tree/fetchTree',
//   async (token: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         'https://intdemo.sapphireims.com/rpa/api/auth/ga/Process_AA31A5C9D1B8/processKey?type=json&service=Tree',
//         {
//           modelId: '2024261013-42962c5d-f5c1-49ba-b5e7-ee486452c780',
//           searchFields: [],
//           cached: true,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-auth-token': token,
//           },
//         },
//       );

//       return response.data.response;
//     } catch (error) {
//       return rejectWithValue('Unable to load tree data');
//     }
//   },
// );

// const treeSlice = createSlice({
//   name: 'tree',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchTree.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTree.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchTree.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default treeSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { Alert } from 'react-native';

// export interface TreeState {
//   data: any;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TreeState = {
//   data: null,
//   loading: false,
//   error: null,
// };

// // src/redux/treeSlice.ts
// export const fetchTree = createAsyncThunk(
//   'tree/fetchTree',
//   async (token: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         'https://intdemo.sapphireims.com/rpa/api/auth/ga/Process_AA31A5C9D1B8/processKey?type=json&service=Tree&metadataId=2024261013-42962c5d-f5c1-49ba-b5e7-ee486452c780',
//         // {
//         //   modelId: '2024261013-42962c5d-f5c1-49ba-b5e7-ee486452c780',
//         //   searchFields: [
//         //     {
//         //       metadataId:
//         //         '2024261013-42962c5d-f5c1-49ba-b5e7-ee486452c780',
//         //       pageNumber: 0,
//         //       pageSize: 1000,
//         //       active: 'true',
//         //       closed: 'false',
//         //       search1String:
//         //         '2024251022-cd2fe93d-b996-45ba-97af-cb6c37ca343b',
//         //     },
//         //   ],
//         {
//           modelId: '2024261013-42962c5d-f5c1-49ba-b5e7-ee486452c780',
//           searchFields: [
//             {
//               metadataId: '2024261013-42962c5d-f5c1-49ba-b5e7-ee486452c780',
//               pageNumber: 0,
//               pageSize: 1000,
//               active: 'true',
//               closed: 'false',
//               search1String: '2024251022-cd2fe93d-b996-45ba-97af-cb6c37ca343b',
//             },
//             {
//               metadataId: '2024261013-42962c5d-f5c1-49ba-b5e7-ee486452c780',
//               pageNumber: 0,
//               pageSize: 1000,
//               active: 'true',
//               closed: 'false',
//               search1String: '2024251022-cd2fe93d-b996-45ba-97af-cb6c37ca343b',
//             },
//           ],
//           cached: 'true',
//         },
//         {
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             'x-auth-token': token,
//           },
//         },
//       );

//       console.log('TREE RESPONSE 👉', response.data);
// Alert.alert('TREE RESPONSE', JSON.stringify(response.data));
//       return response.data.response;
//     } catch (error: any) {
//       console.log('TREE ERROR ❌', error?.response?.data || error.message);
//       return rejectWithValue('Unable to load tree data');
//     }
//   },
// );

// // export const fetchTree = createAsyncThunk(
// //   'tree/fetchTree',
// //   async (token: string, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post(
// //         'https://intdemo.sapphireims.com/rpa/api/auth/ga/Process_AA31A5C9D1B8/processKey?type=json&service=Tree',
// //         {
// //           modelId: '2024261013-42962c5d-f5c1-49ba-b5e7-ee486452c780',
// //           searchFields: [],
// //           cached: true,
// //         },
// //         {
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'x-auth-token': token,
// //           },
// //         },
// //       );

// //       return response.data.response;
// //     } catch (error) {
// //       return rejectWithValue('Unable to load tree data');
// //     }
// //   },
// // );

// const treeSlice = createSlice({
//   name: 'tree',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchTree.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTree.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchTree.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default treeSlice.reducer;
