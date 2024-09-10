import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row, Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCirclePlus, faX } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import TblSeries from "../tables/tablaSeries";
import { registraSeries } from "../../api/series";
import { HolaPeliculas } from "../../api/peliculasListar";
import { ToastContainer, toast } from "react-toastify";
import { map } from "lodash";
import { listarCategorias } from "../../api/categorias";
import { withRouter } from "../../utils/withRouter";
import queryString from "query-string";
import Dropzone from "../Dropzone/Dropzone";
import { subeArchivosCloudinary } from "../../api/cloudinary";
import { listarPatrocinadores } from "../../api/patrocinadores";
import VideoUploader from "../upVideos/FileUpdate";
import { Spinner } from "react-bootstrap";

function Series({ history }) {
  //modal
  const [formData, setFormData] = useState(initialFormValue());
  const [imagenPortadaPelicula, setImagenPortadaPelicula] = useState(null);
  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenPortadaPeliculaMovil, setImagenPortadaPeliculaMovil] =
    useState(null);
  const [listSeriesCargados, setListSeriesCargados] = useState([]);
  const [videoPath, setVideoPath] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //capitulos Dinamicos
  const [temporadas, setTemporadas] = useState("");
  const [capitulos, setCapitulos] = useState([]);

  const [listarCat, setListCategorias] = useState([]);
  const [listarCategoria, setListarCategoria] = useState([]);
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
    const temporada = document.getElementById("temporada").value;
    const capitulos = document.getElementById("capitulos").value;
    const nombre = document.getElementById("nombre").value;

    if (!capitulos) {
      toast.warning("Completa la información del producto");
    } else {
      const dataTemp = {
        temporada: temporada,
        nombre: nombre,
        capitulos: capitulos,
      };

      //LogRegistroProductosOV(folioActual, cargaProductos.ID, cargaProductos.item, cantidad, um, precioUnitario, total, setListProductosCargados);
      // console.log(dataTemp)

      setListSeriesCargados([...listSeriesCargados, dataTemp]);

      //document.getElementById("descripcion").value = ""
      document.getElementById("capitulos").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("temporada").value = "";
    }
  };

  // Para limpiar el formulario de detalles de producto
  const cancelarCargaProducto = () => {
    //document.getElementById("descripcion").value = ""
    document.getElementById("capitulos").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("temporada").value = "";
  };

  // Para eliminar productos del listado
  const removeItem = (serie) => {
    let newArray = listSeriesCargados;
    newArray.splice(
      newArray.findIndex((a) => a.capitulos === serie.capitulos),
      1
    );
    setListSeriesCargados([...newArray]);
  };

  const renglon = listSeriesCargados.length + 1;

  const [linkImagen1, setLinkImagen1] = useState("");

  const cargarImagen1 = () => {
    try {
      subeArchivosCloudinary(imagenPortadaPelicula, "portadasSeries")
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
      subeArchivosCloudinary(imagenPortadaPeliculaMovil, "portadasSeries")
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
      !formData.nombre ||
      !formData.actores ||
      !formData.director ||
      !formData.sinopsis ||
      !formData.anio
    ) {
      toast.warning("Completa el formulario");
    } else {
      try {
        setLoading(true);
        // Sube a cloudinary la imagen principal del producto
        const data2 = formData.patrocinador.split(",");
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
          urlTrailer: response.url,
          seccion: "",
          estado: "true",
          patrocinador: data2[0],
          patrocinadorPortada: data2[1],
          urlPortadaMovil: linkImagen2,
        };
        registraSeries(dataTemp)
          .then((response) => {
            const { data } = response;
            //notificacion

            toast.success(data.mensaje);

            history({
              search: queryString.stringify(""),
            });
            setLoading(false);
            setShow(false);
            //cancelarRegistro()
          })
          .catch((e) => {
            console.log(e);
            if (e.message === "Network Error") {
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
    const categoria = document.getElementById("categoria").value;

    if (!categoria) {
      toast.warning("Completa la información de la categoria");
    } else {
      const dataTemp = {
        categoria: categoria,
      };

      //LogRegistroProductosOV(folioActual, cargaProductos.ID, cargaProductos.item, cantidad, um, precioUnitario, total, setListProductosCargados);
      // console.log(dataTemp)

      setListCategorias([...listarCat, dataTemp]);

      //document.getElementById("descripcion").value = ""
      document.getElementById("categoria").value = "Elige una opción";
    }
  };

  // Para limpiar el formulario de detalles de producto
  const cancelarCargaProducto2 = () => {
    //document.getElementById("descripcion").value = ""
    document.getElementById("categoria").value = "Elige una opción";
  };

  // Para eliminar productos del listado
  const removeItem2 = (categoria) => {
    let newArray = listarCat;
    newArray.splice(
      newArray.findIndex((a) => a.nombre === categoria.categoria),
      1
    );
    setListCategorias([...newArray]);
  };

  /**
   * subir video
   */

  /**
   * url del video
   */

  const [formDataURL, setFormDataURL] = useState({
    urlTrailer: "",
  });

  console.log("url video", formDataURL);
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
      <div className="contact-form">
        <Form onSubmit={onSubmit} onChange={onChange}>
          <div className="imagenPrincipal">
            <h4 className="textoImagenPrincipal">Sube tu imagen</h4>
            <div
              title="Seleccionar imagen de la categoría"
              className="imagenPortadaPelicula"
            >
              <Dropzone setImagenFile={setImagenPortadaPelicula} />
            </div>
          </div>
          <br />
          <div className="imagenPrincipal">
            <h4 className="textoImagenPrincipal">
              Sube tu imagen para movil
            </h4>
            <div
              title="Seleccionar imagen de la categoría"
              className="imagenPortadaPelicula"
            >
              <Dropzone setImagenFile={setImagenPortadaPeliculaMovil} />
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

          <hr />
          <Badge bg="secondary" className="tituloFormularioDetalles">
            <h4>A continuación, especifica las categorias</h4>
          </Badge>
          <br />
          <hr />

          <Row>
            <Form.Group as={Col} controlId="formGridPorcentaje scrap">
              <Form.Label>ITEM</Form.Label>
              <Form.Control
                type="number"
                id="index"
                value={renglon2}
                name="index"
                disabled
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCliente">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                id="categoria"
                as="select"
                name="categoria"
                defaultValue={formData.categoria}
              >
                <option>Elige una opción</option>
                {map(listarCategoria, (cat, index) => (
                  <option key={index} value={cat?.nombre}>
                    {cat?.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Col sm="1">
              <Form.Group as={Row} className="formGridCliente">
                <Form.Label>&nbsp;</Form.Label>

                <Col>
                  <Button
                    variant="success"
                    title="Agregar el producto"
                    className="editar"
                    onClick={() => {
                      addItems2();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className="text-lg"
                    />
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    title="Cancelar el producto"
                    className="editar"
                    onClick={() => {
                      cancelarCargaProducto2();
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
            <Badge
              bg="secondary"
              className="tituloListadoProductosSeleccionados"
            >
              <h4>Listado de categorias seleccionadas</h4>
            </Badge>
            <br />
            <hr />
            <Table className="responsive-tableRegistroVentas">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {map(listarCat, (producto, index) => (
                  <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td data-title="Descripcion">{producto.categoria}</td>
                    <td data-title="Eliminar">
                      <Badge
                        bg="danger"
                        title="Eliminar"
                        className="eliminar"
                        onClick={() => {
                          removeItem2(producto);
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

export default withRouter(Series);
