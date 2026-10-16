import SearchIcon from "../assets/images/search-icon.png"
import { Link } from "react-router-dom";

const getShortTitle = (title) => {
    return title.split(/[\p{Emoji}\p{Symbol}]|#/u)[0].trim();
};

const Suggestion = ({data}) => {
    return<div className="flex flex-col w-1/3 absolute bg-white border-black left-96 px-4 py-2 rounded-lg gap-y-1 text-sm">
        {data.map(suggestionEle => 
            <Link key={suggestionEle?.id} to={"/watch?v=" +suggestionEle?.id} onMouseDown={(e) => e.preventDefault()}>
                <div className="flex px-2 py-1 hover:bg-slate-200 hover:rounded-lg">
                    <div className="pr-3"><img className="w-5 inline" src={SearchIcon}/></div>
                    {getShortTitle(suggestionEle?.title)}
                </div>
             </Link>
            )}
    </div>
}

export default Suggestion;