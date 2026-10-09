
import VideoCard from "./VideoCard"
import { Link } from "react-router-dom"

const RecommendedVideo = ({ data }) => {
    
    return <>
            {data.length > 0 && data.map(videoEle =>
                <Link key={videoEle?.id?.videoId} to={"/watch?v=" + videoEle?.id?.videoId}><VideoCard data={videoEle} /></Link>
            )}
    </>
}

export default RecommendedVideo;