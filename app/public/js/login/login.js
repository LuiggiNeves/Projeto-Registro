document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio normal do formulário

    const name = document.getElementById('nameEnter').value;
    const password = document.getElementById('passEnter').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    const data = {
        name: name,
        password: password,
        rememberMe: rememberMe
    };

    fetch('app/controller/httpAccess/validationENV.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Armazena o token JWT no localStorage
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }

            // Armazena o ID do usuário no localStorage
            if (data.userId) {
                localStorage.setItem('userId', data.userId);
            }

            // Armazena o nome do operador no localStorage
            if (data.nomeOperador) {
                window.alert(data.nomeOperador);
                localStorage.setItem('nomeOperador', data.nomeOperador);
            }

            // Redireciona para a página do dashboard ou outra página após login bem-sucedido
            window.location.href = HOST_APP + '/admin';
        } else {
            alert('Login falhou: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
});
