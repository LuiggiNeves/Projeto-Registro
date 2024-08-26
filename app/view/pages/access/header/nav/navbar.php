<nav>
    <div id="Container_NavBar_Admin">
        <div id="Content_NavBar_Admin">
            <div class="pattern-div-nav">
                <div class="dropdown account-info ">
                    <!-- Botão de dropdown com ícone e nome -->
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="bi bi-person-circle"></i> <!-- Ícone -->
                        <span>Luiggi Neves</span> <!-- Nome -->
                    </button>

                    <!-- Menu de dropdown -->
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button class="dropdown-item dashboard-item" type="button">DASHBOARD</button>
                        <button class="dropdown-item sair-item" type="button" onclick="Deslogar()">SAIR</button>
                    </div>
                </div>
            </div>


            <div class="admin-title pattern-div-nav">
                <h3>Administração</h3>
            </div>
        </div>
    </div>
</nav>

<script>
    function Deslogar() {
        localStorage.clear(); // Limpa todos os itens do armazenamento local
        window.alert('DESLOGADO'); // Mostra uma mensagem de alerta
        location.reload(); // Recarrega a página
    }
</script>