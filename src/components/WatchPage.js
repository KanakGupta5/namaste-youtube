import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appDataSlice";
import { useSearchParams } from "react-router-dom";
import RecommendedVideo from "./RecommendedVideo";
import Comment from "./Comment";
import { YOUTUBE_RECOMMENDATION_API, YOUTUBE_GET_METADATA_OF_VIDEO, YOUTUBE_GET_COMMENTS } from "../utils/constants"

const WatchPage = () => {
    const dispatch = useDispatch();
    const [videoId] = useSearchParams();
    const [recommendedVideos, setRecommendedVideos] = useState([]);
    const [commentData, setCommentData] = useState([]);

    useEffect(() => {
        dispatch(closeMenu());
    }, [])

    useEffect(() => {
        fetchData();
    }, [videoId.get("v")])

    
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
        const response = await fetch(YOUTUBE_GET_COMMENTS + "&videoId=" + videoId.get("v"));
        const data = await response.json();
        setCommentData(data?.items || []);
    }

    return <>
        <div className="px-3 py-1 flex">
            <div className="flex flex-col gap-y-2">
                <iframe className="rounded-lg" width="1100" height="550" src={"https://www.youtube.com/embed/" + videoId.get("v")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                {commentData.length > 0 && <Comment data={commentData}/>}
            </div>
            <div className="flex flex-col">
                {recommendedVideos.length > 0 && <RecommendedVideo data={recommendedVideos} />}
            </div>
        </div>
    </>
}

export default WatchPage;