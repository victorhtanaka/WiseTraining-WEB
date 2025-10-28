# 🔧 Atualização de Dependências

## Problema Identificado

O `package-lock.json` está desatualizado e não corresponde ao `package.json` atualizado.

## Solução

Execute os seguintes comandos localmente para regenerar o `package-lock.json`:

```bash
# 1. Remover node_modules e package-lock.json antigos
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# 2. Instalar dependências e gerar novo package-lock.json
npm install

# 3. Commit das mudanças
git add package-lock.json
git commit -m "chore: Regenerate package-lock.json with updated dependencies"
git push origin microfrontend
```

## Alternativa: Deixar o GitHub Actions Regenerar

O workflow do GitHub Actions foi atualizado para usar `npm install` em vez de `npm ci`, então ele vai funcionar mesmo com o package-lock.json desatualizado.

**Recomendação**: Execute os comandos acima localmente para manter o repositório sincronizado.

## Verificação

Após a instalação, teste localmente:

```bash
# Build de produção
npm run build:prod

# Verificar se gerou os arquivos
Test-Path "dist/WebTemplate/browser/index.html"

# Testar o servidor
npm start
```

Acesse: http://localhost:8080
