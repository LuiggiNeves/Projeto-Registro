<!-- Modal para Visualização -->
<div class="modal fade" id="viewModalUnique" tabindex="-1" aria-labelledby="viewModalLabelUnique" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="viewModalLabelUnique"></h5>
        <!-- Botão "X" de fechar -->
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-info">
          <div class="infos-inicial">
            <p><i class="text-deco-form-view">ID:</i class="text-deco-form-view"> <span id="modalCardId">1</span></p>
            <p><i class="text-deco-form-view">Situação:</i class="text-deco-form-view"> <span id="modalSituacao">Finalizado</span></p>
          </div>

          <div class="infos-cliente">
            <div>
              <p><i class="text-deco-form-view">Cliente:</i class="text-deco-form-view"> <span id="modalCliente"></span></p>
              <p><i class="text-deco-form-view">CNPJ:</i class="text-deco-form-view"> <span id="modalCnpj"></span></p>
            </div>
          </div>

          <div class="infos-assunto">
            <p><i class="text-deco-form-view">Assunto:</i class="text-deco-form-view"> <span id="modalAssunto"></span></p>
          </div>

          <div class="info-data">
            <p><i class="text-deco-form-view">Quando Começou:</i class="text-deco-form-view"> <span id="modalDataInicio"></span></p>
            <p><i class="text-deco-form-view">Prazo:</i class="text-deco-form-view"> <span id="modalDataPrazo"></span></p>
            <p><i class="text-deco-form-view">Finalizado:</i class="text-deco-form-view"> <span id="modalDataFim"></span></p>
          </div>

          <div class="infos-operador-software">
            <p><i class="text-deco-form-view">Operador:</i class="text-deco-form-view"> <span id="modalOperador"></span></p>
            <p><i class="text-deco-form-view">Software:</i class="text-deco-form-view"> <span id="modalSoftware"></span></p>
          </div>

          <div class="info-detalhes">
            <h6>Descrição Ocorrido</h6>
            <p id="modalDescricao">Aqui é o detalhe</p>
          </div>

          <div class="infos-observacoes" id="modalObservacoes">
          </div>

          <div class="container-infos-arquivos">
            <div class="modal-info">
              <p><i class="text-deco-form-view">Arquivos:</i class="text-deco-form-view"> <span id="detailArquivos"></span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <!-- Botão "Fechar" -->
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>



<style>
  /* Estilo para o Modal */
  .modal-content {
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
  }

  .modal-header {
    background-color: #343a40;
    color: #fff;
    border-bottom: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .modal-header .close {
    color: #fff;
    opacity: 1;
  }

  .modal-body {
    padding: 20px;
    color: #495057;
  }

  .modal-info p {
    font-size: 1rem;
    margin-bottom: 5px;
  }

  .infos-inicial,
  .infos-cliente,
  .infos-assunto,
  .info-data,
  .infos-operador-software,
  .info-detalhes,
  .infos-observacoes {
    margin-bottom: 15px;
  }

  .text-deco-form-view {

    color: orange;
  }

  .modal-footer {
    border-top: none;
    padding-top: 0;
  }

  .btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
    color: #fff;
    transition: background-color 0.3s ease;
  }

  .btn-secondary:hover {
    background-color: #5a6268;
    border-color: #545b62;
  }

  .info-detalhes h6,
  .infos-observacoes h6 {
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: #343a40;
  }

  .container-infos-arquivos {
    background-color: #e9ecef;
    padding: 15px;
    border-radius: 5px;
    margin-top: 10px;
  }

  #detailArquivos {
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
  }


</style>