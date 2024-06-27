import { Fragment } from "react"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import imgs from '@/assets/imgs/adreslog.png';

export const Header = () => {
    return (
        <Fragment>
            <Navbar expand="lg" className="bg-principal navbar-dark justify-content-start" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={imgs} height={'auto'} width={'100px'}></img>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className="seleccion">Inicio</Nav.Link>
                            <Nav.Link href="/datos" className="seleccion">Registros</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}