document.addEventListener('DOMContentLoaded', function() {
    // Função para verificar se o token JWT existe e é válido
    function checkTokenValidity() {
        const token = localStorage.getItem('authToken');

        if (!token) {

            window.location.href = 'http://localhost/Projeto-Registro/login';
            return false;
        }

        // Verifica a validade do token chamando a API de validação no servidor
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
                // Se o token for inválido ou expirado, redireciona para a página de login
                alert('Sessão expirada. Por favor, faça login novamente.');
                localStorage.removeItem('authToken'); // Remove o token expirado
                window.location.href = 'http://localhost/Projeto-Registro/login';
            }
        })
        .catch((error) => {
            console.error('Erro na validação do token:', error);
            alert('Erro ao validar o token. Por favor, tente novamente.');
            window.location.href = 'http://localhost/Projeto-Registro/login';
        });
    }

    // Chama a função de verificação ao carregar a página
    checkTokenValidity();
});
