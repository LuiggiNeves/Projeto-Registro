// cardFilters.js
document.addEventListener('DOMContentLoaded', function () {
    configuraListenersFiltros();
    buscarDadosAjax();

    function buscarDadosAjax() {
        const operadorId = localStorage.getItem('userId');
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const status = document.getElementById('statusFilter').value;
        const clientSearch = document.getElementById('clientSearch').value.trim().toLowerCase();

        if (!operadorId) {
            console.error('Erro: ID do operador não encontrado no localStorage.');
            return;
        }

        let url = `app/controller/card/cardinfos.php?id_operador=${operadorId}&start_date=${startDate}&end_date=${endDate}&status=${status}&client=${clientSearch}`;

        fetch(url)
            .then(response => response.json())
            .then(resposta => {
                console.log('Dados recebidos:', resposta);
                var container = document.getElementById('ticketContainer');
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
            })
            .catch(error => console.error('Erro na requisição:', error));
    }

    function configuraListenersFiltros() {
        document.getElementById('startDate').addEventListener('change', buscarDadosAjax);
        document.getElementById('endDate').addEventListener('change', buscarDadosAjax);
        document.getElementById('statusFilter').addEventListener('change', buscarDadosAjax);
        document.getElementById('clientSearch').addEventListener('input', buscarDadosAjax);
    }
});
