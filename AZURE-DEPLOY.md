# 🚀 Deploy de Microfrontends na Azure

## 📋 Visão Geral

Este guia apresenta diferentes estratégias para deploy dos microfrontends do WiseTraining na Azure.

---

## 🎯 Opções de Deploy

### Opção 1: Azure Static Web Apps (RECOMENDADO) ⭐

**Melhor para:** Microfrontends com lazy loading (arquitetura atual)

**Vantagens:**
- ✅ CI/CD integrado com GitHub
- ✅ HTTPS automático
- ✅ CDN global incluído
- ✅ Custo muito baixo (tier gratuito disponível)
- ✅ Suporte nativo para Angular
- ✅ Rollback fácil

**Como funciona:**
- Todos os microfrontends ficam em UM único app
- Lazy loading carrega chunks sob demanda
- Azure CDN distribui globalmente

#### Passo a Passo:

**1. Build de Produção**

```bash
# 1. Compilar shared-lib
npm run build:shared

# 2. Compilar todos os microfrontends
npm run build:all

# 3. Build de produção do shell
ng build --configuration production
```

**2. Estrutura de Output**

Após o build, você terá:
```
dist/
├── WebTemplate/          # Shell app (main)
│   └── browser/
│       ├── index.html
│       ├── main-*.js
│       ├── polyfills-*.js
│       ├── styles-*.css
│       └── assets/
├── shared-lib/          # Biblioteca (não vai para web)
├── mfe-auth/            # Microfrontend auth (incluído no bundle)
├── mfe-courses/         # Microfrontend courses (incluído no bundle)
├── mfe-admin/           # Microfrontend admin (incluído no bundle)
└── mfe-company/         # Microfrontend company (incluído no bundle)
```

**3. Criar Static Web App na Azure**

Via Portal Azure:
```
1. Ir para portal.azure.com
2. Criar recurso → Static Web Apps
3. Preencher:
   - Nome: wisetraining-web
   - Região: East US (ou preferida)
   - SKU: Free ou Standard
   - Deployment: GitHub (conectar repositório)
   - Build preset: Angular
   - App location: /
   - Output location: dist/WebTemplate/browser
```

**4. Configurar GitHub Actions (automático)**

A Azure cria automaticamente `.github/workflows/azure-static-web-apps-*.yml`:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - master
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - master

jobs:
  build_and_deploy_job:
    runs_on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
          
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/" 
          api_location: ""
          output_location: "dist/WebTemplate/browser"
          
      - name: Build shared-lib first
        run: |
          npm ci
          npm run build:shared
          npm run build:all
```

**5. Configuração de Rotas (staticwebapp.config.json)**

Criar na raiz do projeto:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/*.{css,scss,js,png,jpg,jpeg,gif,svg,ico,woff,woff2,ttf,eot}"]
  },
  "routes": [
    {
      "route": "/auth/*",
      "allowedRoles": ["anonymous", "authenticated"]
    },
    {
      "route": "/Course/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/admin/*",
      "allowedRoles": ["admin"]
    },
    {
      "route": "/company/*",
      "allowedRoles": ["authenticated"]
    }
  ],
  "responseOverrides": {
    "401": {
      "redirect": "/auth/login",
      "statusCode": 302
    }
  },
  "globalHeaders": {
    "cache-control": "public, max-age=31536000, immutable"
  },
  "mimeTypes": {
    ".json": "application/json",
    ".js": "text/javascript",
    ".css": "text/css"
  }
}
```

**6. Variáveis de Ambiente**

Criar `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUri: 'https://sua-api.azurewebsites.net/api',
  firebase: {
    apiKey: "YOUR_FIREBASE_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-bucket.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
  }
};
```

**Adicionar no Azure Portal → Configuration → Application Settings:**
```
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=xxx
API_BASE_URL=https://sua-api.azurewebsites.net
```

---

### Opção 2: Azure Storage + CDN

**Melhor para:** Controle total sobre CDN e cache

**Custo:** ~$5-20/mês

#### Passo a Passo:

**1. Criar Storage Account**

```bash
# Via Azure CLI
az storage account create \
  --name wisetrainingstg \
  --resource-group wisetraining-rg \
  --location eastus \
  --sku Standard_LRS \
  --kind StorageV2

# Habilitar Static Website
az storage blob service-properties update \
  --account-name wisetrainingstg \
  --static-website \
  --index-document index.html \
  --404-document index.html
```

**2. Build e Upload**

