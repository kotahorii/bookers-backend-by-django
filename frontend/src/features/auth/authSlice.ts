import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cred, JWT } from "../../types/loginTypes";
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
    const res = await axios.post(`${apiUrl}api/create/`, authen, {
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
      `${apiUrl}api/profile`,
      { img: null },
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

fetchAsyncUpdateProf = createAsyncThunk(
  'auth/updateProfiel',
  async (profile: )
)

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
