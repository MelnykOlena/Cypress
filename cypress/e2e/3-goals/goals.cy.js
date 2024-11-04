describe('API Testing for ClickUp GetGoals Endpoint', () => {
    const apiUrl = 'https://api.clickup.com/api/v2/team/9012366467/goal';



    it('should return error for missing authorization header', () => {
        cy.request({
            method: 'GET',
            url: apiUrl,
            failOnStatusCode: false // дозволяє обробляти помилку
        }).then((response) => {

            expect(response.status).to.eq(400); // непраивльно відправлений запит

            console.log(response.body);

            // Перевірка фактичної структури відповіді
            expect(response.body).to.have.property('err', 'Authorization header required');
            expect(response.body).to.have.property('ECODE');
        });
    });
    it('should retrieve goals successfully', () => {
        cy.request({
            method: 'GET',
            url: apiUrl,
            headers: {
                Authorization: 'pk_152443084_285LSK4AJST9AVXGK670CE6NCP2OU7LP'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('goals');
        });
    });




    it('should create a goal successfully with valid data', () => {
        cy.fixture('create_goal.json').then((payload) => {
            cy.request({
                method: 'POST',
                url: apiUrl,
                headers: {
                    Authorization: 'pk_152443084_285LSK4AJST9AVXGK670CE6NCP2OU7LP'
                },
                body: payload,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body));

                expect(response.status).to.eq(200);


                expect(response.body).to.have.property('goal');

                expect(response.body.goal).to.have.property('id');
                cy.wrap(response.body.goal.id).as('createdGoalId');
            });
        });
    });

    it('should return an error with invalid data', () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            headers: {
                Authorization: 'pk_152443084_285LSK4AJST9AVXGK670CE6NCP2OU7LP'
            },
            body: {}, // пусте тіло запиту
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.not.eq(200); //статус код не 200
            expect(response.status).to.eq(500);
            expect(response.body).to.have.property('err', 'null value in column "name" violates not-null constraint');
            expect(response.body).to.have.property('ECODE', 'GOAL_005');
        });
    });

});
