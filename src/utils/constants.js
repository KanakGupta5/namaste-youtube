const YOUTUBE_API_KEY = 'AIzaSyDp9ncvCldQOLT5BJwy4FIsdrkM-LAE7U0'; //you place this in .env file
export const YOUTUBE_VIDEO_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + YOUTUBE_API_KEY;
