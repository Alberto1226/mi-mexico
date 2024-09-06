import { useState } from 'react';
import { Button, Col, Form, Row, Container, Spinner } from "react-bootstrap";
import PropTypes from 'prop-types';
import { actualizarSeries } from "../../api/series";
import queryString from "query-string";
import { toast } from 'react-toastify';

function ModificacionTemporadas(props) {
    const { datos, setShowModal, history, data } = props;
    console.log(datos)
    console.log(data)

    const [listProductosCargados, setListProductosCargados] = useState(datos[8])

    // Para guardar los datos del formulario
    const [formData, setFormData] = useState(initialFormData({temporada: data[0], nombre: data[1], capitulos: data[2]}));

    // Cancelar y cerrar el formulario
    const cancelarRegistro = () => {
        setShowModal(false);
    };

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    function cambiarValor(id, valorABuscar, valorNuevo) {
        // Crear una copia del array original
        const updatedProductos = listProductosCargados.map((elemento) => {
            if (elemento.temporada === id) {
                return {
                    ...elemento,
                    [valorABuscar]: valorNuevo
                };
            }
            return elemento;
        });
    
        // Actualiza el estado de productos cargados
        setListProductosCargados(updatedProductos);
    
        // Devuelve los productos actualizados
        return updatedProductos;
    }    

    const onSubmit = (e) => {
        e.preventDefault();
    
        try {
            setLoading(true);
    
            // Obtiene la lista actualizada
            let updatedList = cambiarValor(data[0], "nombre", formData.nombre);
            updatedList = cambiarValor(data[0], "capitulos", formData.capitulos);
    
            const dataTemp = {
                datosTemporada: updatedList,
            };
    
            actualizarSeries(datos[0], dataTemp)
                .then((response) => {
                    const { data } = response;
                    toast.success(data.mensaje);
    
                    history({
                        search: queryString.stringify(""),
                    });
                    setLoading(false);
                    setShowModal(false);
                })
                .catch((e) => {
                    console.log(e);
                    if (e.message === "Network Error") {
                        toast.error("Conexión al servidor no disponible");
                        setLoading(false);
                    } else if (e.response && e.response.status === 401) {
                        const { mensaje } = e.response.data;
                        toast.error(mensaje);
                        setLoading(false);
                    }
                });
        } catch (e) {
            console.log(e);
        }
    };    

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Container fluid>
                <div className="formularioDatos">
                    <Form onChange={onChange}>
                        <Row>
                            <Form.Group as={Col} controlId="formGridCliente">
                                <Form.Label>
                                    Nombre
                                </Form.Label>
                                <Form.Control
                                    id="nombre"
                                    type="text"
                                    value={formData.nombre}
                                    name="nombre"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCliente">
                                <Form.Label>
                                    Capitulos
                                </Form.Label>
                                <Form.Control
                                    id="capitulos"
                                    type="text"
                                    value={formData.capitulos}
                                    name="capitulos"
                                />
                            </Form.Group>
                        </Row>
                        <br />
                        <div className="divSubmit">
                            <input className="submit" value="Enviar" type="button" onClick={onSubmit} />
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    );
}

function initialFormData(data) {
    return {
        nombre: data.nombre,
        capitulos: data.capitulos,
    };
}

ModificacionTemporadas.propTypes = {
    datos: PropTypes.object.isRequired,
    setShowModal: PropTypes.func.isRequired,
    listProductosCargados: PropTypes.array.isRequired,
    setListProductosCargados: PropTypes.func.isRequired,
};

export default ModificacionTemporadas;