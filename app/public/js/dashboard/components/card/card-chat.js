document.addEventListener('DOMContentLoaded', function () {
    // Função para verificar se o usuário está logado
    function isUserLoggedIn() {
        return localStorage.getItem('nomeOperador') !== null;
    }

    window.openCommentModal = function (cardId) {
        document.getElementById('saveCommentButton').dataset.cardId = cardId;

        const timelineContainer = document.getElementById('timelineContainer');
        timelineContainer.innerHTML = ''; // Limpa o container antes de adicionar novos elementos

        // Busca comentários do servidor
        fetch(`app/controller/card/GetCommentsController.php?id_card=${cardId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    data.comments.forEach(comment => {
                        // Cria o item da linha do tempo
                        const chatItemContent = document.createElement('div');
                        chatItemContent.className = 'chat-item-content';

                        // Elemento para o operador
                        const operadorChat = document.createElement('div');
                        operadorChat.className = 'operador-chat';
                        const operadorElement = document.createElement('i');
                        operadorElement.textContent = comment.operador_nome; // Adiciona o nome do operador
                        operadorChat.appendChild(operadorElement);

                        const containerChatItem = document.createElement('div');
                        containerChatItem.className = 'container-chat-item-item';

                        // Elemento para o texto do comentário
                        const textChatItem = document.createElement('div');
                        textChatItem.className = 'text-chat-item';
                        const pElement = document.createElement('p');
                        pElement.innerHTML = comment.valor_comentario.replace(/\n/g, '<br>'); // Substitui \n por <br> para quebras de linha
                        textChatItem.appendChild(pElement);

                        // Elemento para a data do comentário
                        const dateItemModal = document.createElement('div');
                        dateItemModal.className = 'small-date-item-modal';
                        const iElement = document.createElement('i');
                        iElement.textContent = new Date(comment.data).toLocaleDateString(); // Adiciona a data formatada
                        dateItemModal.appendChild(iElement);

                        // Monta o item completo e adiciona ao container principal
                        containerChatItem.appendChild(textChatItem);
                        containerChatItem.appendChild(dateItemModal);
                        chatItemContent.appendChild(operadorChat); // Adiciona o operador
                        chatItemContent.appendChild(containerChatItem);
                        timelineContainer.appendChild(chatItemContent);
                    });
                } else {
                    console.error('Erro ao carregar comentários:', data.message);
                }
            })
            .catch(error => console.error('Erro ao carregar comentários:', error));

        var commentModal = new bootstrap.Modal(document.getElementById('commentModal'));
        commentModal.show();
    };

    // Função para salvar o comentário
    document.getElementById('saveCommentButton').addEventListener('click', function() {
        if (!isUserLoggedIn()) {
            alert('Você precisa estar logado para adicionar um comentário.');
            // Redireciona para a página de login
            window.location.href = 'http://192.168.2.18/Projeto-Registro/login';
            return;
        }

        const cardId = this.dataset.cardId;
        const commentText = document.getElementById('commentText').value;
        const operadorId = localStorage.getItem('userId'); // Obtém o ID do operador do localStorage

        if (commentText.trim() === '') {
            alert('Por favor, insira um comentário.');
            return;
        }

        fetch('app/controller/card/AddCommentController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_card: cardId, comment: commentText, situacao: 1, id_operador: operadorId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const chatItemContent = document.createElement('div');
                chatItemContent.className = 'chat-item-content';

                // Elemento para o operador
                const operadorChat = document.createElement('div');
                operadorChat.className = 'operador-chat';
                const operadorElement = document.createElement('i');
                operadorElement.textContent = localStorage.getItem('nomeOperador'); // Utiliza o nome do operador armazenado
                operadorChat.appendChild(operadorElement);

                const containerChatItem = document.createElement('div');
                containerChatItem.className = 'container-chat-item-item';

                // Elemento para o texto do novo comentário
                const textChatItem = document.createElement('div');
                textChatItem.className = 'text-chat-item';
                const pElement = document.createElement('p');
                pElement.innerHTML = commentText.replace(/\n/g, '<br>'); // Substitui \n por <br> para quebras de linha
                textChatItem.appendChild(pElement);

                // Elemento para a data do novo comentário
                const dateItemModal = document.createElement('div');
                dateItemModal.className = 'small-date-item-modal';
                const iElement = document.createElement('i');
                iElement.textContent = 'Agora'; // Usa "Agora" para o novo comentário
                dateItemModal.appendChild(iElement);

                // Monta o item completo e adiciona ao container principal
                containerChatItem.appendChild(textChatItem);
                containerChatItem.appendChild(dateItemModal);
                chatItemContent.appendChild(operadorChat); // Adiciona o operador
                chatItemContent.appendChild(containerChatItem);
                timelineContainer.appendChild(chatItemContent);

                document.getElementById('commentText').value = ''; // Limpa o campo de comentário
            } else {
                console.error('Erro ao adicionar comentário:', data.message);
            }
        })
        .catch(error => console.error('Erro ao enviar requisição AJAX:', error));
    });
});
