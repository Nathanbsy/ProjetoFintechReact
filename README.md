# Projeto Fintech React + Spring Boot

Aplicacao full stack para um projeto de Fintech com frontend em React/Vite e backend em Java Spring Boot usando JPA com Oracle.

## Funcionalidades

- Login demonstrativo para testes.
- SPA com rotas para Inicio, Usuarios, Gastos, Receitas, Metas e pagina 404.
- CRUD completo no frontend para 4 controllers.
- Consumo das APIs REST do backend via `fetch`.
- Backend com entidades, repositories JPA, services com regras de negocio e controllers REST.
- Status HTTP esperados: `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request` e `404 Not Found`.

## Entidades do backend

- `Usuario`
- `Gasto`
- `Receita`
- `MetaFinanceira`

## Endpoints REST

- `GET /api/usuarios`, `POST /api/usuarios`, `GET /api/usuarios/{id}`, `PUT /api/usuarios/{id}`, `DELETE /api/usuarios/{id}`
- `GET /api/gastos`, `POST /api/gastos`, `GET /api/gastos/{id}`, `PUT /api/gastos/{id}`, `DELETE /api/gastos/{id}`
- `GET /api/receitas`, `POST /api/receitas`, `GET /api/receitas/{id}`, `PUT /api/receitas/{id}`, `DELETE /api/receitas/{id}`
- `GET /api/metas`, `POST /api/metas`, `GET /api/metas/{id}`, `PUT /api/metas/{id}`, `DELETE /api/metas/{id}`

## Como rodar o frontend

```bash
npm install
npm run dev
```

Por padrao o frontend consome `http://localhost:8080/api`. Para mudar:

```bash
VITE_API_URL=http://localhost:8080/api npm run dev
```

No Windows PowerShell, se `npm` for bloqueado por politica de scripts, use:

```bash
npm.cmd run dev
```

## Como rodar o backend

Edite `backend/src/main/resources/application.properties` com as credenciais do seu Oracle:

```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521/XEPDB1
spring.datasource.username=FINTECH
spring.datasource.password=FINTECH
```

Depois execute:

```bash
cd backend
mvn spring-boot:run
```

Se preferir, abra a pasta `backend` na sua IDE Java e execute a classe `FintechApiApplication`.

## Observacao de uso

Para cadastrar gastos, receitas ou metas, primeiro cadastre um usuario e use o ID desse usuario nos formularios das outras paginas.
