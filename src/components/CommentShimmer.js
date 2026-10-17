import {SHIMMER_COMPONENTS_LENGTH} from "../utils/constants"

const CommentShimmer = () => {
    return <div className="flex flex-col gap-y-4 px-3">
        {Array.from({length: SHIMMER_COMPONENTS_LENGTH}).map((_, index) => 
            <div className="flex gap-2">
                <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
                <div className="flex flex-col h-16 w-11/12 gap-y-1.5">
                    <p className="bg-gray-300 h-5 w-1/6 rounded-lg"></p>
                    <p className="bg-gray-300 h-5 w-full rounded-lg"></p>
                    <p className="bg-gray-300 h-5 w-1/3 rounded-lg"></p>
                    <p className="bg-gray-300 h-5 w-1/4 rounded-lg"></p>
                </div>
            </div>
         )} 
    </div>
}

export default CommentShimmer;