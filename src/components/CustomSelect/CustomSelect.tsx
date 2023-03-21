import React, { Dispatch, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";


type DataProps = {
    optionText: string;
    optionImage: string; 
}

type SelectProps = {
    defaultText: string;
    data: DataProps[];
    handleOptionClick: any;  // setState type SetStateAction<undefined>
    selectedOptions: DataProps[];
    handleOptionDelete: Dispatch<SetStateAction<string>>; // setState type SetStateAction<undefined>
    showIcon: boolean;
}


const CustomSelect = (props: SelectProps) => {
    const {
        defaultText,
        data,
        selectedOptions,
        handleOptionClick,
        handleOptionDelete,
        showIcon
    } = props;

    const [ dropdownToggle, setDropdownToggle ] = React.useState(false);
    const [closeBtn, setCloseBtn ] = React.useState(false);
    const [specificItem, setSpecificItem ] = React.useState<number>();
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // hide dropdown when outside is clicked
        const hideDropdownOnOutsideClick = (e: any) => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLDivElement)){
                setDropdownToggle(false);
                console.log(dropdownRef);
            }
        };
        
        document.body.addEventListener('click', hideDropdownOnOutsideClick)

        return() => {
            document.body.removeEventListener('click', hideDropdownOnOutsideClick)
        }
    }, []);

    
    // when an option is clicked/selected
    const handleClick = (text: string, image: string) => {
        handleOptionClick(text, image);
        setDropdownToggle(false);
    }
    // shows 'close(x)' when mouse hovers over item
    const handleCloseBtn = (val: boolean, id: number) => {
        setCloseBtn(val)
        setSpecificItem(id)
    }

    return(
        <div>
            <div className='w-full'>
                <div 
                    onClick={() => setDropdownToggle((prev: boolean) => !prev)}
                    ref={dropdownRef}
                    className="flex justify-between relative z-[50px] w-full rounded-xl bg-[#F9FAFB] px-[30px] py-[15px] tracking-wide border-[0.5px] border-solid border-[#E4DFDF] text-[#191919] text-xs hover:cursor-pointer">
                    <span className='text-[#807A7A]'>{defaultText}</span>
                    {showIcon && <>{!dropdownToggle ? <TfiAngleDown className='text-[#191919]' /> : <TfiAngleUp className='text-[#191919]' />}</>
                    }
                </div>
                {dropdownToggle && 
                    <div className="relative">
                        <div className="w-[90%] h-[45vh] overflow-y-auto absolute z-10 left-[5%] grid pt-[7px] pb-[5px] bg-white text-[#807A7A] rounded-b-md shadow-lg">
                            {data.map((item: DataProps, id: any) => (
                                <div key={id} className="flex  gap-x-[15px] px-[30px] py-[7px] hover:bg-gray-100 hover:cursor-pointer text-sm" onClick={() => handleClick(item.optionImage, item.optionText)}>
                                    <img src={item.optionImage} className="h-[20px] w-[20px]" />
                                    <span>{item.optionText}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
           {selectedOptions?.length > 0 &&
            <div className='flex gap-x-[10px] gap-y-1 flex-wrap w-full mt-[7px]'>
                {selectedOptions?.map((item: DataProps, id) => ( 
                    <div key={id} 
                        className="relative flex items-center" 
                        onMouseOver={() => handleCloseBtn(true, id)} 
                        onMouseOut={() => setCloseBtn(false)}>
                            <div  className='flex gap-x-[5px] px-3 items-center py-2 rounded-xl border-[1px] border-gray-200 border-solid'>
                                <img src={item.optionImage} className="h-[20px] w-[20px]" />
                                <span className="text-xs">{item.optionText}</span>
                            </div>
                            <div className={`absolute ${specificItem === id && closeBtn ? 'right-0': '-right-[999999px]'} rounded-r-xl bg-white/[0.80] p-2.5 text-gray-500`}
                                onClick={() => handleOptionDelete(item.optionText)}><FaTimes /></div>
                    </div>
                ))}
            </div>
             } 
        </div>
    )
}

export default CustomSelect;