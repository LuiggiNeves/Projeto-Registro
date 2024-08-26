<!-- Modal para editar detalhes do cartão -->
<div id="cardEditModal" class="Card_Edit_Modal" style="display: none;">
    <div class="Card_Edit_Content">
        <h2>Editar Cartão</h2>
        <form id="editCardForm">
            <div class="input-wrapper">
                <p>Cliente:</p>
                <input type="text" name="cliente_nome" id="editClienteInput" class="input-field" placeholder="Pesquisar cliente" autocomplete="off">
                <input type="hidden" name="id_cliente" id="editClienteIdInput"> <!-- Campo oculto para o ID do cliente -->
                <div id="editSuggestions" class="suggestions-container" style="display: none;"></div>
            </div>
            <div>
                <p>Cnpj:</p>
                <input type="text" name="cnpj" id="editCnpj" placeholder="Digite o CNPJ">
            </div>
            <div>
                <p>Software</p>
                <select name="software" id="editSoftware"></select>
            </div>
            <div>
                <p>Situação</p>
                <select name="situacao" id="editSituacao"></select>
            </div>
            <div>
                <p>Motivo</p>
                <select name="id_motivo" id="editMotivo"></select>
            </div>
            <div>
                <p>Nome cliente:</p>
                <input type="text" name="comunicador_01" id="editComunicador1" placeholder="Digite o nome com quem está a conversar">
            </div>
            <div>
                <p>Nome cliente02:</p>
                <input type="text" name="comunicador_02" id="editComunicador2" placeholder="Digite o nome com quem está a conversar">
            </div>
            <div>
                <p>Assunto</p>
                <input type="text" name="assunto" id="editAssunto" placeholder="Escreva o Assunto (Mínimo de palavras)">
            </div>
            <div>
                <p>Inicio do Problema</p>
                <input type="date" name="data_inicio" id="editDataInicio">
            </div>
            <div>
                <p>Prazo de Resolução</p>
                <input type="date" name="data_prazo" id="editDataPrazo">
            </div>
            <div>
                <p>Finalização do problema</p>
                <input type="date" name="data_fim" id="editDataFim">
            </div>
            <div>
                <p>Escreva os detalhes do problema</p>
                <textarea name="descricao" id="editDescricao" placeholder="Escreva os detalhes do problema"></textarea>
            </div>
            <div>
                <p>Arquivos</p>
                <input type="file" name="imagens[]" id="editImageInput" multiple> <!-- Permite qualquer tipo de arquivo -->
            </div>
            <div>
                <button type="button" onclick="updateCard()">Atualizar Cartão</button>
                <button type="button" onclick="closeEditModal()">Fechar</button>
            </div>
        </form>
    </div>
</div>
