export function Documentales(){
    return (
        <>
          <div class="main-container">
            <div class="bg-white">
              <h1 class="text-center">Listado de Documentales</h1>
              <table class="table text-nowrap">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    <th scope="col">Comentario</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto Hernandez</td>
                    <td>@mdo</td>
                    <td>Esto es un comentario</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
}