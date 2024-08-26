document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o token JWT existe e é válido
    checkTokenValidity();

    // Carrega as opções dos selects e configura sugestões de clientes
    loadOptions();

    // Configura o evento de clique para o botão de envio
    document.getElementById('submitButton').addEventListener('click', function (event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        const form = document.getElementById('cardForm');
        const formData = new FormData(form); // Utiliza FormData para incluir imagens

        // Certifique-se de que o campo oculto 'action' tenha um valor antes de enviar
        const actionInput = document.createElement('input');
        actionInput.type = 'hidden';
        actionInput.name = 'action';
        actionInput.value = 'create';
        form.appendChild(actionInput);

        // Adiciona o ID do operador ao formData
        const operadorId = localStorage.getItem('userId');
        if (operadorId) {
            formData.append('id_operador', operadorId); // Inclui o ID do operador no formData
        } else {
            alert('Erro: ID do operador não encontrado.');
            return;
        }

        // Log de depuração para verificar os dados do formulário
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        fetch('app/controller/card/cardGetCreate.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json()) // Supondo que o servidor retorne JSON
            .then(result => {
                if (result.success) {
                    alert(result.message);
                    form.reset(); // Opcional: Reseta o formulário após o sucesso
                } else {
                    alert('Erro: ' + result.message);
                }
            })
            .catch(error => console.error('Erro ao criar cartão:', error));
    });

    // Funções de validação e carregamento de opções...

    function checkTokenValidity() {
        const token = localStorage.getItem('authToken');

        if (!token) {
            window.location.href = 'http://localhost/Projeto-Registro/login';
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
                    window.location.href = 'http://localhost/Projeto-Registro/login';
                }
            })
            .catch((error) => {
                console.error('Erro na validação do token:', error);
                alert('Erro ao validar o token. Por favor, tente novamente.');
                window.location.href = 'http://localhost/Projeto-Registro/login';
            });
    }

    function loadOptions() {
        fetch('app/model/card/getOptions.php')
            .then(response => response.json())
            .then(data => {
                // Popula os selects com opções
                populateSelect('software', data.software, 'id', 'nome');
                populateSelect('situacao', data.situacao, 'id', 'nome_situacao');
                populateSelect('id_motivo', data.id_motivo, 'id', 'nome_motivo');

                // Configura as sugestões de clientes
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

    function setupClientSuggestions(clientes) {
        const input = document.getElementById('clienteInput');
        const clienteIdInput = document.getElementById('clienteIdInput');
        const suggestionsContainer = document.getElementById('suggestions');

        input.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            suggestionsContainer.innerHTML = '';
            clienteIdInput.value = ''; // Limpa o campo de ID oculto sempre que o usuário digita

            if (query) {
                const filteredClients = clientes.filter(cliente => cliente.nome.toLowerCase().includes(query));
                filteredClients.forEach(cliente => {
                    const suggestion = document.createElement('div');
                    suggestion.textContent = cliente.nome;
                    suggestion.classList.add('suggestion-item');
                    suggestion.addEventListener('click', function () {
                        input.value = cliente.nome;
                        clienteIdInput.value = cliente.id; // Preenche o campo de ID oculto com o ID do cliente
                        suggestionsContainer.style.display = 'none';
                    });
                    suggestionsContainer.appendChild(suggestion);
                });
                suggestionsContainer.style.display = filteredClients.length ? 'block' : 'none';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });

        // Esconde as sugestões ao clicar fora
        document.addEventListener('click', function (e) {
            if (!input.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }

    // Configura o evento de arrastar e soltar para o input de arquivo
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('imageInput');

    // Previne o comportamento padrão para eventos de arrastar e soltar
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    // Adiciona ou remove classes para feedback visual
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('drag-over'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('drag-over'), false);
    });

    // Lida com o evento de drop
    dropZone.addEventListener('drop', handleDrop, false);

    // Lida com o clique no contêiner para abrir o seletor de arquivos
    dropZone.addEventListener('click', () => fileInput.click());

    // Previne o comportamento padrão
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Lida com arquivos arrastados
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        handleFiles(files);
    }


    // Processa os arquivos
    function handleFiles(files) {
        fileInput.files = files; // Adiciona os arquivos ao input para envio de formulário

        // Exemplo: Mostra os nomes dos arquivos no console
        [...files].forEach(file => {
            console.log('Arquivo adicionado:', file.name);
        });
    }
});
