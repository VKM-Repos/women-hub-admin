import { Button } from '@/components/ui/button';

type Props = {
  handleNext: () => void;
};

const Footer = ({ handleNext }: Props) => {
  return (
    <section className="flex h-full min-h-[5rem] w-full items-center justify-between rounded-lg bg-white p-6 shadow">
      <span className="w-fit">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9499 13.4643L16.7071 8.70711C17.0976 8.31658 17.0976 7.68342 16.7071 7.29289C16.3166 6.90237 15.6834 6.90237 15.2929 7.29289L10.5357 12.0501L11.9499 13.4643Z"
            fill="#6F767E"
          />
          <path
            d="M8.29369 16.8792L6.30684 14.8924C6.30216 14.8879 6.29751 14.8833 6.29289 14.8787L3.70711 12.2929C3.31658 11.9024 2.68342 11.9024 2.29289 12.2929C1.90237 12.6834 1.90237 13.3166 2.29289 13.7071L4.87868 16.2929C5.80237 17.2166 7.17853 17.412 8.29369 16.8792Z"
            fill="#6F767E"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.7063 7.24602C22.0968 7.63654 22.0968 8.26971 21.7063 8.66023L14.0705 16.296C12.899 17.4676 10.9995 17.4676 9.8279 16.296L7.24211 13.7102C6.85159 13.3197 6.85159 12.6865 7.24211 12.296C7.63264 11.9055 8.2658 11.9055 8.65633 12.296L11.2421 14.8818C11.6326 15.2723 12.2658 15.2723 12.6563 14.8818L20.2921 7.24602C20.6826 6.85549 21.3158 6.85549 21.7063 7.24602Z"
            fill="#6F767E"
          />
        </svg>
      </span>
      <Button variant="secondary" size="lg" onClick={handleNext}>
        Update
      </Button>
    </section>
  );
};

export default Footer;
