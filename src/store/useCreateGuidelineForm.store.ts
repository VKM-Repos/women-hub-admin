import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export interface CreateGuidelineFormStore {
  //   step: number;
  data: {
    title: string;
    content: string;
    image: string;
  };
  //   setStep: (step: number) => void;
  setData: (data: Partial<CreateGuidelineFormStore["data"]>) => void;
  resetStore: () => void;
}

type MyPersist = (
  config: StateCreator<CreateGuidelineFormStore>,
  options: PersistOptions<CreateGuidelineFormStore>
) => StateCreator<CreateGuidelineFormStore>;

export const useCreateGuidelineFormStore = create<CreateGuidelineFormStore>(
  (persist as MyPersist)(
    (set) => ({
      data: {
        title: "",
        content: "",
        image: "",
      },
      //   setStep: (step) => set({ step }),
      setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
      resetStore: () => {
        set({
          data: {
            title: "",
            content: "",
            image: "",
          },
        });
        localStorage.removeItem("CreateGuidelineFormStore");
      },
    }),
    {
      name: "CreateGuidelineFormStore",
    }
  )
);
