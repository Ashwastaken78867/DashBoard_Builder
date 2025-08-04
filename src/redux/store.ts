import { configureStore } from "@reduxjs/toolkit";
import widgetsReducer, { saveWidgetsToStorage } from "./widgetsSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
    theme: themeReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveWidgetsToStorage(state.widgets.widgets);
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
