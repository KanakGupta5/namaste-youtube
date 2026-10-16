import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appDataSlice";
import { useSearchParams } from "react-router-dom";
import RecommendedVideo from "./RecommendedVideo";
import Comment from "./Comment";
import { YOUTUBE_RECOMMENDATION_API, YOUTUBE_GET_METADATA_OF_VIDEO, YOUTUBE_GET_COMMENTS, YOUTUBE_IS_LIVE_CHAT_ENABLED, YOUTUBE_LIVE_CHAT } from "../utils/constants"
import LiveChat from "./LiveChat";
import { addMessages } from "../utils/liveChatSlice";
// import mockCommentData from "../mockData/nestedCommentData.json"

const WatchPage = () => {
    const dispatch = useDispatch();
    const [videoId] = useSearchParams();
    const [recommendedVideos, setRecommendedVideos] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [isLiveStream, setIsLiveStream] = useState(false);
    // const [liveChatMessages, setLiveChatMessages] = useState([]); will not use state variable to store live messages because we dont want to bloat our state variable, we will use redux

    useEffect(() => {
        dispatch(closeMenu());
    }, [])

    useEffect(() => {
        fetchData();
        // API POLLING
        const timer = setInterval(() => {
            fetchIsLiveChatEnabled();
        }, 3000)
        return () => {clearInterval(timer)}
    }, [videoId.get("v")])

    const fetchIsLiveChatEnabled = async () => {
        try {
            const response = await fetch(YOUTUBE_IS_LIVE_CHAT_ENABLED + "&id=" + videoId.get("v"));
            const data = await response.json();
            if(data.error)
                throw new Error("Error in fetchIsLiveChatEnabled()");
            setIsLiveStream(true);
            const chatId = data?.items && data.items.length > 0 && data.items[0]?.liveStreamingDetails?.activeLiveChatId ? data.items[0]?.liveStreamingDetails?.activeLiveChatId : null;
            if(chatId == null)
                return;
            await fetchLiveChat(chatId);
        }
        catch(error){
            console.warn(error);
        }
    }

    const fetchLiveChat = async (chatId) => {
        try {
            const response = await fetch(YOUTUBE_LIVE_CHAT + "&liveChatId=" + chatId);
            const data = await response.json();
            if(data?.error)
                throw new Error("Error in fetchLiveChat() with chatId", chatId);
            // setLiveChatMessages(data?.items || []);
            if(data?.items && data.items.length){
                data.items.map(message => {
                    const obj = {
                        id: message?.id,
                        profileImageUrl: message?.authorDetails?.profileImageUrl,
                        displayMessage: message?.snippet?.displayMessage,
                        displayName: message?.authorDetails?.displayName
                    }
                    return dispatch(addMessages(obj))
                })
            }
        }
        catch(error){
            console.warn(error);
        }
    }
    
    const fetchData = async () => {
        const videoTitle = await fetchMetadata();
        if (!videoTitle) return;
        await fetchRecommendedVideos(videoTitle);
        await fetchCommentData();
    };

    const fetchMetadata = async () => {
        const response = await fetch(YOUTUBE_GET_METADATA_OF_VIDEO + "&id=" + videoId.get("v"));
        const data = await response.json();
        return data?.items?.[0]?.snippet?.localized?.title;
    };

    const fetchRecommendedVideos = async (videoTitle) => {
        const encodedTitle = encodeURIComponent(videoTitle);
        const response = await fetch(YOUTUBE_RECOMMENDATION_API + "&q=" + encodedTitle);
        const data = await response.json();
        setRecommendedVideos(data?.items || []);
    };

    const fetchCommentData = async () => {
        try {
            const response = await fetch(YOUTUBE_GET_COMMENTS + "&videoId=" + videoId.get("v"));
            const data = await response.json();
            if (data.error) {
                throw new Error(data?.error?.message || "Failed to fetch comments. They are likely disabled");
            }            
            setCommentData(data?.items || []);
        }
        catch(error){
            console.warn(error);
        }
        
        
    }

    return <>
        <div className="px-3 py-1 flex gap-x-4">
            <div className="flex flex-col gap-y-2 w-10/12">
                <iframe className="rounded-lg" width="1100" height="550" src={"https://www.youtube.com/embed/" + videoId.get("v")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                {commentData.length > 0 ? 
                    <Comment data={commentData} /> 
                    : <>Failed to fetch comments. They are likely disabled</>
                    }
            </div>
            <div className="flex flex-col">
                {isLiveStream && <LiveChat/>}
                {recommendedVideos.length > 0 && <RecommendedVideo data={recommendedVideos} />}
            </div>
        </div>
    </>
}

export default WatchPage;