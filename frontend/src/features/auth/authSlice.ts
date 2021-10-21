import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cred, JWT, PostProf, Profile } from "../../types/loginTypes";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

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

const initialState = {};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        localStorage.setItem("localJWT", action.payload.access);
      }
    );
  },
});

export default authSlice.reducer;
