<div class="Menu_Container_Tickets">
    <div class="Content_Menu_Tickets">
        <div class="Container_Menu_Tickets_Admin_Header">
            <div class="title-conntent-cont">
                <h3>Pesquisa</h3>
            </div>
            <div class="container-input-others">
                <input type="date" id="startDate">
                <input type="date" id="endDate">
                <select id="statusFilter">
                    <option value="">Todos</option>
                    <option value="1">Aberto</option>
                    <option value="2">Em andamento</option>
                    <option value="3">Finalizado</option>
                </select>
            </div>
            <div class="container-input-search-card">
                <div class="box-component">
                    <i class="bi bi-search"></i>
                </div>
                <input type="text" id="clientSearch" placeholder="Pesquise por um cliente...">
            </div>
        </div>
        <div class="Container-Menu-Tickets-Admin">
            <div class="Menu-Body-Pattern" id="ticketContainer">
                <?php include 'app/view/pages/access/components/card-item.php'; ?>
            </div>
        </div>
    </div>
</div>