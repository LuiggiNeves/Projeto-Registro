<?php include 'app/view/structure/dashboard/head.php' ?>
<title>Login</title>
<link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.0/mdb.min.css" rel="stylesheet">
<style>
    .gradient-custom-2 {
        background: linear-gradient(to right, #ff8c00, #ff6a00);
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }

    .gradient-form {
        height: 100vh;
    }

    .card {
        border-radius: 1rem;
    }

    .Container-max-h {
        height: 100vh;
    }
</style>
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

                                        <form>
                                            <p>Entre com o seu acesso</p>

                                            <div data-mdb-input-init class="form-outline mb-4">
                                                <input type="email" id="form2Example11" class="form-control"
                                                    placeholder="Digite o seu nome..." />
                                                <label class="form-label" for="form2Example11">Nome</label>
                                            </div>

                                            <div data-mdb-input-init class="form-outline mb-4">
                                                <input type="password" id="form2Example22" class="form-control" />
                                                <label class="form-label" for="form2Example22">Senha</label>
                                            </div>

                                            <div>
                                                <input type="checkbox" name="" id="">
                                                <i>Lembrar</i>

                                            </div>

                                            <div class="text-center pt-1 mb-5 pb-1">

                                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block fa-lg  mb-3" type="button">Log
                                                    in</button>

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
</body>