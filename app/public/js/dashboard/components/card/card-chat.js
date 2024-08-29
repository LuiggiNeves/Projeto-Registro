document.addEventListener('DOMContentLoaded', function () {
    function isUserLoggedIn() {
        return localStorage.getItem('nomeOperador') !== null;
    }

    window.openCommentModal = function (cardId) {
        document.getElementById('saveCommentButton').dataset.cardId = cardId;

        const timelineContainer = document.getElementById('timelineContainer');
        timelineContainer.innerHTML = '';

        fetch(`app/controller/card/GetCommentsController.php?id_card=${cardId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    data.comments.forEach(comment => {
                        const chatItemContent = document.createElement('div');
                        chatItemContent.className = 'chat-item-content';

                        const operadorChat = document.createElement('div');
                        operadorChat.className = 'operador-chat';
                        const operadorElement = document.createElement('i');
                        operadorElement.textContent = comment.operador_nome;
                        operadorChat.appendChild(operadorElement);

                        const containerChatItem = document.createElement('div');
                        containerChatItem.className = 'container-chat-item-item';

                        const textChatItem = document.createElement('div');
                        textChatItem.className = 'text-chat-item';
                        const pElement = document.createElement('p');
                        pElement.innerHTML = comment.valor_comentario.replace(/\n/g, '<br>');
                        textChatItem.appendChild(pElement);

                        if (comment.arquivos && comment.arquivos.length > 0) {
                            comment.arquivos.forEach(filePath => {
                                const fileLink = document.createElement('a');
                                fileLink.href = filePath;
                                fileLink.textContent = 'Baixar Arquivo';
                                fileLink.target = '_blank';
                                fileLink.style.display = 'block';
                                fileLink.style.marginTop = '10px';
                                
                                // Adiciona o atributo download para forçar o download
                                fileLink.setAttribute('download', '');

                                containerChatItem.appendChild(fileLink);
                            });
                        }

                        const dateItemModal = document.createElement('div');
                        dateItemModal.className = 'small-date-item-modal';
                        const iElement = document.createElement('i');
                        iElement.textContent = new Date(comment.data).toLocaleDateString();
                        dateItemModal.appendChild(iElement);

                        containerChatItem.appendChild(textChatItem);
                        containerChatItem.appendChild(dateItemModal);
                        chatItemContent.appendChild(operadorChat);
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

    document.getElementById('commentFile').addEventListener('change', function() {
        const files = this.files;
        const fileSelectedText = document.getElementById('fileSelectedText');
        
        if (files.length > 0) {
            let fileNames = [];
            for (let i = 0; i < files.length; i++) {
                fileNames.push(files[i].name);
            }
            fileSelectedText.textContent = 'Arquivos selecionados: ' + fileNames.join(', ');
        } else {
            fileSelectedText.textContent = ''; // Limpa o texto se nenhum arquivo estiver selecionado
        }
    });

    document.getElementById('saveCommentButton').addEventListener('click', function() {
        if (!isUserLoggedIn()) {
            alert('Você precisa estar logado para adicionar um comentário.');
            window.location.href = 'http://192.168.2.18/Projeto-Registro/login';
            return;
        }

        const cardId = this.dataset.cardId;
        const commentText = document.getElementById('commentText').value;
        const files = document.getElementById('commentFile').files;
        const formData = new FormData();

        formData.append('id_card', cardId);
        formData.append('comment', commentText);
        formData.append('situacao', 1);
        formData.append('id_operador', localStorage.getItem('userId'));

        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }

        fetch('app/controller/card/AddCommentController.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const chatItemContent = document.createElement('div');
                chatItemContent.className = 'chat-item-content';

                const operadorChat = document.createElement('div');
                operadorChat.className = 'operador-chat';
                const operadorElement = document.createElement('i');
                operadorElement.textContent = localStorage.getItem('nomeOperador');
                operadorChat.appendChild(operadorElement);

                const containerChatItem = document.createElement('div');
                containerChatItem.className = 'container-chat-item-item';

                const textChatItem = document.createElement('div');
                textChatItem.className = 'text-chat-item';
                const pElement = document.createElement('p');
                pElement.innerHTML = commentText.replace(/\n/g, '<br>');
                textChatItem.appendChild(pElement);

                if (data.filePaths && data.filePaths.length > 0) {
                    data.filePaths.forEach(filePath => {
                        const fileLink = document.createElement('a');
                        fileLink.href = filePath;
                        fileLink.textContent = 'Baixar Arquivo';
                        fileLink.target = '_blank';
                        fileLink.style.display = 'block';
                        fileLink.style.marginTop = '10px';
                        
                        // Adiciona o atributo download para forçar o download
                        fileLink.setAttribute('download', '');

                        containerChatItem.appendChild(fileLink);
                    });
                }

                const dateItemModal = document.createElement('div');
                dateItemModal.className = 'small-date-item-modal';
                const iElement = document.createElement('i');
                iElement.textContent = 'Agora';
                dateItemModal.appendChild(iElement);

                containerChatItem.appendChild(textChatItem);
                containerChatItem.appendChild(dateItemModal);
                chatItemContent.appendChild(operadorChat);
                chatItemContent.appendChild(containerChatItem);
                timelineContainer.appendChild(chatItemContent);

                document.getElementById('commentText').value = '';
                document.getElementById('commentFile').value = '';
                document.getElementById('fileSelectedText').textContent = ''; // Limpa o indicador de arquivos selecionados
            } else {
                console.error('Erro ao adicionar comentário:', data.message);
            }
        })
        .catch(error => console.error('Erro ao enviar requisição AJAX:', error));
    });
});
