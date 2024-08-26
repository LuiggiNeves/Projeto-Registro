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
                                        <button onclick="editCard(${card.id})">EDITAR</button>
                                        <button onclick="viewCard(${card.id})">VER</button>
                                    </div>
                                    <div class="Card-item-operador">
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

    // Função para visualizar o cartão (abrir modal)
    window.viewCard = function (cardId) {
        const card = cards.find(c => c.id === cardId); // Usa a variável global cards

        if (card) {
            // Preenche os dados no modal
            document.querySelector('#viewModal .Container_Header_Modal h3').textContent = `${card.nome_cliente} (Loja 01)`;
            document.querySelector('#viewModal .infos-inicial p:first-child').textContent = `ID: ${card.id}`;
            document.querySelector('#viewModal .infos-inicial p:nth-child(2)').textContent = `Situação: ${card.situacao === 1 ? 'Em Espera' : card.situacao === 2 ? 'Em Andamento' : 'Finalizado'}`;
            document.querySelector('#viewModal .infos-cliente div:first-child p:first-child').textContent = `Cliente: ${card.nome_cliente}`;
            document.querySelector('#viewModal .infos-cliente div:nth-child(2) p:first-child').textContent = `CNPJ: ${card.cnpj}`;
            document.querySelector('#viewModal .infos-assunto p').textContent = `Assunto: ${card.assunto}`;
            document.querySelector('#viewModal .info-data p:first-child').textContent = `Quando Começou: ${card.data_inicio}`;
            document.querySelector('#viewModal .info-data p:nth-child(2)').textContent = `Prazo: ${card.data_prazo}`;
            document.querySelector('#viewModal .info-data p:nth-child(3)').textContent = `Finalizado: ${card.data_fim}`;
            document.querySelector('#viewModal .infos-operador-software p:first-child').textContent = `Operador: ${card.nome_operador}`;
            document.querySelector('#viewModal .infos-operador-software p:nth-child(2)').textContent = `Software: ${card.nome_software}`;
            document.querySelector('#viewModal .info-detalhes p').textContent = card.descricao;
            document.querySelector('#viewModal .infos-observacoes p').textContent = card.observacoes;

            // Adiciona os links de download dos arquivos, se disponíveis
            const arquivosContainer = document.querySelector('#detailArquivos');
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

                    // Adiciona um espaço entre os links de arquivos
                    arquivosContainer.appendChild(document.createTextNode(' '));
                });
            } else {
                arquivosContainer.textContent = 'Nenhum arquivo disponível.';
            }

            // Abre o modal
            openModal('viewModal');
        }
    };

    window.editCard = function (cardId) {
        // Implementação para editar o cartão
    };

    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    function closeModalOnOutsideClick(event, modalId) {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            closeModal(modalId);
        }
    }

    document.getElementById('viewModal').addEventListener('click', function(event) {
        closeModalOnOutsideClick(event, 'viewModal');
    });

    document.querySelector('.card-close').addEventListener('click', function() {
        closeModal('viewModal');
    });

    fetchCardsForAllOperators();

    // Atualiza os cartões automaticamente a cada 5 segundos
    setInterval(fetchCardsForAllOperators, 5000);
});
