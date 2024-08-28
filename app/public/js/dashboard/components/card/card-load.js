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
                                            <i class="bi bi-chat-square-text-fill"></i>
                                        </div>
                                        <div class="pattern-component-card-item" onclick="viewCard(${card.id})">
                                            <i class="bi bi-eye-fill"></i>
                                        </div>
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

    window.viewCard = function (cardId) {
        // Fecha o modal anterior, se estiver aberto
        const modalElement = document.getElementById('viewModalUnique');
        if (modalElement.classList.contains('show')) {
            // Fechar modal manualmente se estiver aberto
            var modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
                modalBackdrop.parentNode.removeChild(modalBackdrop);
            }
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('padding-right');
        }
    
        const card = cards.find(c => c.id === cardId); // Usa a variável global cards
    
        if (card) {
            // Preencher os dados do modal
            document.querySelector('#viewModalUnique .modal-title').textContent = `${card.nome_cliente} (Loja 01)`;
            document.querySelector('#viewModalUnique .infos-inicial p:first-child').textContent = `ID: ${card.id}`;
            document.querySelector('#viewModalUnique .infos-inicial p:nth-child(2)').textContent = `Situação: ${card.situacao === 1 ? 'Em Espera' : card.situacao === 2 ? 'Em Andamento' : 'Finalizado'}`;
            document.querySelector('#viewModalUnique .infos-cliente div:first-child p:first-child').textContent = `Cliente: ${card.nome_cliente}`;
            document.querySelector('#viewModalUnique .infos-cliente div:nth-child(2) p:first-child').textContent = `CNPJ: ${card.cnpj}`;
            document.querySelector('#viewModalUnique .infos-assunto p').textContent = `Assunto: ${card.assunto}`;
            document.querySelector('#viewModalUnique .info-data p:first-child').textContent = `Quando Começou: ${card.data_inicio}`;
            document.querySelector('#viewModalUnique .info-data p:nth-child(2)').textContent = `Prazo: ${card.data_prazo}`;
            document.querySelector('#viewModalUnique .info-data p:nth-child(3)').textContent = `Finalizado: ${card.data_fim}`;
            document.querySelector('#viewModalUnique .infos-operador-software p:first-child').textContent = `Operador: ${card.nome_operador}`;
            document.querySelector('#viewModalUnique .infos-operador-software p:nth-child(2)').textContent = `Software: ${card.nome_software}`;
            document.querySelector('#viewModalUnique .info-detalhes p').textContent = card.descricao;
            document.querySelector('#viewModalUnique .infos-observacoes p').textContent = card.observacoes;
    
            // Adiciona os links de download dos arquivos, se disponíveis
            const arquivosContainer = document.querySelector('#viewModalUnique #detailArquivos');
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
