import {createContext, useState} from 'react'


export const SongContext = createContext()

export const SongContextProvider = ({children}) => {
 
    const [song, setsong] = useState({
    "url": "https://ik.imagekit.io/aelyn37ad/cohort-2/moodify/songs/Ilahi_-_PagalNew__EPdN9XulG.mp3",
    "posterUrl": "https://ik.imagekit.io/aelyn37ad/cohort-2/moodify/posters/Ilahi_-_PagalNew__PDsJ1zUuN.jpeg",
    "title": "Ilahi - PagalNew ",
    "mood": "happy",
    })

    const [loading, setloading] = useState(false)

    return(
        <SongContext.Provider value={{loading, setloading, song, setsong}}>
         {children}
        </SongContext.Provider>
    )
}