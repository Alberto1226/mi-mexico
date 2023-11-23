import "../../css/registro.css";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export function Registro() {
  /**Modal */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**picker */
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);

  };
  return (
    <>
    <Helmet>
    <title>Registro - miMéxicoTV</title>
        <meta name="description" content="Regístrate en Turismo Méxicano y descubre un mundo de posibilidades para explorar los destinos turísticos más fascinantes de México. Obtén acceso exclusivo a contenido, planifica tus viajes y disfruta de una experiencia única con nuestra plataforma de streaming." />
        <link rel="canonical" href="https://mimexicotv.com/" />
      </Helmet>
      <div class="content">
        <div class="container">

          <h2>
            Únete a la plataforma de videos que promueve los destinos y cultura
            de México para el mundo
          </h2>
          <h2 class="a">INFORMACIÓN BÁSICA SOBRE PROTECCIÓN DE DATOS</h2>
          <p>
            Los Términos y Condiciones de Uso que a continuación se presentan (en lo sucesivo los “Términos de Uso”), que regulan el uso del portal digital www.mimexicotv.mx

            La utilización de “El Portal” por parte de cualquier persona, le atribuye la calidad de usuario (en lo sucesivo “El Usuario”) y ello implica su adhesión plena y sometimiento total e incondicional a estos “Términos de Uso”; en consecuencia, es indispensable que “El Usuario” los lea previamente y los evalúe de forma cuidadosa, de tal manera que esté consciente de que se sujeta a ellos y a las modificaciones que pudieran sufrir, cada vez que accede a “El Portal”.

            Si en cualquier momento “El Usuario” no estuviera de acuerdo total o parcialmente con estos “Términos de Uso”, deberá abstenerse inmediatamente de usar “El Portal” en cualquiera de sus “partes o secciones”.

            Partes o secciones: Que se refiere a el enlace de “el portal” con sus secciones y/o sitios vinculados a este para cumplimiento de sus objetivos: www.mimexicotv.mx y sus redes oficialmente vinculadas.

          </p>
          <h2 class="a">1.	USO Y RESTRICCIONES.</h2>
          <p>
            “El Usuario” reconoce que no todos los Servicios y Contenidos están disponibles en todas las áreas geográficas y que algunos Servicios y Contenidos pueden ser utilizados solamente con posterioridad a la inscripción o registro previo por el usuario y/o el pago de una comisión, según se indique expresamente.
            No garantiza la disponibilidad y continuidad de la operacion de El Portal y de los servicios y Contenidos, ni la utilidad de “El Portal” o los Servicios y Contenidos en relación con ninguna actividad específica. “www.mimexicotv.mx” no será responsable por ningún daño o pérdida de cualquier naturaleza que pueda ser causado debido a la falta de disponibilidad o continuidad de operación de “El Portal” y/o de los Servicios y Contenidos.
            “El usuario” reconoce que el uso de “El Portal” no le implica derecho de propiedad alguno sobre el mismo, o sobre cualquiera de sus elementos o contenidos.
            "www.mimexicotv.mx” se reserva el derecho a modificar en cualquier momento y sin aviso previo, la presentación, configuración, información, servicios, contenido y en general cualquier parte o aspecto relacionado directa o indirectamente con “El Portal”.
            “El Usuario” que no sea residente en los Estados Unidos Mexicanos y que desee acceder a “El Portal”, deberá asegurarse que el acceso y uso del mismo, de su contenido y/o de los servicios, les esté permitido de conformidad con su propia legislación.
            “El Usuario” que utilice “El Portal” fuera de la República Mexicana, se hará responsable del cumplimiento de todas las leyes de dicha jurisdicción.
            La utilización de “El Portal”, así como el acceso y uso de los servicios dará por hecho la aceptación plena por parte del usuario de (i) los Términos y Condiciones vigentes en cada momento en que el usuario acceda y/o utilice los mismos y (ii) cualesquiera modificaciones de los mismos que hayan sido debidamente comunicados a “El Usuario”.
            “www.mimexicotv.mx” se reserva el derecho de suspender, interrumpir o dejar de operar “El Portal”, en cualquier momento.

          </p>
          <h2 class="a">2.	DERECHOS DE AUTOR Y PROPIEDAD INTELECTUAL E INDUSTRIAL.</h2>
          <p>
            Los derechos de propiedad intelectual respecto de los servicios y contenidos; los signos distintivos y dominios de “El Portal”, así como los derechos de uso y explotación de los mismos, incluyendo su divulgación, publicación, reproducciónn, distribución y transformación, son propiedad exclusiva de “www.mimexicotv.mx”, dichos derechos pueden ser otorgados a terceros conforme a la legislación correspondiente. “El Usuario” no adquiere ningún derecho de propiedad intelectual por el simple uso de los servicios y contenidos de “El Portal” y en ningún momento dicho uso será considerado como una autorización ni licencia para utilizar los servicios y contenidos con fines distintos a los que se contemplan en los presentes “Términos de Uso”.
            Todo el contenido exhibido o disponible a través de “El Portal” está protegido por la legislación vigente en materia de Derechos de Autor.
            Los Derechos de Propiedad Intelectual de “El Portal” de “www.mimexico.io” en internet, las pantallas que se muestran, la información y material que aparecen en las mismas, pertenecen a “www.mimexicotv.mx”, salvo que se indique lo contrario.
            El logotipo y marcas que utilice para el cumplimiento de los fines de “www.mimexicotv.mx” así como las marcas denominativas y mixtas de servicios y nombres comerciales que aparezcan en el portal de “www.mimexicotv.mx”, son marcas registradas en beneficio o propiedad de www.mimexicotv.mx

          </p>
          <h2 class="a">3.	USO CORRECTO DE LOS CONTENIDOS.</h2>
          <p>
            “El Usuario” se obliga a usar los contenidos de forma diligente, correcta, y lícita, y en particular, se compromete a abstenerse de: (a) utilizar los contenidos de forma, con fines o efectos contrarios a la ley y al orden público; (b) copiar, reproducir, o distribuir con fines de lucro los contenidos, a menos que se cuente con la autorizaciónn de “www.mimexicotv.mx” o del titular de los correspondientes derechos o ello resulte legalmente permitido; (c) modificar o manipular las marcas, logotipos, avisos comerciales, nombres comerciales y signos distintivos en general de “www.mimexicotv.mx”, o de terceros de “El Portal” o de las personas vinculadas directa o indirectamente con “www.mimexicotv.mx” (salvo que cuente con su autorización por escrito), (d) suprimir, eludir o modificar los contenidos, así como los dispositivos técnicos de protección, o cualquier mecanismo o procedimiento establecido en “El Portal”.
          </p>
          <h2 class="a">4.	USOS PERMITIDOS.</h2>
          <p>
            El aprovechamiento de los Servicios y Contenidos del Portal es exclusiva responsabilidad del usuario, quien en todo caso deberá servirse de ellos acorde a las funcionalidades permitidas en el propio Portal y a los usos autorizados en los presentes Términos y Condiciones de Uso y Privacidad, por lo que el usuario se obliga a utilizarlos de modo tal que no atenten contra las normas de uso y convivencia en Internet, las leyes de los Estados Unidos Mexicanos y la legislación vigente en el país en que el usuario se encuentre al usarlos, las buenas costumbres, la dignidad de la persona y los derechos de terceros. El Portal es para el uso personal y del usuario por lo que no podrá comercializar de manera alguna los Servicios y Contenidos.
          </p>
          <h2 class="a">5.	RESPONSABILIDAD POR DAÑOS Y PERJUICIOS.</h2>
          <p>
            El Usuario” deberá indemnizar inmediatamente a “www.mimexicotv.mx” o a cualquier persona vinculada directa o indirectamente con ella o con “El Portal”, o a terceros por cualquier daño y/o perjuicio de cualquier naturaleza que ocasione por incumplir estos “Términos de Uso” o cualquier normatividad aplicable.
            Sin perjuicio de lo establecido en el párrafo anterior, en el supuesto de que “www.mimexicotv.mx” fuera multado o condenado por autoridad competente a indemnizar a cualquier persona por un daño y/o perjuicio causado por el usuario, entonces este último deberá pagar a “www.mimexicotv.mx” la cantidad que corresponda, dentro de los quince días naturales siguientes a que “www.mimexicotv.mx” le notifique el monto respectivo; de lo contrario, “El Usuario” se obliga a pagar a “www.mimexicotv.mx” por concepto de pena convencional por el mero retraso en el cumplimiento de la obligación, una cantidad equivalente o similar a la suerte principal en que se hubiera afectado a “www.mimexicotv.mx”.
          </p>
          <h2 class="a">6.	PROHIBICIONES.</h2>
          <p>
            El Usuario” no tiene el derecho de colocar hiperligas y/o links, ni el derecho de colocar o utilizar en el portal páginas propias o de terceros sin autorización previa y por escrito de “www.mimexicotv.mx”. Asimismo, el usuario no tendrá el derecho de limitar o impedir a cualquier otro usuario el uso del Portal.
          </p>
          <h2 class="a">7.	SEGURIDAD DE LA INFORMACIÓN.</h2>
          <p>
            www.mimexicotv.mx” mantiene procedimientos diseñados para proteger la información confidencial sobre “El Usuario” y el uso por parte de “El Usuario” de cualquiera de los productos y servicios proporcionados a través de “El Portal”.

            La seguridad de la información que se transmite entre “El Usuario” y las páginas de terceros enlazados al portal de “www.mimexicotv.mx” en internet será responsabilidad exclusiva de dichos terceros y de “El Usuario”.
          </p>
          <h2 class="a">8.	COOKIES.</h2>
          <p>
            El Usuario” que tenga acceso a “El Portal”, acuerda recibir, en su caso, las cookies que les transmitan los servidores de “www.mimexicotv.mx”. «cookie» significa un archivo de datos que se almacena en el disco duro de la computadora del usuario cuando éste tiene acceso al portal. las cookies pueden contener información tal como la identificación proporcionada por “El Usuario” o información para rastrear las páginas que el usuario ha visitado. Una cookie no puede leer los datos o información del disco duro del usuario ni leer las cookies creadas por otros portales o páginas.
          </p>

          <h2 class="a">9.	UTILIZACIÓN “El Portal”, DE LOS SERVICIOS Y DE LOS CONTENIDOS BAJO LA EXCLUSIVA RESPONSABILIDAD DE “El Usuario”.</h2>
          <p>
            Por el solo hecho de acceder a “El Portal”, “El Usuario” reconoce y acepta que el uso del mismo y de cualquiera de los contenidos, es bajo su exclusiva y estricta responsabilidad, por lo que “www.mimexicotv.mx” no será en ningún momento y bajo ninguna circunstancia, responsable por cualquier desperfecto o problema que se presentara en el equipo de cómputo (hardware) o programas de cómputo (software) que utilice “El Usuario” para acceder o navegar en cualquier parte de “El Portal”, por lo que con la sola utilización de “El Portal”, “El Usuario” libera a “www.mimexicotv.mx” y a sus empleados de los daños y perjuicios que se le pudieran generar.

            “El Usuario” reconoce que en el evento de que los datos y/o información contenida en “El Portal”, difieran o existiera cualquier discrepancia con los datos y/o información previstos en la fuente de información de la cual se extraen, prevalecerán los segundos sobre los primeros.
          </p>
          <h2 class="a">10.	DISPONIBILIDAD Y CONTINUIDAD.</h2>
          <p>
            www.mimexicotv.mx” no garantiza al Usuario” la disponibilidad y continuidad del funcionamiento del portal y/o de los servicios.
            “www.mimexicotv.mx” no se hace responsable por la falta de disponibilidad o de continuidad en el funcionamiento del portal y/o de los servicios.
          </p>
          <h2 class="a">11.	UTILIDAD.</h2>
          <p>
            “www.mimexicotv.mx” no garantiza que el portal y los servicios sean útiles para una o más actividades o propósitos en particular.
            “www.mimexicotv.mx” no se hace responsable por el hecho de que “El Portal” no cubra sus expectativas o difieran de cualquier atributo que “El Usuario” considerara que debieran cubrir, o bien porque no resultó parcial o totalmente de utilidad para determinados fines o propósitos de “El Usuario”.
          </p>
          <h2 class="a">12.	FIABILIDAD.</h2>
          <p>
            www.mimexicotv.mx” no garantiza la fiabilidad de “El Portal”, y en particular, aunque no de modo exclusivo, que “El Usuario” pueda efectivamente acceder a las distintas páginas web que forman el portal, o que a través de éste se pueda transmitir, difundir, almacenar o poner a disposición de terceros los contenidos, o recibir, obtener o acceder a los contenidos.          </p>
          <h2 class="a">13.	VIRUS Y OTROS ELEMENTOS DAÑINOS.</h2>
          <p>
            www.mimexicotv.mx” no controla y no garantiza la ausencia de virus en los contenidos, ni la ausencia de otros elementos en los contenidos que puedan producir alteraciones en el sistema informático de “El Usuario” (software y/o hardware) o en los documentos electrónicos y ficheros almacenados en su sistema informático.
            “www.mimexicotv.mx” no se hace responsable por cualquier daño o perjuicio que el usuario o terceros sufrieran en su sistema informático (software y/o hardware), por haber usado “El Portal” y/o los servicios y/o los contenidos, o porque éstos le hubieran transmitido un virus o cualquier otro elemento dañino.
          </p>
          <h2 class="a">14.	LICITUD, FIABILIDAD Y UTILIDAD DE LOS CONTENIDOS.</h2>
          <p>
            “www.mimexicotv.mx” no garantiza a “El Usuario” la licitud, fiabilidad y utilidad de los contenidos.
            “www.mimexicotv.mx” no se hace responsable por cualquier daño o perjuicio que sufrieran “El Usuario” o terceros como consecuencia de la transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención, o acceso a los contenidos y en particular, aunque no de modo exclusivo, por los daños y perjuicios que pudieran deberse a: (a) el incumplimiento de la normatividad aplicable como consecuencia de la transmisión, difusión, almacenamiento puesta a disposición, recepción, obtención o acceso a los contenidos; (b) la violación de los derechos de propiedad intelectual e industrial, de los secretos industriales, de compromisos contractuales de cualquier clase, de los derechos a la imagen de la personas, de los derechos de propiedad y de toda otra naturaleza pertenecientes a un tercero como consecuencia de la transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención, o acceso a los contenidos; (c) la realización de actos de competencia desleal y publicidad ilícita como consecuencia de la transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención o acceso a los contenidos; (d) la falta de veracidad, exactitud, exhaustividad, pertinencia y/o actualidad de los contenidos; (e) el incumplimiento, retraso en el cumplimiento, cumplimiento defectuoso o terminación por cualquier causa de las obligaciones contraídas por terceros y contratos realizados con terceros a través de o con motivo del acceso a “El Portal”,y a los contenidos; y (f) los vicios y defectos de toda clase de los contenidos transmitidos, difundidos, almacenados, puestos a disposición, recibidos, obtenidos o a los que se haya accedido a través de “El Portal” o de los servicios; y (g) las demás derivadas de la normatividad relativa y aplicable.
          </p>
          <h2 class="a">15.	CONFIDENCIALIDAD.</h2>
          <p>
            www.mimexicotv.mx” está obligado a mantener la confidencialidad de la información que obtenga de “El Usuario” en los términos de la Ley Federal de Transparencia y Acceso a la Información Pública Gubernamental o en los términos de cualquier otra disposición legal aplicable. asimismo, cualquier otra información que cada usuario proporcione a “www.mimexicotv.mx” a fin de que puedan acceder a “El Portal” o beneficiarse de la información contenida en “El Portal”, es proporcionada en forma voluntaria por “El Usuario”, por lo que cada usuario acepta como suficientes las medidas establecidas por “El Portal” para asegurar el carácter confidencial de dicha información y de las comunicaciones que contengan dicha información («La Información Personal»), por lo tanto, en este acto “El Usuario” libera a “www.mimexicotv.mx” de cualquier responsabilidad en relación con la confidencialidad de la información personal. Cualquier información que sea transmitida entre “El Usuario” y las páginas o portales de terceros ligados o vinculados a “El Portal”, será responsabilidad exclusiva de dichos terceros y de “El Usuario” correspondiente.          </p>
          <h2 class="a">16.	USO DE LA INFORMACIÓN NO CONFIDENCIAL..</h2>
          <p>
            Mediante el uso de “El Portal”, “El Usuario” autoriza a “www.mimexicotv.mx” a utilizar, publicar, reproducir, divulgar, comunicar públicamente y transmitir la información no confidencial, en términos de lo establecido en la Ley Federal de los Derechos de Autor, la Ley Federal de Protección al Consumidor, así como la Ley Federal de Transparencia y Acceso a la Información Pública.          </p>
          <h2 class="a">17.	MODIFICACIONES.</h2>
          <p>
            www.mimexicotv.mx” tendrá el derecho de modificar en cualquier momento los “Términos de Uso” y privacidad. en consecuencia, el usuario debe leer atentamente los “Términos de Uso” y privacidad cada vez que pretenda utilizar “El Portal”. Ciertos servicios y contenidos ofrecidos a “El Usuario” en y/o a través de “El Portal” están sujetos a condiciones particulares propias que sustituyen, completan y/o modifican los términos y condiciones de uso y privacidad. consiguientemente, “El Usuario” también debe leer atentamente las correspondientes condiciones particulares antes de acceder a “El Portal”.          </p>
          <h2 class="a">18.	LEY APLICABLE Y JURISDICCIÓN.</h2>
          <p>
            En todo lo relacionado con la interpretación y cumplimiento de lo aquí dispuesto, por el sólo hecho de acceder a “El Portal”, “El Usuario” acepta someterse a las Leyes Federales de los Estados Unidos Mexicanos y a la jurisdicción de los Tribunales Federales correspondientes en la Ciudad de México, renunciado a cualquier otro fuero que por razón de sus domicilios presentes o futuros, o por cualquiera otra razón pudiese corresponderles o por cualquier otra causa.
          </p>
          <h2 class="a">19.	DERECHOS</h2>
          <p>
            Cualquier derecho que no se haya conferido expresamente en este documento se entiende reservado a “www.mimexicotv.mx”.          </p>
          <p>
            Antes de continuar te pedimos que leas nuestra{" "}
            <a class="a">Política de Privacidad</a> y{" "}
            <a class="a">Términos de Uso</a>
          </p>
          <div class="check">
            <label>
              <input
                id="check"
                type="checkbox"
                class="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26px"
                height="23px"
              >
                <path
                  class="path-back"
                  d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"
                />
                <path
                  class="path-moving"
                  d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6"
                />
              </svg>
            </label>
            <h5>
              Acepto la política de privacidad y los términos y condiciones
            </h5>
            <hr />
            <div class="contenedor-flex">
              <div class="contenedor-grid">
                <Link to="/login">
                  <input
                    class="btnPoliticas"
                    value="Volver al login"
                    type="submit"
                  />
                </Link>
                <Link to="/registroPasodos">
                  <input
                    className={`btnPoliticas ${isChecked ? '' : 'disabled'}`}
                    value="Aceptar y continuar"
                    type="submit"
                    disabled={!isChecked}

                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
