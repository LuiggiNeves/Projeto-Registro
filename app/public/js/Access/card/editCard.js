// editCard.js
window.editCard = function(cardId) {
    fetch(`app/model/card/cardGet.php?id=${cardId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Popula o formulário com os detalhes do cartão
                document.getElementById('clienteInput').value = data.card.nome_cliente;
                document.getElementById('clienteIdInput').value = data.card.id_cliente;
                document.querySelector('input[name="cnpj"]').value = data.card.cnpj;
                document.querySelector('select[name="situacao"]').value = data.card.situacao;
                document.querySelector('select[name="id_motivo"]').value = data.card.id_motivo;
                document.querySelector('select[name="software"]').value = data.card.software;
                document.querySelector('input[name="assunto"]').value = data.card.assunto;
                document.querySelector('input[name="comunicador_01"]').value = data.card.comunicador_01;
                document.querySelector('input[name="comunicador_02"]').value = data.card.comunicador_02;
                document.querySelector('input[name="data_inicio"]').value = data.card.data_inicio;
                document.querySelector('input[name="data_prazo"]').value = data.card.data_prazo;
                document.querySelector('input[name="data_fim"]').value = data.card.data_fim;
                document.querySelector('textarea[name="descricao"]').value = data.card.descricao;

                // Alterna a exibição dos botões para modo de edição
                document.querySelector('button[onclick="createCard()"]').style.display = 'none';
                document.querySelector('button[onclick="cleanCard()"]').style.display = 'none';
                document.querySelector('button[onclick="editCard()"]').style.display = 'block';
                document.querySelector('button[onclick="cancelCard()"]').style.display = 'block';

                // Altera a cor do Menu_L_Header para amarelo
                const header = document.querySelector('.Menu_L_Header');
                header.style.backgroundColor = 'yellow';

                // Atualiza o título do menu com o ID do cartão e o nome do cliente
                const titulo = header.querySelector('h2');
                titulo.textContent = `Editar: ${data.card.id} + ${data.card.nome_cliente}`;
            } else {
                alert('Erro ao buscar detalhes do cartão para edição.');
            }
        })
        .catch(error => console.error('Erro ao buscar detalhes do cartão:', error));
};

// Função para cancelar a edição
window.cancelCard = function() {
    // Limpa o formulário
    document.getElementById('cardForm').reset();
    document.getElementById('clienteIdInput').value = ''; // Limpa o campo de ID oculto

    // Alterna a exibição dos botões de volta para o modo de criação
    document.querySelector('button[onclick="createCard()"]').style.display = 'block';
    document.querySelector('button[onclick="cleanCard()"]').style.display = 'block';
    document.querySelector('button[onclick="editCard()"]').style.display = 'none';
    document.querySelector('button[onclick="cancelCard()"]').style.display = 'none';

    // Restaura a cor original do Menu_L_Header
    const header = document.querySelector('.Menu_L_Header');
    header.style.backgroundColor = ''; // Remove a cor de fundo amarela

    // Restaura o título original
    const titulo = header.querySelector('h2');
    titulo.textContent = 'CARTÃO';
};
