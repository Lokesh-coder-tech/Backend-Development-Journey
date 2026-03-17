import {getSong} from '../service/song.api'
import {useContext} from 'react'
import {SongContext} from '../song.context'

export const useSong = () => {

    const context = useContext(SongContext)

    const {loading, setloading, playlist, setPlaylist, currentIndex, setCurrentIndex, song} = context

    function selectSong(index) {
        if (!playlist?.length) return
        const safeIndex = Math.max(0, Math.min(playlist.length - 1, index))
        setCurrentIndex(safeIndex)
    }

    async function handleGetSong({mood}) {
      try {
        setloading(true);
        console.log("Fetching playlist for mood:", mood);

        const data = await getSong({ mood });
        console.log("API Response:", data);

        if (data && Array.isArray(data.songs) && data.songs.length > 0) {
            setPlaylist(data.songs);
            setCurrentIndex(0);
        } else {
            console.error("No songs found in response for mood:", mood);
            // Optionally keep existing playlist or set a default playlist here
        }
    } catch (error) {
        console.error("Failed to fetch songs:", error);
    } finally {
        setloading(false);
    }
    }

    function nextSong() {
        if (!playlist?.length) return
        const nextIndex = (currentIndex + 1) % playlist.length
        setCurrentIndex(nextIndex)
    }

    function prevSong() {
        if (!playlist?.length) return
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length
        setCurrentIndex(prevIndex)
    }

    return({
        loading,
        song,
        playlist,
        currentIndex,
        handleGetSong,
        nextSong,
        prevSong,
        selectSong,
    })
}
