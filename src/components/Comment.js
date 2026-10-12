import CommentCard from "./CommentCard";

const Comment = ({data}) => {
    
    return <>
    {data.map((comment, index) => <div key={index}>
        {console.log(data)}
        <CommentCard className="px-2" data={comment}/>
        </div>
    )}
    </>
}

export default Comment;