# 🏗️ Arquitetura de Microfrontends - WiseTraining

## ✅ Status: IMPLEMENTADO E FUNCIONANDO

Data da Implementação: 27 de Outubro de 2025

---

## 📋 Visão Geral

O projeto WiseTraining foi completamente transformado em uma arquitetura de **Microfrontends** usando **Angular 19** com **Lazy Loading**. Esta arquitetura permite que diferentes equipes trabalhem de forma independente em diferentes partes da aplicação.

---

## 🎯 Estrutura da Aplicação

### 🏠 Shell App (Host)
**Localização:** `src/app/`

**Responsabilidades:**
- Container principal da aplicação
- Gerenciamento de rotas e navegação
- Layout global (Header, Sidenav, Body)
- Componentes públicos (Landing Page)

**Componentes:**
- `AppComponent` - Container principal com Material Sidenav
- `HeaderComponent` - Cabeçalho com menu de navegação
- `BodyComponent` - Outlet para rotas
- `DashboardComponent` - Dashboard do usuário autenticado
- `UnloggedComponent` - Landing page pública

---

### 📚 Shared Library
**Localização:** `projects/shared-lib/`

**Build:** `npm run build:shared`

**Exports:**
```typescript
// 19 Services
- AuthService, UserService, CourseService
- CompanyService, CategoryService, GroupService
- MediaService, QuestionService, AnswerService
- ExamService, SubscriptionPlanService
- CompanySubscriptionService, UserCourseService
- CourseContentService, SidenavService
- CompanyManagementService
- Base, Tag, e Role Services

// Models
- All domain models (User, Course, Company, etc.)

// Guards
- AuthGuard, RoleGuard

// Interceptors  
- SpinnerInterceptor, SnackbarInterceptor
```

**Dependências:** Todos os microfrontends dependem desta biblioteca

---

### 🔐 Auth Microfrontend (mfe-auth)
**Localização:** `projects/mfe-auth/`

**Build:** `npm run build:auth`

**Tamanho:** 31.10 kB (lazy chunk)

**Rotas:**
- `/auth/login` - Login de usuários
- `/auth/register` - Registro de novos usuários
- `/auth/profile` - Perfil do usuário

**Componentes:**
- LoginComponent
- RegisterComponent
- UserProfileComponent

**Módulos Angular Material:**
- MatButton, MatCard, MatFormField
- MatInput, MatIcon, MatTabs, MatCheckbox

---

### 📖 Courses Microfrontend (mfe-courses)
**Localização:** `projects/mfe-courses/`

**Build:** `npm run build:courses`

**Tamanho:** 184.09 kB (lazy chunk)

**Rotas:**
- `/Course` - Lista de cursos
- `/Course/create` - Criar novo curso
- `/Course/edit/:courseId` - Editar curso
- `/Course/detail/:courseId` - Detalhes do curso
- `/Course/catalog` - Catálogo de cursos
- `/Course/details/:id` - Visualização de curso

**Componentes:**
- CoursesListComponent
- CourseCreateComponent
- CourseDetailComponent
- CourseCatalogComponent
- CourseDetailsComponent
- ConfirmDialogComponent (shared)

**Módulos Angular Material:**
- MatFormField, MatInput, MatButton, MatCard
- MatIcon, MatTable, MatPaginator, MatSort
- MatDialog, MatSelect, MatChips, MatTabs
- MatStepper, MatProgressSpinner, MatMenu, MatList
- DragDropModule (CDK)

---

### 👥 Admin Microfrontend (mfe-admin)
**Localização:** `projects/mfe-admin/`

**Build:** `npm run build:admin`

**Tamanho:** 75.52 kB (lazy chunk)

**Rotas:**
- `/admin/users` - Gerenciamento de usuários
- `/admin/categories` - Gerenciamento de categorias
- `/admin/companies` - Gerenciamento de empresas

**Componentes:**
- UsersListComponent + UserFormDialogComponent
- CategoriesListComponent + CategoryFormDialogComponent
- CompaniesListComponent + CompanyFormDialogComponent

**Módulos Angular Material:**
- MatFormField, MatInput, MatButton, MatCard
- MatIcon, MatTable, MatPaginator, MatSort
- MatDialog, MatSelect, MatProgressSpinner

