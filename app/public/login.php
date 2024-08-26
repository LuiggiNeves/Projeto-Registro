<?php include 'app/view/structure/dashboard/head.php' ?>
<title>Login</title>
<link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.0/mdb.min.css" rel="stylesheet">
<link rel="stylesheet" href="app/public/css/access/login.css">

</head>

<body>
    <div class="Container-max-h">
        <section class="h-100 gradient-form" style="background-color: #eee;">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-xl-10">
                        <div class="card rounded-3 text-black">
                            <div class="row g-0">
                                <div class="col-lg-6">
                                    <div class="card-body p-md-5 mx-md-4">

                                        <div class="text-center">
                                            <img src="app/public/assets/img/CBR-TR.png"
                                                style="width: 185px;" alt="logo">
                                            <h4 class="mt-1 mb-5 pb-1"></h4>
                                        </div>

                                        <form id="loginForm" method="POST" action="">
                                            <p>Entre com o seu acesso</p>

                                            <div data-mdb-input-init class="form-outline mb-4">
                                                <input type="text" id="nameEnter" class="form-control" placeholder="Digite o seu nome..." required />
                                                <label class="form-label" for="nameEnter">Nome</label>
                                            </div>

                                            <div data-mdb-input-init class="form-outline mb-4">
                                                <input type="password" id="passEnter" class="form-control" required />
                                                <label class="form-label" for="passEnter">Senha</label>
                                            </div>

                                            <div>
                                                <input type="checkbox" id="rememberMe">
                                                <i>Lembrar</i>
                                            </div>

                                            <div class="text-center pt-1 mb-5 pb-1">
                                                <button class="btn btn-login btn-block fa-lg mb-3" type="submit">Log in</button>
                                            </div>
                                        </form>


                                    </div>
                                </div>
                                <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 class="mb-4">Bem Vindo!</h4>
                                        <p class="small mb-0">Este site foi desenvolvido especificamente para facilitar o registro de atendimentos dos fornecedores
                                            de maneira eficiente e organizada. Com o objetivo de otimizar o processo de acompanhamento e gestão de serviços, a plataforma
                                            permite que os fornecedores registrem todos os atendimentos realizados, proporcionando uma visão clara e detalhada de cada interação.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>


    <!-- Incluindo o JS do MDBootstrap -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.0/mdb.min.js"></script>
    <script src="app/config/config.js"></script>
    <script src="app/public/js/login/login.js"></script>
</body>