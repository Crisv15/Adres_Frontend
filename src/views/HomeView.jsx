import { Fragment } from "react"
import { Home } from "../components/Home"
import { HeaderView } from "./HeaderView"
import { FooterView } from "./FooterView"


export const HomeView = () => {
    return(
        <Fragment>
            <HeaderView/>
            <Home/>
            <FooterView/>
        </Fragment>
    )
}