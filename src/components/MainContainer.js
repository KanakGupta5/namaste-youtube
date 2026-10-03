import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
    return <>
        <div className="flex flex-col flex-1 min-w-0 gap-3">
            <ButtonList />
            <VideoContainer />
        </div>
    </>
}
export default MainContainer;