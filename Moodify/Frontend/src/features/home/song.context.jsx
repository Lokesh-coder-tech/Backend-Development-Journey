import {createContext, useState, useMemo} from 'react'

export const SongContext = createContext()

export const SongContextProvider = ({children}) => {
 
    const [playlist, setPlaylist] = useState([
        {
            url: "https://ik.imagekit.io/aelyn37ad/cohort-2/moodify/songs/Ilahi_-_PagalNew__EPdN9XulG.mp3",
            posterUrl: "https://ik.imagekit.io/aelyn37ad/cohort-2/moodify/posters/Ilahi_-_PagalNew__PDsJ1zUuN.jpeg",
            title: "Ilahi - PagalNew ",
            mood: "happy",
        }
    ])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setloading] = useState(false)

    const song = useMemo(() => {
        if (!playlist || playlist.length === 0) return null
        return playlist[currentIndex] || playlist[0]
    }, [playlist, currentIndex])

    return(
        <SongContext.Provider value={{
            loading,
            setloading,
            playlist,
            setPlaylist,
            currentIndex,
            setCurrentIndex,
            song,
        }}>
         {children}
        </SongContext.Provider>
    )
}