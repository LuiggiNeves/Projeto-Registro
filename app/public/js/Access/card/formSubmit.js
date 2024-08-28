// formSubmit.js
document.addEventListener('DOMContentLoaded', function () {
    configuraEnvioFormulario();
});

function createCard() {
    const formulario = document.getElementById('cardForm');
    const dadosFormulario = new FormData(formulario);

    if (!dadosFormulario.has('action')) {
        dadosFormulario.append('action', 'create');
    }

    const operadorId = localStorage.getItem('userId');
    if (operadorId) {
        dadosFormulario.append('id_operador', operadorId);
    } else {
        alert('Erro: ID do operador não encontrado.');
        return;
    }

    const clienteNome = dadosFormulario.get('cliente_nome');
    if (!clienteNome) {
        alert('Erro: Nome do cliente é necessário.');
        return;
    }

    // Log de depuração para verificar os dados do formulário
    console.log('Dados do formulário antes do envio:', [...dadosFormulario.entries()]);

    fetch('app/controller/card/cardGetCreate.php', {
        method: 'POST',
        body: dadosFormulario
    })
        .then(response => response.json())
        .then(resultado => {
            console.log('Resposta do servidor:', resultado);
            if (resultado.success) {
                alert(resultado.message);
                formulario.reset();
            } else {
                alert('Erro: ' + resultado.message);
            }
        })
        .catch(error => console.error('Erro ao criar cartão:', error));
}

function configuraEnvioFormulario() {
    // Remover o listener antigo do botão e usar a função createCard diretamente
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.removeEventListener('click', createCard);
        submitButton.addEventListener('click', createCard);
    }
}
