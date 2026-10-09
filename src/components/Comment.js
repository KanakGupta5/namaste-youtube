import CommentCard from "./CommentCard";

const Comment = ({data}) => {
    
    return <>
    {data.map(comment => <>
        <CommentCard className="px-2" data={comment}/>
        {/* {showReplies && comment?.replies?.comments && 
            <Comment className="px-4" data={comment?.replies?.comments}/>} */}
    </>
    )}
    </>
}

export default Comment;