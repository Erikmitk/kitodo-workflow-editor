'use strict';

jest.mock('@bpmn-io/properties-panel', () => ({
  CheckboxEntry: jest.fn(),
  SelectEntry: jest.fn(),
  isCheckboxEntryEdited: jest.fn(),
  isSelectEntryEdited: jest.fn()
}));

jest.mock('bpmn-js-properties-panel', () => ({
  useService: jest.fn()
}));

jest.mock('bpmn-js/lib/util/ModelUtil', () => ({
  getBusinessObject: jest.fn(el => el)
}));

global.getLocalizedStringForKey = (key) => key;

const { BOOLEAN_PROPS, taskPropertiesGroup } = require('../../src/provider/template/parts/TaskProperties');

describe('BOOLEAN_PROPS', () => {
  test('has exactly 11 entries', () => {
    expect(BOOLEAN_PROPS).toHaveLength(11);
  });

  test('each entry has id, labelKey, descKey, and attr fields', () => {
    BOOLEAN_PROPS.forEach(prop => {
      expect(prop).toHaveProperty('id');
      expect(prop).toHaveProperty('labelKey');
      expect(prop).toHaveProperty('descKey');
      expect(prop).toHaveProperty('attr');
    });
  });

  test('all id values are unique', () => {
    const ids = BOOLEAN_PROPS.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('each attr value matches its id value', () => {
    BOOLEAN_PROPS.forEach(prop => {
      expect(prop.attr).toBe(prop.id);
    });
  });
});

describe('taskPropertiesGroup', () => {
  const element = {};

  test('returns a group with id "kitodo-task-properties"', () => {
    const group = taskPropertiesGroup(element);
    expect(group.id).toBe('kitodo-task-properties');
  });

  test('group entries include correction and processingStatus', () => {
    const group = taskPropertiesGroup(element);
    const ids = group.entries.map(e => e.id);
    expect(ids).toContain('correction');
    expect(ids).toContain('processingStatus');
  });

  test('group entries include all 11 BOOLEAN_PROPS ids', () => {
    const group = taskPropertiesGroup(element);
    const ids = group.entries.map(e => e.id);
    BOOLEAN_PROPS.forEach(prop => {
      expect(ids).toContain(prop.id);
    });
  });

  test('total entry count is 13 (2 fixed + 11 boolean)', () => {
    const group = taskPropertiesGroup(element);
    expect(group.entries).toHaveLength(13);
  });
});