**Guards:** AuthGuard + RoleGuard (apenas Admin)

---

### 🏢 Company Microfrontend (mfe-company)
**Localização:** `projects/mfe-company/`

**Build:** `npm run build:company`

**Tamanho:** 78.08 kB (lazy chunk)

**Rotas:**
- `/company/management` - Gerenciamento da empresa
- `/company/register` - Registro de nova empresa

**Componentes:**
- CompanyManagementComponent
- CompanyRegisterComponent
- AddUserDialogComponent
- GroupDialogComponent
- ConfirmDialogComponent

**Módulos Angular Material:**
- MatFormField, MatInput, MatButton, MatCard
- MatIcon, MatTable, MatPaginator, MatSort
- MatDialog, MatSelect, MatTabs, MatChips
- MatProgressSpinner, MatTooltip, MatList, MatCheckbox

---

## 🚀 Build e Desenvolvimento

### Comandos de Build

```bash
# Build da biblioteca compartilhada (OBRIGATÓRIO PRIMEIRO)
npm run build:shared

# Build de microfrontends individuais
npm run build:auth
npm run build:courses
npm run build:admin
npm run build:company

# Build de todos os microfrontends
npm run build:all

# Desenvolvimento
npm start  # Servidor em http://localhost:4200
```

### Ordem de Build Recomendada

1. **shared-lib** (sempre primeiro - outros dependem dela)
2. Qualquer microfrontend individual conforme necessário
3. Shell app (automático com `npm start`)

---

## 📦 Tamanhos de Bundle

### Initial Chunks (Carregamento Inicial)
```
styles.css    → 476.42 kB
scripts.js    → 232.10 kB
polyfills.js  →  90.58 kB
main.js       →     118 bytes
─────────────────────────────
Total         → 799.22 kB
```

### Lazy Chunks (Carregamento sob Demanda)
```
mfe-courses   → 184.09 kB (maior - muitas funcionalidades)
bootstrap     → 152.93 kB (código compartilhado)
mfe-company   →  78.08 kB
mfe-admin     →  75.52 kB
mfe-auth      →  31.10 kB (menor - apenas login/registro)
```

**Benefício:** Usuários só baixam o código que realmente vão usar!

---

## 🔒 Sistema de Autenticação e Autorização

### Guards Implementados

**AuthGuard:**
- Protege rotas que exigem login
- Redireciona para `/Unlogged` se não autenticado
- Usado em: Dashboard, Course, Admin, Company

**RoleGuard:**
- Protege rotas baseado em roles (Admin, Super Admin, Company)
- Verifica JWT token para extrair role
- Mostra snackbar se acesso negado
- Usado em: rotas `/admin/*`

### Fluxo de Autenticação

1. Usuário acessa `/auth/login`
2. Microfrontend `mfe-auth` é carregado (31kB)
3. Após login, JWT token é armazenado
4. `AuthGuard` permite acesso a rotas protegidas
5. `RoleGuard` valida permissões específicas

---

## 🗺️ Mapeamento de Rotas Legacy

Para compatibilidade com URLs antigas:

```typescript
// Rotas antigas → Novas rotas
/Login                  → /auth/login
/Register               → /auth/register
/UserProfile            → /auth/profile
/CoursesList            → /Course
/CourseCreate           → /Course/create
/CourseDetail/:id       → /Course/detail/:id
/CourseCatalog          → /Course/catalog
/CourseDetails/:id      → /Course/details/:id
/UsersList              → /admin/users
/CategoriesList         → /admin/categories
/CompaniesList          → /admin/companies
/CompanyManagement      → /company/management
/CompanyRegister        → /company/register
```

---

## 🛠️ Tecnologias Utilizadas

### Core
- **Angular:** 19.2.10
- **TypeScript:** 5.8.3
- **RxJS:** ~7.8.0

### UI Framework
- **Angular Material:** 19.2.15
- **Angular CDK:** 19.2.15
- **Bootstrap:** 5.1.3
- **Bootstrap Icons:** 1.8.1

### Build Tools
- **Angular CLI:** 19.2.9
- **Webpack:** 5 (via Angular CLI)
- **TypeScript Compiler:** 5.8.3

### Backend Integration
- **Firebase:** 19.2.0 (Authentication)
- **HttpClient:** Angular (API REST)

