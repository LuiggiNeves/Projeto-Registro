document.addEventListener('DOMContentLoaded', function () {
    // Inicialização de funções ao carregar a página
    checkTokenValidity();
    loadOptions();
    setupFilterListeners();
    buscarDadosAjax();

    // Função para buscar dados dos cartões via AJAX
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

    // Função para configurar listeners para os filtros
    function setupFilterListeners() {
        document.getElementById('startDate').addEventListener('change', buscarDadosAjax);
        document.getElementById('endDate').addEventListener('change', buscarDadosAjax);
        document.getElementById('statusFilter').addEventListener('change', buscarDadosAjax);
        document.getElementById('clientSearch').addEventListener('input', buscarDadosAjax);
    }

    // Função para verificar a validade do token
    function checkTokenValidity() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = HOST_APP + '/login';
            return false;
        }

        fetch('app/controller/httpAccess/validateToken.php', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                alert('Sessão expirada. Por favor, faça login novamente.');
                localStorage.removeItem('authToken');
                window.location.href = HOST_APP + '/login';
            }
        })
        .catch((error) => {
            console.error('Erro na validação do token:', error);
            alert('Erro ao validar o token. Por favor, tente novamente.');
            window.location.href = HOST_APP + '/login';
        });
    }

    // Função para carregar as opções dos selects
    function loadOptions() {
        fetch('app/model/card/getOptions.php')
            .then(response => response.json())
            .then(data => {
                populateSelect('software', data.software, 'id', 'nome');
                populateSelect('situacao', data.situacao, 'id', 'nome_situacao');
                populateSelect('id_motivo', data.id_motivo, 'id', 'nome_motivo');
                setupClientSuggestions(data.clientes);
            })
            .catch(error => console.error('Erro ao carregar opções:', error));
    }

    function populateSelect(selectName, options, valueKey, textKey) {
        const select = document.querySelector(`select[name="${selectName}"]`);
        select.innerHTML = ''; // Limpa o select antes de popular
        options.forEach(option => {
            const newOption = document.createElement('option');
            newOption.value = option[valueKey];
            newOption.textContent = option[textKey];
            select.appendChild(newOption);
        });
    }

});
