# Projeto de Automação Mobile com WebDriverIO + Appium

Este projeto realiza testes automatizados em um aplicativo mobile (Android e iOS), utilizando WebDriverIO, Appium e Cucumber. Os testes são escritos no padrão Gherkin e organizados seguindo o padrão Page Object Model (POM).

---

## Funcionalidades testadas

- Login com credenciais válidas
- Cadastro de novo usuário (fluxo positivo e negativo)
- Preenchimento de formulários (inclusive via JSON)
- Navegação entre telas
- Interações com swipe horizontal e verificação de conteúdo dinâmico

---

## Estrutura do projeto

```
.
├── .github/workflows/       # Pipelines de CI/CD para Android e iOS
├── apps/                    # APK e APP utilizados nos testes locais
├── config/                  # Arquivos de configuração do WebDriverIO
│   ├── wdio.shared.conf.mjs
│   ├── wdio.local.conf.mjs
│   └── wdio.browserstack.conf.mjs
├── features/                # Testes automatizados
│   ├── data/                # Arquivos JSON com massa de dados
│   ├── pages/               # Page Objects
│   ├── step-definitions/    # Steps do Cucumber
│   └── *.feature            # Features escritas em Gherkin
├── reports/                 # Resultados de testes e relatórios (Allure)
├── utils/                   # Helpers utilitários
├── package.json             # Scripts e dependências
└── README.md
```

---

## ⚙️ Requisitos

- Node.js 20+
- Appium 2.x (`npm install -g appium`)
- Android SDK (para testes locais em Android)
- Xcode com simulador (para testes locais em iOS – apenas no macOS)

---

## 🚀 Como executar os testes

### Instalar dependências

```bash
npm ci
```

### Executar todos os testes (Android)

```bash
npm run test
```

### Executar uma feature específica

```bash
npm run test:feature ./features/login.feature
```

### Executar cenários por tags

```bash
# Apenas testes de login
npm run test:tag @login

# Testes positivos de cadastro
npm run test:tag "@signup and @positive"

# Executar todos, exceto testes negativos
npm run test:tag "not @negative"
```

### Executar por plataforma

```bash
# Android
npm run test:android

# iOS
npm run test:ios
```

> Por padrão, a plataforma utilizada é Android. Para rodar no iOS, defina a variável de ambiente: `PLATFORM=ios`.

---

## Relatório Allure

Após os testes, o relatório pode ser gerado com:

```bash
npm run report
```

> O relatório será aberto automaticamente no navegador padrão.

---

## ⚙️ Execução em CI/CD (GitHub Actions)

O projeto conta com pipelines de integração contínua:

| Pipeline                          | Plataforma | Status                   |
|----------------------------------|------------|---------------------------|
| `.github/workflows/android.yml`  | Android    | Ativa                    |
| `.github/workflows/ios.yml`      | iOS        | Temporariamente inativa  |

- As execuções no CI utilizam **BrowserStack**.
- O relatório Allure é gerado como artefato ao final de cada execução.

---

## Tags utilizadas nos testes

| Tag          | Descrição                          |
|--------------|------------------------------------|
| `@login`     | Testes da feature de login         |
| `@signup`    | Testes da feature de cadastro      |
| `@forms`     | Testes de formulários              |
| `@navigation`| Navegação entre telas              |
| `@positive`  | Cenários com fluxo esperado        |
| `@negative`  | Cenários com validações de erro    |

---

## 🔍 Observações

- O projeto está preparado para execução em **Android e iOS**, com mapeamentos condicionais (`browser.isAndroid`) para suportar ambos.
- Screenshots são capturados automaticamente em falhas e incluídos no relatório Allure.
- O arquivo `.app` necessário para iOS ainda não está incluído — por isso, os testes iOS estão desativados por ora.

---

## 👩‍💻 Autor

Desenvolvido por [Vanessa Lins](https://github.com/vanecordelins)