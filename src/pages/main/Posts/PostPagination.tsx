import { Button } from '@/components/ui/button';

type Props = {
  handlePrevious: () => void;
  handleNext: () => void;
  currentPage: number;
  numberOfElements: number;
  totalElements: number;
  pageSize: number; // Add pageSize as a prop
};

const PostPagination = ({
  handlePrevious,
  handleNext,
  currentPage,
  totalElements,
  pageSize,
}: Props) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalElements / pageSize);

  return (
    <div className="flex w-full items-center justify-between p-2">
      <p>{`Showing ${currentPage * pageSize - pageSize + 1}-${
        currentPage * pageSize > totalElements
          ? totalElements
          : currentPage * pageSize
      } of ${totalElements}`}</p>
      <span className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1} // Disable if on the first page
        >
          <span>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.41 10.4008L2.83 5.99438L7.41 1.58798L6 0.234375L0 5.99438L6 11.7544L7.41 10.4008Z"
                fill="#202224"
              />
            </svg>
          </span>
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages} // Disable if on the last page
        >
          <span>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.59 10.4008L5.17 5.99438L0.59 1.58798L2 0.234375L8 5.99438L2 11.7544L0.59 10.4008Z"
                fill="#202224"
              />
            </svg>
          </span>
        </Button>
      </span>
    </div>
  );
};

export default PostPagination;
