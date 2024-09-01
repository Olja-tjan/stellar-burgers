/// <reference types="cypress" />

describe('Добавление ингридиентов в конструктор работает корректно', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Добавление булки', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Ингредиент 1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Ингредиент 1')
      .should('exist');
  });

  it('Добавление начинки', function () {
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-main]')
      .contains('Ингредиент 2')
      .should('exist');
    cy.get('[data-cy=constructor-main]')
      .contains('Ингредиент 4')
      .should('exist');
  });
});

describe('Модальное окно работает корректно', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Открытие модального окна', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Ингредиент 1').should('exist');
  });

  it('Закрытие модального окна на крестик', function () {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие модального окна на оверлей', function () {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Создание заказа работает корректно', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Оформление заказа бургера', function () {
    // Добавление ингредиентов в заказ
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();

    // Клик по кнопке "Оформить заказ"
    cy.contains('Оформить заказ').click();

    // Проверка, что в запросе отправляются выбранные ингредиенты
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '4', '1']
      });

    // Проверка, что модальное окно показало номер заказа
    cy.get('[data-cy=order-number]').contains('51709').should('exist');

    // Закрытие окна заказа на крестик
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    // Проверка очистки конструктора
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 1')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 2')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 4')
      .should('not.exist');
  });
});
