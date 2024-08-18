import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export interface EditSupportHeaderForm {
  step: number;
  data: {
    headerDetails: {
      title: string;
      description: string;
      };
    coverPicture: File | null;
    image: File | null;
    imagePreview: string;
    coverPicturePreview: string;
  };
  setStep: (step: number) => void;
  setData: (data: Partial<EditSupportHeaderForm['data']>) => void;
  resetStore: () => void;
}

type MyPersist = (
  config: StateCreator<EditSupportHeaderForm>,
  options: PersistOptions<EditSupportHeaderForm>
) => StateCreator<EditSupportHeaderForm>;

export const useEditSupportHeaderForm = create<EditSupportHeaderForm>(
  (persist as MyPersist)(
    set => ({
      step: 1,
      data: {
        headerDetails: {
          title: 'Header Information',
          description: '',
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
            headerDetails: {
              title: 'Header Information',
              description: '',
              },
            coverPicture: null,
            image: null,
            imagePreview: '',
            coverPicturePreview: '',
          },
        });
        localStorage.removeItem('EditSupportHeaderForm');
      },
    }),
    {
      name: 'EditSupportHeaderForm',
    }
  )
);
