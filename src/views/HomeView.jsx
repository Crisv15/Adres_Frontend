import { Fragment } from "react"
import { Home } from "../components/Home"
import { HeaderView } from "./HeaderView"


export const HomeView = () => {
    return(
        <Fragment>
            <HeaderView/>
            <Home/>
        </Fragment>
    )
}