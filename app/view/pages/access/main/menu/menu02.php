<div class="Container_Menu_Lancamento">
    <div class="Content_Menu_Lancamento">
        <div class="Menu_L_Header">
            <div>
                <h2>CARTÃO</h2>
            </div>
        </div>


        <div class="Menu_L_Body">
            <form id="cardForm" class="">

                <div class="box-1">
                    <div class="input-wrapper input-pattern-form">

                        <div class="box-deco">
                            <i class="bi bi-person"></i>
                        </div>
                        <div class="container-component-input">
                            <input type="text" name="cliente_nome" id="clienteInput" class="input-field input-name " placeholder="Pesquisar cliente" autocomplete="off">


                            <input type="hidden" name="id_cliente" id="clienteIdInput"> <!-- Campo oculto para o ID do cliente -->
                            <div id="suggestions" class="suggestions-container w-100" style="display: none;"></div>
                        </div>

                    </div>

                    <div class="input-pattern-form">

                        <div class="box-deco">
                            <i class="bi bi-file-earmark-person"></i>
                        </div>
                        <input type="text" name="cnpj" placeholder="Digite o CNPJ">
                    </div>




                </div>


                <div class="box-2">

                    <div>
                        <p>Situação</p>
                        <select name="situacao"></select>
                    </div>

                    <div class="select-motivo">
                        <p>Motivo</p>
                        <select name="id_motivo"></select>
                    </div>

                    <div>
                        <p>Software</p>
                        <select name="software"></select>
                    </div>


                </div>

                <div class="box-extra">
                    <div class="box-extra-content">
                        <p>Assunto</p>
                        <input type="text" name="assunto" placeholder="Escreva o Assunto (Mínimo de palavras)">
                    </div>


                </div>


                <div class="box-3">

                    <div>
                        <p>Nome cliente:</p>
                        <input type="text" name="comunicador_01" placeholder="Digite o nome com quem está a conversar">
                    </div>

                    <div>
                        <p>Nome cliente02:</p>
                        <input type="text" name="comunicador_02" placeholder="Digite o nome com quem está a conversar">
                    </div>
                </div>


                <div class="box-4">

                    <div>
                        <p>Inicio</p>
                        <input type="date" name="data_inicio">
                    </div>

                    <div>
                        <p>Prazo</p>
                        <input type="date" name="data_prazo">
                    </div>

                    <div>
                        <p>Finalização</p>
                        <input type="date" name="data_fim">
                    </div>
                </div>


                <div class="box-5">
                    <div class="cont-text-area">
                        <textarea name="descricao" placeholder="Detalhes o problema..."></textarea>
                    </div>

                </div>

                <div class="cont-box6">
                    <div class="box-6" id="dropZone">
                        <input type="file" name="imagens[]" id="imageInput" multiple style="display: none;"> <!-- Esconde o input de arquivo padrão -->
                        <p>Arraste os arquivos aqui ou clique para selecionar</p>
                    </div>
                </div>
                <div class="container-name-file">

                </div>

                <div class="box-button-end">
                    <div class="button-end-s">
                        <button type="button" onclick="createCard()">Criar Cartão</button>
                        <button type="button" onclick="cleanCard()">Limpar Cartão</button>
                        <button type="button" onclick="cancelCard()" style="display: none;">Cancelar</button>
                        <button type="button" onclick="submitEditCard()" style="display: none;">Editar</button>

                    </div>
                </div>
            </form>
        </div>
    </div>
</div>