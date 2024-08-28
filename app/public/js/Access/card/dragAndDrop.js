// dragAndDrop.js
document.addEventListener('DOMContentLoaded', function () {
    configuraArrastarSoltar();

    function configuraArrastarSoltar() {
        const zonaSoltar = document.getElementById('dropZone');
        const inputArquivo = document.getElementById('imageInput');
        const containerNomesArquivos = document.querySelector('.container-name-file'); // Container para exibir os nomes dos arquivos

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(nomeEvento => {
            zonaSoltar.addEventListener(nomeEvento, prevenirComportamentoPadrao, false);
        });

        ['dragenter', 'dragover'].forEach(nomeEvento => {
            zonaSoltar.addEventListener(nomeEvento, () => zonaSoltar.classList.add('drag-over'), false);
        });

        ['dragleave', 'drop'].forEach(nomeEvento => {
            zonaSoltar.addEventListener(nomeEvento, () => zonaSoltar.classList.remove('drag-over'), false);
        });

        zonaSoltar.addEventListener('drop', tratarSoltar, false);
        zonaSoltar.addEventListener('click', (e) => {
            if (e.target !== zonaSoltar) return; // Previne a ação de abrir a tela de seleção ao clicar no "X"
            inputArquivo.click();
        });

        inputArquivo.addEventListener('change', function() {
            manipularArquivos(inputArquivo.files);
        });

        function prevenirComportamentoPadrao(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function tratarSoltar(e) {
            const dt = e.dataTransfer;
            const arquivos = dt.files;
            manipularArquivos(arquivos);
        }

        function manipularArquivos(arquivos) {
            containerNomesArquivos.innerHTML = ''; // Limpa a lista de arquivos antes de adicionar os novos
            const arquivosArray = Array.from(arquivos);

            arquivosArray.forEach((arquivo, index) => {
                const itemArquivo = document.createElement('div');
                itemArquivo.classList.add('file-item');
                itemArquivo.textContent = arquivo.name;

                const botaoRemover = document.createElement('button');
                botaoRemover.textContent = 'X';
                botaoRemover.classList.add('remove-button');
                botaoRemover.addEventListener('click', function(e) {
                    e.stopPropagation(); // Impede a propagação do clique para a zona de arrastar e soltar
                    removerArquivo(index, arquivosArray);
                });

                itemArquivo.appendChild(botaoRemover);
                containerNomesArquivos.appendChild(itemArquivo);
                console.log('Arquivo adicionado:', arquivo.name);
            });

            // Atualiza o input de arquivos com os novos arquivos
            const dataTransfer = new DataTransfer();
            arquivosArray.forEach(arquivo => dataTransfer.items.add(arquivo));
            inputArquivo.files = dataTransfer.files;
        }

        function removerArquivo(index, arquivosArray) {
            arquivosArray.splice(index, 1); // Remove o arquivo do array

            // Atualiza a lista de arquivos exibida
            manipularArquivos(arquivosArray);
        }
    }
});
