# 🚀 Quick Start - Deploy para Azure

## Configuração Rápida (5 minutos)

### 1️⃣ Configurar Azure Web App

No **Portal Azure**, vá para seu Web App e configure:

#### Application Settings
```
WEBSITE_NODE_DEFAULT_VERSION = 20-lts
SCM_DO_BUILD_DURING_DEPLOYMENT = false
NODE_ENV = production
```

#### General Settings
- **Startup Command**: `node server.js`
- **Stack**: Node 20 LTS

### 2️⃣ Configurar GitHub Secret

1. Azure Portal → Web App → Deployment Center
2. Clique em **"Manage publish profile"** → Download
3. GitHub → Repository Settings → Secrets → Actions
4. Verifique/Adicione: `AZUREAPPSERVICE_PUBLISHPROFILE_123928CE6AA448218F8BE3880898BC8F`

### 3️⃣ Deploy

```bash
git add .
git commit -m "Deploy to Azure Linux with Node 20"
git push origin microfrontend
```

### 4️⃣ Verificar

- ✅ GitHub Actions: https://github.com/victorhtanaka/WiseTraining-WEB/actions
- ✅ Health Check: https://app-wisetraining-web-test.azurewebsites.net/health
- ✅ App: https://app-wisetraining-web-test.azurewebsites.net/

---

## 📚 Documentação Completa

- **Deploy completo**: Ver `AZURE_DEPLOY.md`
- **Checklist detalhado**: Ver `AZURE_CONFIG_CHECKLIST.md`
- **Changelog**: Ver `CHANGELOG_AZURE.md`

## 🆘 Problemas?

### App não inicia
```bash
# Verificar logs no Azure
Portal Azure → Log Stream
```

### Build falha
```bash
# Verificar GitHub Actions
https://github.com/victorhtanaka/WiseTraining-WEB/actions
```

### 404 Error
```bash
# Testar health check primeiro
curl https://app-wisetraining-web-test.azurewebsites.net/health
```
