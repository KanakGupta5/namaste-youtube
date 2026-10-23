import {setVideoCategoryId} from "../utils/appDataSlice";
import { useDispatch } from "react-redux";

const Button = ({data}) => {
    const {title} = data?.snippet;
    const id = data?.id;
    const dispatch = useDispatch();
    return (
    <>
        <button className="bg-gray-100 px-2.5 py-1 rounded-xl text-nowrap shrink-0" onClick={() => {
            const obj = {
                videoCategoryId: id
            }
            return dispatch(setVideoCategoryId(obj));
        }}>{title}</button>
    </>
    )
}

export default Button;