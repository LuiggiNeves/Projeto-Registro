// formOptions.js
document.addEventListener('DOMContentLoaded', function () {
    carregaOpcoes();

    function carregaOpcoes() {
        fetch('app/model/card/getOptions.php')
            .then(response => response.json())
            .then(data => {
                populaSelect('software', data.software, 'id', 'nome');
                populaSelect('situacao', data.situacao, 'id', 'nome_situacao');
                populaSelect('id_motivo', data.id_motivo, 'id', 'nome_motivo');
                configuraSugestoesClientes(data.clientes);
            })
            .catch(error => console.error('Erro ao carregar opções:', error));
    }

    function populaSelect(nomeSelect, opcoes, chaveValor, chaveTexto) {
        const select = document.querySelector(`select[name="${nomeSelect}"]`);
        select.innerHTML = ''; // Limpa o select antes de popular
        opcoes.forEach(opcao => {
            const novaOpcao = document.createElement('option');
            novaOpcao.value = opcao[chaveValor];
            novaOpcao.textContent = opcao[chaveTexto];
            select.appendChild(novaOpcao);
        });
    }

    function configuraSugestoesClientes(clientes) {
        const input = document.getElementById('clienteInput');
        const clienteIdInput = document.getElementById('clienteIdInput');
        const containerSugestoes = document.getElementById('suggestions');

        input.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            containerSugestoes.innerHTML = '';
            clienteIdInput.value = ''; // Limpa o campo de ID oculto sempre que o usuário digita

            if (query) {
                const clientesFiltrados = clientes.filter(cliente => cliente.nome.toLowerCase().includes(query));
                clientesFiltrados.forEach(cliente => {
                    const sugestao = document.createElement('div');
                    sugestao.textContent = cliente.nome;
                    sugestao.classList.add('suggestion-item');
                    sugestao.addEventListener('click', function () {
                        input.value = cliente.nome;
                        clienteIdInput.value = cliente.id;
                        containerSugestoes.style.display = 'none';
                    });
                    containerSugestoes.appendChild(sugestao);
                });
                containerSugestoes.style.display = clientesFiltrados.length ? 'block' : 'none';
            } else {
                containerSugestoes.style.display = 'none';
            }
        });

        document.addEventListener('click', function (e) {
            if (!input.contains(e.target) && !containerSugestoes.contains(e.target)) {
                containerSugestoes.style.display = 'none';
            }
        });
    }
});
