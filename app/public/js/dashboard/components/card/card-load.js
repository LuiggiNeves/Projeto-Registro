document.addEventListener('DOMContentLoaded', function () {
    let cards = []; // Definindo cards como uma variável global

    function fetchCardsForAllOperators() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "app/controller/card/getAllCards-Dash.php");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    try {
                        cards = JSON.parse(xhr.responseText); // Armazena os dados recebidos na variável global
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
                            cardElement.dataset.cardId = card.id;

                            let situationClass = '';
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
                                        <div class="pattern-component-card-item">
                                            <i class="bi bi-chat-square-text-fill" onclick="openCommentModal(${card.id})"></i>
                                        </div>
                                        <div class="pattern-component-card-item" onclick="viewCard(${card.id})">
                                            <i class="bi bi-eye-fill"></i>
                                        </div>
                                    </div>
                                    <div class="Card-item-operador" onclick="openCommentModal(${card.id})">
                                        <i>${card.nome_operador}</i>
                                    </div>
                                </div>
                            `;

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

    window.viewCard = function (cardId) {
        const modalElement = document.getElementById('viewModalUnique'); // Definição correta do modalElement

        const card = cards.find(c => c.id === cardId); // Usa a variável global cards

        if (card) {
            // Preencher os dados do modal
            document.querySelector('#viewModalUnique .modal-title').textContent = `${card.nome_cliente}`;
            document.getElementById('modalCardId').textContent = card.id;
            document.getElementById('modalSituacao').textContent = card.situacao === 1 ? 'Em Espera' : card.situacao === 2 ? 'Em Andamento' : 'Finalizado';
            document.getElementById('modalCliente').textContent = card.nome_cliente;
            document.getElementById('modalCnpj').textContent = card.cnpj;
            document.getElementById('modalAssunto').textContent = card.assunto;
            document.getElementById('modalDataInicio').textContent = card.data_inicio;
            document.getElementById('modalDataPrazo').textContent = card.data_prazo;
            document.getElementById('modalDataFim').textContent = card.data_fim;
            document.getElementById('modalOperador').textContent = card.nome_operador;
            document.getElementById('modalSoftware').textContent = card.nome_software;
            document.getElementById('modalDescricao').textContent = card.descricao;
            document.getElementById('modalObservacoes').textContent = card.observacoes;

            // Adiciona os links de download dos arquivos, se disponíveis
            const arquivosContainer = document.getElementById('detailArquivos');
            arquivosContainer.innerHTML = ''; // Limpa o conteúdo anterior

            if (card.dir_img) {
                const arquivos = card.dir_img.split(';');
                arquivos.forEach(function (arquivo) {
                    const link = document.createElement('a');
                    link.href = `app/${arquivo}`; // Caminho para o arquivo
                    link.textContent = arquivo.split('/').pop(); // Nome do arquivo para exibição
                    link.setAttribute('download', '');
                    link.classList.add('arquivo-link');
                    arquivosContainer.appendChild(link);
                    arquivosContainer.appendChild(document.createTextNode(' ')); // Adiciona um espaço entre os links de arquivos
                });
            } else {
                arquivosContainer.textContent = 'Nenhum arquivo disponível.';
            }

            // Abre o modal usando o Bootstrap
            var myModal = new bootstrap.Modal(modalElement);
            myModal.show();
        }
    };


    fetchCardsForAllOperators();

    // Atualiza os cartões automaticamente a cada 5 segundos
    setInterval(fetchCardsForAllOperators, 5000);
});
