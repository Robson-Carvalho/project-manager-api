export const passwordRecoveryPage = (user: string, link: string) => {
  return `
    <html>
      <body>
        <h1>Olá, ${user.split(" ")[0]}! Seja bem-vindo!😃</h1>
        <p>Clique <a href="${link}" >aqui<a/> para recuperar sua senha!</p>
      </body>
    </html>

  `;
};
