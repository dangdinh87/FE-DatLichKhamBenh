import userReducer from '../features/Auth/userSlice';
// import cartReducer from '../feature/Cart/cartSlice';
// import systemReducer from '../feature/System/systemSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  user: userReducer,
  // cart: cartReducer,
  // system: systemReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
