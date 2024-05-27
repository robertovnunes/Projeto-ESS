import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('tests/example.feature');

defineFeature(feature, test => {
    test('titulo do cenario', ({ given, when, then }) => {
        given('dado que algo acontece', () => {
            // Write code here that turns the phrase above into concrete actions
        });

        when('quando algo acontece', () => {
            // Write code here that turns the phrase above into concrete actions
        });

        then('entao algo acontece', () => {
            // Write code here that turns the phrase above into concrete actions
        });
    });
});