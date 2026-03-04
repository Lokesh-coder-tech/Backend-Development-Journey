import React from 'react'
import FaceExpression from "../../Expression/components/FaceExpression"
import Player from "../components/Player"
import "./home.scss"

const Home = () => {
  return (
   <div className="home-container">
     <div className="detection-wrapper">
        <FaceExpression />
     </div>
        <Player />
    </div>
  )
}

export default Home
