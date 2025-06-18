import { cn } from '@/lib/utils';
import { useState } from 'react';

import { createContext, useContext } from 'react';

interface DropdownContextType {
    open: boolean;
    setOpen: any;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

const useDropdown = (): DropdownContextType => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error('Cannot use dropdown outside context');
    }
    return context;
};

const Trigger = ({ children }: { children: React.ReactNode }) => {
    const { setOpen, open } = useDropdown();
    return (
        <div
            onClick={() => {
                setOpen(!open);
            }}
            className="cursor-pointer"
        >
            {children}
        </div>
    );
};

const Content = ({ children, className }: { children: any; className?: string }) => {
    const { open } = useDropdown();
    return (
        <ul
            id="dropdown"
            aria-labelledby="dropdownDefaultButton"
            className={cn(
                'absolute z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white py-2 shadow-sm',
                {
                    block: open,
                },
                className,
            )}
        >
            {children}
        </ul>
    );
};

const Item = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const { setOpen } = useDropdown();
    return (
        <li
            onClick={() => {
                setOpen(false);
            }}
            className={cn('dropdown-item block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100', className)}
        >
            {children}
        </li>
    );
};

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div className="relative">{children}</div>
        </DropdownContext.Provider>
    );
};

const Dropdown = {
    Root: DropdownMenu,
    Trigger: Trigger,
    Content: Content,
    Item: Item,
};

export default Dropdown;
