import dotsIcon from "../assets/images/dots.png"

const VideoCard = ({ data }) => {
    const { snippet, statistics } = data;
    const { title, channelTitle, publishedAt, thumbnails } = snippet;
    const { viewCount } = statistics;

    const getLabelForCount = (num) => {
        if (num.length <= 3)
            return num;
        else if (num.length <= 5)
            return (parseInt(num) / 1000).toFixed(1) + " K";
        else if (num.length <= 7)
            return (parseInt(num) / 100000).toFixed(1) + " lakh";
        else
            return (parseInt(num) / 1000000).toFixed(1) + " M";
    }


    function getRelativeTime(pastDateStr) {
        const past = new Date(pastDateStr);
        const now = new Date();
        const msPerDay = 1000 * 60 * 60 * 24;

        const daysAgo = Math.floor((past - now) / msPerDay);

        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        if (Math.abs(daysAgo) > 30) {
            const monthsAgo = (past.getFullYear() - now.getFullYear()) * 12 + (past.getMonth() - now.getMonth());
            return rtf.format(monthsAgo, 'month');
        }

        return rtf.format(daysAgo, 'day');
    }


    return <>
        <div className="flex flex-col p-2 rounded-xl hover:bg-pink-100 hover:cursor-pointer">
            <img className="rounded-lg" src={thumbnails?.medium?.url}></img>
            <div className="flex">
                <h4 className="font-medium line-clamp-2">{title}</h4>
                {/* <img className="w-8 h-4" src={dotsIcon}></img> */}
            </div>
            <p className="text-sm text-gray-400 line-clamp-1">
                {channelTitle} {" "} {getLabelForCount(viewCount)} {" "} {getRelativeTime(publishedAt)}
            </p>
        </div>
    </>
}

export default VideoCard;