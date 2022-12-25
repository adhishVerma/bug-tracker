import create from "zustand";
import { persist } from "zustand/middleware";

const useUser = create(
  persist((set) => ({
    user: null,
    loginUser: (userObj) => set((state) => ({ user: userObj })),
    logoutUser: () => {set((state) => ({ user: null }))},
    reset : () => {persist.clear.localStorage()}
  }))
);

export default useUser;
