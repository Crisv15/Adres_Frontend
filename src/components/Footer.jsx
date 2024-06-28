import { Fragment } from "react"

export const Footer = () => {
    return (
        <Fragment>
            <footer className="footer bg-principal mt-5">
                <div className="footer-content text-center">
                    <p>&copy; {new Date().getFullYear()} Aplicacion ADRES</p>
                    <a href="https://www.adres.gov.co/" target="_blank">Sitio web</a>
                </div>
            </footer>
        </Fragment>
    )
}