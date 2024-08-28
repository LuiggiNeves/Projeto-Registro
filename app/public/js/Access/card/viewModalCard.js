// viewModalCard.js
window.viewCard = function(cardId) {
    fetch(`app/model/card/cardGet.php?id=${cardId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Popula o modal com os detalhes do cartão
                document.getElementById('detailCliente').textContent = data.card.nome_cliente;
                document.getElementById('detailCNPJ').textContent = data.card.cnpj;
                document.getElementById('detailSoftware').textContent = data.card.nome_software;
                document.getElementById('detailSituacao').textContent = data.card.nome_situacao;
                document.getElementById('detailMotivo').textContent = data.card.nome_motivo;
                document.getElementById('detailComunicador1').textContent = data.card.comunicador_01;
                document.getElementById('detailComunicador2').textContent = data.card.comunicador_02;
                document.getElementById('detailAssunto').textContent = data.card.assunto;
                document.getElementById('detailDataInicio').textContent = data.card.data_inicio;
                document.getElementById('detailDataPrazo').textContent = data.card.data_prazo;
                document.getElementById('detailDataFim').textContent = data.card.data_fim;
                document.getElementById('detailDescricao').textContent = data.card.descricao;

                // Popula o modal com os links dos arquivos
                const arquivosContainer = document.getElementById('detailArquivos');
                arquivosContainer.innerHTML = ''; // Limpa o conteúdo anterior

                if (data.card.dir_img) {
                    const arquivos = data.card.dir_img.split(';');
                    arquivos.forEach(function (arquivo) {
                        const link = document.createElement('a');
                        link.href = `app/${arquivo}`; // Caminho para o arquivo
                        link.textContent = arquivo.split('/').pop(); // Nome do arquivo para exibição
                        link.setAttribute('download', '');
                        link.classList.add('arquivo-link');
                        arquivosContainer.appendChild(link);

                        // Adiciona um espaço entre os links de arquivos
                        arquivosContainer.appendChild(document.createTextNode(' '));
                    });
                } else {
                    arquivosContainer.textContent = 'Nenhum arquivo disponível.';
                }

                // Abre o modal usando Bootstrap 4
                $('#cardDetailsModal').modal('show');
            } else {
                alert('Erro ao buscar detalhes do cartão.');
            }
        })
        .catch(error => console.error('Erro ao buscar detalhes do cartão:', error));
};



// Função para fechar o modal
window.closeModal = function() {
    $('#cardDetailsModal').modal('hide');
};
