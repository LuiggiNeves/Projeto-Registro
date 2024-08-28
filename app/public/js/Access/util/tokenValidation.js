// tokenValidation.js
document.addEventListener('DOMContentLoaded', function () {
    verificaValidadeToken();

    function verificaValidadeToken() {
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
});
