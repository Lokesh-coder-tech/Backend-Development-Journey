import React from 'react'
import { useSong } from '../hooks/useSongs'
import './playlistPanel.scss'

const PlaylistPanel = () => {
    const { playlist, currentIndex, selectSong } = useSong()

    if (!playlist || playlist.length === 0) {
        return (
            <div className="playlist-panel">
                <h3 className="playlist-panel__title">Playlist</h3>
                <p className="playlist-panel__empty">No songs available for this mood</p>
            </div>
        )
    }

    return (
        <div className="playlist-panel">
            <div className="playlist-panel__header">
                <h3 className="playlist-panel__title">
                    {playlist[currentIndex]?.mood.toUpperCase()} Playlist
                </h3>
                <span className="playlist-panel__count">{playlist.length} songs</span>
            </div>

            <div className="playlist-panel__list">
                {playlist.map((song, idx) => (
                    <button
                        key={song.url + idx}
                        className={`playlist-panel__item ${idx === currentIndex ? 'active' : ''}`}
                        onClick={() => selectSong(idx)}
                        type="button"
                    >
                        {/* Thumbnail */}
                        <img
                            src={song.posterUrl}
                            alt={song.title}
                            className="playlist-panel__thumbnail"
                        />

                        {/* Song details */}
                        <div className="playlist-panel__details">
                            <p className="playlist-panel__item-title">{song.title}</p>
                            <span className="playlist-panel__item-mood">{song.mood}</span>
                        </div>

                        {/* Play indicator */}
                        {idx === currentIndex && (
                            <div className="playlist-panel__play-indicator">
                                ▶️
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PlaylistPanel
