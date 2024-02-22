import React, {ChangeEvent, DragEvent, useState} from 'react';
import {PhotoIcon} from "@heroicons/react/24/solid";

interface IDragAndDropProps {
    filesUploaded: (files: FileList) => void;
    types?: string[];
    maximumFileSize?: number;
}

const DragAndDrop: React.FC<IDragAndDropProps> = ({ filesUploaded, types, maximumFileSize }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileIsUploaded, setFileIsUploaded] = useState(false);

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const validateFile = (file: File): boolean => {

        const allowedTypes = types ?? ['text/csv', 'image/png', 'image/jpg', 'image/jpeg'];

        const maxSize = maximumFileSize ? maximumFileSize * 1024 * 1024 : 5 * 1024 * 1024; // 5MB

        return allowedTypes.includes(file.type) && file.size <= maxSize;
    };

    const setUploadedFile = (event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        let files = null;

        if (event.type === 'change') {
            const inputEvent = event as ChangeEvent<HTMLInputElement>;
            files = inputEvent.target.files;
        } else if (event.type === 'drop') {
            const dropEvent = event as DragEvent<HTMLDivElement>;
            files = dropEvent.dataTransfer.files;
        }

        if (filesUploaded && files) {
            const validFiles = Array.from(files).filter(validateFile);
            const validFileList = new DataTransfer();
            validFiles.forEach(file => validFileList.items.add(file));
            filesUploaded(validFileList.files);


            setFileIsUploaded(true);
        }

        setIsDragging(false);
    };


    return (
        <div className="flex flex-col">
            <div
                className={`flex justify-center rounded-lg border border-dashed ${
                    isDragging ? 'border-purple-900' : 'border-gray-100'
                } border-2 px-6 py-5`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={setUploadedFile}
            >
                <div className="text-center">
                    {/*<Image src="/assets/icons/file-upload" alt="file upload" width={12} height={12}/>*/}
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                    <p>{fileIsUploaded ? 'File Uploaded' : ''}</p>
                    <div className="mt-3 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white"
                        >
              <span>
                Drag & Drop to Upload File
              </span>
                        </label>
                    </div>

              {/*      <label*/}
              {/*          htmlFor="file-upload"*/}
              {/*          className="relative cursor-pointer rounded-md bg-white"*/}
              {/*      >*/}
              {/*<span>*/}

              {/*</span>*/}
              {/*          <input*/}
              {/*              id="file-upload"*/}
              {/*              name="file-upload"*/}
              {/*              type="file"*/}
              {/*              className="my-4"*/}
              {/*              onChange={setUploadedFile}*/}
              {/*          />*/}
              {/*      </label>*/}

                    <p className="text-xs leading-5 text-gray-600">
                        Max file size: <span className="font-semibold">{maximumFileSize + ' mb' ?? '5mb'}</span>.
                        Supports: {types?.slice().map(type => type).join(', ')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DragAndDrop;