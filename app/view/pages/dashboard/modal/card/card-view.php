<!-- Modal para Visualização -->
<div class="card-modal" id="viewModal">
    <div class="card-modal-content">
        <span class="card-close" onclick="closeModal('viewModal')">&times;</span>

        <div class="Container-Modal-view">
            <div class="Container_Header_Modal">
                <h3>Nosso Lar (Loja 01)</h3>
            </div>

            <div class="Container_Body_Modal">
                <div class="modal-info">
                    <div class="infos-inicial">
                        <p><strong>ID:</strong> 1</p>
                        <p>Situação: Finalizado</p>
                    </div>

                    <div class="infos-cliente">
                        <div>
                            <p><strong>Cliente:</strong> Nosso Lar</p>
                            <p><strong>Falando com:</strong> Beth</p>
                        </div>
                        <div>
                            <p><strong>CNPJ:</strong> 123445dsds56</p>
                            <p><strong>Falando com:</strong> Rodrigo</p>
                        </div>
                    </div>

                    <div class="infos-assunto">
                        <p><strong>Assunto:</strong> Tef Duplicando venda</p>
                    </div>

                    <div class="info-data">
                        <p><strong>Quando Começou:</strong> 23/02/2023</p>
                        <p><strong>Prazo:</strong> 02/02/2023</p>
                        <p><strong>Finalizado:</strong> 04/05/2066</p>
                    </div>

                    <div class="infos-operador-software">
                        <p><strong>Operador:</strong> Luiggi Neves</p>
                        <p><strong>Software:</strong> Gplus Loja</p>
                    </div>

                    <div class="info-detalhes">
                        <h6>Descrição Ocorrido</h6>
                        <p>Aqui é o detalhe</p>
                    </div>

                    <div class="infos-observacoes">
                        <h6>Observações</h6>
                        <p>Aqui é a observação do operador</p>
                    </div>

                    <div class="container-infos-arquivos">
                        <div class="modal-info">
                            <p><strong>Arquivos:</strong> <span id="detailArquivos"></span></p> <!-- Seção para arquivos -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="Container_Footer_Modal">
                <button onclick="closeModal('viewModal')">Fechar</button>
            </div>
        </div>
    </div>
</div>