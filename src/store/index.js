import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import userReducer from "./reducers/userSlice";
import notificationReducer from "./reducers/notificationSlice";
import storage from "redux-persist/lib/storage";
import jobReducer from "./reducers/jobSlice";
import candidateReducer from "./reducers/candidateSlice";
import categoryReducer from "./reducers/categorySlice";
import resumeReducer from "./reducers/resumeSlice";
import reportReducer from "./reducers/reportSlice";
const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  job: jobReducer,
  candidate: candidateReducer,
  category: categoryReducer,
  resume: resumeReducer,
  report: reportReducer,
});
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["notification"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
