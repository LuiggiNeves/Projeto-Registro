document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('testConnection').addEventListener('click', function (event) {
        event.preventDefault(); // Impede o comportamento padrão do link

        fetch('app/controller/testConnection.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Conexão bem-sucedida!',
                        text: data.message,
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro de Conexão',
                        text: data.message,
                        confirmButtonText: 'Tentar novamente'
                    });
                }
            })
            .catch(error => {
                console.error('Erro ao testar conexão:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao testar conexão',
                    text: 'Não foi possível conectar ao servidor.',
                    confirmButtonText: 'OK'
                });
            });
    });
});
