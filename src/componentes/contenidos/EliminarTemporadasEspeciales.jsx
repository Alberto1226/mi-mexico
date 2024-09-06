import { useState } from 'react';
import { Button, Col, Form, Row, Container, Spinner } from "react-bootstrap";
import PropTypes from 'prop-types';
import { actualizarSeriesEspeciales } from "../../api/seriesEspeciales";
import queryString from "query-string";
import { toast } from 'react-toastify';

function EliminacionTemporadasEspeciales(props) {
    const { datos, setShowModal, history, data } = props;

    const [listProductosCargados, setListProductosCargados] = useState(datos[8]);

    // Cancelar y cerrar el formulario
    const cancelarRegistro = () => {
        setShowModal(false);
    };

    // Para controlar la animacion
    const [loading, setLoading] = useState(false);

    function eliminarElemento(id) {
        // Filter out the element with the given id
        const updatedProductos = listProductosCargados.filter((elemento) => elemento.temporada !== id);

        // Update the state with the filtered array
        setListProductosCargados(updatedProductos);

        // Return the updated products list
        return updatedProductos;
    }

    const onSubmit = (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Eliminate the selected season from the list
            const updatedList = eliminarElemento(data[0]);

            const dataTemp = {
                datosTemporada: updatedList,
            };

            actualizarSeriesEspeciales(datos[0], dataTemp)
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

    return (
        <>
            <Container fluid>
                <div className="formularioDatos">
                    <Form>
                        <Row>
                            <Col>
                                <Form.Label>¿Deseas eliminar esta temporada?</Form.Label>
                            </Col>
                        </Row>
                        <br />
                        <div className="divSubmit">
                            <input className="submit" value="Eliminar" type="button" onClick={onSubmit} />
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    );
}

EliminacionTemporadasEspeciales.propTypes = {
    datos: PropTypes.object.isRequired,
    setShowModal: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
};

export default EliminacionTemporadasEspeciales;
