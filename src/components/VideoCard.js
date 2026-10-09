import {getRelativeTime} from "../utils/utilityFunctions"

const VideoCard = ({ data }) => {
    const { snippet, statistics } = data;
    const { title, channelTitle, publishedAt, thumbnails } = snippet;
    const  viewCount  = (statistics && statistics?.viewCount) || "";

    const getLabelForCount = (num) => {
        if (num == "" || num.length <= 3)
            return num;
        else if (num.length <= 5)
            return (parseInt(num) / 1000).toFixed(1) + " K";
        else if (num.length <= 7)
            return (parseInt(num) / 100000).toFixed(1) + " lakh";
        else
            return (parseInt(num) / 1000000).toFixed(1) + " M";
    }

    return <>
        <div className="flex flex-col p-2 rounded-xl hover:bg-pink-100 hover:cursor-pointer">
            <img className="rounded-lg" src={thumbnails?.medium?.url}></img>
            <div className="flex">
                <h4 className="font-medium line-clamp-2">{title}</h4>
            </div>
            <p className="text-sm text-gray-400 line-clamp-1">
                {channelTitle} {" "} {getLabelForCount(viewCount)} {" "} {getRelativeTime(publishedAt)}
            </p>
        </div>
    </>
}

export default VideoCard;