import { Fragment, useEffect, useState } from "react"
import { Header } from "./Header"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Registros = () => {

    const [listaHistorial, setHistorial] = useState([]);
    const [listaFiltros, setFiltros] = useState([]);
    const [listaRespaldo, setListaRespaldo] = useState([]);
    const [fecha1, setFecha1] = useState();
    const [fecha3, setFecha3] = useState();
    const [filtro1, setFiltro1] = useState(false);
    const [filtro2, setFiltro2] = useState(false);
    const [filtro3, setFiltro3] = useState(false);
    const [valor1, setValor1] = useState();
    const [valor2, setValor2] = useState();
    var [lista, setLista] = useState([]);
    const [check, setCheck] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        readAdquiciones();
    }, [])

    const readAdquiciones = async () => {
        axios.get('/readAquicisiones').then(res => {
            setHistorial(res.data);
            setListaRespaldo(res.data);
            let array = Array();
            for (let i = 0; i < res.data.length; i++) {
                let data = res.data[i].proveedor;
                let bandera = 1;
                if (i == 0) {
                    array.push(res.data[i].proveedor)
                } else {
                    for (let j = 0; j < array.length; j++) {
                        if (array[j] == res.data[i].proveedor) {
                            bandera = 2;
                        }
                    }
                    if (bandera !== 2) {
                        array.push(res.data[i].proveedor);
                    }
                }
            }
            setFiltros(array);
        }).then((err) => {
            if (err != undefined) {
                alert(err);
            }
        })
    }

    function desactivarAdquisicion(id) {
        axios.put('/desactivate/' + id, null).then(res => {
            if (res.msg) {
                alert(res.msg);
            } else {
                alert("Adquisicion desabilitada");
                navigate(0);
            }
        }).then((err) => {
            if (err != undefined) {
                alert("Error en desactivar: " + err);
            }
        })
    }

    const mostrarBorro = () => {
        console.log("Borro");
    }

    const aplicarFiltroFecha = (fecha1, fecha2) => {
        let inicial = new Date(fecha1);
        let final = new Date(fecha2);
        setFecha3(fecha2);
        let array = [];
        console.log("El tamaño de lista historial es: " + listaHistorial.length)
        if (filtro2 || filtro3) {
            console.log("Entra a la validacion de que ya hay filtros seleccionados");
            for (let i = 0; i < listaHistorial.length; i++) {
                let f1 = new Date(listaHistorial[i].fechAd);
                if (f1.getTime() >= inicial.getTime() && f1.getTime() <= final.getTime()) {
                    array.push(listaHistorial[i]);
                }
            }
            setHistorial(array);
            setFiltro1(true);
        } else {
            setHistorial([]);
            for (let i = 0; i < listaRespaldo.length; i++) {
                let f1 = new Date(listaRespaldo[i].fechAd);
                if (f1.getTime() >= inicial.getTime() && f1.getTime() <= final.getTime()) {
                    array.push(listaRespaldo[i]);
                }
            }
            setHistorial(array);
            setFiltro1(true);
        }
    }

    const aplicarFiltroPresupuesto = () => {
        let array = [];
        if (filtro1 || filtro3) {
            for (let i = 0; i < listaHistorial.length; i++) {
                if (listaHistorial[i].presupuesto >= valor1 && listaHistorial[i].presupuesto <= valor2) {
                    array.push(listaRespaldo[i]);
                }
            }
            setHistorial(array);
        } else {
            setHistorial([]);
            for (let i = 0; i < listaRespaldo.length; i++) {
                if (listaRespaldo[i].presupuesto >= valor1 && listaRespaldo[i].presupuesto <= valor2) {
                    array.push(listaRespaldo[i]);
                }
            }
            setFiltro2(true);
            setHistorial(array);
        }
    }

    const filtrarPorCheck = (e) => {
        let array = [];
        let bandera = 1;
        let indice = 0;
        if (lista.length == 0) {
            lista.push(e.target.value);
        } else {
            for (let j = 0; j < lista.length; j++) {
                if (e.target.value == lista[j]) {
                    bandera = 2;
                    indice = j;
                }
            }
            if (bandera != 2) {
                lista.push(e.target.value);
            } else {
                lista.splice(indice, 1);
            }
        }
        if (filtro1 || filtro2) {
            if (lista.length > 0) {
                for (let j = 0; j < lista.length; j++) {
                    for (let i = 0; i < listaHistorial.length; i++) {
                        if (listaHistorial[i].proveedor == lista[j]) {
                            array.push(listaHistorial[i]);
                        }
                    }
                }
                setHistorial(array);
                setFiltro3(true);
            }
        } else {
            setHistorial([]);
            if (lista.length > 0) {
                for (let j = 0; j < lista.length; j++) {
                    for (let i = 0; i < listaRespaldo.length; i++) {
                        if (listaRespaldo[i].proveedor == lista[j]) {
                            array.push(listaRespaldo[i]);
                        }
                    }
                }
                setHistorial(array);
                setFiltro3(true);
            } else {
                setHistorial(listaRespaldo);
                setFiltro3(false)
            }
        }
    }

    const quitarFiltros = () => {
        setFecha1("");
        setFecha3("");
        setValor1(0);
        setValor2(0);
        setHistorial(listaRespaldo);
        setFiltro1(false);
        setFiltro2(false);
        setFiltro3(false);
    }

    return (
        <Fragment>
            <Header></Header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-12 espacio-filtros">
                        <div className="row mt-4">
                            <h5 className="text-center">Filtrar Por:</h5>
                        </div>
                        <div className="row mt-4">
                            <h5>Rango presupuestal: </h5>
                            <div className="col-sm-4 col-12">
                                <input type="number" className="form-control" value={valor1} onChange={(e) => { setValor1(e.target.value) }}></input>
                            </div>
                            <div className="col-sm-1 col-12">
                                a
                            </div>
                            <div className="col-sm-4 col-12">
                                <input type="number" className="form-control" value={valor2} onChange={(e) => { setValor2(e.target.value) }}></input>
                            </div>
                            <div className="col-sm-2 col-12">
                                <button className="btn-enviar btn btn-primary" onClick={() => { aplicarFiltroPresupuesto() }}><span className="material-symbols-outlined text-center"><span className="material-symbols-outlined">chevron_right</span></span></button>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <h5>Proveedor</h5>
                            {
                                listaFiltros.map((val, key) => {
                                    return (
                                        <div className="row espacio-dato">
                                            <div className="col-sm-2">
                                                <input type="checkbox" checked={check} onChange={filtrarPorCheck} value={val} id={val}></input>
                                            </div>
                                            <div className="col-sm-10">
                                                <label htmlFor={val}>{val}</label>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-6 offset-sm-3">
                                <button className="btn btn-dark" onClick={quitarFiltros}>Borrar Filtros</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9 col-12">
                        <div className="mt-5">
                            <div className="espacio-registro">
                                <h1 className="text-center">REGISTROS REALIZADOS</h1>
                                <div className="row text-center mt-3 mb-3">
                                    <div className="col-md-6 col-12">
                                        <label className="form-label">Fecha Inicial: </label>
                                        <input type="date" className="form-control" value={fecha1} id="fechIni" onChange={(e) => { setFecha1(e.target.value) }}></input>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <label className="form-label">Fecha Final: </label>
                                        <input type="date" className="form-control" value={fecha3} onChange={(e) => { aplicarFiltroFecha(fecha1, e.target.value) }} onClick={mostrarBorro}></input>
                                    </div>
                                </div>
                                <div className="espacio-dato">
                                    <div className="row">
                                        <div className="col-md-2 col-12">
                                            <h5>Presupuesto</h5>
                                        </div>
                                        <div className="col-md-2 col-12">
                                            <h5>Tipo Beneficio</h5>
                                        </div>
                                        <div className="col-md-2 col-12">
                                            <h5>Cantidad</h5>
                                        </div>
                                        <div className="col-md-2 col-12">
                                            <h5>Fecha Adquision</h5>
                                        </div>
                                        <div className="col-md-4 col-12">
                                            <h5>ACCIONES</h5>
                                        </div>
                                    </div>
                                </div>
                                {
                                    listaHistorial.map((val, index) => {
                                        return (
                                            <div className="espacio-dato text-center" key={index}>
                                                <div className="row">
                                                    <div className="col-md-2 col-12">
                                                        {val.presupuesto}
                                                    </div>
                                                    <div className="col-md-2 col-12">
                                                        {val.tipBien}
                                                    </div>
                                                    <div className="col-md-2 col-12">
                                                        {val.cantidad}
                                                    </div>
                                                    <div className="col-md-2 col-12">
                                                        {val.fechAd}
                                                    </div>
                                                    <div className="col-md-4 col-12">
                                                        <Link to={`/actualizar/${val._id}`}><button className="material-symbols-outlined btn btn-warning">update</button></Link>
                                                        <button className="btn btn-danger" onClick={() => { desactivarAdquisicion(val._id) }}><span className="material-symbols-outlined">block</span></button>
                                                        <Link to={`/cambio/${val._id}`} className="material-symbols-outlined btn btn-secondary">find_in_page</Link>
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