# Arquitetura de Microfrontends - WiseTraining

## 📋 Visão Geral

Este projeto foi transformado em uma arquitetura de microfrontends usando **Module Federation** do Webpack 5 para Angular 19. A aplicação está dividida em:

### Estrutura de Microfrontends

1. **Shell (Host)** - Aplicação principal que orquestra os microfrontends
   - Porta: 4200
   - Localização: `src/app`
   - Responsabilidades: Header, Dashboard, Navegação, Unlogged

2. **MFE Auth** - Microfrontend de Autenticação
   - Porta: 4201
   - Localização: `projects/mfe-auth`
   - Componentes: Login, Register, User Profile

3. **MFE Courses** - Microfrontend de Cursos
   - Porta: 4202
   - Localização: `projects/mfe-courses`
   - Componentes: Courses List, Course Create, Course Detail, Course Catalog, Course Details

4. **MFE Admin** - Microfrontend Administrativo
   - Porta: 4203
   - Localização: `projects/mfe-admin`
   - Componentes: Users List, Categories List, Companies List

5. **MFE Company** - Microfrontend de Empresas
   - Porta: 4204
   - Localização: `projects/mfe-company`
   - Componentes: Company Management, Company Register

6. **Shared Lib** - Biblioteca Compartilhada
   - Localização: `projects/shared-lib`
   - Conteúdo: Services, Models, Guards, Interceptors

## 🚀 Como Executar

### Desenvolvimento - Modo Tradicional

Você ainda pode usar os microfrontends como bibliotecas internas:

```powershell
# Instalar dependências
npm install

# Compilar shared library primeiro
npm run build:shared

# Iniciar aplicação principal (já inclui os microfrontends)
npm start
```

Acesse: http://localhost:4200

### Build de Produção

```powershell
# Build de todas as bibliotecas e aplicação principal
npm run build:all
```

## 📦 Scripts Disponíveis

```json
{
  "build:shared": "Compila a biblioteca compartilhada",
  "build:auth": "Compila o microfrontend de autenticação",
  "build:courses": "Compila o microfrontend de cursos",
  "build:admin": "Compila o microfrontend administrativo",
  "build:company": "Compila o microfrontend de empresas",
  "build:all": "Compila tudo em sequência"
}
```

## 🔗 Rotas

### Rotas Atualizadas

O roteamento foi atualizado para usar lazy loading dos microfrontends:

| Rota Antiga | Rota Nova | Microfrontend |
|-------------|-----------|---------------|
| `/Login` | `/auth/login` | Auth MFE |
| `/Profile` | `/auth/profile` | Auth MFE |
| `/CompanyRegister` | `/company/register` | Company MFE |
| `/Users` | `/admin/users` | Admin MFE |
| `/Categories` | `/admin/categories` | Admin MFE |
| `/Companies` | `/admin/companies` | Admin MFE |
| `/CompanyManagement` | `/company/management` | Company MFE |
| `/Courses` | `/courses` | Courses MFE |
| `/Courses/Create` | `/courses/create` | Courses MFE |
| `/course-catalog` | `/courses/catalog` | Courses MFE |

**Nota:** As rotas antigas foram mantidas com redirects para compatibilidade.

## 🏗️ Estrutura de Arquivos

```
WiseTraining-WEB/
├── src/                          # Shell Application
│   └── app/
│       ├── components/
│       │   ├── static/          # Header, Body
│       │   └── views/           # Dashboard, Unlogged
│       ├── guards/              # Auth, Role Guards
│       ├── interceptor/         # Spinners, Snackbar
│       ├── models/              # Data Models
│       └── services/            # Business Services
│
├── projects/
│   ├── mfe-auth/                # Auth Microfrontend
│   │   └── src/lib/
│   │       ├── components/      # Login, Register, Profile
│   │       └── auth.module.ts
│   │
│   ├── mfe-courses/             # Courses Microfrontend
│   │   └── src/lib/
│   │       ├── components/      # Course components
│   │       └── courses.module.ts
│   │
│   ├── mfe-admin/               # Admin Microfrontend
│   │   └── src/lib/
│   │       ├── components/      # Users, Categories, Companies
│   │       └── admin.module.ts
│   │
│   ├── mfe-company/             # Company Microfrontend
│   │   └── src/lib/
│   │       ├── components/      # Management, Register
│   │       └── company.module.ts
│   │
│   └── shared-lib/              # Shared Library
│       └── src/lib/
│           ├── models/          # Todos os models
│           ├── services/        # Todos os services
│           ├── guards/          # Auth e Role guards
│           └── interceptors/    # HTTP Interceptors
│
├── webpack.config.js            # Module Federation Config
└── package.json
```

## 🔧 Configuração do Module Federation

### Shell (webpack.config.js)

```javascript
module.exports = withModuleFederationPlugin({
  remotes: {
    "mfeAuth": "http://localhost:4201/remoteEntry.js",
    "mfeCourses": "http://localhost:4202/remoteEntry.js",
    "mfeAdmin": "http://localhost:4203/remoteEntry.js",
    "mfeCompany": "http://localhost:4204/remoteEntry.js",
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

## 📚 Uso da Biblioteca Compartilhada

Todos os microfrontends têm acesso à biblioteca compartilhada:

```typescript
// Importando services
import { AuthService, UserService } from 'shared-lib';

// Importando models
import { User, Course, Company } from 'shared-lib';

// Importando guards
import { AuthGuard, RoleGuard } from 'shared-lib';
```

## ✅ Benefícios

1. **Desenvolvimento Independente** - Cada equipe pode trabalhar em um microfrontend
2. **Deploy Independente** - Atualize apenas o que mudou
3. **Escalabilidade** - Adicione novos microfrontends facilmente
4. **Reutilização** - Biblioteca compartilhada com código comum
5. **Lazy Loading** - Carregue apenas o necessário
6. **Isolamento** - Falhas em um MFE não afetam outros

## 🔄 Próximos Passos

Para tornar os microfrontends verdadeiramente independentes (com deploy separado):

1. Criar aplicações Angular separadas para cada MFE
2. Configurar webpack para expor os módulos
3. Hospedar cada MFE em servidor separado
4. Atualizar shell para carregar remotos via HTTP

## 📝 Notas Importantes

- **Guards e Interceptors**: Continuam funcionando globalmente via shared-lib
- **Material Design**: Cada MFE importa seus próprios módulos do Angular Material
- **Environments**: Compartilhados pelo shell application
- **TypeScript Paths**: Configurados no tsconfig.json para resolução de imports

## 🐛 Troubleshooting

### Erro: Cannot find module 'mfe-auth'
```powershell
npm run build:auth
```

### Erro de build
```powershell
# Limpar e reconstruir
Remove-Item -Path "dist" -Recurse -Force
npm run build:all
```

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- [Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
- [Angular Architects Module Federation](https://www.npmjs.com/package/@angular-architects/module-federation)
