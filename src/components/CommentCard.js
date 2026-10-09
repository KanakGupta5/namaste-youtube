
import { getRelativeTime } from "../utils/utilityFunctions";
import arrowdownIcon from "../assets/images/arrow-down.png";
import likeIcon from "../assets/images/like.png";
import rightarrowIcon from "../assets/images/arrow.png";
import { useState } from "react";

const CommentCard = ({ data }) => {
    const [showReplies, setShowReplies] = useState(false);

    const displayText =
        data?.snippet?.topLevelComment?.snippet?.textDisplay ||
        data?.snippet?.textDisplay || "";

    const name =
        data?.snippet?.topLevelComment?.snippet?.authorDisplayName ||
        data?.snippet?.authorDisplayName || "";

    const timestamp =
        data?.snippet?.topLevelComment?.snippet?.publishedAt ||
        data?.snippet?.publishedAt || "";

    const likeCount =
        data?.snippet?.topLevelComment?.snippet?.likeCount ??
        data?.snippet?.likeCount ?? 0;

    const replyCount = data?.snippet?.totalReplyCount || 0;

    const profileIcon =
        data?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl ||
        data?.snippet?.authorProfileImageUrl || null;

    const replies = data?.replies?.comments || [];

    return (
        <div className="flex gap-2 py-2">
            {/* Profile section */}
            <div className="flex flex-col items-center gap-y-2">
                {profileIcon && (
                    <img
                        className="w-8 h-8 rounded-full"
                        src={profileIcon}
                        alt=""
                    />
                )}

                {replyCount > 0 && (
                    <img
                        className="w-5"
                        src={rightarrowIcon}
                        alt=""
                    />
                )}
            </div>

            {/* Comment content */}
            <div className="flex flex-col">
                <div className="flex items-center gap-x-2 text-xs">
                    <h4>{name}</h4>
                    {timestamp && (
                        <span className="text-gray-600">
                            {getRelativeTime(timestamp)}
                        </span>
                    )}
                </div>

                <p className="text-sm">{displayText}</p>

                {/* Comment actions */}
                <div className="flex items-center gap-x-2 text-xs">
                    <img className="w-3" src={likeIcon} alt="" />
                    {likeCount > 0 && <span>{likeCount}</span>}
                    <button className="text-gray-600">Reply</button>
                </div>

                {/* Replies button */}
                {replyCount > 0 ? 
                    (showReplies ? 
                        replies.map(reply => <CommentCard data={reply}/>)
                        : (
                        <button onClick={() => setShowReplies(prev => !prev)} className="flex items-center self-start gap-x-1 rounded-lg px-2 py-1 text-sm hover:bg-gray-200">
                            {replyCount} {replyCount === 1 ? "reply" : "replies"}
                            <img
                                className="w-5"
                                src={arrowdownIcon}
                                alt=""
                            />
                        </button>))
                    : <></>
                }
            </div>
        </div>
    );
};

export default CommentCard;