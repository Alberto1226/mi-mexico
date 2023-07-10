import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { TblPatrocinadores } from "../tables/tablaPatrocinadores";
import { registraCapitulosSeries } from "../../api/capitulosSeries";
import { subeArchivosCloudinary } from "../../api/cloudinary";
import Dropzone from "../Dropzone/Dropzone";
import { map } from "lodash";
import axios from "axios";
import { API_HOST } from "../../utils/constants";

export default function InsertarCapitulosSerie({ data }) {
    const serie = data[0];
    console.log(data)
    const [formData, setFormData] = useState(initialFormValue());
    const [show, setShow] = useState(false);
    const [videoPath, setVideoPath] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //load
    const [loading, setLoading] = useState(true);

    //Para almacenar la imagen del producto que se guardara a la bd
    const [imagenProducto, setImagenProducto] = useState(null);

    useEffect(() => {
        // Simula una carga de datos
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    //notification
    const notify = () => toast("Wow so easy!");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        uploadVideo(file);
    };

    const uploadVideo = (file) => {
        const formData = new FormData();
        formData.append('video', file);

        axios.post(API_HOST + '/series/upload', formData)
            .then((response) => {
                setVideoPath(response.data.videoPath);
            })
            .catch((error) => {
                console.error('Error uploading video:', error);
            });
    };

    //insert
    const onSubmit = (e) => {
        e.preventDefault();

        if (!formData.temporada || !formData.nombre || !formData.duracion || !formData.descripcion) {
            toast.warning("Completa el formulario");
        } else {
            try {
                setLoading(true);
                // Sube a cloudinary la imagen principal del producto
                subeArchivosCloudinary(imagenProducto, "portadasCapitulosSeries").then(response => {
                    const { data } = response;

                    const dataTemp = {
                        serie: serie,
                        temporada: formData.temporada,
                        nombre: formData.nombre,
                        urlCapitulo: formData.urlCapitulo,
                        urlPortada: data.secure_url,
                        duracion: formData.duracion,
                        descripcion: formData.descripcion,
                        estado: "true",
                    };
                    registraCapitulosSeries(dataTemp).then((response) => {
                        const { data } = response;
                        //notificacion

                        toast.success(data.mensaje);

                        window.location.reload();
                        //cancelarRegistro()
                    });
                }).then(e => {
                    console.log(e)
                })
            } catch (e) {
                console.log(e);
            }
        }
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="contact-form">
                <Form onSubmit={onSubmit} onChange={onChange}>
                    <div className="imagenPrincipal">
                        <h4 className="textoImagenPrincipal">Sube tu imagen</h4>
                        <div title="Seleccionar imagen de la categoría" className="imagenProducto">
                            <Dropzone
                                setImagenFile={setImagenProducto}
                            />
                        </div>
                    </div>

                    <Col xs={9} md={6}>
                        <Form.Control
                            placeholder="URL Video"
                            type="text"
                            name="urlCapitulo"
                            defaultValue={formData.urlCapitulo}
                        />
                    </Col>

                    {/*<br />
                    <input type="file" name="video" accept=".mp4" onChange={handleFileChange} />
                    {videoPath && <video src={videoPath} controls />}
    <br />*/}

                    <br />
                    <Row>
                        <Col xs={9} md={6}>
                            <Form.Control
                                as="select"
                                defaultValue={formData.temporada}
                                name="temporada"
                            >
                                <option>Elige una opción</option>
                                {map(data[8], (cat, index) => (
                                    <option key={index} value={cat?.temporada}>{cat?.temporada}</option>
                                ))}
                            </Form.Control>
                        </Col>
                        <Col xs={9} md={6}>
                            <Form.Control
                                placeholder="Nombre"
                                type="text"
                                name="nombre"
                                defaultValue={formData.nombre}
                            />
                        </Col>
                    </Row>
                    <br />

                    <Row>
                        <Col xs={9} md={6}>
                            <Form.Control
                                placeholder="Duracion"
                                type="text"
                                name="duracion"
                                defaultValue={formData.duracion}
                            />
                        </Col>
                        <Col xs={9} md={6}>
                            <Form.Control
                                placeholder="Descripcion"
                                type="text"
                                name="descripcion"
                                defaultValue={formData.descripcion}
                            />
                        </Col>
                    </Row>

                    <br />

                    <label></label>
                    <input className="submit" value="Enviar" type="submit" />
                </Form>
            </div>
        </>
    );
}

function initialFormValue() {
    return {
        temporada: "",
        nombre: "",
        urlCapitulo: "",
        urlPortada: "",
        duracion: "",
        descripcion: "",
    };
}
