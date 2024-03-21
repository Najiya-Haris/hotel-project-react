import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import OrderReducer from "./OrderReducer";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
// import rootReduser from './reducers'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "user",
  storage,
};

const reducers = combineReducers({ user: UserReducer ,order:OrderReducer});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// {
//     "isSuccess": true,
//     "response": {
//         "success": true,
//         "data": {
//             "user": {
//                 "_id": "65bb8b3ca9f43efbec2cfb56",
//                 "name": "riya",
//                 "password": "$2b$10$SfLNt3lKq9PsARxwlgwhS.irffQPh4.zfWDUCY1vKmMHdRqeTQSxm",
//                 "email": "r@gmail.com",
//                 "gender": "female",
//                 "phoneNumber": "55125655",
//                 "userType": "manager",
//                 "experience": "55125655",
//                 "__v": 0,
//                 "createdAt": "2024-02-01T12:14:52.157Z",
//                 "updatedAt": "2024-02-01T12:14:52.157Z"
//             },
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJAZ21haWwuY29tIiwidXNlcklkIjoiNjViYjhiM2NhOWY0M2VmYmVjMmNmYjU2IiwiaWF0IjoxNzA2NzkxOTExLCJleHAiOjE3MDczOTE5MTF9.4Y6t6nUj85KQoZp67-wVG87_Us22SDyEdijamNu5syY"
//         }
//     },
//     "error": false
// }

// {data: {…}, status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
// config
// :
// {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
// data
// :
// error
// :
// false
// isSuccess
// :
// true
// response
// :
// data
// :
// token
// :
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJAZ21haWwuY29tIiwidXNlcklkIjoiNjViYjhiM2NhOWY0M2VmYmVjMmNmYjU2IiwiaWF0IjoxNzA2NzkxOTgxLCJleHAiOjE3MDczOTE5ODF9.VBos6YuPIL3rJr7YF-0c-7zdrHXf-YOsXpdhUC2X_F8"
// user
// :
// createdAt
// :
// "2024-02-01T12:14:52.157Z"
// email
// :
// "r@gmail.com"
// experience
// :
// "55125655"
// gender
// :
// "female"
// name
// :
// "riya"
// password
// :
// "$2b$10$SfLNt3lKq9PsARxwlgwhS.irffQPh4.zfWDUCY1vKmMHdRqeTQSxm"
// phoneNumber
// :
// "55125655"
// updatedAt
// :
// "2024-02-01T12:14:52.157Z"
// userType
// :
// "manager"
// __v
// :
// 0
// _id
// :
// "65bb8b3ca9f43efbec2cfb56"
// [[Prototype]]
// :
// Object
// [[Prototype]]
// :
// Object
// success
// :
// true
// [[Prototype]]
// :
// Object
// [[Prototype]]
// :
// Object
// headers
// :
// AxiosHeaders {content-length: '611', content-type: 'application/json; charset=utf-8'}
// request
// :
// XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// status
// :
// 200
// statusText
// :
// "OK"
// [[Prototype]]
// :
// Object
