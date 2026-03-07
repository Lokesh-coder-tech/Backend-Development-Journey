import React from 'react'
import FaceExpression from "../../Expression/components/FaceExpression"
import Player from "../components/Player"
import "./home.scss"
import {useSong} from "../hooks/useSongs"
import Navbar from '../components/Navbar'

const Home = () => {

  const {handleGetSong} = useSong()

  return (
   <div className="home-container">
    <Navbar/>
     <div className="detection-wrapper">
        <FaceExpression 
          onClick={(expression) => { handleGetSong({ mood: expression })}}
        />
     </div>
        <Player />
    </div>
  )
}

export default Home
