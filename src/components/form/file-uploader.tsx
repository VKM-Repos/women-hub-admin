import { UploadIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from 'react-dropzone';

interface FileUploaderProps {
  // Define props here if any
}

interface FileState extends File {
  preview: string;
}

const FileUploader: React.FC<FileUploaderProps> = () => {
  const [files, setFiles] = useState<FileState[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      const mappedFiles = acceptedFiles.map(file => ({
        ...file,
        preview: URL.createObjectURL(file),
      }));
      setFiles(mappedFiles);
    },
  });

  const removeFile = (file: FileState) => {
    const newFiles = files.filter(f => f !== file);
    setFiles(newFiles);
    URL.revokeObjectURL(file.preview);
  };

  const thumbs = files.map(file => (
    <div
      className="relative inline-flex w-full items-center justify-between"
      key={file.name}
    >
      <div className="aspect-square w-[5rem] border p-2">
        <img
          src={file.preview}
          className="block h-auto w-full"
          alt="Preview"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
      <button className="" onClick={() => removeFile(file)}>
        <X />
      </button>
    </div>
  ));

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <section className="">
      <div
        {...getRootProps({
          className:
            'dropzone bg-background w-full min-h-[10rem] cursor-pointer flex items-center p-4 rounded-lg text-center',
        } as DropzoneRootProps)}
      >
        <input {...(getInputProps() as DropzoneInputProps)} />
        <span className="mx-auto flex w-fit items-center gap-2 rounded-lg bg-white p-4 shadow-md">
          <UploadIcon />
          <p className="font-bold">Click, or drop files</p>
        </span>
      </div>
      <aside className="mt-4">
        {thumbs.length > 0 && <div className="flex flex-wrap">{thumbs}</div>}
      </aside>
    </section>
  );
};

export default FileUploader;
