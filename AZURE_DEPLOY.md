# Instruções de Deploy para Azure Web App (Linux)

## Pré-requisitos

1. **Azure Web App Linux** configurado com:
   - Runtime Stack: Node 20 LTS
   - Sistema Operacional: Linux
   - Nome do app: `app-wisetraining-web-test`

2. **GitHub Secrets** configurados:
   - `AZUREAPPSERVICE_PUBLISHPROFILE_123928CE6AA448218F8BE3880898BC8F`: Publish Profile do Azure Web App

## Configuração do Azure Web App

### 1. Configurações de Aplicação (Application Settings)

No portal Azure, adicione as seguintes configurações:

```
WEBSITE_NODE_DEFAULT_VERSION = 20-lts
SCM_DO_BUILD_DURING_DEPLOYMENT = false
WEBSITE_RUN_FROM_PACKAGE = 0
```

### 2. Startup Command

Configure o comando de inicialização:

```
node server.js
```

### 3. General Settings

- **Stack**: Node
- **Major version**: 20 LTS
- **Minor version**: 20-lts

## Como Funciona o Deploy

### Build Process (GitHub Actions)

1. **Checkout do código**
2. **Setup Node.js 20.x**
3. **Instalação de dependências** (`npm ci`)
4. **Build da aplicação Angular** (`npm run build:prod`)
5. **Preparação do pacote de deploy**:
   - Copia `server.js`, `package.json` e pasta `dist`
   - Instala apenas dependências de produção
6. **Upload do artefato**

### Deploy Process

1. **Download do artefato**
2. **Deploy para Azure Web App Linux**

## Estrutura do Pacote de Deploy

```
deploy/
├── server.js           # Servidor Express
├── package.json        # Dependências de produção
├── dist/               # Build do Angular
│   └── WebTemplate/
│       └── browser/    # Arquivos estáticos
└── node_modules/       # Apenas dependências de produção
```

## Comandos Úteis

### Build local
```bash
npm install
npm run build:prod
```

### Testar localmente
```bash
npm start
```

O servidor estará disponível em `http://localhost:8080`

## Troubleshooting

### 1. Aplicação não inicia

- Verifique os logs no Azure Portal (Log Stream)
- Confirme que o startup command está configurado: `node server.js`
- Verifique se as variáveis de ambiente estão configuradas

### 2. Erro 404 após deploy

- Confirme que o build gerou os arquivos em `dist/WebTemplate/browser`
- Verifique se o `server.js` está apontando para o caminho correto

### 3. Erro de memória durante build

- No Azure, aumente o plan/tier do App Service
- Localmente, aumente a memória do Node: `NODE_OPTIONS=--max_old_space_size=4096`

## Verificação do Deploy

Após o deploy bem-sucedido:

1. Acesse a URL do Web App
2. Verifique os logs em tempo real no Azure Portal
3. Teste as rotas da aplicação
4. Verifique o console do navegador para erros

## Monitoramento

- **Application Insights**: Configure para monitoramento detalhado
- **Log Stream**: Logs em tempo real
- **Metrics**: CPU, memória, requests

## Suporte

Para problemas, verifique:
1. GitHub Actions logs
2. Azure App Service logs
3. Application Insights (se configurado)
