import { useSelector } from "react-redux";

const SidebarTile = ({ data }) => {
    const { heading, headingIcon, options } = data;
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
    return <>
        <div className={`flex flex-col px-2 py-2  ${isMenuOpen ? "border-black border-b-[1px]" : ""}`}>
            {isMenuOpen ?
                (<>
                    {heading && <h4 className="font-semibold my-3 px-2">{heading}</h4>}
                    <ul>
                        {options.length > 0 && options.map((opt, index) =>
                            <li key={index} className="px-2 py-2 flex cursor-pointer hover:bg-gray-200 rounded-lg">
                                <div className="w-1/4">
                                    <img className="w-6" src={opt?.icon} />
                                </div>
                                <p className="w-3/4 text-sm font-medium text-gray-700">{opt?.displayName}</p>
                            </li>
                        )}
                    </ul>
                </>)
                :
                (<>
                    <div className={`flex flex-col items-center ${heading ? "hover:bg-gray-200 rounded-lg" : ""}`}>
                        {heading ? (
                            <div>
                                {headingIcon && <div className="w-full flex justify-center">
                                    <img className="w-6" src={headingIcon}></img>
                                </div>}
                                {heading && <h4 className="text-xs">{heading}</h4>}
                            </div>
                        ) : (
                            <>
                                <ul className="flex flex-col ">
                                    {options.length > 0 && options.map((opt, index) =>
                                        <li key={index} className="py-2 flex flex-col items-center cursor-pointer hover:bg-gray-200 rounded-lg">
                                            <div >
                                                <img className="w-6" src={opt?.icon} />
                                            </div>
                                            <p className="text-xs font-medium text-gray-700">{opt?.displayName}</p>
                                        </li>
                                    )}
                                </ul>
                            </>
                        )}
                    </div>

                </>)
            }

        </div>
    </>
}

export default SidebarTile;