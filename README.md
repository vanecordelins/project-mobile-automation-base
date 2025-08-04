# 🤖 Projeto de Automação Mobile com WebDriverIO + Appium

Este projeto realiza testes automatizados em um aplicativo mobile (Android e iOS) utilizando WebDriverIO, Appium e Cucumber. Os testes são estruturados no padrão Gherkin e seguem boas práticas de Page Object Model.

---

## Funcionalidades testadas

- Login com credenciais válidas
- Cadastro de novo usuário (positivo e negativo)
- Preenchimento de formulários (incluindo com JSON)
- Navegação entre telas
- Swipe e verificação de conteúdo

---

## Estrutura do projeto

```
.
├── apps/                    # APK e APP para Android/iOS
├── features/                # Features em Gherkin
│   ├── step-definitions/    # Steps Cucumber
│   └── *.feature            # Cenários
├── pages/                   # Page Objects
├── utils/                   # Helpers utilitários
├── reports/                 # Relatórios Allure
├── wdio.conf.mjs            # Configuração WebDriverIO
└── package.json             # Dependências e scripts
```

---

## Requisitos

- Node.js 20+
- Appium 2.x (`npm install -g appium`)
- Android SDK configurado (para rodar localmente no Android)
- Xcode com simulador (para rodar localmente no iOS - apenas macOS)

---

## Como executar os testes

### Instalar dependências

```bash
npm ci
```

### Rodar todos os testes (Android)

```bash
npm run test
```

### Rodar uma feature específica

```bash
npm run test:feature ./features/login.feature
```

### Rodar por tags

```bash
# Ex: Executar somente testes de login
npm run test:tag @login

# Testes positivos do cadastro
npm run test:tag "@signup and @positive"

# Executar tudo exceto cenários negativos
npm run test:tag "not @negative"
```

### Rodar para plataforma específica

```bash
# Android
npm run test:android

# iOS
npm run test:ios
```

> 💡 Por padrão, a plataforma é Android. Para iOS, é necessário definir a variável de ambiente `PLATFORM=ios`.

---

## Relatório Allure

Após a execução dos testes, gere o relatório com:

```bash
npm run report
```

Isso abrirá automaticamente o navegador com o relatório gerado.

---

## Execução em CI (GitHub Actions)

Este projeto possui pipelines para execução automática no GitHub Actions:

- `.github/workflows/android-tests.yml` → Executa testes Android em emulador
- `.github/workflows/ios-tests.yml` → Executa testes iOS em simulador
- `.github/workflows/matrix-tests.yml` → Executa testes em paralelo para Android e iOS

Relatórios Allure são gerados como artefatos ao final de cada execução.

---

## Tags utilizadas nos testes

| Tag            | Descrição                         |
|----------------|-----------------------------------|
| `@login`       | Testes da feature de login        |
| `@signup`      | Testes da feature de cadastro     |
| `@forms`       | Testes de formulários             |
| `@navigation`  | Testes de navegação entre telas   |
| `@positive`    | Cenários de fluxo esperado        |
| `@negative`    | Cenários com validações de erro   |

---

## Observações

- A automação está preparada para **Android e iOS**, mas a execução local do iOS exige macOS com Xcode.
- Os mapeamentos utilizam `browser.isAndroid` para compatibilidade entre plataformas.
- Capturas de tela são registradas automaticamente no relatório Allure.

---

## 👩‍💻 Autor

Desenvolvido por [Vanessa Lins](https://github.com/vanessalins) 