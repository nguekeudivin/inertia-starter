import { useDisplay } from '@/hooks/use-interact';
import { X } from 'lucide-react';

interface Props {
    children: React.ReactNode;
    name: string;
    title: string;
}

export const Modal = ({ name, children, title }: Props) => {
    const toggleModal = () => display.toggle(name);
    const display = useDisplay();

    if (display.visible[name]) {
        return (
            <div
                className="fixed top-0 right-0 left-0 z-50 flex h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50"
                onClick={toggleModal}
            >
                <div className="relative w-full max-w-md rounded-lg bg-white shadow-sm" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 px-6 py-4">
                        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                        <button
                            type="button"
                            onClick={toggleModal}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6">{children}</div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};
