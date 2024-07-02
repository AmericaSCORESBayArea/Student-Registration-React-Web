import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      enrolledStudents: {},
      pastedData: [],

      addStudents: (region, newStudents) =>
        set((state) => {
          const existingStudents = state.enrolledStudents[region] || [];
          const updatedStudents = [...existingStudents, ...newStudents];
          return {
            enrolledStudents: {
              ...state.enrolledStudents,
              [region]: updatedStudents,
            },
          };
        }),
      setPastedData: (newData) => set({ pastedData: newData }),
      clearPastedData: () => set({ pastedData: [] }),
    }),
    {
      name: "enrollment-data-store",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
