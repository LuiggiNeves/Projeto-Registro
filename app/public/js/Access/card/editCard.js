let currentFiles = []; // Lista global de arquivos atuais
let filesToDelete = []; // Lista de arquivos a serem movidos para a pasta "Deletados"

window.editCard = function(cardId) {
    resetForm(); // Limpa o formulário antes de editar

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

                    // Desabilita os campos 'cliente_nome' e 'cnpj'
                    form.elements['cliente_nome'].disabled = true;
                    form.elements['cnpj'].disabled = true;

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

                    // Exibe os arquivos associados
                    const containerArquivos = document.querySelector('.container-name-file');
                    containerArquivos.innerHTML = ''; // Limpa a lista de arquivos antes de adicionar os novos

                    // Atualiza a lista de arquivos atuais
                    currentFiles = data.card.files.slice(); // Clona a lista de arquivos

                    currentFiles.forEach((file, index) => {
                        const itemArquivo = document.createElement('div');
                        itemArquivo.classList.add('file-item');
                        itemArquivo.textContent = file.split('/').pop(); // Exibe apenas o nome do arquivo

                        const botaoRemover = document.createElement('button');
                        botaoRemover.textContent = 'X';
                        botaoRemover.classList.add('remove-button');
                        botaoRemover.addEventListener('click', function(e) {
                            e.stopPropagation(); // Impede a propagação do clique
                            marcarArquivoParaDelecao(index);
                        });

                        itemArquivo.appendChild(botaoRemover);
                        containerArquivos.appendChild(itemArquivo);
                    });

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

// Função para limpar completamente o formulário e as variáveis globais
function resetForm() {
    const form = document.getElementById('cardForm');
    if (form) {
        form.reset(); // Limpa todos os campos do formulário
        form.elements['id_cliente'].value = ''; // Limpa o campo de ID oculto

        // Habilita os campos 'cliente_nome' e 'cnpj' novamente
        form.elements['cliente_nome'].disabled = false;
        form.elements['cnpj'].disabled = false;
    }

    // Limpa a lista de arquivos e as variáveis globais
    currentFiles = [];
    filesToDelete = [];
    updateFileDisplay(); // Atualiza a exibição dos arquivos

    const inputArquivo = document.getElementById('imageInput');
    if (inputArquivo) {
        inputArquivo.value = ''; // Limpa o campo de input de arquivos
    }
}

// Função para marcar um arquivo para deleção
function marcarArquivoParaDelecao(index) {
    filesToDelete.push(currentFiles[index]); // Adiciona o arquivo à lista de arquivos a serem movidos para "Deletados"
    currentFiles.splice(index, 1); // Remove o arquivo da lista de arquivos atuais
    updateFileDisplay(); // Atualiza a exibição dos arquivos
}

// Função para atualizar a exibição dos arquivos
function updateFileDisplay() {
    const containerArquivos = document.querySelector('.container-name-file');
    containerArquivos.innerHTML = ''; // Limpa a lista de arquivos antes de adicionar os novos

    currentFiles.forEach((file, index) => {
        const itemArquivo = document.createElement('div');
        itemArquivo.classList.add('file-item');
        itemArquivo.textContent = file.split('/').pop();

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'X';
        botaoRemover.classList.add('remove-button');
        botaoRemover.addEventListener('click', function(e) {
            e.stopPropagation();
            marcarArquivoParaDelecao(index);
        });

        itemArquivo.appendChild(botaoRemover);
        containerArquivos.appendChild(itemArquivo);
    });
}

// Função para enviar os dados editados ao backend
window.submitEditCard = function() {
    const form = document.getElementById('cardForm');
    const formData = new FormData(form);
    
    // Adiciona a ação de edição
    formData.append('action', 'edit');

    // Adiciona os arquivos existentes que permanecem ao FormData
    currentFiles.forEach((file) => {
        formData.append('existing_files[]', file);
    });

    // Adiciona os arquivos a serem movidos para "Deletados"
    filesToDelete.forEach((file) => {
        formData.append('files_to_delete[]', file);
    });

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
    resetForm(); // Limpa o formulário e restaura o estado original

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
};
