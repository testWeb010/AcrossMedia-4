import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

/**
 * @route   GET /api/youtube/video/:videoId
 * @desc    Get processed data for a single YouTube video
 * @access  Public
 */
router.get('/video/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    // 1. Check if the API key is configured on the server
    if (!YOUTUBE_API_KEY) {
      console.error('YOUTUBE_API_KEY not found in .env file');
      return res.status(500).json({ message: 'Server configuration error: YouTube API key not configured.' });
    }

    // 2. Fetch data from the YouTube v3 API
    const api_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
    
    const response = await fetch(api_url);

    // Handle non-successful responses from the YouTube API
    if (!response.ok) {
        const errorData = await response.json();
        console.error('YouTube API Error:', errorData.error.message);
        throw new Error(`Failed to fetch from YouTube API: ${response.statusText}`);
    }

    const data = await response.json();
    
    // 3. Check if the video was found
    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ message: 'Video not found.' });
    }

    const video = data.items[0];
    const { snippet, statistics, contentDetails } = video;

    // 4. Helper function to format ISO 8601 duration into a readable M:SS or H:MM:SS format
    const formatDuration = (duration) => {
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (!match) return '0:00';
      
      const hours = parseInt(match[1] || '0');
      const minutes = parseInt(match[2] || '0');
      const seconds = parseInt(match[3] || '0');
      
      if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    // 5. Construct the final data object to send to the client
    const videoData = {
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default?.url,
      publishedAt: snippet.publishedAt,
      channelTitle: snippet.channelTitle,
      duration: formatDuration(contentDetails.duration),
      
      // --- THE KEY CHANGE ---
      // We send the raw, unformatted view count.
      // The frontend will be responsible for formatting this into "K" or "M".
      views: statistics.viewCount || '0', 
    };

    // 6. Send the clean, processed data as a JSON response
    res.json(videoData);

  } catch (error) {
    // Generic error handler for any other issues
    console.error('Error in /video/:videoId route:', error);
    res.status(500).json({ message: 'Failed to fetch video data due to a server error.' });
  }
});

export default router;