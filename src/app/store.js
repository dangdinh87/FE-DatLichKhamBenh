import userReducer from '../features/Auth/userSlice';
import doctorReducer from '../pages/Doctor/doctorSlice';
import systemReducer from '../features/System/systemSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  user: userReducer,
  doctor: doctorReducer,
  system: systemReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
