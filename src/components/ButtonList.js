import buttonListData from "../mockData/buttonListData.json"
import Button from "./Button";

const ButtonList = () => {
    return (
        <>
            <div className="flex gap-x-2 overflow-x-scroll">
                {buttonListData.map((btn, index) => <Button key={index} data={btn} />)}
            </div>
        </>
    )
}

export default ButtonList;