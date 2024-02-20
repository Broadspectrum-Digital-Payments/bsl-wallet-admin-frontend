import React, { ChangeEvent, DragEvent, useState } from 'react';
import Image from "next/image";

interface IDragAndDropProps {
    filesUploaded: (files: FileList) => void;
}

const DragAndDrop: React.FC<IDragAndDropProps> = ({ filesUploaded }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const validateFile = (file: File): boolean => {
        const allowedTypes = ['text/csv'];
        const maxSize = 5 * 1024 * 1024; // 5MB

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
                    <Image src="/assets/icons/file-upload" alt="file upload" width={12} height={12}/>
                    <div className="mt-3 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white"
                        >
              <span>
                Drag & Drop or{' '}
                  <span className="font-semibold text-purple-900">Choose file</span> to upload
              </span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={setUploadedFile}
                            />
                        </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                        Max file size: <span className="font-semibold">5mb</span>. Supports: csv.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DragAndDrop;
