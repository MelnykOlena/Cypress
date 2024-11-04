import * as allure from "allure-js-commons";

Cypress.Commands.add('sentRequest', (type, endpoint, payload) => {
    return  allure.step(`Trying to send ${type} request to ${endpoint}`, () =>{
        if (payload && Object.keys(payload).length > 0)  {
            allure.attachment(`requestBody for ${type} ${endpoint}`, JSON.stringify(payload), 'application/json')
            cy.log(`Trying to send ${type} request to ${endpoint} with body ${JSON.stringify(payload)}`);
        } else {
            cy.log(`Trying to send ${type} request to ${endpoint} without body`);
        }
        return cy.request({
            method: type,
            url: endpoint,
            failOnStatusCode: false,
            headers: {
                Authorization: pk_152443084_285LSK4AJST9AVXGK670CE6NCP2OU7LP,
                Accept: 'application/json',
            },
            // log: true,
            body: payload,
        }).then((resp) => {
            allure.attachment(`responseBody for ${type} ${endpoint}`, JSON.stringify(resp.body), 'application/json')
            return cy.wrap(resp);  // Use cy.wrap() to ensure the response is chained properly
        });

    })
    // if (payload && Object.keys(payload).length > 0)  {
    //     allure.attachment(`requestBody for ${type} ${endpoint}`, JSON.stringify(payload), 'application/json')
    //     cy.log(`Trying to send ${type} request to ${endpoint} with body ${JSON.stringify(payload)}`);
    //     allure.attachment(`requestBody for ${type} ${endpoint}`, JSON.stringify(payload), 'application/json')
    // } else {
    //     cy.log(`Trying to send ${type} request to ${endpoint} without body`);
    // }
    // return cy.request({
    //     method: type,
    //     url: endpoint,
    //     failOnStatusCode: false,
    //     headers: {
    //         Authorization: Cypress.env('token'),
    //         Accept: 'application/json',
    //     },
    //     // log: true,
    //     body: payload,
    // }).then((resp) => {
    //     allure.attachment(`responseBody for ${type} ${endpoint}`, JSON.stringify(resp.body), 'application/json')
    //
    //     return cy.wrap(resp);  // Use cy.wrap() to ensure the response is chained properly
    // });
});
