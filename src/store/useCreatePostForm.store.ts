import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export interface CreatePostFormStore {
  step: number;
  data: {
    postDetails: {
      title: string;
      author: string;
      description: string;
      categoryIds: number[];
      content: string;
    };
    coverPicture: File | null;
    image: File | null;
    imagePreview: string;
    coverPicturePreview: string;
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
        postDetails: {
          title: '',
          author: '',
          description: '',
          categoryIds: [],
          content: '',
        },
        coverPicture: null,
        image: null,
        imagePreview: '',
        coverPicturePreview: '',
      },
      setStep: step => set({ step }),
      setData: data => set(state => ({ data: { ...state.data, ...data } })),
      resetStore: () => {
        set({
          step: 9,
          data: {
            postDetails: {
              title: '',
              author: '',
              description: '',
              categoryIds: [],
              content: '',
            },
            coverPicture: null,
            image: null,
            imagePreview: '',
            coverPicturePreview: '',
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
