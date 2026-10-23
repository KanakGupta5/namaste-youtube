import { useEffect, useState } from "react";
import buttonListData from "../mockData/buttonListData.json"
import Button from "./Button";
import {YOUTUBE_CATEGORY_API} from "../utils/constants";

const ButtonList = () => {
    const [buttonListData, setButtonListData] = useState([]);
    useEffect(() => {
        fetchButtonListData()
    }, []);

    const fetchButtonListData = async () => {
        try {
            const response = await fetch(YOUTUBE_CATEGORY_API)
            const data = await response.json();
            if(data?.error)
                throw new Error(data?.error || "Error in fetchButtonListData()");
            setButtonListData(data?.items || []);
        }
        catch(error){
            console.warn(error?.message || error);
        }
    }

    return (
        <>
            <div className="flex gap-x-2 overflow-x-scroll">
                {buttonListData.length > 0 && buttonListData.map(btn => <Button key={btn?.id} data={btn} />)}
            </div>
        </>
    )
}

export default ButtonList;