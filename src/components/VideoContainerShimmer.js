import { SHIMMER_COMPONENTS_LENGTH } from "../utils/constants";

const VideoContainerShimmer = () => {
    return <> {Array.from({ length: SHIMMER_COMPONENTS_LENGTH }).map((_, index) => (
        <div key={index} className="flex flex-col p-1 gap-y-1">
            <div className="bg-gray-300 h-44 rounded-lg"></div>
            <div className="bg-gray-200 h-6 rounded-lg"></div>
            <div className="bg-gray-200 h-3 rounded-lg"></div>
        </div>
    ))}
    </>
}

export default VideoContainerShimmer;