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

export default function ModificarCapitulosTemporadas({ data }) {
  
    const dataTemp = {
    datosTemporada: data[8],
  };
  const [listSeriesCargados, setListSeriesCargados] = useState(data[8]);
  const datosTemporada = data[8];
  
  const numCapitulos = parseInt(datosTemporada[0].capitulos);
  console.log(numCapitulos);
  // Generar una tabla con los detalles de cada capítulo
 /* const capitulosTable = [];
  for (let i = 0; i < numCapitulos; i++) {
    capitulosTable.push(
      <tr key={i}>
        <td>
          
          <Form.Control
            placeholder="Nombre capitulo"
            type="text"
            name="capitulo"
            //defaultValue={formData.anio}
          />
        </td>
        <td>
          
          <Form.Control
            placeholder="URL Capitulo"
            type="text"
            name="URLCapitulo"
            //defaultValue={formData.anio}
          />
        </td>
        <td>
          
          <Form.Control
            placeholder="URL Portada"
            type="text"
            name="Portada"
            //defaultValue={formData.anio}
          />
        </td>
        <td>
          
          <Form.Control
            placeholder="Duración"
            type="text"
            name="Duración"
            //defaultValue={formData.anio}
          />
        </td>
        <td>
          
          <Form.Control
            placeholder="Descripción"
            type="text"
            name="Descripción"
            //defaultValue={formData.anio}
          />
        </td>
      </tr>
    );
  }*/
  // Generate tables for each season

  let capitulosTables = [];
  
  
  datosTemporada.forEach((temporada, index) => {
    const numCapitulos = parseInt(temporada.capitulos);
    const capitulosTable = [];
   
    
    for (let i = 0; i < numCapitulos; i++) {
        const detallesTemp = temporada.detallesTemporada;
        console.log(detallesTemp);
      capitulosTable.push(
        <tr key={i}>
          <td>
            <Form.Control
              placeholder="Nombre capitulo"
              type="text"
              name={`capitulo_${index}_${i}`} // identificacion de input
              defaultValue={detallesTemp && detallesTemp[i] ? detallesTemp[i].nombreCapitulo : ''}
              //defaultValue={listSeriesCargados.detallesTemporada.nombreCapitulo}
            />
          </td>
          <td>
            <Form.Control
              placeholder="URL Capitulo"
              type="text"
              name={`URLCapitulo_${index}_${i}`}
              defaultValue={detallesTemp && detallesTemp[i] ? detallesTemp[i].urlCapitulo : ''}
            />
          </td>
          <td>
            <Form.Control
              placeholder="URL Portada"
              type="text"
              name={`Portada_${index}_${i}`}
              defaultValue={detallesTemp && detallesTemp[i] ? detallesTemp[i].urlPortadaCapitulo : ''}
            />
          </td>
          <td>
            <Form.Control
              placeholder="Duración"
              type="text"
              name={`Duración_${index}_${i}`}
              defaultValue={detallesTemp && detallesTemp[i] ? detallesTemp[i].duracionCapitulo : ''}
            />
          </td>
          <td>
            <Form.Control
              placeholder="Descripción"
              type="text"
              name={`Descripción_${index}_${i}`}
              defaultValue={detallesTemp && detallesTemp[i] ? detallesTemp[i].descripcionCapitulo : ''}
            />
          </td>
        </tr>
      );
    }

    capitulosTables.push(
      <div key={index}>
        <h3>Temporada {temporada.temporada}</h3>
        <table>
          <tbody>
            {capitulosTable}
          </tbody>
        </table>
      </div>
    );
  });
  //modal
  const [formData, setFormData] = useState(initialFormValue(dataTemp));

  

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
          estado: "true",
        };
        actualizarSeries(data[0], dataTemp).then((response) => {
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

  return (
    <>
      <div className="contact-form">
        <Form onSubmit={onSubmit} onChange={onChange}>
        {capitulosTables}
          <label></label>
          <input className="submit" value="Enviar" type="submit" />
        </Form>
      </div>
    </>
  );
}

function initialFormValue(data) {
  return {
    datosTemporada: data.datosTemporada,
    nombre: data.nombre,
    actores: data.actores,
    director: data.director,
    duracion: data.duracion,
    sinopsis: data.sinopsis,
    anio: data.anio,
  };
}
