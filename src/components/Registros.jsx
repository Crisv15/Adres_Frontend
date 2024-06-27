import { Fragment, useEffect, useState } from "react"
import { Header } from "./Header"
import axios from "axios";

export const Registros = () => {

    const [listaHistorial, setHistorial] = useState([]);
    const [listaFiltros, setFiltros] = useState(["Filtro1", "Filtro2"]);
    const estilo = {
        marginBottom: '0pt'
    };

    useEffect(() => {
        readAdquiciones();
    }, [])

    function readAdquiciones() {
        axios.get('/readAquicisiones').then(res => {
            setHistorial(res.data);
        }).then((err) => {
            if (err != undefined) {
                alert(err);
            }
        })
    }

    return (
        <Fragment>
            <Header></Header>
            <div className="container-fluid">
                <div className="row" style={estilo}>
                    <div className="col-sm-3 col-12 espacio-filtros">
                        {
                            listaFiltros.map((val, key) => {
                                return (
                                    <div className="espacio-dato">
                                        <div className="col-md-2 col-12">
                                            <h5>Presupuesto</h5>
                                        </div>
                                        <div className="col-md-2 col-12">
                                            <h5>{val.tipBien}</h5>
                                        </div>
                                        <div className="col-md-2 col-12">
                                            <h5>{val.tipBien}</h5>
                                        </div>
                                        <div className="col-md-2 col-12">
                                            <h5>ACCIONES</h5>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="col-sm-9 col-12">
                        <div className="mt-5">
                            <div className="espacio-registro">
                                <h1 className="text-center">REGISTROS REALIZADOS</h1>
                                <div className="row">

                                </div>
                                {
                                    listaHistorial.map((val, key) => {
                                        return (
                                            <div className="espacio-dato text-center">

                                                <div className="row">
                                                    <div className="col-md-2 col-12">
                                                        <h5>{val.presupuesto}</h5>
                                                    </div>
                                                    <div className="col-md-2 col-12">
                                                        <h5>{val.tipBien}</h5>
                                                    </div>
                                                    <div className="col-md-2 col-12">
                                                        <h5>{val.tipBien}</h5>
                                                    </div>
                                                    <div className="col-md-4 col-12">
                                                        <button className="btn btn-warning"><span className="material-symbols-outlined">update</span></button>
                                                        <button className="btn btn-danger"><span className="material-symbols-outlined">block</span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}