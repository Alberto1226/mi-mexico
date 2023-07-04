import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Col, Row, Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCirclePlus, faX } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Load } from "../load/load";
import { TblSeries } from "../tables/tablaSeries";
import { eliminarSeries } from "../../api/series";
import { ToastContainer, toast } from "react-toastify";
import { map } from "lodash";

export default function EliminarSeries({data}) {

  console.log(data)

  const dataTemp = {
    nombre: data[1],
    actores: data[3],
    director: data[4],
    duracion: data[5],
    sinopsis: data[6],
    anio: data[9],
  };

  //modal
  const [formData, setFormData] = useState(initialFormValue(dataTemp));

  const [listSeriesCargados, setListSeriesCargados] = useState(data[8]);

  const [show, setShow] = useState(false);
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
      try {
        setLoading(true);
        // Sube a cloudinary la imagen principal del producto

        const dataTemp = {
          titulo: formData.nombre,
          categorias: "",
          actores: formData.actores,
          director: formData.director,
          duracion: formData.duracion,
          sinopsis: formData.sinopsis,
          calificacion: "",
          datosTemporada: listSeriesCargados,
          año: formData.anio,
          disponibilidad: "",
          masVisto: "",
          recomendado: "",
          urlPortada: "",
          seccion: "",
          estado: "true"
        };
        eliminarSeries(data[0], dataTemp).then((response) => {
          const { data } = response;
          //notificacion

          toast.success(data.mensaje);

          window.location.reload();
          //cancelarRegistro()
        });
      } catch (e) {
        console.log(e);
      }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
                    disabled
                  />
                </Col>
              </Row>
              <br />
              <Form.Control
                placeholder="Actores"
                as="textarea"
                name="actores"
                defaultValue={formData.actores}
                disabled
              />
              <br />
              <Form.Control
                placeholder="Director"
                type="text"
                name="director"
                defaultValue={formData.director}
                disabled
              />
              <br />
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
                disabled
              />
              <br />
              <Form.Control
                placeholder="Año"
                type="text"
                name="anio"
                defaultValue={formData.anio}
                disabled
              />
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
  };
}
