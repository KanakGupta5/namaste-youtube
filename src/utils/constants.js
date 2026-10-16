const YOUTUBE_API_KEY = 'AIzaSyDp9ncvCldQOLT5BJwy4FIsdrkM-LAE7U0'; //you place this in .env file
export const YOUTUBE_VIDEO_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&&relevanceLanguage=hi&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_RECOMMENDATION_API = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&&videoEmbeddable=true&type=video&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_GET_METADATA_OF_VIDEO = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_GET_COMMENTS = "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=100&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_SEARCH_API = "https://www.googleapis.com/youtube/v3/search?part=snippet&&relevanceLanguage=en&maxResults=30&type=video&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_CATEGORY_API = "https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_IS_LIVE_CHAT_ENABLED = "https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_LIVE_CHAT = "https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet,authorDetails&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_FETCH_BY_VIDEO_CATEGORY_ID = "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=20&key=" + YOUTUBE_API_KEY;
export const OFFSET_LIVE_CHAT = 100;

// &videoCategoryId=20