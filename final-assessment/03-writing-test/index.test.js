import { describe, it, expect } from 'bun:test';
import { sum } from './index.js';

describe('sum', () => {
    it('should return the sum of two positive numbers', () => {
        // Arrange
        const operandA = 6;
        const operandB = 5;

        // Action
        const actualValue = sum(operandA, operandB);

        // Assert
        const expectedValue = 11;
        expect(actualValue).toBe(expectedValue);
    });

    it('should return the sum of positive and negative number', () => {
        // Arrange
        const operandA = 6;
        const operandB = -5;

        // Action
        const actualValue = sum(operandA, operandB);

        // Assert
        const expectedValue = 1;
        expect(actualValue).toBe(expectedValue);
    });

    it('should return 0 when both arguments are 0', () => {
        // Arrange
        const operandA = 0;
        const operandB = 0;

        // Action
        const actualValue = sum(operandA, operandB);

        // Assert
        const expectedValue = 0;
        expect(actualValue).toBe(expectedValue);
    });

    it('should return the sum of two negative numbers', () => {
        // Arrange
        const operandA = -6;
        const operandB = -5;

        // Action
        const actualValue = sum(operandA, operandB);

        // Assert
        const expectedValue = -11;
        expect(actualValue).toBe(expectedValue);
    });
});
