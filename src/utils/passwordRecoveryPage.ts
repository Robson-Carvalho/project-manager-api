export const passwordRecoveryPage = (user: string, link: string) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <title>Document</title>
    <style>
      * {
        font-family: "Roboto", sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .container {
        max-width: 520px;
        width: 100%;

        margin: 0 auto 0 auto;
        padding: 8px;
      }

      header {
        background-color: #3b82f6;
        color: #fff;
        border-radius: 4px;
      }
      h1 {
        padding: 8px;
        text-align: center;
      }
      h2 {
        font-size: 18px;
        margin: 16px 0 0 0;
      }
      p {
        font-size: 16px;
        margin: 24px 0 0 0;
        color: #263238;
      }

      a {
        color: rgba(59, 130, 246, 0.8);
      }

      .recovery {
        border: none;
        text-align: center;
        width: 240px;
        margin: 32px auto 0 auto;
        display: block;
        font-weight: bold;
        font-size: 18px;
        background-color: #3b82f6;
        color: #fff !important;
        border-radius: 4px;
        text-decoration: none !important;
        padding: 12px 18px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header><h1>Recuperação de senha</h1></header>
      <h2>Olá, ${user.split(" ")[0]}!</h2>
      <p>
        Para recuperar sua <a href="">clique no botão abaixo</a> e siga as
        instruções
      </p>

      <a class="recovery" href="${link}">Recuperar senha</a>
    </div>
  </body>
</html>

  `;
};
