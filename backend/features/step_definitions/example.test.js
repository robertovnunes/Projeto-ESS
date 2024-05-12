import { defineFeature, loadFeature } from 'jest-cucumber';
import { passWithNoTests } from '../../jest.config';

const feature = loadFeature('features/example.feature');

defineFeature(feature, test => {
    test('Example scenario', ({ given, when, then }) => {
        given('I have a step', () => {
            // Write code here that turns the phrase above into concrete actions
            passWithNoTests();
        });

        when('quando algo acontece', () => {
            // Write code here that turns the phrase above into concrete actions
        });

        then('entao algo acontece', () => {
            // Write code here that turns the phrase above into concrete actions
        });
    });
});