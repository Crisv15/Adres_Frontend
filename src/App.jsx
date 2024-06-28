import { Fragment } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomeView } from "@/views/HomeView"
import { RegistroAdquisicionView } from "@/views/RegistroAdquisicionView"
import { RegistrosView } from "./views/RegistrosView"
import { HistorialView } from "./views/HistorialView"

function App() {

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/registrar" element={<RegistroAdquisicionView/>}></Route>
          <Route path="/datos" element={<RegistrosView/>}></Route>
          <Route path="/actualizar/:id" element={<RegistroAdquisicionView/>}></Route>
          <Route path="/cambios" element={<HistorialView/>}></Route>
          <Route path="/cambio/:id" element={<HistorialView/>}></Route>
        </Routes>
      </Router>
    </Fragment>
  )
}

export default App
