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
import { HolaPeliculas } from "../../api/peliculasListar";
import Dropzone from "../Dropzone/Dropzone";
import { map } from "lodash";
import axios from "axios";
import { API_HOST } from "../../utils/constants";
import VideoUploader from "../upVideos/FileUpdate";
import { Spinner } from "react-bootstrap";

export default function InsertarCapitulosSerie({ data }) {
  const serie = data[0];
  console.log(data);
  const [formData, setFormData] = useState(initialFormValue());
  const [show, setShow] = useState(false);
  const [videoPath, setVideoPath] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //load
  const [loading, setLoading] = useState(true);

  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenProducto, setImagenProducto] = useState(null);
  const [imagenPortadaPelicula, setImagenPortadaPelicula] = useState(null);
  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenPortadaPeliculaMovil, setImagenPortadaPeliculaMovil] =
    useState(null);

  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange2 = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUploadVideos = async () => {
    setLoading(true);
    try {
      if (!file) {
        alert("Por favor, selecciona un archivo de video.");
        return;
      }

      const dataTemp = {
        titulo: formData.nombre,
      };

      const response = await HolaPeliculas(file);
      const { data } = response;
      // Puedes manejar la respuesta según tus necesidades
      setResponse(data);
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

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
    formData.append("video", file);

    axios
      .post(API_HOST + "/series/upload", formData)
      .then((response) => {
        setVideoPath(response.data.videoPath);
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
      });
  };

  const [linkImagen1, setLinkImagen1] = useState("");

  const cargarImagen1 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPelicula, "portadasCapitulosSeries")
        .then((response) => {
          const { data } = response;
          // console.log(data)
          const { secure_url } = data;
          setLinkImagen1(secure_url);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    cargarImagen1();
  }, [imagenPortadaPelicula]);

  const [linkImagen2, setLinkImagen2] = useState("");

  const cargarImagen2 = () => {
    try {
      subeArchivosCloudinary(
        imagenPortadaPeliculaMovil,
        "portadasCapitulosSeries"
      )
        .then((response) => {
          const { data } = response;
          // console.log(data)
          const { secure_url } = data;
          setLinkImagen2(secure_url);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    cargarImagen2();
  }, [imagenPortadaPeliculaMovil]);

  //insert
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.temporada ||
      !formData.nombre ||
      !formData.duracion ||
      !formData.descripcion
    ) {
      toast.warning("Completa el formulario");
    } else {
      try {
        setLoading(true);
        // Sube a cloudinary la imagen principal del producto

        const dataTemp = {
          serie: serie,
          temporada: formData.temporada,
          nombre: formData.nombre,
          urlCapitulo: response.url,
          //urlCapitulo: formData.urlCapitulo,
          urlPortada: linkImagen1,
          duracion: formData.duracion,
          descripcion: formData.descripcion,
          estado: "true",
          urlPortadaMovil: linkImagen2,
        };
        registraCapitulosSeries(dataTemp).then((response) => {
          const { data } = response;
          //notificacion

          toast.success(data.mensaje);

          window.location.reload();
          //cancelarRegistro()
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * url del video
   */

  const [formDataURL, setFormDataURL] = useState({
    urlCapitulo: "",
  });

  // Función de retorno para la URL del video
  const handleVideoPathChange = (videoPath) => {
    // Actualiza el estado del formulario con la URL del video
    setFormDataURL({
      ...formDataURL,
      urlCapitulo: videoPath,
    });
  };

  // useEffect para manejar la carga del video
  useEffect(() => {
    const handleVideoLoad = () => {
      // Actualiza el estado del formulario con la URL del video cuando el video termine de cargarse
      setFormDataURL({
        ...formDataURL,
        urlCapitulo: videoPath,
      });
    };

    return () => {
      // No olvides limpiar los efectos secundarios si es necesario
      // En este caso, no estamos utilizando nada que necesite ser limpiado
    };
  }, [videoPath, formDataURL]);

  return (
    <>
      <div className="contact-form">
        <Form onSubmit={onSubmit} onChange={onChange}>
          <div className="imagenPrincipal">
            <h4 className="textoImagenPrincipal">Sube tu imagen</h4>
            <div
              title="Seleccionar imagen de la categoría"
              className="imagenProducto"
            >
              <Dropzone setImagenFile={setImagenPortadaPelicula} />
            </div>
          </div>
          <br />
          <div className="imagenPrincipal">
            <h4 className="textoImagenPrincipal">Sube tu imagen para movil</h4>
            <div
              title="Seleccionar imagen de la categoría"
              className="imagenProducto"
            >
              <Dropzone setImagenFile={setImagenPortadaPeliculaMovil} />
            </div>
          </div>
          <br />

          <div>
            <input type="file" accept="video/*" onChange={handleFileChange2} />
            <button
              onClick={(e) => {
                e.preventDefault(); // Evita la recarga de la página
                handleUploadVideos(); // Llama a la función de carga
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    animation="border"
                    role="status"
                    size="sm"
                    style={{ marginRight: "10px" }}
                  >
                    <span className="sr-only">Uploading...</span>
                  </Spinner>
                  Uploading...
                </>
              ) : (
                "Upload Video"
              )}
            </button>

            {loading && (
              <div style={{ marginTop: "10px" }}>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
                <p>Loading... Please wait</p>
              </div>
            )}
            {response && <div>Media ID: {response.mediaId}</div>}
            {error && <div>Error: {error.message}</div>}
          </div>

          <div>
            <hr />
            <Col xs={12} md={12}>
              <Form.Control
                placeholder="URL Video"
                type="text"
                name="archPelicula"
                value={response?.url || ""}
                readOnly
              />
            </Col>
          </div>
          <br />

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
                  <option key={index} value={cat?.temporada}>
                    {cat?.temporada}
                  </option>
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
