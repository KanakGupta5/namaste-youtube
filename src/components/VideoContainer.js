import { useEffect, useRef, useState } from "react";
import { YOUTUBE_VIDEO_API, OFFSET_YOUTUBE_VIDEO_API_CALLS } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import VideoContainerShimmer from "./VideoContainerShimmer";
import { useSelector } from "react-redux";

const VideoContainer = () => {
    const [videoData, setVideoData] = useState([]);
    const [isVideoDataLoading, setIsVideoDataLoading] = useState(true);
    const apiCallsCount = useRef(0);
    const nextPageToken = useRef(null);
    const isFetching = useRef(false);
    let targetElement = useRef(null);
    const videoCategoryId = useSelector(store => store.app.videoCategoryId);

    useEffect(() => {
        setVideoData([]);
        apiCallsCount.current = 0;
        nextPageToken.current = null;
        isFetching.current = false;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting && apiCallsCount.current < OFFSET_YOUTUBE_VIDEO_API_CALLS)
                    fetchData(); 
                else if(apiCallsCount.current >= OFFSET_YOUTUBE_VIDEO_API_CALLS)
                    console.log("Limit of inifinte scroll reached");
            })
        });

        targetElement.current = document.getElementById("target-element");
        
        if(targetElement?.current){
            observer.observe(targetElement?.current);
        }

        return () => {
            observer.disconnect();
        }
    }, [videoCategoryId]);

    useEffect( () => {
        fetchData();
    }, [])    

    async function fetchData(){
        if(isFetching.current)
            return;
        
        try {
            isFetching.current = true;
            setIsVideoDataLoading(true);
            const url = videoCategoryId != null ? YOUTUBE_VIDEO_API + "&videoCategoryId=" + videoCategoryId : YOUTUBE_VIDEO_API;
            const response = nextPageToken && nextPageToken.current ? await fetch(url + "&pageToken=" + nextPageToken.current) : await fetch(url);
            const data = await response.json();
            if(data?.error)
                throw new Error(data?.error?.message || "Error in fetchData()");
            setVideoData(prevData => [...prevData, ...data?.items]);
            nextPageToken.current = data?.nextPageToken;
            apiCallsCount.current = apiCallsCount.current + 1;
            setIsVideoDataLoading(false);     
        }
        catch(error){
            console.warn(error);          
        }
        finally{
            isFetching.current = false;
            setIsVideoDataLoading(false);
        }
    }

    
    return(<>
    <div className="grid grid-cols-4 flex-wrap gap-2 ">
        {videoData.length > 0 && videoData.map(videoEle => <Link key={videoEle?.id} to={"/watch?v=" + videoEle?.id}><VideoCard data={videoEle}/></Link>)}
        {isVideoDataLoading && <VideoContainerShimmer/>}        
        <div className="h-1" id="target-element"></div>
    </div>
    </>)
}

export default VideoContainer;