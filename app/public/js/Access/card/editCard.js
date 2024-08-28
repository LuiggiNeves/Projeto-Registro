// editCard.js
window.editCard = function(cardId) {
    fetch(`app/model/card/cardGet.php?id=${cardId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const form = document.getElementById('cardForm');

                if (form) {
                    // Popula o formulário com os detalhes do cartão
                    form.elements['cliente_nome'].value = data.card.nome_cliente || '';
                    form.elements['id_cliente'].value = data.card.id_cliente || '';
                    form.elements['cnpj'].value = data.card.cnpj || '';
                    form.elements['situacao'].value = data.card.situacao || '';
                    form.elements['id_motivo'].value = data.card.id_motivo || '';
                    form.elements['software'].value = data.card.software || '';
                    form.elements['assunto'].value = data.card.assunto || '';
                    form.elements['comunicador_01'].value = data.card.comunicador_01 || '';
                    form.elements['comunicador_02'].value = data.card.comunicador_02 || '';
                    form.elements['data_inicio'].value = data.card.data_inicio || '';
                    form.elements['data_prazo'].value = data.card.data_prazo || '';
                    form.elements['data_fim'].value = data.card.data_fim || '';
                    form.elements['descricao'].value = data.card.descricao || '';

                    // Define o ID do cartão em um campo oculto para edição
                    if (!form.elements['id_card']) {
                        const inputIdCard = document.createElement('input');
                        inputIdCard.type = 'hidden';
                        inputIdCard.name = 'id_card';
                        inputIdCard.value = data.card.id;
                        form.appendChild(inputIdCard);
                    } else {
                        form.elements['id_card'].value = data.card.id;
                    }

                    // Alterna a exibição dos botões para modo de edição
                    toggleButtonVisibility('none', 'none', 'block', 'block');

                    // Altera a cor do Menu_L_Header para amarelo e atualiza o título
                    const header = document.querySelector('.Menu_L_Header');
                    if (header) {
                        header.style.backgroundColor = 'yellow';
                        const titulo = header.querySelector('h2');
                        if (titulo) {
                            titulo.textContent = `Editar: ${data.card.id} + ${data.card.nome_cliente}`;
                        }
                    }
                } else {
                    console.error('Formulário não encontrado!');
                }
            } else {
                alert('Erro ao buscar detalhes do cartão para edição.');
            }
        })
        .catch(error => console.error('Erro ao buscar detalhes do cartão:', error));
};

// Função para enviar os dados editados ao backend
window.submitEditCard = function() {
    const form = document.getElementById('cardForm');
    const formData = new FormData(form);
    
    // Adiciona a ação de edição
    formData.append('action', 'edit');

    fetch('app/controller/card/card-edit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert(result.message);
            cancelCard(); // Restaura o formulário e o estado original após edição
        } else {
            alert('Erro ao editar o cartão: ' + result.message);
        }
    })
    .catch(error => console.error('Erro ao enviar dados de edição:', error));
};

// Função para alternar a visibilidade dos botões
function toggleButtonVisibility(createDisplay, cleanDisplay, editDisplay, cancelDisplay) {
    const btnCreate = document.querySelector('button[onclick="createCard()"]');
    const btnClean = document.querySelector('button[onclick="cleanCard()"]');
    const btnEdit = document.querySelector('button[onclick="submitEditCard()"]');
    const btnCancel = document.querySelector('button[onclick="cancelCard()"]');

    if (btnCreate) btnCreate.style.display = createDisplay;
    if (btnClean) btnClean.style.display = cleanDisplay;
    if (btnEdit) btnEdit.style.display = editDisplay;
    if (btnCancel) btnCancel.style.display = cancelDisplay;
}

// Função para cancelar a edição
window.cancelCard = function() {
    const form = document.getElementById('cardForm');
    
    if (form) {
        // Limpa o formulário
        form.reset();
        form.elements['id_cliente'].value = ''; // Limpa o campo de ID oculto

        // Alterna a exibição dos botões de volta para o modo de criação
        toggleButtonVisibility('block', 'block', 'none', 'none');

        // Restaura a cor original do Menu_L_Header e o título
        const header = document.querySelector('.Menu_L_Header');
        if (header) {
            header.style.backgroundColor = ''; // Remove a cor de fundo amarela
            const titulo = header.querySelector('h2');
            if (titulo) {
                titulo.textContent = 'CARTÃO';
            }
        }
    } else {
        console.error('Formulário não encontrado!');
    }
};
