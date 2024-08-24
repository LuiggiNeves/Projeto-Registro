// Inicialize o SortableJS para permitir arrastar e soltar entre as colunas
new Sortable(document.querySelector('#coluna-espera .Menu-Body-Pattern'), {
    group: 'shared',
    animation: 150
});

new Sortable(document.querySelector('#coluna-andamento .Menu-Body-Pattern'), {
    group: 'shared',
    animation: 150
});

new Sortable(document.querySelector('#coluna-finalizados .Menu-Body-Pattern'), {
    group: 'shared',
    animation: 150
});