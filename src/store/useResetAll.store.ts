import { useCreatePostFormStore } from './useCreatePostForm.store';
import { useEditPostFormStore } from './useEditPostForm.store';
import { useEditSupportHeaderForm } from './useEditSupportHeaderForm.store';

const useResetAllStores = () => {
  const resetCreatePostFormStore = useCreatePostFormStore(
    state => state.resetStore
  );
  const resetEditPostFormStore = useEditPostFormStore(
    state => state.resetStore
  );
  const resetEditSupportHeaderForm = useEditSupportHeaderForm(
    state => state.resetStore
  );

  const resetAllStores = () => {
    resetCreatePostFormStore();
    resetEditSupportHeaderForm();
    resetEditPostFormStore();

    // Additionally, clear out localStorage if needed
    localStorage.removeItem('CreatePostFormStore');
    localStorage.removeItem('EditSupportHeaderForm');
    localStorage.removeItem('resetEditPostFormStore');
  };

  return resetAllStores;
};

export default useResetAllStores;
