import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
  id: string;
  name: string;
  language: string;
}

interface ProfileState {
  profiles: Profile[];
  activeProfile: Profile | null;
}

const initialState: ProfileState = {
  profiles: [],
  activeProfile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile(state, action: PayloadAction<Profile>) {
      state.profiles.push(action.payload);
      state.activeProfile = action.payload;
    },

    switchProfile(state, action: PayloadAction<string>) {
      const profile = state.profiles.find(p => p.id === action.payload);
      if (profile) {
        state.activeProfile = profile;
      }
    },

    loadProfiles(state, action: PayloadAction<Profile[]>) {
      state.profiles = action.payload;
      state.activeProfile = action.payload[0] || null;
    },
    removeProfile(state, action) {
      state.profiles = state.profiles.filter(
        profile => profile.id !== action.payload,
      );

      if (state.activeProfile?.id === action.payload) {
        state.activeProfile = state.profiles[0] || null;
      }
    },
  },
});

export const { addProfile, switchProfile, loadProfiles, removeProfile } = profileSlice.actions;
export default profileSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Profile {
//   id: string;
//   name: string;
//   language: string;
// }

// interface ProfileState {
//   profiles: Profile[];
//   activeProfile: Profile | null;
// }

// const initialState: ProfileState = {
//   profiles: [],
//   activeProfile: null,
// };

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState,
//   reducers: {

//     addProfile(state, action: PayloadAction<Profile>) {
//       state.profiles.push(action.payload);
//       state.activeProfile = action.payload;
//     },

//     switchProfile(state, action: PayloadAction<string>) {
//       const profile = state.profiles.find(p => p.id === action.payload);
//       if (profile) {
//         state.activeProfile = profile;
//       }
//     },

//     loadProfiles(state, action: PayloadAction<Profile[]>) {
//       state.profiles = action.payload;
//       state.activeProfile = action.payload[0] || null;
//     }

//   },
// });

// export const { addProfile, switchProfile, loadProfiles } = profileSlice.actions;
// export default profileSlice.reducer;
