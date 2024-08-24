document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('button[type="button"]');
    loginButton.addEventListener('click', function() {
        const nome = document.getElementById('nameEnter').value;
        const senha = document.getElementById('passEnter').value;

        fetch('app/controller/httpAcess/validationENV.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, senha })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirecionar ou mostrar mensagem de sucesso
                window.location.href = 'pagina_de_sucesso.php';
            } else {
                // Mostrar mensagem de erro
                alert('Erro no login. Verifique suas credenciais.');
            }
        })
        .catch(error => console.error('Erro:', error));
    });
});