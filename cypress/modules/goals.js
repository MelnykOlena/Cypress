// import * as allure from "allure-js-commons";
const goalsUrl = '/team/9012366467/goal';
const goalUrl = '/goal';
import * as allure from "allure-js-commons";

export const getAllGoals = (() => {
    return allure.step('Get a list of goals', () => {
        return cy.sentRequest('get', goalsUrl);
    });
});

export const updateGoal = ((name, goalId) => {
    return allure.step(`Update goal name with name ${name}`, () => {
        const payload = { name: name };
        return cy.sentRequest('put', `${goalUrl}/${goalId}`, payload);
    });
});

export const createGoal = ((name) => {
    return allure.step(`Create goal with name ${name}`, () => {
        const payload = { name: name };
        return cy.sentRequest('post', `${goalsUrl}`, payload);
    });
});

//export const createGoalFromFile = (fileName) => {
//    return allure.step(`Create goal from file`, () => {
//        return cy.fixture(fileName).then((body) => {
//            const randomString = Math.random().toString(36).substring(2, 15);
//            body.name = `my name ${randomString}`;
//            allure.logStep(`Create goal with name ${body.name}`);
//            cy.wrap(body.name).as('goalName');
//            return cy.sentRequest('post', `${goalsUrl}`, body);
//        });
//   });
//};

export const deleteGoal = (id) => {
    return allure.step(`Delete goal with id ${id}`, () => {
        return cy.sentRequest('delete', `${goalUrl}/${id}`);
    });
};