```bash
# Build de produção
npm run build:shared
npm run build:all
ng build --configuration production

# Upload via Azure CLI
az storage blob upload-batch \
  --account-name wisetrainingstg \
  --source ./dist/WebTemplate/browser \
  --destination '$web' \
  --overwrite
```

**3. Configurar CDN**

```bash
# Criar CDN profile
az cdn profile create \
  --name wisetraining-cdn \
  --resource-group wisetraining-rg \
  --sku Standard_Microsoft

# Criar endpoint
az cdn endpoint create \
  --name wisetraining \
  --profile-name wisetraining-cdn \
  --resource-group wisetraining-rg \
  --origin wisetrainingstg.z13.web.core.windows.net \
  --origin-host-header wisetrainingstg.z13.web.core.windows.net
```

**4. Script de Deploy Automatizado**

Criar `deploy-azure.ps1`:

```powershell
# Deploy script para Azure Storage + CDN

param(
    [string]$StorageAccount = "wisetrainingstg",
    [string]$ResourceGroup = "wisetraining-rg"
)

Write-Host "🔨 Building application..." -ForegroundColor Cyan

# Build
npm run build:shared
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

npm run build:all
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

ng build --configuration production
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "✅ Build completed!" -ForegroundColor Green

Write-Host "📤 Uploading to Azure Storage..." -ForegroundColor Cyan

# Upload
az storage blob upload-batch `
  --account-name $StorageAccount `
  --source ./dist/WebTemplate/browser `
  --destination '$web' `
  --overwrite `
  --no-progress

Write-Host "✅ Upload completed!" -ForegroundColor Green

Write-Host "🔄 Purging CDN cache..." -ForegroundColor Cyan

# Purge CDN
az cdn endpoint purge `
  --resource-group $ResourceGroup `
  --profile-name wisetraining-cdn `
  --name wisetraining `
  --content-paths '/*'

Write-Host "✅ Deploy completed successfully!" -ForegroundColor Green
Write-Host "🌐 URL: https://wisetraining.azureedge.net" -ForegroundColor Yellow
```

Executar:
```bash
.\deploy-azure.ps1
```

---

### Opção 3: Azure App Service

**Melhor para:** Quando precisa de backend no mesmo serviço

**Custo:** ~$15-50/mês

#### Passo a Passo:

**1. Criar App Service**

```bash
# Criar App Service Plan
az appservice plan create \
  --name wisetraining-plan \
  --resource-group wisetraining-rg \
  --sku B1 \
  --is-linux

# Criar Web App
az webapp create \
  --name wisetraining-web \
  --resource-group wisetraining-rg \
  --plan wisetraining-plan \
  --runtime "NODE|18-lts"
```

**2. Configurar Deploy**

Criar `web.config` na raiz:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Angular Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

**3. Deploy via GitHub Actions**

Criar `.github/workflows/azure-webapp.yml`:

```yaml
name: Deploy to Azure App Service

on:
  push:
    branches: [ master ]

