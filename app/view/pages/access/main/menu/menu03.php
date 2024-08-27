<!-- Modal para mostrar detalhes do cartão usando Bootstrap 4 -->
<div class="modal fade" id="cardDetailsModal" tabindex="-1" aria-labelledby="cardDetailsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cardDetailsModalLabel">Detalhes do Cartão</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p><strong>Cliente:</strong> <span id="detailCliente"></span></p>
                <p><strong>CNPJ:</strong> <span id="detailCNPJ"></span></p>
                <p><strong>Software:</strong> <span id="detailSoftware"></span></p>
                <p><strong>Situação:</strong> <span id="detailSituacao"></span></p>
                <p><strong>Motivo:</strong> <span id="detailMotivo"></span></p>
                <p><strong>Nome Cliente 1:</strong> <span id="detailComunicador1"></span></p>
                <p><strong>Nome Cliente 2:</strong> <span id="detailComunicador2"></span></p>
                <p><strong>Assunto:</strong> <span id="detailAssunto"></span></p>
                <p><strong>Data Início:</strong> <span id="detailDataInicio"></span></p>
                <p><strong>Prazo de Resolução:</strong> <span id="detailDataPrazo"></span></p>
                <p><strong>Data Fim:</strong> <span id="detailDataFim"></span></p>
                <p><strong>Descrição:</strong> <span id="detailDescricao"></span></p>
                <p><strong>Arquivos:</strong> <span id="detailArquivos"></span></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>
