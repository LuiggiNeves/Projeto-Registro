document.addEventListener('DOMContentLoaded', function () {
    // Inicialização de funções ao carregar a página
    checkTokenValidity();
    loadOptions();
    setupFormSubmitListener();
    setupFileDragAndDrop();

    // Verifica se o token JWT existe e é válido
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

    // Carrega as opções dos selects e configura sugestões de clientes
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

    // Popula selects dinâmicos
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

    // Configura sugestões de clientes
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
                        clienteIdInput.value = cliente.id;
                        suggestionsContainer.style.display = 'none';
                    });
                    suggestionsContainer.appendChild(suggestion);
                });
                suggestionsContainer.style.display = filteredClients.length ? 'block' : 'none';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });

        document.addEventListener('click', function (e) {
            if (!input.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }

    // Configura o envio do formulário
    function setupFormSubmitListener() {
        document.getElementById('submitButton').addEventListener('click', function (event) {
            event.preventDefault();

            const form = document.getElementById('cardForm');
            const formData = new FormData(form);

            if (!form.querySelector('input[name="action"]')) {
                const actionInput = document.createElement('input');
                actionInput.type = 'hidden';
                actionInput.name = 'action';
                actionInput.value = 'create';
                form.appendChild(actionInput);
            }

            const operadorId = localStorage.getItem('userId');
            if (operadorId) {
                formData.append('id_operador', operadorId);
            } else {
                alert('Erro: ID do operador não encontrado.');
                return;
            }

            const clienteNome = formData.get('cliente_nome');
            if (!clienteNome) {
                alert('Erro: Nome do cliente é necessário.');
                return;
            }

            fetch('app/controller/card/cardGetCreate.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert(result.message);
                    form.reset();
                } else {
                    alert('Erro: ' + result.message);
                }
            })
            .catch(error => console.error('Erro ao criar cartão:', error));
        });
    }

    // Configura o arrastar e soltar para o input de arquivo
    function setupFileDragAndDrop() {
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('imageInput');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.add('drag-over'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.remove('drag-over'), false);
        });

        dropZone.addEventListener('drop', handleDrop, false);
        dropZone.addEventListener('click', () => fileInput.click());

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }

        function handleFiles(files) {
            fileInput.files = files;
            [...files].forEach(file => {
                console.log('Arquivo adicionado:', file.name);
            });
        }
    }

    /*VIEW CARD */




});
