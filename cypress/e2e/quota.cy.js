describe("POS Rate Calculator Test", () => {
    it("should calculate shipping rates from Malaysia to India with multiple quotes", () => {
      cy.visit("https://pos.com.my/send/ratecalculator");
  
      //scrollInto rate calculator view
      cy.get(".calculator-wrapper").scrollIntoView().should("be.visible");
  
      //enter postcode
      cy.get('[formcontrolname="postcodeFrom"]')
        .should("be.visible")
        .click({ force: true })
        .type("35600");
  
      //select destination country
      cy.get("#mat-input-0")
        .clear({ force: true })
        .type("India", { delay: 200 }) // Slow typing to mimic real user input
        .type("{enter}")
        .wait(2000) // Wait for 2 seconds
        .get(".mdc-list-item")
        .click({ force: true });
  
      //enter package weight
      cy.get('[formcontrolname="itemWeight"]').clear({ force: true }).type("1");
  
      //click calculate button
      cy.contains("Calculate").click({ force: true });
  
      // Ensure multiple quotes are available
      cy.contains("Select a quote to start booking your shipment", {
        timeout: 20000,
      }).should("be.visible");
  
      cy.get('a[href="https://send.pos.com.my/home?lg=en"]')
        .its("length")
        .should("be.gte", 1);
    });
  });