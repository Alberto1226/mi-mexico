import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row, Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCirclePlus, faX } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import TblSeries from "../tables/tablaSeries";
import { actualizarSeries } from "../../api/series";
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

function ActualizarTemporadas({ history, data, setShow }) {
  console.log(data);
  const idSerie = data[0];
  //modal
  const [formData, setFormData] = useState(initialFormValue());
  const [imagenPortadaPelicula, setImagenPortadaPelicula] = useState(null);
  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenPortadaPeliculaMovil, setImagenPortadaPeliculaMovil] =
    useState(null);
  const [listSeriesCargados, setListSeriesCargados] = useState(data[8]);
  const [videoPath, setVideoPath] = useState("");
  //capitulos Dinamicos
  const [temporadas, setTemporadas] = useState("");

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

  const [temporada, setTemporada] = useState("");
  const [nombre, setNombre] = useState("");
  const [capitulos, setCapitulos] = useState("");


  const addItems = () => {

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
      setTemporada("");
      setNombre("");
      setCapitulos("");
    }
  };

  // Para limpiar el formulario de detalles de producto
  const cancelarCargaProducto = () => {
    //document.getElementById("descripcion").value = ""
    setTemporada("");
      setNombre("");
      setCapitulos("");
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

      try {
        setLoading(true);
        const dataTemp = {
          datosTemporada: listSeriesCargados,
        };
        actualizarSeries(idSerie, dataTemp)
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
          <br />
          <hr />
          <Badge bg="secondary" className="tituloFormularioDetalles">
            <h4>
              A continuación, especifica los detalles de la temporada y agregala
            </h4>
          </Badge>
          <br />
          <hr />

          <Row>
            <Form.Group as={Col} controlId="formGridPorcentaje scrap">
              <Form.Label>Temporada</Form.Label>
              <Form.Control
                type="number"
                id="temporada"
                placeholder="Temporada"
                name="temporada"
                value={temporada}
                onChange={(e) => setTemporada(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPorcentaje scrap">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                id="nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Capitulos</Form.Label>
              <Form.Control
                id="capitulos"
                type="text"
                placeholder="Capitulos"
                name="capitulos"
                value={capitulos}
                onChange={(e) => setCapitulos(e.target.value)}
              />
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
                      addItems();
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
                      cancelarCargaProducto();
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
              <h4>Listado de temporadas</h4>
            </Badge>
            <br />
            <hr />
            <Table className="responsive-tableRegistroVentas">
              <thead>
                <tr>
                  <th scope="col">Temporada</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Capitulos</th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {map(listSeriesCargados, (producto, index) => (
                  <tr key={index}>
                    <td scope="row">{producto.temporada}</td>
                    <td scope="row">{producto.nombre}</td>
                    <td data-title="Descripcion">{producto.capitulos}</td>
                    <td data-title="Eliminar">
                      <Badge
                        bg="danger"
                        title="Eliminar"
                        className="eliminar"
                        onClick={() => {
                          removeItem(producto);
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
          <hr />
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

export default withRouter(ActualizarTemporadas);
