import { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/constants";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
    const [videoData, setVideoData] = useState([]);
    useEffect( () => {
        fetchData();        
    }, [])

    async function fetchData(){
        const response = await fetch(YOUTUBE_VIDEO_API);
        const data = await response.json();
        setVideoData(data?.items);
    }

    return(<>
    <div className="grid grid-cols-4 flex-wrap gap-2 ">
        {videoData.length >0  && videoData.map(videoEle => <VideoCard key={videoEle?.id} data={videoEle}/>)}
    </div>
    </>)
}

export default VideoContainer;