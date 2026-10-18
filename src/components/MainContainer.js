import { useEffect } from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineStatus } from "../utils/appDataSlice";
import Offline from "./Offline";


const MainContainer = () => {
    const dispatch = useDispatch();
    const isOnline = useSelector((store) => store.app.isOnline);
    useEffect(() => {
        const handleOnline = () => {
            dispatch(setOnlineStatus(true));
        };

        const handleOffline = () => {
            dispatch(setOnlineStatus(false));
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [])
    return <>
        <div className="flex flex-col flex-1 min-w-0 gap-3">
            {isOnline 
                ? <>
                    <ButtonList />
                    <VideoContainer />
                </>
            : <Offline/>}
        </div>
    </>
}
export default MainContainer;