# 🚀 Guia Rápido - Deploy na Azure

## Opção Recomendada: Azure Static Web Apps

### ✅ Por que escolher Static Web Apps?

- ✅ **Grátis** (tier gratuito com 100GB de banda)
- ✅ **Deploy automático** via GitHub
- ✅ **HTTPS** automático
- ✅ **CDN global** incluído
- ✅ **CI/CD** integrado
- ✅ Perfeito para sua arquitetura com lazy loading

---

## 📋 Passo a Passo Completo

### 1️⃣ Preparar o Projeto

```bash
# Já está pronto! Arquivos criados:
✅ staticwebapp.config.json    # Configuração de rotas
✅ .github/workflows/azure-static-web-apps.yml  # CI/CD
✅ deploy-azure.ps1             # Script manual (alternativa)
```

### 2️⃣ Criar Resource Group na Azure

```bash
# Via Azure CLI (se não tiver, baixe: https://aka.ms/installazurecliwindows)
az login

az group create \
  --name wisetraining-rg \
  --location eastus
```

### 3️⃣ Criar Static Web App

**Opção A: Via Portal Azure (Mais Fácil)**

1. Acesse https://portal.azure.com
2. Clique em **"Criar um recurso"**
3. Procure **"Static Web Apps"**
4. Clique em **"Criar"**
5. Preencha:
   - **Assinatura**: Sua assinatura
   - **Grupo de recursos**: wisetraining-rg
   - **Nome**: wisetraining-web
   - **Região**: East US 2
   - **SKU**: Free
   - **Origem da implantação**: GitHub
6. Clique em **"Entrar com GitHub"**
7. Autorizar Azure
8. Selecione:
   - **Organização**: victorhtanaka
   - **Repositório**: WiseTraining-WEB
   - **Branch**: master
9. **Detalhes do build**:
   - **Predefinição de build**: Angular
   - **Localização do aplicativo**: /
   - **Localização da API**: (deixar vazio)
   - **Localização da saída**: dist/WebTemplate/browser
10. Clique em **"Revisar + criar"**
11. Clique em **"Criar"**

**Opção B: Via Azure CLI**

```bash
az staticwebapp create \
  --name wisetraining-web \
  --resource-group wisetraining-rg \
  --source https://github.com/victorhtanaka/WiseTraining-WEB \
  --location eastus2 \
  --branch master \
  --app-location "/" \
  --output-location "dist/WebTemplate/browser" \
  --login-with-github
```

### 4️⃣ GitHub Actions (Automático)

A Azure criou automaticamente o arquivo:
`.github/workflows/azure-static-web-apps-XXX.yml`

**Você precisa atualizar este arquivo:**

1. Abra o arquivo criado pela Azure
2. Adicione os passos de build ANTES do deploy:

```yaml
- name: Install dependencies
  run: npm ci
  
- name: Build shared-lib
  run: npm run build:shared
  
- name: Build all microfrontends
  run: npm run build:all
  
- name: Build production
  run: npx ng build --configuration production
```

3. No step de deploy, adicione:
```yaml
skip_app_build: true
```

**Arquivo completo está em:** `.github/workflows/azure-static-web-apps.yml`

### 5️⃣ Configurar Variáveis de Ambiente

1. No Portal Azure, vá para sua Static Web App
2. Menu lateral: **"Configuração"**
3. Adicione:
   ```
   FIREBASE_API_KEY=AIza...
   FIREBASE_AUTH_DOMAIN=seu-app.firebaseapp.com
   FIREBASE_PROJECT_ID=seu-projeto
   API_BASE_URL=https://sua-api.azurewebsites.net
   ```

### 6️⃣ Fazer Deploy

**Deploy Automático (Recomendado):**

```bash
# Simplesmente faça push para master
git add .
git commit -m "Configure Azure deploy"
git push origin master

# GitHub Actions vai:
# 1. Build shared-lib
# 2. Build microfrontends
# 3. Build produção
# 4. Deploy na Azure
```

**Deploy Manual (Alternativa):**

```bash
# Se quiser testar localmente primeiro
npm run build:shared
npm run build:all
ng build --configuration production

# Então fazer upload manual via Azure CLI
az staticwebapp upload \
  --name wisetraining-web \
  --resource-group wisetraining-rg \
  --source dist/WebTemplate/browser
```

