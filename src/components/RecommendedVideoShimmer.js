import { SHIMMER_COMPONENTS_LENGTH } from "../utils/constants";

const RecommendedVideoShimmer = () => {
    
    return <div className="flex flex-col gap-y-6"> 
        {Array.from({ length: SHIMMER_COMPONENTS_LENGTH }).map((_, index) => (
            <div className="flex flex-col gap-y-2">
                <div className="bg-gray-300 h-44 w-full rounded-lg"></div>
                <p className="bg-gray-300 h-5 w-full rounded-lg"></p>
                <p className="bg-gray-300 h-5 w-2/3 rounded-lg"></p>
            </div>
        ))}
    </div>
}

export default RecommendedVideoShimmer;