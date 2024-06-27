import { Fragment } from "react"
import { Carousel } from "react-bootstrap"
import img1 from '@/assets/imgs/section1.png'
import img2 from '@/assets/imgs/section2.png'
import img3 from '@/assets/imgs/adreslog.png'
import { useNavigate } from "react-router-dom"


export const Home = () => {

    const navegar = useNavigate();

    const redirectTo = () => {
        navegar('/registrar')
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="container mt-5">
                    <Carousel>
                        <Carousel.Item>
                            <div className="row">
                                <h3 className="text-center bg-principal">ADQUISICIONES</h3>
                            </div>
                            <div className="row">
                                <img
                                    className="d-block w-100"
                                    src={img1}
                                    alt="First slide" width={"300px"} height={"270px"}
                                />
                            </div>
                            <div className="row mb-4 mt-2">
                                <button className="bg-principal" onClick={redirectTo}>Registrar Adquision</button>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="row">
                                <h3 className="text-center bg-principal">SERVICIOS</h3>
                            </div>
                            <div className="row">
                                <img
                                    className="d-block w-100"
                                    src={img2}
                                    alt="Second slide" width={"300px"} height={"270px"}
                                />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="row">
                                <h3 className="text-center bg-principal">SISTEMA ADRES REGISTRO ADQUISICIONES</h3>
                            </div>
                            <div className="row">
                                <img
                                    className="d-block w-100"
                                    src={img3}
                                    alt="Third slide" width={"300px"} height={"270px"}
                                />V
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </Fragment>
    )
}