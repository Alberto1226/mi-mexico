import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row, Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCirclePlus, faX } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { actualizarSeriesEspeciales } from "../../api/seriesEspeciales";
import { toast } from "react-toastify";
import { map } from "lodash";
import { listarCategorias } from "../../api/categorias";
import queryString from "query-string";
import Dropzone from "../Dropzone/Dropzone";
import { subeArchivosCloudinary } from "../../api/cloudinary";
import { listarPatrocinadores } from "../../api/patrocinadores";

export default function ModificarSeriesEspeciales({ data, history, setShow }) {
  console.log(data);

  const idSerie = data[0];

  const dataTemp = {
    nombre: data[1],
    actores: data[3],
    director: data[4],
    duracion: data[5],
    sinopsis: data[6],
    anio: data[9],
    patrocinador: data[19] + "," + data[20],
  };

  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenPortadaPelicula1, setImagenPortadaPelicula1] = useState(data[12]);
  const [imagenPortadaPelicula2, setImagenPortadaPelicula2] = useState(data[15]);
  const [imagenPortadaPelicula3, setImagenPortadaPelicula3] = useState(data[16]);
  const [imagenPortadaPelicula4, setImagenPortadaPelicula4] = useState(data[17]);
  const [imagenPortadaPelicula5, setImagenPortadaPelicula5] = useState(data[18]);

  //modal
  const [formData, setFormData] = useState(initialFormValue(dataTemp));

  const [listSeriesCargados, setListSeriesCargados] = useState(data[8]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //capitulos Dinamicos
  const [temporadas, setTemporadas] = useState("");
  const [capitulos, setCapitulos] = useState([]);

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

  const [listarCat, setListCategorias] = useState(data[2]);
  const [listarCategoria, setListarCategoria] = useState([]);

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
          urlPortada: data.secure_url,
          masVisto: "",
          recomendado: "",
          seccion: "",
          urlPortada2: linkImagen2,
          urlPortada3: linkImagen3,
          urlPortada4: linkImagen4,
          urlPortada5: linkImagen5,
          patrocinador: data2[0],
          patrocinadorPortada: data2[1]
        };
        actualizarSeriesEspeciales(idSerie, dataTemp).then((response) => {
          const { data } = response;
          //notificacion

          toast.success(data.mensaje);

          history({
            search: queryString.stringify(""),
          });
          setLoading(false);
          setShow(false);
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

  return (
    <>
      {loading && <Load />}
      <div className="contact-form">
        <Form onSubmit={onSubmit} onChange={onChange}>
          <div className="imagenPrincipal">
            <h4 className="textoImagenPrincipal">Imagen 1</h4>
            <div
              title="Seleccionar imagen de la categoría"
              className="imagenPortadaPelicula"
            >
              <Dropzone setImagenFile={setImagenPortadaPelicula1} imagenProductoBD={data[12]} />
            </div>
          </div>
          <br />

          <div className="imagenPrincipal">
            <h4 className="textoImagenPrincipal">Imagen 2</h4>
            <div
              title="Seleccionar imagen de la categoría"
              className="imagenPortadaPelicula"
            >
              <Dropzone setImagenFile={setImagenPortadaPelicula2} imagenProductoBD={data[15]} />
            </div>
          </div>
          <br />

          <div className="imagenPrincipal">
            <h4 className="textoImagenPrincipal">Imagen 3</h4>
            <div
              title="Seleccionar imagen de la categoría"
              className="imagenPortadaPelicula"
            >
              <Dropzone setImagenFile={setImagenPortadaPelicula3} imagenProductoBD={data[16]} />
            </div>
          </div>
          <br />

          <div className="imagenPrincipal">
            <h4 className="textoImagenPrincipal">Imagen 4</h4>
            <div
              title="Seleccionar imagen de la categoría"
              className="imagenPortadaPelicula"
            >
              <Dropzone setImagenFile={setImagenPortadaPelicula4} imagenProductoBD={data[17]} />
            </div>
          </div>
          <br />

          <div className="imagenPrincipal">
            <h4 className="textoImagenPrincipal">Imagen 5</h4>
            <div
              title="Seleccionar imagen de la categoría"
              className="imagenPortadaPelicula"
            >
              <Dropzone setImagenFile={setImagenPortadaPelicula5} imagenProductoBD={data[18]} />
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
    </>
  );
}

function initialFormValue(data) {
  return {
    nombre: data.nombre,
    actores: data.actores,
    director: data.director,
    duracion: data.duracion,
    sinopsis: data.sinopsis,
    anio: data.anio,
    patrocinador: data.patrocinador
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
