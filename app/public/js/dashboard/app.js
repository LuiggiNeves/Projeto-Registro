document.addEventListener('DOMContentLoaded', function () {
    // Inicialize o SortableJS para permitir arrastar e soltar entre as colunas
    ['coluna-espera', 'coluna-andamento', 'coluna-finalizados'].forEach(function (columnId) {
        new Sortable(document.querySelector(`#${columnId} .Menu-Body-Pattern`), {
            group: 'shared',
            animation: 150,
            onEnd: function (evt) {
                const cardId = evt.item.dataset.cardId; // Obtém o ID do cartão movido

                // Verifica se o elemento de destino tem um ID de coluna definido
                const columnElement = evt.to.closest('.Menu-Pattern-Main');
                const newStatus = columnElement ? getStatusFromColumn(columnElement.id) : 0;

                console.log(`Movendo cartão ID: ${cardId} para coluna: ${columnElement ? columnElement.id : 'desconhecida'} com novo status: ${newStatus}`);

                if (cardId && newStatus !== undefined) {
                    atualizarSituacaoCartao(cardId, newStatus);
                } else {
                    console.error('ID do cartão ou novo status não definido.');
                }
            }
        });
    });

    function getStatusFromColumn(columnId) {
        console.log(`Identificando status para coluna: ${columnId}`);
        switch (columnId) {
            case 'coluna-espera':
                return 1;
            case 'coluna-andamento':
                return 2;
            case 'coluna-finalizados':
                return 3;
            default:
                console.error('Coluna desconhecida:', columnId);
                return 0; // Status padrão ou inválido
        }
    }

    function atualizarSituacaoCartao(id_card, new_status) {
        console.log(`Atualizando status do cartão ${id_card} para ${new_status}`);

        fetch('app/controller/card/updateCardStatus.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_card: id_card, new_status: new_status })
        })
            .then(response => {
                // Exibe o conteúdo da resposta como texto para depuração
                return response.text().then(text => {
                    console.log('Resposta do servidor:', text);

                    // Verifica se o conteúdo é JSON válido
                    try {
                        return JSON.parse(text);
                    } catch (e) {
                        throw new SyntaxError('Resposta não é um JSON válido: ' + text);
                    }
                });
            })
            .then(data => {
                if (data && data.success) {
                    console.log('Situação atualizada com sucesso:', data.message);
                } else {
                    console.error('Erro ao atualizar a situação do cartão:', data.message || data);
                }
            })
            .catch(error => console.error('Erro ao enviar requisição AJAX:', error));
    }

});
