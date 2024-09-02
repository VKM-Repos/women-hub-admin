type Props = {
  handlePrevious: () => void;
  handleNext: () => void;
  currentPage: number;
  numberOfElements: number;
  totalElements: number;
};

const PostPagination = ({
  handlePrevious,
  handleNext,
  currentPage,
  totalElements,
  numberOfElements,
}: Props) => {
  return (
    <div className="flex w-full items-center justify-between p-2">
      <p>{`Showing ${currentPage}-${numberOfElements} of ${totalElements}`}</p>
      <span className="flex items-center justify-end gap-4">
        <button onClick={handlePrevious}>previous</button>
        <button onClick={handleNext}>next</button>
      </span>
    </div>
  );
};

export default PostPagination;
