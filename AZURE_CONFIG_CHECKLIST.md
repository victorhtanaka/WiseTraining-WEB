# Azure Web App - Checklist de Configuração

## ✅ Configurações Obrigatórias no Portal Azure

### 1. Configuration → Application settings

Adicione as seguintes variáveis:

| Nome | Valor | Descrição |
|------|-------|-----------|
| `WEBSITE_NODE_DEFAULT_VERSION` | `20-lts` | Versão do Node.js |
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `false` | Desabilita build durante deploy |
| `WEBSITE_RUN_FROM_PACKAGE` | `0` | Não usar package ZIP |
| `NODE_ENV` | `production` | Ambiente de execução |

### 2. Configuration → General settings

- **Stack**: Node
- **Major version**: 20 LTS
- **Minor version**: 20-lts (ou a mais recente disponível)
- **Startup Command**: `node server.js`

### 3. Deployment Center

- **Source**: GitHub Actions
- **Organization**: victorhtanaka
- **Repository**: WiseTraining-WEB
- **Branch**: microfrontend

### 4. GitHub Secrets

Verifique se o secret existe no GitHub:
- Nome: `AZUREAPPSERVICE_PUBLISHPROFILE_123928CE6AA448218F8BE3880898BC8F`
- Valor: Copiar do Azure Portal → Deployment Center → Manage publish profile

## 📋 Passos para Configurar

### Passo 1: Criar/Atualizar o Web App

```bash
# Via Azure CLI (opcional)
az webapp create \
  --resource-group <seu-resource-group> \
  --plan <seu-app-service-plan> \
  --name app-wisetraining-web-test \
  --runtime "NODE:20-lts"
```

### Passo 2: Configurar Application Settings

No Portal Azure:
1. Vá para o Web App
2. Settings → Configuration
3. Application settings → New application setting
4. Adicione cada variável da tabela acima
5. Clique em "Save"

### Passo 3: Configurar Startup Command

1. Configuration → General settings
2. Stack settings → Startup Command: `node server.js`
3. Save

### Passo 4: Baixar Publish Profile

1. Deployment Center → Manage publish profile
2. Copie o conteúdo do arquivo .publishsettings

### Passo 5: Adicionar Secret no GitHub

1. Vá para o repositório no GitHub
2. Settings → Secrets and variables → Actions
3. Verifique se existe: `AZUREAPPSERVICE_PUBLISHPROFILE_123928CE6AA448218F8BE3880898BC8F`
4. Se não existir, crie com o conteúdo do publish profile

## 🚀 Depois da Configuração

1. Faça push para a branch `microfrontend`
2. Acompanhe o workflow no GitHub Actions
3. Verifique os logs no Azure Portal (Monitoring → Log stream)
4. Acesse a URL do Web App

## 🔍 Endpoints de Verificação

- **Health Check**: `https://app-wisetraining-web-test.azurewebsites.net/health`
- **Aplicação**: `https://app-wisetraining-web-test.azurewebsites.net/`

## 📊 Monitoramento

### Log Stream
Portal Azure → Monitoring → Log stream

### Application Insights (Recomendado)
1. Create Application Insights resource
2. Link to Web App
3. Configurar instrumentação

### Metrics
Portal Azure → Monitoring → Metrics
- CPU Percentage
- Memory Percentage
- HTTP Server Errors
- Response Time

## ⚠️ Problemas Comuns

### Aplicação não inicia
- ✅ Verificar startup command
- ✅ Verificar versão do Node
- ✅ Verificar logs

### 404 nas rotas
- ✅ Verificar se build gerou arquivos
- ✅ Verificar caminho no server.js

### Erros de memória
- ✅ Aumentar tier do App Service Plan
- ✅ Configurar `NODE_OPTIONS=--max_old_space_size=2048`
