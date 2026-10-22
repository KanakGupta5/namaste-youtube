import { useEffect, useRef, useState } from "react";
import { YOUTUBE_VIDEO_API, OFFSET_YOUTUBE_VIDEO_API_CALLS } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import VideoContainerShimmer from "./VideoContainerShimmer";

const VideoContainer = () => {
    const [videoData, setVideoData] = useState([]);
    const [isVideoDataLoading, setIsVideoDataLoading] = useState(true);
    const apiCallsCount = useRef(0);
    const nextPageToken = useRef(null);
    const isFetching = useRef(false);
    let targetElement = useRef(null);
    useEffect( () => {
        fetchData();
            const options = {
            threshold: 0
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting && apiCallsCount.current < OFFSET_YOUTUBE_VIDEO_API_CALLS)
                    fetchData(); 
                else if(apiCallsCount.current >= OFFSET_YOUTUBE_VIDEO_API_CALLS)
                    console.log("Limit of inifinte scroll reached");
            })
        }, options);

        targetElement.current = document.getElementById("target-element");
        
        if(targetElement?.current){
            observer.observe(targetElement?.current);
        }

        return () => {
            observer.disconnect();
        }
    }, [])

    

    async function fetchData(){
        if(isFetching.current)
            return;
        
        try {
            isFetching.current = true;
            setIsVideoDataLoading(true);
            const response = nextPageToken && nextPageToken.current ? await fetch(YOUTUBE_VIDEO_API + "&pageToken=" + nextPageToken.current) : await fetch(YOUTUBE_VIDEO_API);
            const data = await response.json();
            if(data?.error)
                throw new Error(data?.error || "Error in fetchData()");
            setVideoData(prevData => [...prevData, ...data?.items]);
            nextPageToken.current = data?.nextPageToken;
            apiCallsCount.current = apiCallsCount.current + 1;
            setIsVideoDataLoading(false);            
        }
        catch(error){
            console.warn(error?.message || error);            
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