env:
  AZURE_WEBAPP_NAME: wisetraining-web
  NODE_VERSION: '18.x'

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build shared-lib
      run: npm run build:shared
    
    - name: Build all microfrontends
      run: npm run build:all
    
    - name: Build for production
      run: ng build --configuration production
    
    - name: Upload artifact
      uses: actions/upload-artifact@v3
      with:
        name: webapp
        path: dist/WebTemplate/browser
  
  deploy:
    runs-on: ubuntu-latest
    needs: build
    
    steps:
    - name: Download artifact
      uses: actions/download-artifact@v3
      with:
        name: webapp
    
    - name: Deploy to Azure
      uses: azure/webapps-deploy@v2
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: .
```

---

### Opção 4: Module Federation com Múltiplos Hosts (Avançado)

**Melhor para:** Equipes independentes, deploys separados

**Complexidade:** Alta
**Custo:** ~$30-100/mês (múltiplos App Services)

#### Arquitetura:

```
https://shell.wisetraining.com/        → Shell App (porta 4200)
https://auth.wisetraining.com/         → mfe-auth (porta 4201)
https://courses.wisetraining.com/      → mfe-courses (porta 4202)
https://admin.wisetraining.com/        → mfe-admin (porta 4203)
https://company.wisetraining.com/      → mfe-company (porta 4204)
```

**Configuração necessária:**

1. **Instalar Module Federation**
```bash
npm install @angular-architects/module-federation
```

2. **Configurar webpack.config.js no Shell**

```javascript
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    uniqueName: "shell",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        'mfeAuth': 'mfeAuth@https://auth.wisetraining.com/remoteEntry.js',
        'mfeCourses': 'mfeCourses@https://courses.wisetraining.com/remoteEntry.js',
        'mfeAdmin': 'mfeAdmin@https://admin.wisetraining.com/remoteEntry.js',
        'mfeCompany': 'mfeCompany@https://company.wisetraining.com/remoteEntry.js'
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true }
      }
    })
  ]
};
```

3. **Configurar cada microfrontend como host**

Exemplo para `mfe-auth/webpack.config.js`:

```javascript
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    uniqueName: "mfeAuth",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfeAuth",
      filename: "remoteEntry.js",
      exposes: {
        './Module': './projects/mfe-auth/src/public-api.ts'
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true }
      }
    })
  ]
};
```

4. **Deploy cada um em App Service separado**

```bash
# Para cada microfrontend
az webapp create --name wisetraining-auth --runtime "NODE|18-lts" ...
az webapp create --name wisetraining-courses --runtime "NODE|18-lts" ...
# etc...
```

---

## 🛠️ Configurações Comuns

### CORS (se API separada)

No Azure API:
```json
{
  "cors": {
    "allowedOrigins": [
      "https://wisetraining.azurestaticapps.net",
      "https://wisetraining.azureedge.net"
    ],
    "allowedMethods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "allowedHeaders": ["*"],
    "exposedHeaders": ["*"],
    "allowCredentials": true
  }
}
```

### SSL/HTTPS

Todas as opções acima incluem HTTPS automático via Azure.

Para domínio customizado:
```bash
# Adicionar domínio customizado
az staticwebapp hostname set \
  --name wisetraining-web \
  --hostname www.wisetraining.com

# Azure provê certificado SSL automaticamente
```

---

## 💰 Comparação de Custos (Estimativa Mensal)

| Opção | Custo Free Tier | Custo Básico | Custo Otimizado |
|-------|----------------|--------------|-----------------|
| Static Web Apps | Grátis (100GB) | $9/mês | $20/mês |
| Storage + CDN | ~$2/mês | ~$10/mês | ~$50/mês |
| App Service | ~$15/mês | ~$30/mês | ~$100/mês |
| Module Federation (5 apps) | - | ~$75/mês | ~$500/mês |

---

## 🎯 Recomendação

### Para sua arquitetura atual (Lazy Loading):

**👉 Use Azure Static Web Apps** (Opção 1)

**Motivos:**
1. ✅ Seus microfrontends já são lazy chunks
2. ✅ Não precisa de servidores separados
3. ✅ CI/CD automático com GitHub
4. ✅ Custo muito baixo (pode ser grátis)
5. ✅ CDN global incluído
6. ✅ SSL automático

**Deploy é simples:**
```bash
1. Build: npm run build:shared && npm run build:all && ng build --prod
2. Push para GitHub
3. Azure deploy automático via GitHub Actions
```

---

## 📝 Checklist de Deploy

Antes de fazer deploy:

- [ ] Variáveis de ambiente configuradas (Firebase, API URL)
- [ ] Build de produção testado localmente
- [ ] CORS configurado no backend
- [ ] Routes configuradas (staticwebapp.config.json)
- [ ] CI/CD configurado (GitHub Actions)
- [ ] Domínio customizado configurado (opcional)
- [ ] Monitoramento configurado (Application Insights)

---

## 🔍 Monitoramento

Adicionar Application Insights:

```typescript
// src/app/app.module.ts
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    connectionString: 'YOUR_CONNECTION_STRING'
  }
});
appInsights.loadAppInsights();
appInsights.trackPageView();
```

---

## 🚀 Deploy Rápido (Resumo)

```bash
# 1. Build
npm run build:shared
npm run build:all
ng build --configuration production

# 2. Azure Static Web Apps (via portal)
# - Criar recurso
# - Conectar GitHub
# - Deploy automático

# 3. Ou manual via Azure CLI
az staticwebapp create \
  --name wisetraining-web \
  --resource-group wisetraining-rg \
  --source https://github.com/victorhtanaka/WiseTraining-WEB \
  --branch master \
  --app-location "/" \
  --output-location "dist/WebTemplate/browser"
```

**Pronto! Sua aplicação estará online em minutos! 🎉**

---

## 📚 Recursos

- [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [Deploy Angular to Azure](https://docs.microsoft.com/azure/static-web-apps/deploy-angular)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Azure CDN](https://docs.microsoft.com/azure/cdn/)

---

*Última atualização: 27 de Outubro de 2025*
