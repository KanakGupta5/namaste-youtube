import youtube from "../assets/images/youtube.png"
import searchIcon from "../assets/images/search-icon.png"
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appDataSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import Suggestion from "./Suggestion";
import { putInCache } from "../utils/searchSlice";

const Header = () => {
    const dispatch = useDispatch();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionList, setSuggestionList] = useState([]);
    const [searchedString, setSearchedString] = useState("");
    const cacheResults = useSelector((store) => store.search);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSuggestions()
        }, 500)

        //DEBOUNCING 
        return () => {
            clearTimeout(timer);
        }
    }, [searchedString])

    const handleToggleMenu = () => {
        dispatch(toggleMenu())
    } 

    const fetchSuggestions = async () => {
        if(searchedString == ""){
            setSuggestionList([]);
            setShowSuggestions(false);
            return;
        }

        if(cacheResults[searchedString.toUpperCase()]){
            setSuggestionList(cacheResults[searchedString.toUpperCase()]);
            return;
        } 
            
        try {
            const response = await fetch(YOUTUBE_SEARCH_API + "&q=" + encodeURIComponent(searchedString));
            const data = await response.json();
            if(data?.error)
                throw new Error(data?.error || "Error in fetchSuggestions()");
            const rawSuggestionResponse = data?.items || [];
            const filteredSuggestions = filterRelevantSuggestion(rawSuggestionResponse, searchedString);
            setSuggestionList(filteredSuggestions);
            const cacheObj = {
                [searchedString.toUpperCase()] : filteredSuggestions
            }
            dispatch(putInCache(cacheObj));
        }
        catch(error){
            console.warn(error?.message || error);
        }
    }

    const filterRelevantSuggestion = (rawSuggestionResponse, searchedString) => {
        const suggestions = rawSuggestionResponse.filter(suggestionEle => suggestionEle?.snippet?.title.toLowerCase().startsWith(searchedString.toLowerCase())).map(
            filteredSuggestionEle => {
                const obj = {
                    title: filteredSuggestionEle?.snippet?.title,
                    id: filteredSuggestionEle?.id?.videoId
                }
                return obj;
            });
        const uniqueSuggestions = [...new Set(suggestions)];
        return uniqueSuggestions;
    }

    return <>
        <div className="flex justify-between px-3 py-1 sticky top-0 bg-white">
            <div className="flex w-1/12 justify-between">
                <div className="flex justify-center items-center cursor-pointer p-3 hover:border hover:bg-gray-200 hover:rounded-full" 
                     onClick={() => handleToggleMenu()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                <img className="w-20 cursor-pointer" alt="icon" src={youtube}></img>
            </div>
            <div className="flex py-1.5 w-9/12 justify-center">
                <input value={searchedString} onBlur={() => setShowSuggestions(false)} onFocus={() => setShowSuggestions(true)} onInput={(e) => setSearchedString(e.target.value)} className=" px-3 border w-1/2 rounded-l-full" type="text"></input>
                <div className="flex justify-center items-center border rounded-r-full px-4 bg-slate-50 cursor-pointer hover:bg-gray-200">
                    <img className="w-6" alt="search-icon" src={searchIcon}></img>
                </div>
                <div className="flex ml-3 first-line:justify-center border p-2 items-center rounded-full cursor-pointer bg-slate-50 hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                    </svg>
                </div>
            </div>
            <div className="flex w-2/12 items-center justify-evenly">
                <div className="flex border bg-slate-50 rounded-full px-2 py-1 cursor-pointer hover:bg-gray-200">
                    <div className="flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg>

                    </div>
                    <button className="text-sm font-medium">Create</button>
                </div>
                <div className="cursor-pointer hover:bg-gray-200 hover:rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                </div>
                <div className="cursor-pointer">
                    <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
            </div>
        </div>
        {showSuggestions && suggestionList.length > 0 && <Suggestion data={suggestionList}/>}
    </>
}
export default Header;