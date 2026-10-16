const LiveChatMessage = ({data}) => {
    const {profileImageUrl, displayName, displayMessage} = data;
    return <div className="flex flex-col">
        <div className="flex items-start gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
            <img
                className="w-7 h-7 rounded-full object-cover shrink-0"
                src={profileImageUrl}
                alt=""
            />

            <p className="min-w-0 text-xs leading-5 break-words">
                <span className="font-medium text-gray-700 mr-2">
                    {displayName}
                </span>
                <span className="text-black">
                    {displayMessage}
                </span>
            </p>
        </div>
    </div>
}

export default LiveChatMessage;