### 7️⃣ Verificar Deploy

1. Acesse o Portal Azure
2. Vá para sua Static Web App
3. Na **"Visão Geral"**, copie a **URL**
4. Abra no navegador: `https://wisetraining-web-XXX.azurestaticapps.net`

**Ou via CLI:**

```bash
az staticwebapp show \
  --name wisetraining-web \
  --resource-group wisetraining-rg \
  --query "defaultHostname" -o tsv
```

---

## 🔧 Configurar Domínio Customizado (Opcional)

### Se você tem um domínio (ex: wisetraining.com)

1. No Portal Azure → Static Web App → **"Domínios personalizados"**
2. Clique em **"Adicionar"**
3. Digite: `www.wisetraining.com`
4. Siga as instruções para adicionar DNS CNAME:
   ```
   CNAME  www  wisetraining-web-XXX.azurestaticapps.net
   ```
5. Azure provê certificado SSL automaticamente

---

## 📊 Monitorar Deploy

### GitHub Actions

1. Vá para seu repositório no GitHub
2. Aba **"Actions"**
3. Veja o workflow rodando
4. Tempo estimado: 3-5 minutos

### Logs na Azure

1. Portal Azure → Static Web App
2. Menu **"Implantações"**
3. Veja histórico e status

---

## 🐛 Troubleshooting

### ❌ Erro: "Failed to build"

**Causa:** Ordem de build incorreta

**Solução:**
```yaml
# No GitHub Actions, garanta esta ordem:
1. npm run build:shared  # SEMPRE PRIMEIRO
2. npm run build:all
3. ng build --configuration production
```

### ❌ Erro: "404 ao acessar rotas"

**Causa:** `staticwebapp.config.json` não configurado

**Solução:**
```bash
# Arquivo já foi criado em: staticwebapp.config.json
# Commit e push:
git add staticwebapp.config.json
git commit -m "Add Static Web App config"
git push
```

### ❌ Erro: "Cannot find module 'shared-lib'"

**Causa:** shared-lib não foi compilada

**Solução:**
```bash
# Build shared-lib ANTES de tudo
npm run build:shared
```

### ❌ Lazy chunks não carregam

**Causa:** Path incorreto

**Solução:**
```typescript
// Verificar angular.json → outputPath
"outputPath": {
  "base": "dist/WebTemplate"
}

// E no GitHub Actions → output_location
output_location: "dist/WebTemplate/browser"
```

---

## 💰 Custos

### Tier Gratuito

- ✅ 100 GB de banda/mês
- ✅ HTTPS incluído
- ✅ CDN global
- ✅ Domínios customizados ilimitados

**Suficiente para:**
- ~500.000 pageviews/mês
- Projetos pequenos/médios
- Desenvolvimento e testes

### Tier Standard ($9/mês)

- 100 GB de banda INCLUÍDOS
- $0.20 por GB adicional
- Staging environments
- Enterprise features

---

## ✅ Checklist Final

Antes de fazer deploy:

- [ ] `staticwebapp.config.json` criado
- [ ] GitHub Actions configurado
- [ ] Variáveis de ambiente configuradas na Azure
- [ ] Build local testado:
  ```bash
  npm run build:shared
  npm run build:all
  ng build --configuration production
  ```
- [ ] Firebase configurado (se usar auth)
- [ ] API CORS configurado (se usar backend separado)

---

## 🎯 Comandos Rápidos

```bash
# Build completo local
npm run build:shared && npm run build:all && ng build --prod

# Ver logs do GitHub Actions
gh run list
gh run view --log

# Ver status na Azure
az staticwebapp show -n wisetraining-web -g wisetraining-rg

# Deletar e recriar
az staticwebapp delete -n wisetraining-web -g wisetraining-rg
az staticwebapp create ... # (parâmetros acima)
```

---

## 📚 Links Úteis

- [Azure Portal](https://portal.azure.com)
- [Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions](https://github.com/victorhtanaka/WiseTraining-WEB/actions)
- [Preços](https://azure.microsoft.com/pricing/details/app-service/static/)

---

## 🆘 Precisa de Ajuda?

1. Verifique os logs no GitHub Actions
2. Verifique os logs na Azure (Implantações)
3. Execute build local para testar
4. Verifique `staticwebapp.config.json`

---

**Seu site estará online em ~5 minutos após o push! 🚀**
