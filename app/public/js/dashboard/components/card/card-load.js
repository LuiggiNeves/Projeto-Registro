document.addEventListener('DOMContentLoaded', function () {
    function fetchCardsForAllOperators() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "app/controller/card/getAllCards-Dash.php"); // URL ajustada para buscar dados de todos os operadores
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    try {
                        const cards = JSON.parse(xhr.responseText);
                        console.log('Dados recebidos:', cards);

                        const esperaContainer = document.getElementById('coluna-espera').querySelector('.Menu-Body-Pattern');
                        const andamentoContainer = document.getElementById('coluna-andamento').querySelector('.Menu-Body-Pattern');
                        const finalizadosContainer = document.getElementById('coluna-finalizados').querySelector('.Menu-Body-Pattern');

                        // Limpa o conteúdo anterior
                        esperaContainer.innerHTML = '';
                        andamentoContainer.innerHTML = '';
                        finalizadosContainer.innerHTML = '';

                        // Itera sobre todos os cartões e distribui conforme o status
                        cards.forEach(function (card) {
                            const cardElement = document.createElement('div');
                            cardElement.classList.add('Container_Card_Item');
                            cardElement.dataset.cardId = card.id; // Adiciona o atributo data-card-id

                            let situationClass = '';
                            switch (card.situacao) {
                                case 1: // Em espera
                                    situationClass = 'situacao-verde';
                                    break;
                                case 2: // Em andamento
                                    situationClass = 'situacao-amarelo';
                                    break;
                                case 3: // Finalizado
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

                            // Distribui o card para a coluna apropriada
                            if (card.situacao === 1) {
                                esperaContainer.appendChild(cardElement);
                            } else if (card.situacao === 2) {
                                andamentoContainer.appendChild(cardElement);
                            } else if (card.situacao === 3) {
                                finalizadosContainer.appendChild(cardElement);
                            }
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

    // Funções para visualizar, editar e fechar modais (já implementadas anteriormente)
    window.viewCard = function (cardId) {
        // Implementação existente para visualizar detalhes do cartão
    };

    window.editCard = function (cardId) {
        // Implementação existente para editar o cartão
    };

    window.closeModal = function () {
        // Implementação existente para fechar modais
    };

    // Chama a função para buscar dados ao carregar a página
    fetchCardsForAllOperators();
});
