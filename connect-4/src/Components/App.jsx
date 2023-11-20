import {Routes, Route} from "react-router-dom"
import GameEngine from "../Game Engine/game_engine"
import Home from "./Home/Home"

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </>
  )
}

export default App