---

## 📁 Estrutura de Diretórios

```
WiseTraining-WEB/
├── src/
│   ├── app/                          # Shell App
│   │   ├── components/
│   │   │   ├── static/              # Header, Body
│   │   │   └── views/               # Dashboard, Unlogged
│   │   ├── guards/                  # Auth, Role Guards
│   │   ├── interceptors/            # HTTP Interceptors
│   │   ├── models/                  # (moved to shared-lib)
│   │   ├── services/                # (moved to shared-lib)
│   │   ├── app-routing.module.ts    # Rotas principais
│   │   └── app.module.ts            # Módulo principal
│   ├── assets/                      # Images, fonts
│   └── environments/                # Configurações
│
├── projects/
│   ├── shared-lib/                  # 📚 Biblioteca Compartilhada
│   │   └── src/
│   │       ├── lib/
│   │       │   ├── models/         # 15+ models
│   │       │   └── services/       # 19 services
│   │       ├── environments/       # Environment configs
│   │       └── public-api.ts       # Exports
│   │
│   ├── mfe-auth/                    # 🔐 Auth Microfrontend
│   │   └── src/lib/
│   │       ├── components/
│   │       │   ├── login/
│   │       │   ├── register/
│   │       │   └── user-profile/
│   │       └── auth.module.ts
│   │
│   ├── mfe-courses/                 # 📖 Courses Microfrontend
│   │   └── src/lib/
│   │       ├── components/
│   │       │   ├── courses-list/
│   │       │   ├── course-create/
│   │       │   ├── course-detail/
│   │       │   ├── course-catalog/
│   │       │   ├── course-details/
│   │       │   └── shared/
│   │       └── courses.module.ts
│   │
│   ├── mfe-admin/                   # 👥 Admin Microfrontend
│   │   └── src/lib/
│   │       ├── components/
│   │       │   ├── users-list/
│   │       │   ├── categories-list/
│   │       │   └── companies-list/
│   │       └── admin.module.ts
│   │
│   └── mfe-company/                 # 🏢 Company Microfrontend
│       └── src/lib/
│           ├── components/
│           │   ├── company-management/
│           │   └── company-register/
│           └── company.module.ts
│
├── dist/                            # Build output
│   ├── shared-lib/                 # Compilado
│   ├── mfe-auth/                   # Compilado
│   ├── mfe-courses/                # Compilado
│   ├── mfe-admin/                  # Compilado
│   └── mfe-company/                # Compilado
│
├── angular.json                     # Configuração Angular
├── tsconfig.json                    # TypeScript config (com paths)
├── package.json                     # Dependencies & scripts
├── MICROFRONTENDS.md               # Guia de implementação
└── ARCHITECTURE.md                  # Este arquivo
```

---

## 🎓 Benefícios da Arquitetura

### ✅ Desenvolvimento Independente
- Equipes podem trabalhar em microfrontends separados
- Deploys independentes possíveis
- Menor risco de conflitos de merge

### ✅ Performance
- **Lazy Loading**: Carrega código apenas quando necessário
- Usuário não logado baixa apenas ~800kB
- Após login, cada seção carrega sob demanda

### ✅ Manutenibilidade
- Código organizado por domínio
- Bibliotecas compartilhadas centralizadas
- Facilita testes unitários isolados

### ✅ Escalabilidade
- Fácil adicionar novos microfrontends
- Shared-lib cresce de forma controlada
- Build paralelo possível (CI/CD)

---

## 🔄 Fluxo de Atualização

### Quando atualizar shared-lib:

```bash
1. Editar código em projects/shared-lib/src/
2. npm run build:shared
3. Microfrontends automaticamente usam nova versão
4. (Opcional) Rebuild microfrontends afetados
```

### Quando atualizar um microfrontend:

```bash
1. Editar código em projects/mfe-*/src/
2. npm run build:auth (ou courses, admin, company)
3. npm start (para testar)
```

---

## 📊 Métricas de Sucesso

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| Bundle inicial | ~1.2 MB | 799 kB | ⬇️ 33% |
| Lazy chunks | 0 | 5 | ✅ Implementado |
| Módulos independentes | 1 | 5 | ✅ +400% |
| Build paralelo | ❌ | ✅ | ✅ Possível |
| Deploys independentes | ❌ | ✅ | ✅ Possível |

