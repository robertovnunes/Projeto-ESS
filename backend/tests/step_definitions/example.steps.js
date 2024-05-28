const { defineFeature, loadFeature } = require('jest-cucumber');
const asserts = require('assert');

const feature = loadFeature('tests/tests/example.feature');

function sum(num1, num2) {
    return num1 + num2;
}

defineFeature(feature, test => {
    test('Sum between two numbers sucessfull', ({ given, when, then }) => {
        given("I have number {int}", (num1) => {
            console.log(num1);
            expect(num1).toBe(1);
        });
        given("I have number {int}", (num2) => {
            expect(num2).toBe(2);
        });

        when("I run {string}", (funcName) => {
            expect(funcName).toBe('sum(1,2)');
        });

        then("I see {int}", (result) => {
            expect(sum(1,2)).toBe(result);
        });
    });
});