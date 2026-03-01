'use strict';

jest.mock('@bpmn-io/properties-panel', () => ({
  CheckboxEntry: jest.fn(),
  isCheckboxEntryEdited: jest.fn()
}));

jest.mock('bpmn-js-properties-panel', () => ({
  useService: jest.fn()
}));

jest.mock('bpmn-js/lib/util/ModelUtil', () => ({
  getBusinessObject: jest.fn(el => el)
}));

global.getLocalizedStringForKey = (key) => key;
global.availableUserRoles = [];

const { isRoleAssigned, toggleRole } = require('../../src/provider/template/parts/PermissionProperties');

describe('isRoleAssigned', () => {
  test('returns false for null input', () => {
    expect(isRoleAssigned(null, '5')).toBe(false);
  });

  test('returns false for undefined input', () => {
    expect(isRoleAssigned(undefined, '5')).toBe(false);
  });

  test('returns false for empty string', () => {
    expect(isRoleAssigned('', '5')).toBe(false);
  });

  test('returns true when role is present', () => {
    expect(isRoleAssigned('1,5,10', '5')).toBe(true);
  });

  test('returns false when role is absent', () => {
    expect(isRoleAssigned('1,10,20', '5')).toBe(false);
  });

  test('does not partial-match ("1" must not match "10" in "10,20")', () => {
    expect(isRoleAssigned('10,20', '1')).toBe(false);
  });
});

describe('toggleRole', () => {
  test('adds role to empty string', () => {
    expect(toggleRole('', '5', true)).toBe('5');
  });

  test('adds role to null (treated as empty)', () => {
    expect(toggleRole(null, '5', true)).toBe('5');
  });

  test('appends role to existing CSV', () => {
    expect(toggleRole('1,2', '5', true)).toBe('1,2,5');
  });

  test('does not add duplicate role', () => {
    expect(toggleRole('1,5,2', '5', true)).toBe('1,5,2');
  });

  test('removes an existing role, leaving the rest', () => {
    expect(toggleRole('1,5,2', '5', false)).toBe('1,2');
  });

  test('removing the only role returns empty string', () => {
    expect(toggleRole('5', '5', false)).toBe('');
  });

  test('removing an absent role is a no-op', () => {
    expect(toggleRole('1,2', '5', false)).toBe('1,2');
  });

  test('filters empty segments from malformed CSV', () => {
    expect(toggleRole(',1,,2,', '5', true)).toBe('1,2,5');
  });
});
