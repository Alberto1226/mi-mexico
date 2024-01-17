import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row, Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCirclePlus, faX } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import TblSeriesEspeciales from "../tables/tablaSeriesEspeciales";
import { registraSeriesEspeciales } from "../../api/seriesEspeciales";
import { ToastContainer, toast } from "react-toastify";
import { map } from "lodash";
import { listarCategorias } from "../../api/categorias";
import { withRouter } from "../../utils/withRouter";
import queryString from "query-string";
import Dropzone from "../Dropzone/Dropzone";
import { subeArchivosCloudinary } from "../../api/cloudinary";
import { listarPatrocinadores } from "../../api/patrocinadores";
import VideoUploader from "../upVideos/FileUpdate";

function SeriesEspeciales({ history }) {
  //modal
  const [formData, setFormData] = useState(initialFormValue());
  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenPortadaPelicula1, setImagenPortadaPelicula1] = useState(null);
  const [imagenPortadaPelicula2, setImagenPortadaPelicula2] = useState(null);
  const [imagenPortadaPelicula3, setImagenPortadaPelicula3] = useState(null);
  const [imagenPortadaPelicula4, setImagenPortadaPelicula4] = useState(null);
  const [imagenPortadaPelicula5, setImagenPortadaPelicula5] = useState(null);
  const [listSeriesCargados, setListSeriesCargados] = useState([]);
  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenPortadaPeliculaMovil1, setImagenPortadaPeliculaMovil1] = useState(null);
  const [imagenPortadaPeliculaMovil2, setImagenPortadaPeliculaMovil2] = useState(null);
  const [imagenPortadaPeliculaMovil3, setImagenPortadaPeliculaMovil3] = useState(null);
  const [imagenPortadaPeliculaMovil4, setImagenPortadaPeliculaMovil4] = useState(null);
  const [imagenPortadaPeliculaMovil5, setImagenPortadaPeliculaMovil5] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //capitulos Dinamicos
  const [temporadas, setTemporadas] = useState("");
  const [capitulos, setCapitulos] = useState([]);

  const [listarCat, setListCategorias] = useState([]);
  const [listarCategoria, setListarCategoria] = useState([]);
  const [videoPath, setVideoPath] = useState("");

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

  const renglon2 = listarCat.length + 1;

  const handleTemporadasChange = (event) => {
    const numTemporadas = parseInt(event.target.value);
    setTemporadas(numTemporadas);

    const nuevosCapitulos = [...capitulos];
    while (nuevosCapitulos.length < numTemporadas) {
      nuevosCapitulos.push("");
    }
    while (nuevosCapitulos.length > numTemporadas) {
      nuevosCapitulos.pop();
    }
    setCapitulos(nuevosCapitulos);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes hacer algo con los datos ingresados, como enviarlos a un servidor
    console.log("Temporadas:", temporadas);
    console.log("Capítulos:", capitulos);
  };

  //load
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const addItems = () => {
    const temporada = document.getElementById("temporada").value
    const capitulos = document.getElementById("capitulos").value
    const nombre = document.getElementById("nombre").value

    if (!capitulos) {
      toast.warning("Completa la información del producto");
    } else {
      const dataTemp = {
        temporada: temporada,
        nombre: nombre,
        capitulos: capitulos,
      }

      //LogRegistroProductosOV(folioActual, cargaProductos.ID, cargaProductos.item, cantidad, um, precioUnitario, total, setListProductosCargados);
      // console.log(dataTemp)

      setListSeriesCargados(
        [...listSeriesCargados, dataTemp]
      );

      //document.getElementById("descripcion").value = ""
      document.getElementById("capitulos").value = ""
      document.getElementById("nombre").value = ""
      document.getElementById("temporada").value = ""
    }
  }

  // Para limpiar el formulario de detalles de producto
  const cancelarCargaProducto = () => {
    //document.getElementById("descripcion").value = ""
    document.getElementById("capitulos").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("temporada").value = ""
  }

  // Para eliminar productos del listado
  const removeItem = (serie) => {
    let newArray = listSeriesCargados;
    newArray.splice(newArray.findIndex(a => a.capitulos === serie.capitulos), 1);
    setListSeriesCargados([...newArray]);
  }

  const renglon = listSeriesCargados.length + 1;

  const [linkImagen1, setLinkImagen1] = useState("");

  const cargarImagen1 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPelicula1, "portadasSeries").then(response => {
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
      subeArchivosCloudinary(imagenPortadaPelicula2, "portadasSeries").then(response => {
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
      subeArchivosCloudinary(imagenPortadaPelicula3, "portadasSeries").then(response => {
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
      subeArchivosCloudinary(imagenPortadaPelicula4, "portadasSeries").then(response => {
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
      subeArchivosCloudinary(imagenPortadaPelicula5, "portadasSeries").then(response => {
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
  //insert
  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.actores || !formData.director || !formData.sinopsis || !formData.anio) {
      toast.warning("Completa el formulario");
    } else {
      try {
        setLoading(true);
        // Sube a cloudinary la imagen principal del producto
        const data2 = formData.patrocinador.split(",")
        const dataTemp = {
          titulo: formData.nombre,
          categorias: listarCat,
          actores: formData.actores,
          director: formData.director,
          duracion: formData.duracion,
          sinopsis: formData.sinopsis,
          calificacion: "",
          datosTemporada: listSeriesCargados,
          año: formData.anio,
          disponibilidad: "",
          masVisto: "",
          header: formData.header,
          recomendado: "",
          contador: "0",
          urlPortada: linkImagen1,
          urlTrailer: `https://www.mxtvmas.com:8443/mimexico/series/${formDataURL.urlTrailer}`,
          seccion: "",
          estado: "true",
          urlPortada2: linkImagen2,
          urlPortada3: linkImagen3,
          urlPortada4: linkImagen4,
          urlPortada5: linkImagen5,
          patrocinador: data2[0],
          patrocinadorPortada: data2[1],
          urlPortadaMovil: linkImagenMovil1,
          urlPortadaMovil2: linkImagenMovil2,
          urlPortadaMovil3: linkImagenMovil3,
          urlPortadaMovil4: linkImagenMovil4,
          urlPortadaMovil5: linkImagenMovil5,
        };
        registraSeriesEspeciales(dataTemp).then((response) => {
          const { data } = response;
          //notificacion

          toast.success(data.mensaje);

          history({
            search: queryString.stringify(""),
          });
          setLoading(false);
          setShow(false);
          //cancelarRegistro()
        }).catch(e => {
          console.log(e)
          if (e.message === 'Network Error') {
            //console.log("No hay internet")
            toast.error("Conexión al servidor no disponible");
            setLoading(false);
          } else {
            if (e.response && e.response.status === 401) {
              const { mensaje } = e.response.data;
              toast.error(mensaje);
              setLoading(false);
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItems2 = () => {
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
  const cancelarCargaProducto2 = () => {
    //document.getElementById("descripcion").value = ""
    document.getElementById("categoria").value = "Elige una opción"
  }

  // Para eliminar productos del listado
  const removeItem2 = (categoria) => {
    let newArray = listarCat;
    newArray.splice(newArray.findIndex(a => a.nombre === categoria.categoria), 1);
    setListCategorias([...newArray]);
  }



  /**
   * url del video
   */

  const [formDataURL, setFormDataURL] = useState({
    urlTrailer: "",
  });

  // Función de retorno para la URL del video
  const handleVideoPathChange = (videoPath) => {
    // Actualiza el estado del formulario con la URL del video
    setFormDataURL({
      ...formDataURL,
      urlTrailer: videoPath,
    });
  };

  // useEffect para manejar la carga del video
  useEffect(() => {
    const handleVideoLoad = () => {
      // Actualiza el estado del formulario con la URL del video cuando el video termine de cargarse
      setFormDataURL({
        ...formDataURL,
        urlTrailer: videoPath,
      });
    };

    return () => {
      // No olvides limpiar los efectos secundarios si es necesario
      // En este caso, no estamos utilizando nada que necesite ser limpiado
    };
  }, [videoPath, formDataURL]);

  return (
    <>
      {loading && <Load />}
      <div class="bg-white">
        <Button variant="primary" onClick={handleShow} className="btnadd">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <h1 class="text-center">Listado de Series Especiales</h1>
        <TblSeriesEspeciales />
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
          <Modal.Title>Insertar Serie Especial</Modal.Title>
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
                    aria-label="¿Header?"
                    name="header"
                    defaultValue={formData.header}
                  >
                    <option>¿Header?</option>
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
              <Form.Control
                placeholder="Director"
                type="text"
                name="director"
                defaultValue={formData.director}
              />
              <br />
              <hr />
              <Badge bg="secondary" className="tituloFormularioDetalles">
                <h4>A continuación, especifica los detalles de la temporada y agregala</h4>
              </Badge>
              <br />
              <hr />

              <Row>

                <Form.Group as={Col} controlId="formGridPorcentaje scrap">
                  <Form.Label>
                    Temporada
                  </Form.Label>
                  <Form.Control
                    type="number"
                    id="temporada"
                    placeholder="Temporada"
                    name="temporada"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPorcentaje scrap">
                  <Form.Label>
                    Nombre
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="nombre"
                    placeholder="Nombre"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>
                    Capitulos
                  </Form.Label>
                  <Form.Control
                    id="capitulos"
                    type="text"
                    placeholder='Capitulos'
                    name="capitulos"
                  />
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
                  <h4>Listado de temporadas</h4>
                </Badge>
                <br />
                <hr />
                <Table className="responsive-tableRegistroVentas"
                >
                  <thead>
                    <tr>
                      <th scope="col">Temporada</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Capitulos</th>
                    </tr>
                  </thead>
                  <tfoot>
                  </tfoot>
                  <tbody>
                    {map(listSeriesCargados, (producto, index) => (
                      <tr key={index}>
                        <td scope="row">
                          {producto.temporada}
                        </td>
                        <td scope="row">
                          {producto.nombre}
                        </td>
                        <td data-title="Descripcion">
                          {producto.capitulos}
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
              <Col xs={12} md={12}>
                {/* Asegúrate de pasar las funciones correctamente */}
                <VideoUploader contentType="specialSeries" setVideoPathCallback={handleVideoPathChange} />
              </Col>
              <hr />
              <Col xs={12} md={12}>
                <Form.Control
                  placeholder="URL del trailer"
                  type="text"
                  name="urlTrailer"
                  value={formDataURL.urlTrailer}
                  readOnly
                />
              </Col>
              <hr />
              <Badge bg="secondary" className="tituloFormularioDetalles">
                <h4>A continuación, especifica las categorias</h4>
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
                    value={renglon2}
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
                          addItems2()
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
                          cancelarCargaProducto2()
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
                              removeItem2(producto)
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
    urlTrailer: "",
    patrocinador: "",
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

export default withRouter(SeriesEspeciales);
