document.addEventListener('DOMContentLoaded', function () {
    // Função para buscar dados dos cartões via AJAX
    function buscarDadosAjax() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "app/controller/card/cardinfos.php", true);
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
            .then(response => response.text())
            .then(data => {
                console.log('Resposta do servidor:', data); // Loga a resposta bruta
                try {
                    var json = JSON.parse(data);
    
                    if (json.success) {
                        document.getElementById('detailCliente').textContent = json.card.nome_cliente;
                        document.getElementById('detailCNPJ').textContent = json.card.cnpj;
                        document.getElementById('detailSoftware').textContent = json.card.nome_software;
                        document.getElementById('detailSituacao').textContent = json.card.nome_situacao; // Usar o campo correto
                        document.getElementById('detailMotivo').textContent = json.card.nome_motivo; // Usar o campo correto
                        document.getElementById('detailComunicador1').textContent = json.card.comunicador_01;
                        document.getElementById('detailComunicador2').textContent = json.card.comunicador_02;
                        document.getElementById('detailAssunto').textContent = json.card.assunto;
                        document.getElementById('detailDataInicio').textContent = json.card.data_inicio;
                        document.getElementById('detailDataPrazo').textContent = json.card.data_prazo;
                        document.getElementById('detailDataFim').textContent = json.card.data_fim;
                        document.getElementById('detailDescricao').textContent = json.card.descricao;
    
                        document.getElementById('cardDetailsModal').style.display = 'flex';
                    } else {
                        alert('Erro ao buscar detalhes do cartão: ' + json.message);
                    }
                } catch (e) {
                    console.error('Erro ao processar JSON:', e);
                    alert('Erro inesperado ao buscar detalhes do cartão.');
                }
            })
            .catch(error => console.error('Erro ao buscar detalhes do cartão:', error));
    };
    


    // Função para fechar o modal
    window.closeModal = function () {
        document.getElementById('cardDetailsModal').style.display = 'none';
    };

    // Função para editar cartão
    window.editCard = function (cardId) {
        console.log('Editar cartão com ID:', cardId);
    };

    // Chama a função para buscar dados ao carregar a página
    buscarDadosAjax();
});
