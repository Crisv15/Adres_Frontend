import { Fragment, useEffect, useState } from "react"
import { HeaderView } from "@/views/HeaderView"
import img from '@/assets/imgs/adquisicion.png'
import axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom"
import swal from 'sweetalert2';

export const RegistroAdquisicion = () => {

    const [presupuesto, setPresupuesto] = useState(0);
    const [unidadAd, setUnidadAd] = useState("");
    const [tipBien, setTipBien] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [valUnitario, setValUnitario] = useState(0);
    let [valTotal1, setValTotal] = useState(0);
    const [fechAd, setFechAd] = useState("");
    const [proveedor, setProveedor] = useState("");
    const [documentacion, setDocumentacion] = useState("");
    const fecha = new Date().toISOString().split("T")[0];
    const params = useParams()
    const [btnText, setBtnText] = useState('REGISTRAR');
    const [actualizar, setActualizar] = useState(true);
    const [actualizar1, setActualizar1] = useState(false);
    const navegar = useNavigate();

    useEffect(() => {
        if (params.id !== undefined) {
            isEditAdquisicion();
        }
    }, []);

    function isEditAdquisicion() {
        setBtnText("ACTUALIZAR")
        setActualizar(false);
        setActualizar1(true);
        axios.get('/read/' + params.id).then(res => {
            let fecha = res.data.fechAd.split('T')[0];
            setPresupuesto(res.data.presupuesto);
            setUnidadAd(res.data.unidadAd);
            setTipBien(res.data.tipBien);
            setCantidad(res.data.cantidad);
            setValUnitario(res.data.valUnitario);
            setFechAd(fecha);
            setDocumentacion(res.data.documentacion);
            setProveedor(res.data.proveedor);
            //setDocumentacion(res.data.documentacion);
        }).then(err => {
            if (err != undefined) {
                alert(err);
            }
        })
    }

    function createAdquisicion() {
        let adquisicion = {
            presupuesto: presupuesto,
            unidadAd: unidadAd,
            tipBien: tipBien,
            cantidad: cantidad,
            valUnitario: valUnitario,
            valTotal: (cantidad * valUnitario),
            fechAd: fechAd,
            proveedor: proveedor,
            documentacion: documentacion,
            estado: "activo"
        }
        if (!validarCampos()) {
            if (params.id != undefined) {
                axios.put('/updateAdquisicion/' + params.id, adquisicion).then(res => {
                    if (res.data.msg) {
                        alert(res.data.msg);
                    } else {
                        Swal.fire({
                            title: "¿Esta seguro que desea actualizar?",
                            showCancelButton: true,
                            confirmButtonText: "Aceptar",
                            cancelButtonText: `Cancelar`
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire("Saved!", "", "success");
                                navegar('/datos');
                            }
                        });
                    }
                })
            } else {
                axios.post('/createAdquisicion', adquisicion).then(res => {
                    if (res.msg) {
                        alert(res.data.msg);
                    } else {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Adquisicion registrada",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            navegar('/datos');
                        });
                        navegar('/')
                    }
                }).then((err) => {
                    if (err != undefined) {
                        alert("Error en: " + err);
                    }
                })
            }
        }
    }

    function validarCampos() {
        let bandera = false;
        if (presupuesto == 0 || presupuesto == undefined) {
            swal.fire({
                title: "Recuerde dar un presupuesto",
                confirmButtonText: "OK",
                icon: "info"
            })
            bandera = true;
        } else if (unidadAd == "" || unidadAd == undefined) {
            swal.fire({
                title: "Recuerde rellenar unidad administrativa",
                confirmButtonText: "OK",
                icon: "info"
            })
            bandera = true;
        } else if (tipBien == "" || tipBien == undefined) {
            swal.fire({
                title: "Recuerde rellenar tipo de bien/servicio",
                confirmButtonText: "OK",
                icon: "info"
            })
            bandera = true;
        } else if (cantidad == 0 || cantidad == undefined) {
            swal.fire({
                title: "Recuerde rellenar cantidad",
                confirmButtonText: "OK",
                icon: "info"
            })
            bandera = true;
        } else if (valUnitario == 0 || valUnitario == undefined) {
            swal.fire({
                title: "Recuerde rellenar valor unitario",
                confirmButtonText: "OK",
                icon: "info"
            })
            bandera = true;
        } else if (fechAd == "" || fechAd == undefined) {
            swal.fire({
                title: "Recuerde rellenar adquisicion",
                confirmButtonText: "OK",
                icon: "info"
            })
            bandera = true;
        } else if (proveedor == "" || proveedor == undefined) {
            swal.fire({
                title: "Recuerde rellenar proveedor",
                confirmButtonText: "OK",
                icon: "info"
            })
            bandera = true;
        } else if (documentacion == "" || documentacion == undefined) {
            swal.fire({
                title: "Recuerde rellenar documentacion",
                confirmButtonText: "OK",
                icon: "info"
            })
            bandera = true;
        } else if (presupuesto < (valUnitario * cantidad)) {
            swal.fire({
                title: "El presupuesto es menor al valor total",
                confirmButtonText: "OK",
                icon: "error"
            })
            bandera = true;
        }
        console.log("El valor que se fue bandera: " + bandera);
        return bandera;
    }

    return (
        <Fragment>
            <HeaderView></HeaderView>
            <div className="container-fluid">
                <div className="container">
                    <div className="espacio-registro mt-4">
                        <div className="row">
                            <h2 className="text-center">RESGISTRO REQUERIMIENTOS ADQUISICIÓN</h2>
                            <div className="row">
                                <div className="col-md-4 offset-md-4 text-center">
                                    <img className="mt-3 img-fluid" src={img} width={"184px"} height={"184px"}></img>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="presupuesto" className="form-label">Ingrese el presupuesto: </label>
                                    <input type="number" min={0} required className="form-control" id="presupuesto" placeholder="Presupuesto" value={presupuesto} onChange={(e) => { setPresupuesto(e.target.value) }}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="unidadResp" className="form-label">Ingrese unidad responsable: </label>
                                    <input type="text" required className="form-control" id="unidadResp" placeholder="Unidad" value={unidadAd} onChange={(e) => { setUnidadAd(e.target.value) }}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="tipBien" className="form-label">Ingrese el tipo de bien: </label>
                                    <input type="text" required className="form-control" id="tipBien" placeholder="Tipo de bien" value={tipBien} onChange={(e) => { setTipBien(e.target.value) }}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="cantidad" className="form-label">Ingrese la cantidad: </label>
                                    <input type="number" required min={0} className="form-control" id="cantidad" placeholder="Cantidad" value={cantidad} onChange={(e) => { setCantidad(e.target.value) }}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="valUnit" className="form-label">Ingrese la valor unitario: </label>
                                    <input type="number" required min={0} className="form-control" id="valUnit" placeholder="Valor unitario" value={valUnitario} onChange={(e) => { setValUnitario(e.target.value) }}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="valTot" className="form-label">Valor total: </label>
                                    <input type="number" required min={0} className="form-control" id="valTot" placeholder="Valor total" onChange={(e) => { setValTotal(e.target.value) }} value={cantidad * valUnitario} readOnly></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="fechAd" className="form-label">Ingrese la fecha de adquisicion: </label>
                                    <input type="date" required className="form-control" max={fecha} id="fechAd" placeholder="Fecha Adquisicion" value={fechAd} onChange={(e) => { setFechAd(e.target.value) }}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="proveedor" className="form-label">Ingrese el proveedor: </label>
                                    <input type="text" required className="form-control" id="proveedor" placeholder="Proveedor" value={proveedor} onChange={(e) => { setProveedor(e.target.value) }}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="documentos" className="form-label">Selecione documentacion: </label>
                                    <input type="text" required className="form-control" id="documentos" placeholder="Documentacion" value={documentacion} onChange={(e) => { setDocumentacion(e.target.value) }}></input>
                                </div>
                            </div>
                            <button className="btn btn-success" onClick={createAdquisicion}>{btnText}</button>
                            <Link to={`/datos`} className="btn btn-primary" hidden={actualizar}>VOLVER</Link>
                            <Link to={`/`} className="btn btn-primary" hidden={actualizar1}>VOLVER</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}