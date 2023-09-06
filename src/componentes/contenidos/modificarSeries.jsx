import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row, Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCirclePlus, faX } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { TblSeries } from "../tables/tablaSeries";
import { actualizarSeries } from "../../api/series";
import { ToastContainer, toast } from "react-toastify";
import { map } from "lodash";
import { listarCategorias } from "../../api/categorias";
import queryString from "query-string";
import Dropzone from "../Dropzone/Dropzone";
import { subeArchivosCloudinary } from "../../api/cloudinary";
import { listarPatrocinadores } from "../../api/patrocinadores";

export default function ModificarSeries({ data, history, setShow }) {
  console.log(data)

  const idSerie = data[0];

  const dataTemp = {
    nombre: data[1],
    actores: data[3],
    director: data[4],
    duracion: data[5],
    sinopsis: data[6],
    anio: data[9],
    patrocinador: data[15] + "," + data[16]
  };

  //Para almacenar la imagen del producto que se guardara a la bd
  const [imagenPortadaPelicula, setImagenPortadaPelicula] = useState(data[12]);
  console.log(imagenPortadaPelicula)

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

  //insert
  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.actores || !formData.director || !formData.sinopsis || !formData.anio) {
      toast.warning("Completa el formulario");
    } else {
      try {
        subeArchivosCloudinary(imagenPortadaPelicula, "portadasSeries")
          .then((response) => {
            const { data } = response;
            setLoading(true);
            console.log(data.secure_url)
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
              patrocinador: data2[0],
              patrocinadorPortada: data2[1]
            };
            actualizarSeries(idSerie, dataTemp).then((response) => {
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
          })
          .then((e) => {
            console.log(e);
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
            <h4 className="textoImagenPrincipal">Sube tu imagen</h4>
            <div
              title="Seleccionar imagen de la categoría"
              className="imagenPortadaPelicula"
            >
              <Dropzone
                setImagenFile={setImagenPortadaPelicula}
                imagenProductoBD={data[12]} />
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
