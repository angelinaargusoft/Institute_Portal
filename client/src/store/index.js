import { createStore } from "vuex";
import auth from "./modules/auth";
import userProfile from "./modules/userProfile";

export default createStore({
  modules: {
    auth,
    userProfile
  },
});