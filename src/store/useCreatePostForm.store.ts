import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export interface CreatePostFormStore {
  step: number;
  data: {
    title: string;
    author: string;
    description: string;
    categoryId: string;
    body: string;
    coverImage: string;
    coverImagePreview: string;
  };
  setStep: (step: number) => void;
  setData: (data: Partial<CreatePostFormStore['data']>) => void;
  resetStore: () => void;
}

type MyPersist = (
  config: StateCreator<CreatePostFormStore>,
  options: PersistOptions<CreatePostFormStore>
) => StateCreator<CreatePostFormStore>;

export const useCreatePostFormStore = create<CreatePostFormStore>(
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
        localStorage.removeItem('CreatePostFormStore');
      },
    }),
    {
      name: 'CreatePostFormStore',
    }
  )
);
