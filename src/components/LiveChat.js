import LiveChatMessage from "./LiveChatMessage";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addMessages } from "../utils/liveChatSlice";
import userIcon from "../assets/images/user.png"

const LiveChat = () => {
    const liveMessages = useSelector(store => store?.livechat?.messages);
    const [userMessage, setUserMessage] = useState("");
    const dispatch = useDispatch();
    return <div className="h-[550px] border rounded-lg">
        <div className="h-[500px] overflow-y-auto">
            
            {liveMessages.map((message) => (
                <LiveChatMessage
                    key={message?.id}
                    data={message}
                />
            ))}
        </div>
        <form className="w-full flex px-1.5 py-2 gap-x-2" onSubmit={(e) => e.preventDefault()}>
            <input className="grow border border-gray-300 rounded-lg px-2 py-0.5" type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)}></input>
            <button className="w-1/6 text-sm bg-slate-300 rounded-lg px-2 py-0.5" 
            onClick={() => {
                const obj = {
                        id: crypto.randomUUID(),
                        profileImageUrl: userIcon,
                        displayMessage: userMessage,
                        displayName: "@Kanak"
                    }
                dispatch(addMessages(obj));
            }}>
            Send</button>
        </form>
    </div>

}

export default LiveChat;