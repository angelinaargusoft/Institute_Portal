import { createStore } from "vuex";
import auth from "./modules/auth";
import userProfile from "./modules/userProfile";
import institute from "./modules/institute";

export default createStore({
  modules: {
    auth,
    userProfile,
    institute
  },
});