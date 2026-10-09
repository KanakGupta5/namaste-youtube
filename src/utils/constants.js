const YOUTUBE_API_KEY = 'AIzaSyDp9ncvCldQOLT5BJwy4FIsdrkM-LAE7U0'; //you place this in .env file
export const YOUTUBE_VIDEO_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_RECOMMENDATION_API = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&regionCode=IN&videoEmbeddable=true&type=video&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_GET_METADATA_OF_VIDEO = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_GET_COMMENTS = "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=100&key=" + YOUTUBE_API_KEY;
