<?php include 'app/view/structure/dashboard/head.php' ?>
<title>Dashboard</title>
</head>

<body>
    <div class="d-flex w-100 h-100">
        <div>
            <?php include 'app/view/pages/dashboard/main/menus/LateralMenu.php'; ?>
        </div>
        <div class="w-100 h-100">
            <header>
                <?php include 'app/view/pages/dashboard/header/navbar/navbar.php'; ?>
            </header>

            <main>
                <div class="Container_Menu_Center">
                    <div class="d-flex align-items-center">

                        <div class="d-flex align-items-center mr-3">
                            <span class="badge badge-success mr-1" style="width: 10px; height: 10px; border-radius: 50%; display: inline-block;"></span>
                            <span>Aberto</span>
                        </div>

                        <div class="d-flex align-items-center mr-3">
                            <span class="badge badge-warning mr-1" style="width: 10px; height: 10px; border-radius: 50%; display: inline-block;"></span>
                            <span>Andamento</span>
                        </div>

                        <div class="d-flex align-items-center">
                            <span class="badge badge-danger mr-1" style="width: 10; height: 10px; border-radius: 50%; display: inline-block;"></span>
                            <span>Finalizado</span>
                        </div>
                    </div>

                    <div class="Content-Menu-Center">
                        <div class="Container_Menus_Cube">
                            <!-- Coluna de "Tickets em espera" -->
                            <div class="Menu-Pattern-Main" id="coluna-espera">
                                <div class="Menu-Header-pattern">
                                    <div>
                                        <i class="bi bi-ticket-perforated-fill"></i>
                                        <i>Tickets em espera...</i>
                                    </div>
                                </div>
                                <div class="Menu-Body-Pattern">



                                </div>
                            </div>

                            <!-- Coluna de "Em andamento" -->
                            <div class="Menu-Pattern-Main" id="coluna-andamento">
                                <div class="Menu-Header-pattern">
                                    <div>
                                        <i class="bi bi-telephone"></i>
                                        <i>Em andamento...</i>
                                    </div>
                                </div>
                                <div class="Menu-Body-Pattern">
                                    <!-- Elementos podem ser adicionados aqui -->
                                </div>
                            </div>

                            <!-- Coluna de "Finalizados" -->
                            <div class="Menu-Pattern-Main" id="coluna-finalizados">
                                <div class="Menu-Header-pattern">
                                    <div>
                                        <i class="bi bi-check-circle"></i>
                                        <i>Finalizados</i>
                                    </div>
                                </div>
                                <div class="Menu-Body-Pattern">
                                    <!-- Elementos podem ser adicionados aqui -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- Modals include -->
    <?php include 'app/view/pages/dashboard/modal/relatorios.php' ?>
    <?php include 'app/view/pages/dashboard/modal/card/card-chat.php' ?>
    <?php include 'app/view/pages/dashboard/modal/card/card-view.php' ?>
    <?php include 'app/view/pages/dashboard/modal/login-modal.php' ?>

    <?php include 'app/view/structure/dashboard/footer-script.php' ?>
    <?php include 'app/view/structure/dashboard/footer.php' ?>


</body>