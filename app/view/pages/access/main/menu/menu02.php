<div class="Container_Menu_Lançamento">
    <div class="Content_Menu_Lancamento">
        <div class="Menu_L_Header">
            <div>
                <h1>Criar cartão</h1>
            </div>
        </div>

        <div class="Menu_L_Body">
            <form id="cardForm">
                <div class="input-wrapper">
                    <p>Cliente:</p>
                    <input type="text" name="cliente_nome" id="clienteInput" class="input-field" placeholder="Pesquisar cliente" autocomplete="off">
                    <input type="hidden" name="id_cliente" id="clienteIdInput"> <!-- Campo oculto para o ID do cliente -->
                    <div id="suggestions" class="suggestions-container" style="display: none;"></div>
                </div>
                <div>
                    <p>Cnpj:</p>
                    <input type="text" name="cnpj" placeholder="Digite o CNPJ">
                </div>

                <div>
                    <p>Software</p>
                    <select name="software"></select>
                </div>

                <div>
                    <p>Situação</p>
                    <select name="situacao"></select>
                </div>

                <div>
                    <p>Motivo</p>
                    <select name="id_motivo"></select>
                </div>

                <div>
                    <p>Nome cliente:</p>
                    <input type="text" name="comunicador_01" placeholder="Digite o nome com quem está a conversar">
                </div>

                <div>
                    <p>Nome cliente02:</p>
                    <input type="text" name="comunicador_02" placeholder="Digite o nome com quem está a conversar">
                </div>

                <div>
                    <p>Assunto</p>
                    <input type="text" name="assunto" placeholder="Escreva o Assunto (Mínimo de palavras)">
                </div>

                <div>
                    <p>Inicio do Problema</p>
                    <input type="date" name="data_inicio">
                </div>

                <div>
                    <p>Prazo de Resolução</p>
                    <input type="date" name="data_prazo">
                </div>

                <div>
                    <p>Finalização do problema</p>
                    <input type="date" name="data_fim">
                </div>

                <div>
                    <p>Escreva os detalhes do problema</p>
                    <textarea name="descricao" placeholder="Escreva os detalhes do problema"></textarea>
                </div>

                <div>
                    <button type="button" id="submitButton">Criar Cartão</button>
                </div>
            </form>
        </div>
    </div>
</div>