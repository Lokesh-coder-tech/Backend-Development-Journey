import {getSong} from '../service/song.api'
import {useContext} from 'react'
import {SongContext} from '../song.context'

export const useSong = () => {

    const context = useContext(SongContext)

    const {loading, setloading, song, setsong} = context

    async function handleGetSong({mood}) {
      try {
        setloading(true);
        console.log("Fetching song for mood:", mood); // Check if mood is 'sad', 'happy', etc.
        
        const data = await getSong({ mood });
        console.log("API Response:", data); // Is this undefined?
        
        if (data && data.song) {
            setsong(data.song);
        } else {
            console.error("Song not found in response for mood:", mood);
            // Optionally set a fallback song here
        }
    } catch (error) {
        console.error("Failed to fetch song:", error);
    } finally {
        setloading(false);
    }
    }

    return({loading, song, handleGetSong})
}
