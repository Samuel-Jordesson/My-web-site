![Logo Efflar](https://raw.githubusercontent.com/Samuel-Jordesson/Estoque/refs/heads/master/Group%20156%201%20(2).png)

# Projeto Efflar

Efflar é um grande projeto onde eu posto sobre vários projetos de programação e DevOps, duas áreas que eu realmente gosto. Em vez de publicar tudo diretamente no meu perfil pessoal, criei uma marca própria para reunir e organizar meu trabalho de forma mais profissional e agradável.

## Visão geral

Este repositório serve como portfólio e backend para o site [efflar.com](https://efflar.com), onde apresento meus projetos, artigos e tutoriais. A ideia nasceu da vontade de construir algo com a minha cara – algo que eu pudesse olhar e sentir orgulho.

## Motivação

Sim, eu poderia simplesmente postar os projetos no meu perfil do GitHub, mas isso não teria a mesma graça. Quis passar noites a fio pensando, desenhando e ajustando uma marca que eu me sentisse confortável em ver todos os dias. Depois de diversas versões, finalmente criei algo que considero perfeito do meu jeito.

Não sou muito de aparecer, então ter um espaço próprio (e anônimo) para compartilhar o que faço era importante. Efflar me dá essa liberdade:

- Design customizado
- Conteúdo focado em programação e DevOps
- Possibilidade de escrever sem a pressão de associar tudo ao meu nome pessoal

## Como usar este repositório

- `server.ts`: backend em Express que alimenta a API do site
- `src/`: front-end em React/Vite
- `.env.example`: modelo de variáveis de ambiente (Supabase, etc.)

### Pré-requisitos
1. Node 24+ e npm
2. Conta no Supabase com tabela `projects`, `categories` etc.
3. Configurar variáveis de ambiente (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, etc.)

### Rodar em desenvolvimento

```bash
cp .env.example .env
# editar .env com suas chaves
npm install
npm run dev
```

## Observações finais

Este projeto é pessoal, em constante evolução e reflete meu processo de aprendizado. Se você chegou até aqui, obrigado por dar uma olhada! Fique à vontade para explorar os códigos, clonar o repositório ou acessar o site em [efflar.com](https://efflar.com).

---

*Feito com 💻 e ☕ por Samuel Jordesson*