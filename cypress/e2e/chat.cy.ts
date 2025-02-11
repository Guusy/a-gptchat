const messageToSend =
  "Hola chat, queria saber como hago para hacer arroz blanco, gracias";
describe("Chat happy path", () => {
  it("Happy path", () => {
    cy.visit("/");
    const loginButton = cy.contains("Login");
    loginButton.should("be.visible");
    loginButton.click();
    cy.sendChatMsg(messageToSend);
    cy.contains(`Te respondo a "${messageToSend}"`, { timeout: 6000 });
    cy.url().should("match", /\/chat\/\w+$/);

    cy.sendChatMsg("Muchas gracias por la respuesta che!");

    cy.contains(`Te respondo a "Muchas gracias por la respuesta che!"`, {
      timeout: 2000,
    });
  });
});
