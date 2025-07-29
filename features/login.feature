Feature: Validação de funcionalidades principais

  Scenario: Login com credenciais válidas
    Given o usuário está na tela de login
    When ele preenche o campo de usuário e senha corretamente
    And clica no botão de login
    Then ele deve ser redirecionado para a tela principal