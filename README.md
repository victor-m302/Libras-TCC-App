# Libras-TCC-App
Aplicativo desenvolvido em React-Native para o Trabalho Final de Conclusão de Curso (TCC).
O aplicativo utiliza a plataforma Expo.


## Como iniciar o projeto?

1. Abra o terminal e digite: `npm i`

2. Após a instalação das dependências, abra o arquivo `env.js`, localizado na pasta "config"

3. No arquivo `env.js`, solicite o link do servidor para alterar esse dado: 

```javascript
const link = 'http://ec2-52-91-219-171.compute-1.amazonaws.com:5000/'
```
Obs: Toda vez que o servidor é desligado, o link é alterado na vez seguinte.

4. É recomendado fazer um teste de conexão, que pode ser feito da seguinte forma:

      4.1)Abra o Insomnia ou Postman

      4.2) Faça um request do tipo GET

      4.3) Usando o link do servidor fornecido:

`http://ec2-xx-xx-xx-xx.compute-1.amazonaws.com:5000/testGet`

A resposta que indica sucesso é o retorno da mensagem "Hello Route Get"

5. No terminal, digite: `npm run start`







## Tela de Inicialização: Splash Screen

<img src="/app-screenshots/capa.png" alt="aba-imagem" style="width:50%" />

## Telas da aba Tradução

### Figura 1 – Aba Tradução inicial

<img src="/app-screenshots/aba-tradução-vaizia.png" alt="aba-imagem" style="width:50%" />

### Figura 2 – Aba Tradução com itens

<img src="/app-screenshots/aba-tradução.png" alt="aba-imagem" style="width:50%" />

### Figura 3 - Aba Informação

O ícone no canto superior direito da aba tradução traz uma seção
com informações reservadas para o entendimento e consentimento das duas partes
(usuário e participante) em relação ao uso de dados e funcionamento da aplicação.
 
<img src="/app-screenshots/informação.png" alt="aba-imagem" style="width:50%" />

## Telas da aba Imagem

### Figura 4 – Aba Imagem

Há dois botões para entrada de mídia. O botão "Envia
imagem"abre o seletor de arquivos, enquanto "Captura de Imagem"abre a câmera
do dispositivo.

<img src="/app-screenshots/aba-imagem.png" alt="aba-imagem" style="width:50%" />


### Figura 5 – "Captura de Imagem", conforme descrita.
<img src="/app-screenshots/camera-imagem.png" alt="aba-imagem" style="width:50%" />


## Telas da aba Vídeo

### Figura 6 – Aba Vídeo

<img src="/app-screenshots/aba-video.png" alt="aba-imagem" style="width:50%" />

### Figura 7 – O botão "Gravar vídeo"abre câmera do dispositivo para gravação de vídeo

<img src="/app-screenshots/camera-video.png" alt="aba-imagem" style="width:50%" />

## Fluxograma da Aplicação
### Figura 8 – O fluxograma que descreve os processos presentes nesta aplicação.
<img src="/app-screenshots/APP.jpg" alt="aba-imagem" style="width:50%" />
