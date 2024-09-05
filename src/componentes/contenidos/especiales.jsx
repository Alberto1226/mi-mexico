import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row, Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import TblEspeciales from "../tables/tablaEspeciales";
import { registraPeliculas } from "../../api/peliculasListar";
import { ToastContainer, toast } from "react-toastify";
import { listarCategorias } from "../../api/categorias";
import { HolaPeliculas } from "../../api/peliculasListar";
import { map } from "lodash";
import Dropzone from "../Dropzone/Dropzone";
import { subeArchivosCloudinary } from "../../api/cloudinary";
import axios from "axios";
import { API_HOST } from "../../utils/constants";
import { withRouter } from "../../utils/withRouter";
import queryString from "query-string";
import { listarPatrocinadores } from "../../api/patrocinadores";
import { Spinner } from "react-bootstrap";

function Especiales({ history }) {
  const [formData, setFormData] = useState(initialFormValue());
  const [show, setShow] = useState(false);
  const [videoPath, setVideoPath] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenPortadaPelicula1, setImagenPortadaPelicula1] = useState(null);
  const [imagenPortadaPelicula2, setImagenPortadaPelicula2] = useState(null);
  const [imagenPortadaPelicula3, setImagenPortadaPelicula3] = useState(null);
  const [imagenPortadaPelicula4, setImagenPortadaPelicula4] = useState(null);
  const [imagenPortadaPelicula5, setImagenPortadaPelicula5] = useState(null);

  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenPortadaPeliculaMovil1, setImagenPortadaPeliculaMovil1] = useState(null);
  const [imagenPortadaPeliculaMovil2, setImagenPortadaPeliculaMovil2] = useState(null);
  const [imagenPortadaPeliculaMovil3, setImagenPortadaPeliculaMovil3] = useState(null);
  const [imagenPortadaPeliculaMovil4, setImagenPortadaPeliculaMovil4] = useState(null);
  const [imagenPortadaPeliculaMovil5, setImagenPortadaPeliculaMovil5] = useState(null);
  
  const [listarCat, setListCategorias] = useState([]);
  const [listarCategoria, setListarCategoria] = useState([]);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  console.log("🚀 ~ Especiales ~ response:", response)
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

  const obtenerCategorias = () => {
    try {
      listarCategorias()
        .then((response) => {
          const { data } = response;

          if (!listarCategoria && data) {
            setListarCategoria(formatModelCategorias(data));
          } else {
            const datosCat = formatModelCategorias(data);
            setListarCategoria(datosCat);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const renglon = listarCat.length + 1;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadVideo(file);
  };

  const uploadVideo = (file) => {
    const formData = new FormData();
    formData.append('video', file);

    axios.post(API_HOST + '/peliculas/upload', formData)
      .then((response) => {
        setVideoPath(response.data.videoPath);
      })
      .catch((error) => {
        console.error('Error uploading video:', error);
      });
  };

  //load
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const [linkImagen1, setLinkImagen1] = useState("");

  const cargarImagen1 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPelicula1, "portadasEspeciales").then(response => {
        const { data } = response;
        // console.log(data)
        const { secure_url } = data;
        setLinkImagen1(secure_url)
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)

    }
  }

  useEffect(() => {
    cargarImagen1();
  }, [imagenPortadaPelicula1]);

  const [linkImagen2, setLinkImagen2] = useState("");

  const cargarImagen2 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPelicula2, "portadasEspeciales").then(response => {
        const { data } = response;
        // console.log(data)
        const { secure_url } = data;
        setLinkImagen2(secure_url)
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)

    }
  }

  useEffect(() => {
    cargarImagen2();
  }, [imagenPortadaPelicula2]);

  const [linkImagen3, setLinkImagen3] = useState("");

  const cargarImagen3 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPelicula3, "portadasEspeciales").then(response => {
        const { data } = response;
        // console.log(data)
        const { secure_url } = data;
        setLinkImagen3(secure_url)
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)

    }
  }

  useEffect(() => {
    cargarImagen3();
  }, [imagenPortadaPelicula3]);

  const [linkImagen4, setLinkImagen4] = useState("");

  const cargarImagen4 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPelicula4, "portadasEspeciales").then(response => {
        const { data } = response;
        // console.log(data)
        const { secure_url } = data;
        setLinkImagen4(secure_url)
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)

    }
  }

  useEffect(() => {
    cargarImagen4();
  }, [imagenPortadaPelicula4]);

  const [linkImagen5, setLinkImagen5] = useState("");

  const cargarImagen5 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPelicula5, "portadasEspeciales").then(response => {
        const { data } = response;
        // console.log(data)
        const { secure_url } = data;
        setLinkImagen5(secure_url)
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)

    }
  }

  useEffect(() => {
    cargarImagen5();
  }, [imagenPortadaPelicula5]);

  const [linkImagenMovil1, setLinkImagenMovil1] = useState("");

  const cargarImagenMovil1 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPeliculaMovil1, "portadasSeries").then(response => {
        const { data } = response;
        // console.log(data)
        const { secure_url } = data;
        setLinkImagenMovil1(secure_url)
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)

    }
  }

  useEffect(() => {
    cargarImagenMovil1();
  }, [imagenPortadaPeliculaMovil1]);

  const [linkImagenMovil2, setLinkImagenMovil2] = useState("");

  const cargarImagenMovil2 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPeliculaMovil2, "portadasSeries").then(response => {
        const { data } = response;
        // console.log(data)
        const { secure_url } = data;
        setLinkImagenMovil2(secure_url)
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)

    }
  }

  useEffect(() => {
    cargarImagenMovil2();
  }, [imagenPortadaPeliculaMovil2]);

  const [linkImagenMovil3, setLinkImagenMovil3] = useState("");

  const cargarImagenMovil3 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPeliculaMovil3, "portadasSeries").then(response => {
        const { data } = response;
        // console.log(data)
        const { secure_url } = data;
        setLinkImagenMovil3(secure_url)
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)

    }
  }

  useEffect(() => {
    cargarImagenMovil3();
  }, [imagenPortadaPeliculaMovil3]);

  const [linkImagenMovil4, setLinkImagenMovil4] = useState("");

  const cargarImagenMovil4 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPeliculaMovil4, "portadasSeries").then(response => {
        const { data } = response;
        // console.log(data)
        const { secure_url } = data;
        setLinkImagenMovil4(secure_url)
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)

    }
  }

  useEffect(() => {
    cargarImagenMovil4();
  }, [imagenPortadaPeliculaMovil4]);

  const [linkImagenMovil5, setLinkImagenMovil5] = useState("");

  const cargarImagenMovil5 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPeliculaMovil5, "portadasSeries").then(response => {
        const { data } = response;
        // console.log(data)
        const { secure_url } = data;
        setLinkImagenMovil5(secure_url)
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)

    }
  }

  useEffect(() => {
    cargarImagenMovil5();
  }, [imagenPortadaPeliculaMovil5]);

  const [listarPatrocinadoress, setListarPatrocinadores] = useState([]);

  const obtenerPatrocinadoress = () => {
    try {
      listarPatrocinadores()
        .then((response) => {
          const { data } = response;

          if (!listarPatrocinadoress && data) {
            setListarPatrocinadores(formatModelPatrocinadores(data));
          } else {
            const datosPat = formatModelPatrocinadores(data);
            setListarPatrocinadores(datosPat);
          }
        })
        .catch((e) => { });
    } catch (e) { }
  };

  useEffect(() => {
    obtenerPatrocinadoress();
  }, []);

  //insert
  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.actores || !formData.director || !formData.duracion || !formData.sinopsis || !formData.anio) {
      toast.warning("Completa el formulario");
    } else {
      try {
        setLoading(true);
        // Sube a cloudinary la imagen principal del producto
        const data2 = formData.patrocinador.split(",")
        const dataTemp = [{
          titulo: formData.nombre,
          categorias: listarCat,
          actores: formData.actores,
          director: formData.director,
          duracion: formData.duracion,
          tipo: "",
          sinopsis: formData.sinopsis,
          calificacion: "",
          año: formData.anio,
          disponibilidad: "",
          masVisto: "",
          tipo: "especiales",
          recomendado: formData.recomendado,
          urlTrailer: response.url,
          contador: "0",
          urlPortada: linkImagen1,
          seccion: "",
          estado: "true",
          patrocinador: data2[0],
          patrocinadorPortada: data2[1],
          urlPortadaMovil: linkImagenMovil1
        },
        {
          titulo: formData.nombre,
          categorias: listarCat,
          actores: formData.actores,
          director: formData.director,
          duracion: formData.duracion,
          tipo: "",
          sinopsis: formData.sinopsis,
          calificacion: "",
          año: formData.anio,
          disponibilidad: "",
          masVisto: "",
          tipo: "especiales",
          recomendado: formData.recomendado,
          urlTrailer: response.url,
          contador: "0",
          urlPortada: linkImagen2,
          seccion: "",
          estado: "true",
          patrocinador: data2[0],
          patrocinadorPortada: data2[1],
          urlPortadaMovil: linkImagenMovil2
        },
        {
          titulo: formData.nombre,
          categorias: listarCat,
          actores: formData.actores,
          director: formData.director,
          duracion: formData.duracion,
          tipo: "",
          sinopsis: formData.sinopsis,
          calificacion: "",
          año: formData.anio,
          disponibilidad: "",
          masVisto: "",
          tipo: "especiales",
          recomendado: formData.recomendado,
          urlTrailer: response.url,
          contador: "0",
          urlPortada: linkImagen3,
          seccion: "",
          estado: "true",
          patrocinador: data2[0],
          patrocinadorPortada: data2[1],
          urlPortadaMovil: linkImagenMovil3
        },
        {
          titulo: formData.nombre,
          categorias: listarCat,
          actores: formData.actores,
          director: formData.director,
          duracion: formData.duracion,
          tipo: "",
          sinopsis: formData.sinopsis,
          calificacion: "",
          año: formData.anio,
          disponibilidad: "",
          masVisto: "",
          tipo: "especiales",
          recomendado: formData.recomendado,
          urlTrailer: response.url,
          contador: "0",
          urlPortada: linkImagen4,
          seccion: "",
          estado: "true",
          patrocinador: data2[0],
          patrocinadorPortada: data2[1],
          urlPortadaMovil: linkImagenMovil4
        },
        {
          titulo: formData.nombre,
          categorias: listarCat,
          actores: formData.actores,
          director: formData.director,
          duracion: formData.duracion,
          tipo: "",
          sinopsis: formData.sinopsis,
          calificacion: "",
          año: formData.anio,
          disponibilidad: "",
          masVisto: "",
          tipo: "especiales",
          recomendado: formData.recomendado,
          urlTrailer: response.url,
          contador: "0",
          urlPortada: linkImagen5,
          seccion: "",
          estado: "true",
          patrocinador: data2[0],
          patrocinadorPortada: data2[1],
          urlPortadaMovil: linkImagenMovil5
        }];

        map(dataTemp, (registro, index) => (

          setTimeout(() => {
            registraPeliculas(registro).then((response) => {
              const { data } = response;
              //notificacion
  
              toast.success(data.mensaje);
              history({
                search: queryString.stringify(""),
              });
              //setLoading(false);
              //setShow(false);
            })
          }, 500)
          
        ));
        setLoading(false);
        setShow(false);

      } catch (e) {
        console.log(e);
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItems = () => {
    const categoria = document.getElementById("categoria").value

    if (!categoria) {
      toast.warning("Completa la información de la categoria");
    } else {
      const dataTemp = {
        categoria: categoria
      }

      //LogRegistroProductosOV(folioActual, cargaProductos.ID, cargaProductos.item, cantidad, um, precioUnitario, total, setListProductosCargados);
      // console.log(dataTemp)

      setListCategorias(
        [...listarCat, dataTemp]
      );

      //document.getElementById("descripcion").value = ""
      document.getElementById("categoria").value = "Elige una opción"
    }
  }

  // Para limpiar el formulario de detalles de producto
  const cancelarCargaProducto = () => {
    //document.getElementById("descripcion").value = ""
    document.getElementById("categoria").value = "Elige una opción"
  }

  // Para eliminar productos del listado
  const removeItem = (categoria) => {
    let newArray = listarCat;
    newArray.splice(newArray.findIndex(a => a.nombre === categoria.categoria), 1);
    setListCategorias([...newArray]);
  }

  return (
    <>
      {loading && <Load />}
      <div class="bg-white">
        <Button variant="primary" onClick={handleShow} className="btnadd">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <h1 class="text-center">Listado de Especiales</h1>
        <TblEspeciales />
      </div>

      <Modal
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="modalback" closeButton>
          <Modal.Title>Insertar Especial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contact-form">
            <Form onSubmit={onSubmit} onChange={onChange}>
              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Imagen 1</h4>
                <div
                  title="Seleccionar imagen de la categoría"
                  className="imagenPortadaPelicula"
                >
                  <Dropzone setImagenFile={setImagenPortadaPelicula1} />
                </div>
              </div>
              <br />

              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Imagen 2</h4>
                <div
                  title="Seleccionar imagen de la categoría"
                  className="imagenPortadaPelicula"
                >
                  <Dropzone setImagenFile={setImagenPortadaPelicula2} />
                </div>
              </div>
              <br />

              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Imagen 3</h4>
                <div
                  title="Seleccionar imagen de la categoría"
                  className="imagenPortadaPelicula"
                >
                  <Dropzone setImagenFile={setImagenPortadaPelicula3} />
                </div>
              </div>
              <br />

              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Imagen 4</h4>
                <div
                  title="Seleccionar imagen de la categoría"
                  className="imagenPortadaPelicula"
                >
                  <Dropzone setImagenFile={setImagenPortadaPelicula4} />
                </div>
              </div>
              <br />

              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Imagen 5</h4>
                <div
                  title="Seleccionar imagen de la categoría"
                  className="imagenPortadaPelicula"
                >
                  <Dropzone setImagenFile={setImagenPortadaPelicula5} />
                </div>
              </div>
              <br />

              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Imagen para movil 1</h4>
                <div
                  title="Seleccionar imagen de la categoría"
                  className="imagenPortadaPelicula"
                >
                  <Dropzone setImagenFile={setImagenPortadaPeliculaMovil1} />
                </div>
              </div>
              <br />

              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Imagen para movil 2</h4>
                <div
                  title="Seleccionar imagen de la categoría"
                  className="imagenPortadaPelicula"
                >
                  <Dropzone setImagenFile={setImagenPortadaPeliculaMovil2} />
                </div>
              </div>
              <br />

              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Imagen para movil 3</h4>
                <div
                  title="Seleccionar imagen de la categoría"
                  className="imagenPortadaPelicula"
                >
                  <Dropzone setImagenFile={setImagenPortadaPeliculaMovil3} />
                </div>
              </div>
              <br />

              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Imagen para movil 4</h4>
                <div
                  title="Seleccionar imagen de la categoría"
                  className="imagenPortadaPelicula"
                >
                  <Dropzone setImagenFile={setImagenPortadaPeliculaMovil4} />
                </div>
              </div>
              <br />

              <div className="imagenPrincipal">
                <h4 className="textoImagenPrincipal">Imagen para movil 5</h4>
                <div
                  title="Seleccionar imagen de la categoría"
                  className="imagenPortadaPelicula"
                >
                  <Dropzone setImagenFile={setImagenPortadaPeliculaMovil5} />
                </div>
              </div>
              <br />

              <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange2}
                />
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

              {/*<input type="file" name="video" accept=".mp4" onChange={handleFileChange} />
              {videoPath && <video src={videoPath} controls />}*/}
              <br />

              <br />
              <Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    placeholder="Titulo"
                    type="text"
                    name="nombre"
                    defaultValue={formData.nombre}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <Form.Select
                    aria-label="¿Recomendado?"
                    name="recomendado"
                    defaultValue={formData.recomendado}
                  >
                    <option>¿Recomendado?</option>
                    <option value="1">SI</option>
                    <option value="0">NO</option>
                  </Form.Select>
                </Col>
              </Row>
              <br />
              <Form.Control
                placeholder="Actores"
                as="textarea"
                name="actores"
                defaultValue={formData.actores}
              />
              <br />
              <Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    placeholder="Director"
                    type="text"
                    name="director"
                    defaultValue={formData.director}
                  />
                </Col>
                <Col xs={6} md={4}>
                  <Form.Control
                    placeholder="Duración"
                    type="text"
                    name="duracion"
                    defaultValue={formData.duracion}
                  />
                </Col>
              </Row>
              <br />
              <Form.Control
                placeholder="Sinopsis"
                as="textarea"
                name="sinopsis"
                defaultValue={formData.sinopsis}
              />
              <br />
              <Form.Control
                placeholder="Año"
                type="text"
                name="anio"
                defaultValue={formData.anio}
              />
              <br />
              <hr />
              <Badge bg="secondary" className="tituloFormularioDetalles">
                <h4>A continuación, especifica los detalles del artículo y agregalo</h4>
              </Badge>
              <br />
              <hr />

              <Row>

                <Form.Group as={Col} controlId="formGridPorcentaje scrap">
                  <Form.Label>
                    ITEM
                  </Form.Label>
                  <Form.Control type="number"
                    id="index"
                    value={renglon}
                    name="index"
                    disabled
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCliente">
                  <Form.Label>
                    Categoria
                  </Form.Label>
                  <Form.Control
                    id="categoria"
                    as="select"
                    name="categoria"
                    defaultValue={formData.categoria}
                  >
                    <option>Elige una opción</option>
                    {map(listarCategoria, (cat, index) => (
                      <option key={index} value={cat?.nombre}>{cat?.nombre}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Col sm="1">
                  <Form.Group as={Row} className="formGridCliente">
                    <Form.Label>
                      &nbsp;
                    </Form.Label>

                    <Col>
                      <Button
                        variant="success"
                        title="Agregar el producto"
                        className="editar"
                        onClick={() => {
                          addItems()
                        }}
                      >
                        <FontAwesomeIcon icon={faCirclePlus} className="text-lg" />
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        title="Cancelar el producto"
                        className="editar"
                        onClick={() => {
                          cancelarCargaProducto()
                        }}
                      >
                        <FontAwesomeIcon icon={faX} className="text-lg" />
                      </Button>
                    </Col>

                  </Form.Group>
                </Col>
              </Row>

              <hr />

              {/* Listado de productos  */}
              <div className="tablaProductos">

                {/* ID, item, cantidad, um, descripcion, orden de compra, observaciones */}
                {/* Inicia tabla informativa  */}
                <Badge bg="secondary" className="tituloListadoProductosSeleccionados">
                  <h4>Listado de categorias seleccionadas</h4>
                </Badge>
                <br />
                <hr />
                <Table className="responsive-tableRegistroVentas"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tfoot>
                  </tfoot>
                  <tbody>
                    {map(listarCat, (producto, index) => (
                      <tr key={index}>
                        <td scope="row">
                          {index + 1}
                        </td>
                        <td data-title="Descripcion">
                          {producto.categoria}
                        </td>
                        <td data-title="Eliminar">
                          <Badge
                            bg="danger"
                            title="Eliminar"
                            className="eliminar"
                            onClick={() => {
                              removeItem(producto)
                            }}
                          >
                            <FontAwesomeIcon icon={faX} className="text-lg" />
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {/* Termina tabla informativa */}
              </div>

              <label></label>
              <input className="submit" value="Enviar" type="submit" />
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

function initialFormValue() {
  return {
    nombre: "",
    genero: "",
    actores: "",
    director: "",
    duracion: "",
    sinopsis: "",
    anio: "",
    archPelicula: "",
    patrocinador: ""
  };
}

function formatModelCategorias(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      estado: data.estado,
    });
  });
  return dataTemp;
}

function formatModelPatrocinadores(data) {
  const dataTemp = [];
  data.forEach((data) => {
    dataTemp.push({
      id: data._id,
      nombre: data.nombre,
      urlImagen: data.urlImagen,
      urlWeb: data.urlWeb,
      urlFacebook: data.urlFacebook,
      urlInstagram: data.urlInstagram,
      urlTwitter: data.urlTwitter,
      nivel: data.nivel,
      estado: data.estado,
    });
  });
  return dataTemp;
}

export default withRouter(Especiales);

