#  Celicando

Plataforma colaborativa desenvolvida para ajudar pessoas celíacas a encontrar **receitas sem glúten** e **locais seguros para se alimentar**. O projeto permite que usuários compartilhem suas próprias receitas, indiquem estabelecimentos e interajam com a comunidade.

# Demonstração

![Pegina Inicial](https://github.com/user-attachments/assets/696724da-99e3-4f86-8b0e-d9e462c33509)

![Receitas](https://github.com/user-attachments/assets/735274c4-1159-44c0-ba7a-604a16d790d2)

![Locais](https://github.com/user-attachments/assets/2f50e831-f3b6-4636-8b6b-095535ee1169)

![Login](https://github.com/user-attachments/assets/6a232c4e-232a-44f8-9a55-db8a5dd13aa6)

![Formulario](https://github.com/user-attachments/assets/efe999fc-544d-4b0f-88f7-ec4372c13b45)

![Pagina do usuario](https://github.com/user-attachments/assets/ecc644df-f9f5-45ac-a74b-faf922706ccb)

---

# Funcionalidades

- 📋 Cadastro e login de usuários
- 🍞 Compartilhamento de receitas sem glúten
- 📍 Indicação de locais seguros para celíacos
- 👤 Página de perfil personalizada
- 🔐 Autenticação básica
- 🌐 Hospedado na nuvem com Docker + Amazon ECS

---

#  Tecnologias utilizadas

### Frontend
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

### Backend
- [Flask (Python)](https://flask.palletsprojects.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)

### Infraestrutura
- [Docker](https://www.docker.com/)
- [AWS ECS (Elastic Container Service)](https://aws.amazon.com/ecs/)

---

#  Como rodar a aplicacao no docker

### Pré-requisitos
- Docker instalado
- Git instalado

```bash
# Clone o repositório
git clone https://github.com/matteovar/Celiacos
cd Celiacos

# Suba a aplicação com Docker Compose
docker-compose up --build
```

# 📦 Como rodar a aplicacao localmente

### *Abra dois terminais para isso*
---
## Clone o repositorio
```
git clone https://github.com/matteovar/Celiacos
cd Celiacos
```

## 1. Backend

``` bash
# Abra um terminal para o backend
cd backend

# instale uma venv
python -m venv venv

# instale os requirements.txt
pip install -r requirements.txt

# crie um arquivo .venv e coloque as informacoes
MONGODB_URI=seu_link_para_o_mongodb
JWT_SECRET_KEY=senha_secreta_para_jwt
FLASK_SECRET_KEY=senha_secreta_para_flask

#rode o backend
python app.py

```
## 2. Frontend

``` bash

# Abra um terminal para o frontend
cd celiaco

# intale o node
npm install

# rode o frontend
npm run dev

```