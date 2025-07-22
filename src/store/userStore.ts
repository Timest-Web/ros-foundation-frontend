// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { create } from "zustand";

// interface UserProfile {
//   id: string;
//   name: string;
//   role: string;
//   avatar?: string;
//   email?: string;
// }

// interface UserStore {
//   user: UserProfile | null;
//   setUser: (user: UserProfile) => void;
//   clearUser: () => void;
// }

// export const useUserStore = create<UserStore>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
//   clearUser: () => set({ user: null }),
// }));
