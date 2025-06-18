import { cn, generateRandomString } from '@/lib/utils';
import { ImageFile } from '@/types';
import { Images, X } from 'lucide-react';

export default function ImagesField({
    images,
    onImagesChange,
    id,
    error,
}: {
    images: ImageFile[];
    onImagesChange: (images: ImageFile[]) => void;
    id: string;
    error?: string;
}) {
    const upload = (event: any) => {
        const files = Array.from(event.target.files) as File[];
        // reach theme
        files.forEach((file: File) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
                onImagesChange([
                    ...images,
                    {
                        file: file,
                        src: e.target.result,
                        id: generateRandomString(),
                    },
                ]);
            };
        });
    };

    const hasError = error != undefined && error != '';

    return (
        <div>
            <label
                htmlFor={id}
                className={cn('mt-4 flex h-64 w-full flex-col items-center justify-center rounded-xl border bg-gray-100', {
                    'border-red-500': hasError,
                })}
            >
                <Images className="text-primary h-12 w-12" />
                <span className="mt-4 text-xl font-semibold">Drop or select file</span>
                <span className="text-muted-foreground mt-2">
                    Drop files here or click to
                    <span className="text-sky-600 underline">browser</span> through your machine
                </span>
            </label>
            {hasError && <small className="pl-1 text-red-500">{error}</small>}

            <input type="file" multiple={true} id={id} className="hidden" name={id} onChange={upload} />
            <div className="">
                {images.length != 0 && (
                    <ul className="mt-4 flex flex-wrap gap-4">
                        {images.map((item: ImageFile, index: number) => (
                            <li
                                key={`uploadedFile${index}`}
                                style={{ backgroundImage: `url(${item.src})` }}
                                className="relative flex h-36 w-36 items-center justify-between rounded-md border bg-cover px-4 py-2"
                            >
                                <button className="absolute top-2 right-2 rounded-full bg-gray-900/60 p-0.5 text-white transition-all duration-300 ease-in-out hover:bg-gray-900">
                                    <X className="h-4 w-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