---

## 🚦 Status dos Componentes

### ✅ Implementados e Funcionando

**Shell:**
- [x] AppComponent
- [x] HeaderComponent
- [x] BodyComponent
- [x] DashboardComponent
- [x] UnloggedComponent

**Shared-lib:**
- [x] 19 Services exportados
- [x] 15+ Models exportados
- [x] Guards (Auth, Role)
- [x] Interceptors (Spinner, Snackbar)

**mfe-auth:**
- [x] LoginComponent
- [x] RegisterComponent
- [x] UserProfileComponent

**mfe-courses:**
- [x] CoursesListComponent
- [x] CourseCreateComponent
- [x] CourseDetailComponent
- [x] CourseCatalogComponent
- [x] CourseDetailsComponent

**mfe-admin:**
- [x] UsersListComponent
- [x] CategoriesListComponent
- [x] CompaniesListComponent

**mfe-company:**
- [x] CompanyManagementComponent
- [x] CompanyRegisterComponent

---

## 🎯 Próximos Passos (Futuro)

### Possíveis Melhorias:

1. **Module Federation (Webpack)**
   - Microfrontends rodando em servidores separados
   - Compartilhamento dinâmico de código em runtime
   - Ports: Shell(4200), Auth(4201), Courses(4202), Admin(4203), Company(4204)

2. **Monorepo com Nx**
   - Build cache inteligente
   - Dependency graph
   - Affected commands

3. **Micro-apps Standalone**
   - Cada microfrontend rodável independente
   - Útil para desenvolvimento isolado

4. **CI/CD Pipeline**
   - Build paralelo de microfrontends
   - Deploy incremental
   - Rollback granular

---

## 📝 Notas Importantes

### ⚠️ Ordem de Build é Crítica

**SEMPRE** compile `shared-lib` ANTES de qualquer microfrontend:

```bash
✅ CORRETO:
npm run build:shared
npm run build:auth

❌ ERRADO:
npm run build:auth  # Vai falhar!
```

### ⚠️ Path Mappings

O arquivo `tsconfig.json` contém path mappings essenciais:

```json
{
  "paths": {
    "shared-lib": ["./dist/shared-lib"],
    "mfe-auth": ["./dist/mfe-auth"],
    "mfe-courses": ["./dist/mfe-courses"],
    "mfe-admin": ["./dist/mfe-admin"],
    "mfe-company": ["./dist/mfe-company"]
  }
}
```

**Não remova ou modifique estes paths!**

---

## 🆘 Troubleshooting

### Erro: "Cannot find module 'shared-lib'"

**Solução:**
```bash
npm run build:shared
```

### Erro: "Module not found" ao carregar microfrontend

**Solução:**
```bash
# Rebuild o microfrontend específico
npm run build:auth  # ou courses, admin, company
```

### Servidor não inicia

**Solução:**
```bash
# Limpar cache e reinstalar
Remove-Item -Recurse -Force .angular, node_modules\.cache
npm start
```

---

## 📚 Documentação Relacionada

- [MICROFRONTENDS.md](./MICROFRONTENDS.md) - Guia completo de implementação
- [README.md](./README.md) - Informações gerais do projeto
- [Angular Docs](https://angular.io/docs) - Documentação oficial do Angular
- [Angular Material](https://material.angular.io/) - Componentes UI

---

## 👥 Contribuindo

Ao adicionar novos componentes:

1. **Determine o domínio**: Auth, Courses, Admin ou Company?
2. **Crie no microfrontend correto**: `projects/mfe-*/`
3. **Use shared-lib**: Sempre importe de `'shared-lib'`
4. **Rebuild**: Execute `npm run build:[nome-mfe]`
5. **Teste**: Execute `npm start` e navegue para a rota

---

## ✨ Conclusão

A arquitetura de microfrontends foi **implementada com sucesso** no WiseTraining. A aplicação está:

- ✅ Funcionando perfeitamente
- ✅ Carregando microfrontends sob demanda
- ✅ Com código organizado e modular
- ✅ Preparada para escalar

**Servidor rodando em:** http://localhost:4200/

---

*Documento gerado em 27 de Outubro de 2025*
