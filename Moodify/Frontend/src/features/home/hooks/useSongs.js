import {getSong} from '../service/song.api'
import {useContext} from 'react'
import {SongContext} from '../song.context'

export const useSong = () => {

    const context = useContext(SongContext)

    const {loading, setloading, song, setsong} = context

    async function handleGetSong({mood}) {
        setloading(true)
        const data = getSong({mood})
        setsong(data.song)
        setloading(false)
    }

    return({loading, song, handleGetSong})
}
