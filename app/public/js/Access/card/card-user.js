document.addEventListener('DOMContentLoaded', function () {
    // Função para buscar dados dos cartões via AJAX
    function buscarDadosAjax() {
        // Obtém o id do operador armazenado no localStorage
        const operadorId = localStorage.getItem('userId');

        if (!operadorId) {
            console.error('Erro: ID do operador não encontrado no localStorage.');
            return;
        }

        // Inclui o operadorId na URL da requisição
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `app/controller/card/cardinfos.php?id_operador=${operadorId}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    try {
                        var resposta = JSON.parse(xhr.responseText);
                        console.log('Dados recebidos:', resposta);

                        var container = document.getElementById('card-container');
                        container.innerHTML = '';

                        resposta.forEach(function (card) {
                            var cardElement = document.createElement('div');
                            cardElement.classList.add('Container_Card_Item');

                            var situationClass = '';
                            switch (card.situacao) {
                                case 1:
                                    situationClass = 'situacao-verde';
                                    break;
                                case 2:
                                    situationClass = 'situacao-amarelo';
                                    break;
                                case 3:
                                    situationClass = 'situacao-vermelho';
                                    break;
                                default:
                                    situationClass = 'situacao-default';
                            }

                            cardElement.innerHTML = `
                                <div class="Card-Item-Menu-Header ${situationClass}">
                                    <div class="Card-item-assunto">
                                        <i>${card.assunto}</i>
                                    </div>

                                    <div class="Card-item-data-inicio">
                                        <i>${card.data_inicio}</i>
                                    </div>
                                </div>
                                <div class="Card-Item-Menu-Body">
                                    <div>
                                        <i>${card.nome_cliente}</i> 
                                    </div>

                                    <div>
                                        <i>${card.nome_software}</i> 
                                    </div>

                                    <div class="Card-item-edit">
                                        <button onclick="editCard(${card.id})">EDITAR</button>
                                        <button onclick="viewCard(${card.id})">VER</button>
                                    </div>

                                    <div class="Card-item-operador">
                                        <i>${card.nome_operador}</i> 
                                    </div>
                                </div>
                            `;

                            container.appendChild(cardElement);
                        });

                    } catch (e) {
                        console.error('Erro ao processar JSON:', e);
                    }
                } else {
                    console.error('Erro na requisição:', xhr.statusText);
                }
            }
        };

        xhr.send();
    }

    // Função para visualizar os detalhes do cartão
    window.viewCard = function (cardId) {
        fetch(`app/model/card/cardGet.php?id=${cardId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Popula o modal com os detalhes do cartão
                    document.getElementById('detailCliente').textContent = data.card.nome_cliente;
                    document.getElementById('detailCNPJ').textContent = data.card.cnpj;
                    document.getElementById('detailSoftware').textContent = data.card.nome_software;
                    document.getElementById('detailSituacao').textContent = data.card.nome_situacao;
                    document.getElementById('detailMotivo').textContent = data.card.nome_motivo;
                    document.getElementById('detailComunicador1').textContent = data.card.comunicador_01;
                    document.getElementById('detailComunicador2').textContent = data.card.comunicador_02;
                    document.getElementById('detailAssunto').textContent = data.card.assunto;
                    document.getElementById('detailDataInicio').textContent = data.card.data_inicio;
                    document.getElementById('detailDataPrazo').textContent = data.card.data_prazo;
                    document.getElementById('detailDataFim').textContent = data.card.data_fim;
                    document.getElementById('detailDescricao').textContent = data.card.descricao;

                    // Popula o modal com os links dos arquivos
                    const arquivosContainer = document.getElementById('detailArquivos');
                    arquivosContainer.innerHTML = ''; // Limpa o conteúdo anterior

                    if (data.card.dir_img) {
                        const arquivos = data.card.dir_img.split(';');
                        arquivos.forEach(function (arquivo) {
                            const link = document.createElement('a');
                            link.href = `app/${arquivo}`; // Caminho para o arquivo
                            link.textContent = arquivo.split('/').pop(); // Nome do arquivo para exibição
                            link.setAttribute('download', '');
                            link.classList.add('arquivo-link');
                            arquivosContainer.appendChild(link);

                            // Adiciona um espaço entre os links de arquivos
                            arquivosContainer.appendChild(document.createTextNode(' '));
                        });
                    } else {
                        arquivosContainer.textContent = 'Nenhum arquivo disponível.';
                    }

                    // Mostra o modal
                    document.getElementById('cardDetailsModal').style.display = 'flex';
                } else {
                    alert('Erro ao buscar detalhes do cartão.');
                }
            })
            .catch(error => console.error('Erro ao buscar detalhes do cartão:', error));
    };

    // Função para editar cartão
    window.editCard = function (cardId) {
        console.log('Editar cartão com ID:', cardId);
    };

    // Função para fechar o modal
    window.closeModal = function () {
        document.getElementById('cardDetailsModal').style.display = 'none';
    };

    // Chama a função para buscar dados ao carregar a página
    buscarDadosAjax();
});

