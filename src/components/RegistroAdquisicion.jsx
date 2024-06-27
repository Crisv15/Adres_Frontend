import { Fragment, useState } from "react"
import { HeaderView } from "@/views/HeaderView"
import img from '@/assets/imgs/adquisicion.png'
import axios from 'axios'

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

    function createAdquisicion(){
        console.log("Valor total: " + valTotal1);
        let adquisicion = {
            presupuesto: presupuesto,
            unidadAd: unidadAd,
            tipBien: tipBien,
            cantidad: cantidad,
            valUnitario: valUnitario,
            valTotal: (cantidad * valUnitario), 
            fechAd: fechAd,
            proveedor: proveedor,
            documentacion: ""
        }
        axios.post('/createAdquisicion', adquisicion).then(res => {
            if(res.msg){
                alert(res.msg);
                navegar('/')
            }else{
                alert("Se creo la adquisicion");
            }
        }).then((err) => {
            if(err == undefined){
                alert("Error en: " + err);
            }
        })
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
                                    <input type="number" className="form-control" id="presupuesto" placeholder="Presupuesto" onChange={(e) => {setPresupuesto(e.target.value)}}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="unidadResp" className="form-label">Ingrese unidad responsable: </label>
                                    <input type="text" className="form-control" id="unidadResp" placeholder="Unidad" onChange={(e) => {setUnidadAd(e.target.value)}}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="tipBien" className="form-label">Ingrese el tipo de bien: </label>
                                    <input type="text" className="form-control" id="tipBien" placeholder="Tipo de bien" onChange={(e) => {setTipBien(e.target.value)}}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="cantidad" className="form-label">Ingrese la cantidad: </label>
                                    <input type="number" className="form-control" id="cantidad" placeholder="Cantidad" onChange={(e) => {setCantidad(e.target.value)}}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="valUnit" className="form-label">Ingrese la valor unitario: </label>
                                    <input type="number" className="form-control" id="valUnit" placeholder="Valor unitario" onChange={(e) => {setValUnitario(e.target.value)}}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="valTot" className="form-label">Valor total: </label>
                                    <input type="number" className="form-control" id="valTot" placeholder="Valor total" onChange={(e) => {setValTotal(e.target.value)}} value={cantidad * valUnitario} readOnly></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="fechAd" className="form-label">Ingrese la fecha de adquisicion: </label>
                                    <input type="date" className="form-control" max={fecha}  id="fechAd" placeholder="Fecha Adquisicion" onChange={(e) => {setFechAd(e.target.value)}}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="proveedor" className="form-label">Ingrese el proveedor: </label>
                                    <input type="text" className="form-control" id="proveedor" placeholder="Proveedor" onChange={(e) => {setProveedor(e.target.value)}}></input>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="mb-3">
                                    <label htmlFor="documentos" className="form-label">Selecione documentacion: </label>
                                    <input type="text" className="form-control" id="documentos" placeholder="Documentacion" onChange={(e) => {setDocumentacion(e.target.value)}}></input>
                                </div>
                            </div>
                            <button className="btn btn-success" onClick={createAdquisicion}>REGISTRAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}