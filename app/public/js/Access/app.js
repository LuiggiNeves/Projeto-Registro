// app.js
document.addEventListener('DOMContentLoaded', function () {
    // Chama funções de inicialização específicas que foram definidas nos outros arquivos
    verificaValidadeToken();   // Função de tokenValidation.js

    // Carrega o nome do operador atual
    carregarNomeOperador();

    console.log('Aplicação inicializada.');

    // Função para carregar o nome do operador e exibir na interface
    function carregarNomeOperador() {
        const nomeOperador = localStorage.getItem('nomeOperador'); // Busca o nome do operador do localStorage

        if (nomeOperador) {
            // Atualiza o elemento no HTML com o nome do operador
            document.querySelector('.nome_user_login').textContent = nomeOperador;
        } else {
            console.warn('Nome do operador não encontrado no localStorage.');
        }
    }

    // Qualquer inicialização adicional pode ser chamada aqui
});
