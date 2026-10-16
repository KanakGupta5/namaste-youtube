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
        const response = await fetch(YOUTUBE_CATEGORY_API)
        const data = await response.json();
        console.log("button list data",data);
        setButtonListData(data?.items || []);
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