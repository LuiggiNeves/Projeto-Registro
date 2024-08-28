// app.js
document.addEventListener('DOMContentLoaded', function () {
    // Chama funções de inicialização específicas que foram definidas nos outros arquivos
    verificaValidadeToken();   // Função de tokenValidation.js
    carregaOpcoes();           // Função de formOptions.js
    configuraEnvioFormulario();// Função de formSubmit.js
    configuraArrastarSoltar(); // Função de dragAndDrop.js
    configuraListenersFiltros(); // Função de cardFilters.js

    // Outras funções específicas que podem ser necessárias
    buscarDadosAjax(); // Carrega os dados iniciais dos cartões
    
    // Qualquer inicialização adicional pode ser chamada aqui
    console.log('Aplicação inicializada.');
});
