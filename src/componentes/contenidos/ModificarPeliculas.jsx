import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row, Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { TblPeliculas } from "../tables/tablePeliculas";
import { actualizarPeliculas } from "../../api/peliculasListar";
import { ToastContainer, toast } from "react-toastify";
import { listarCategorias } from "../../api/categorias";
import { map } from "lodash";

export default function ModificarPeliculas({ data }) {

  const dataTemp = {
    nombre: data[1],
    actores: data[3],
    director: data[4],
    duracion: data[5],
    sinopsis: data[7],
    anio: data[9],
    archPelicula: data[12]
  };

  const [formData, setFormData] = useState(initialFormValue(dataTemp));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const renglon = listarCat.length + 1;

  //load
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 500);
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

        const dataTemp = {
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
          recomendado: "",
          urlVideo: formData.archPelicula,
          urlPortada: "",
          seccion: "",
          estado: "true"
        };
        actualizarPeliculas(data[0], dataTemp).then((response) => {
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
      <div className="contact-form">
        <Form onSubmit={onSubmit} onChange={onChange}>
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
          <Form.Control
            placeholder="Archivo"
            type="text"
            name="archPelicula"
            defaultValue={formData.archPelicula}
          />
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
    archPelicula: data.archPelicula
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
