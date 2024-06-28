import { Fragment, useEffect, useState } from "react"
import { HeaderView } from "@/views/HeaderView"
import axios from 'axios';
import { useParams } from "react-router-dom";

export const Historial = () => {

    const [listaHistorial, setListaHistorial] = useState([]);
    const params = useParams();
    const [vacio, setVacio] = useState(false);
    const [vacio2, setVacio2] = useState(true);

    useEffect(() => {
        if(params.id == undefined){
            readHistorial();
        }else{
            readEspecifiedHistorial();
        }
    }, [])

    function readHistorial() {
        axios.get('/historial').then(res => {
            setListaHistorial(res.data);
        })
    }

    function readEspecifiedHistorial(){
        axios.get('/readEspecifiedHistorial/' + params.id).then(res => {
            setListaHistorial(res.data);
            if(res.data.length == 0){
                setVacio(true);
                setVacio2(false);
            }
        })
    }

    return (
        <Fragment>
            <HeaderView></HeaderView>
            <div className="container-fluid">
                <div className="container">
                    <div className="espacio-registro">
                        <h1 className="text-center">HISTORICO DE CAMBIOS</h1>
                        <div className="row mt-4">
                            <table className="table table-light table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Movimiento</th>
                                        <th scope="col">Accion</th>
                                        <th scope="col">Id_Adquisicion</th>
                                    </tr>
                                </thead>
                                <tbody hidden={vacio}>
                                    {
                                        listaHistorial.map((val, key1) => {
                                            return (
                                                <tr>
                                                    <th key={key1}>{val.fecha}</th>
                                                    <td>{val.tipoMovimiento}</td>
                                                    <td>{val.modificacion}</td>
                                                    <td>{val._id}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <h1 hidden={vacio2} className="text-center">No hay cambios aun</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}