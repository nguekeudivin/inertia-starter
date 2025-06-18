import { useAway } from "@/hooks/use-away";
import { cn } from "@/lib/utils";
import {  useEffect, useRef, useState } from "react"

import { createContext,  useContext } from "react";

interface DropdownContextType {

  open: boolean;
  setOpen: any;
  onChange: any;
  onItemSelect: any;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

const useSelect = (): DropdownContextType => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Cannot use dropdown outside context");
  }
  return context;
};

const Trigger = ( {children}: { children: React.ReactNode}) => {
    const { setOpen, open} = useSelect();
    return  <div onClick={() => {
        setOpen(!open)
    }} className="cursor-pointer">
        {children}
    </div>
}

const Content = ({children, className}: {children: any, className?:string}) => {
    const {open} = useSelect();
    return <ul id="dropdown" aria-labelledby="dropdownDefaultButton" className={cn("py-2 z-10 absolute hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 " ,{
        block: open
    }, className)}>
        {children}
    </ul>
}

const Item = ({children, className, value}: {children: React.ReactNode, className?: string, value: any}) => {
    const { setOpen,  onChange, onItemSelect} = useSelect();
    return <li  onClick={() => {
        const option = {
            value: value,
            label: children
        }
        onChange(option);
        onItemSelect(option);
        setOpen(false);
    }} data-value={value} className={cn("item text-sm cursor-pointer text-gray-700  block px-4 py-2 hover:bg-gray-100", className)}>
        {children}
  </li>
}

const SelectMenu = ({children, onChange, defaultValue, onItemSelect}: {defaultValue: string, children: React.ReactNode, onChange: any, onItemSelect:any}) => {
    const [open,setOpen] = useState<boolean>(false);
    const elementRef = useRef<any>(false);

    useAway(elementRef, () => {
        setOpen(false);
    })

    useEffect(() => {
        const items = elementRef.current.querySelectorAll('.item');
        for( let i=0 ; i < items.length; i ++){
            const item = items[i];
            if(item.dataset.value == defaultValue){
                onChange({
                    value: defaultValue,
                    label: <div dangerouslySetInnerHTML={{ __html: item.innerHTML }} />
                })
            }
        }
    },[])

    return <DropdownContext.Provider value={{open, setOpen, onChange, onItemSelect}}>
         <div ref={elementRef} className="relative">
            {children}
        </div>
    </DropdownContext.Provider>
}

const  Select =  {
    Root: SelectMenu,
    Trigger: Trigger,
    Content: Content,
    Item: Item
}

export default Select;
