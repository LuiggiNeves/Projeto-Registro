function buscarDadosAjax() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "app/controller/card/cardinfos.php", true); // Altere para a URL do seu script PHP
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    // Processa a resposta como JSON
                    var resposta = JSON.parse(xhr.responseText);
                    console.log(resposta); // Verifica a estrutura dos dados recebidos

                    // Limpa o container existente
                    var container = document.getElementById('card-container');
                    container.innerHTML = '';

                    // Cria um cartão para cada item
                    resposta.forEach(function(card) {
                        var cardElement = document.createElement('div');
                        cardElement.classList.add('Container_Card_Item');

                        cardElement.innerHTML = `
                            <div class="Card-Item-Menu-Header">
                                <div class="Card-item-assunto">
                                    <i>${card.assunto}</i>
                                </div>

                                <div class="Card-item-data-inicio">
                                    <i>${card.data_inicio}</i>
                                </div>
                            </div>
                            <div class="Card-Item-Menu-Body">
                                <div>
                                    <i>${card.nome_cliente}</i> <!-- Nome do Cliente -->
                                </div>

                                <div>
                                    <i>${card.nome_software}</i> <!-- Software -->
                                </div>

                                <div class="Card-item-edit">
                                    <button onclick="editCard(${card.id})">EDITAR</button>
                                    <button onclick="viewCard(${card.id})">VER</button>
                                </div>

                                <div class="Card-item-operador">
                                    <i>${card.nome_operador}</i> <!-- Nome do Operador -->
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

// Funções para editar e visualizar o cartão (sem implementação no momento)
function editCard(cardId) {
    // Implementar lógica para editar cartão
    console.log('Editar cartão com ID:', cardId);
}

function viewCard(cardId) {
    // Implementar lógica para visualizar cartão
    console.log('Visualizar cartão com ID:', cardId);
}

// Chama a função para buscar dados
buscarDadosAjax();
