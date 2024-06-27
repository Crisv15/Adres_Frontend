import { Fragment } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomeView } from "@/views/HomeView"
import { RegistroAdquisicionView } from "@/views/RegistroAdquisicionView"
import { HistorialView } from "./views/HistorialView"

function App() {

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/registrar" element={<RegistroAdquisicionView/>}></Route>
          <Route path="/datos" element={<HistorialView/>}></Route>
        </Routes>
      </Router>
    </Fragment>
  )
}

export default App
