// Função para abrir o modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Função para fechar o modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}


// Função para fechar o modal ao clicar fora dele
function closeModalOnOutsideClick(event, modalId) {
    if (event.target.classList.contains('card-modal')) {
        closeModal(modalId);
    }
}
