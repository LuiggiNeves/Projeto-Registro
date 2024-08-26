document.addEventListener('DOMContentLoaded', function () {
    // Inicialize o SortableJS para permitir arrastar e soltar entre as colunas
    ['coluna-espera', 'coluna-andamento', 'coluna-finalizados'].forEach(function(columnId) {
        new Sortable(document.querySelector(`#${columnId} .Menu-Body-Pattern`), {
            group: 'shared',
            animation: 150,
            onEnd: function (evt) {
                const cardId = evt.item.dataset.cardId;

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
        console.log(`Identificando status para coluna: ${columnId}`); // Adiciona log para verificar o ID da coluna
        switch (columnId) {
            case 'coluna-espera':
                return 1;
            case 'coluna-andamento':
                return 2;
            case 'coluna-finalizados':
                return 3;
            default:
                console.error('Coluna desconhecida:', columnId); // Loga se a coluna for desconhecida
                return 0; // Status padrão ou inválido
        }
    }

    function atualizarSituacaoCartao(id_card, new_status) {
        fetch('app/controller/card/updateCardStatus.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_card: id_card, new_status: new_status })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Situação atualizada com sucesso:', data.message);
            } else {
                console.error('Erro ao atualizar a situação do cartão:', data.message);
            }
        })
        .catch(error => console.error('Erro ao enviar requisição AJAX:', error));
    }
});
