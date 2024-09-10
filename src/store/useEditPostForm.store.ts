import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export interface EditPostFormStore {
  step: number;
  data: {
    title: string;
    author: string;
    description: string;
    categoryId: string;
    body: string;
    coverImage: string | File | undefined;
    coverImagePreview: string | File | undefined;
  };
  setStep: (step: number) => void;
  setData: (data: Partial<EditPostFormStore['data']>) => void;
  resetStore: () => void;
}

type MyPersist = (
  config: StateCreator<EditPostFormStore>,
  options: PersistOptions<EditPostFormStore>
) => StateCreator<EditPostFormStore>;

export const useEditPostFormStore = create<EditPostFormStore>(
  (persist as MyPersist)(
    set => ({
      step: 1,
      data: {
        title: '',
        author: '',
        description: '',
        categoryId: '',
        body: '',
        coverImage: '',
        coverImagePreview: '',
      },
      setStep: step => set({ step }),
      setData: data => set(state => ({ data: { ...state.data, ...data } })),
      resetStore: () => {
        set({
          step: 1,
          data: {
            title: '',
            author: '',
            description: '',
            categoryId: '',
            body: '',
            coverImage: '',
            coverImagePreview: '',
          },
        });
        localStorage.removeItem('EditPostFormStore');
      },
    }),
    {
      name: 'EditPostFormStore',
    }
  )
);
