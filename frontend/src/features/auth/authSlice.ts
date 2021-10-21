import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  Cred,
  JWT,
  PostProf,
  Profile,
} from "../../types/loginTypes";
import axios from "axios";
import { RootState } from "../../app/store";
import { apiUrl } from "../../url";

export const fetchAsyncLogin = createAsyncThunk(
  "auth/post",
  async (authen: Cred) => {
    const res = await axios.post<JWT>(`${apiUrl}authen/jwt/create/`, authen, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (authen: Cred) => {
    const res = await axios.post(`${apiUrl}api/register/`, authen, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncCreateProf = createAsyncThunk(
  "auth/createProfile",
  async () => {
    const res = await axios.post(
      `${apiUrl}api/profile/`,
      { img: null, introduction: null },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncUpdateProf = createAsyncThunk(
  "auth/updateProfile",
  async (profile: PostProf) => {
    const uploadData = new FormData();
    profile.img && uploadData.append("img", profile.img, profile.img.name);
    profile.introduction &&
      uploadData.append("introduction", profile.introduction);
    const res = await axios.put<Profile>(
      `${apiUrl}api/profile/${profile.id}/`,
      uploadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

const initialState: AuthState = {
  editedProf: {
    id: "",
    img: null,
    introduction: "",
  },
  selectedProf: {
    id: "",
    img: null,
    introduction: "",
    user_profile: 0,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEditProf: (state, action: PayloadAction<PostProf>) => {
      state.editedProf = action.payload;
    },
    resetEditProf: (state) => {
      state.editedProf = initialState.editedProf;
    },
    setSelectedProf: (state, action: PayloadAction<Profile>) => {
      state.selectedProf = action.payload;
    },
    resetSelectedProf: (state) => {
      state.selectedProf = initialState.selectedProf;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        localStorage.setItem("localJWT", action.payload.access);
      }
    );
    builder.addCase(fetchAsyncUpdateProf.rejected, (state) => {
      window.location.href = "login/";
    });
  },
});

export const {
  setEditProf,
  setSelectedProf,
  resetEditProf,
  resetSelectedProf,
} = authSlice.actions;
export const selectEditedProf = (state: RootState) => state.auth.editedProf;
export const selectSelectedProf = (state: RootState) => state.auth.selectedProf;
export default authSlice.reducer;
