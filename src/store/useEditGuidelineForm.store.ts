/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export interface EditGuidelineFormStore {
  step: number;
  data: {
    title: string;
    content: string;
    image: string | File | undefined | any;
  };
  setStep: (step: number) => void;
  setData: (data: Partial<EditGuidelineFormStore["data"]>) => void;
  resetStore: () => void;
}

type MyPersist = (
  config: StateCreator<EditGuidelineFormStore>,
  options: PersistOptions<EditGuidelineFormStore>
) => StateCreator<EditGuidelineFormStore>;

export const useEditGuidelineFormStore = create<EditGuidelineFormStore>(
  (persist as MyPersist)(
    (set) => ({
      step: 1,
      data: {
        title: "",
        content: "",
        image: "",
      },
      setStep: (step) => set({ step }),
      setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
      resetStore: () => {
        set({
          step: 1,
          data: {
            title: "",
            content: "",
            image: "",
          },
        });
        localStorage.removeItem("EditGuidelineFormStore");
      },
    }),
    {
      name: "EditGuidelineFormStore",
    }
  )
);
