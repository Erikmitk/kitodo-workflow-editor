'use strict';

jest.mock('bpmn-js/lib/util/ModelUtil', () => ({
  is: (element, type) => element.$type === type
}));

jest.mock('../../src/provider/template/parts/KitodoNameProps', () => ({
  kitodoNameGroup: () => ({ id: 'kitodo-name' })
}));

jest.mock('../../src/provider/template/parts/TaskProperties', () => ({
  taskPropertiesGroup: () => ({ id: 'kitodo-task-properties' }),
  BOOLEAN_PROPS: []
}));

jest.mock('../../src/provider/template/parts/PermissionProperties', () => ({
  permissionPropertiesGroup: () => ({ id: 'kitodo-permissions' }),
  isRoleAssigned: jest.fn(),
  toggleRole: jest.fn()
}));

jest.mock('../../src/provider/template/parts/ScriptTaskProperties', () => ({
  scriptTaskPropertiesGroup: () => ({ id: 'kitodo-script-task-properties' })
}));

jest.mock('../../src/provider/template/parts/ConditionProperties', () => ({
  conditionPropertiesGroup: () => ({ id: 'kitodo-conditions' })
}));

global.getLocalizedStringForKey = (key) => key;

const TemplatePropertiesProvider = require('../../src/provider/template/TemplatePropertiesProvider').default;

function makeProvider() {
  const mockPanel = { registerProvider: jest.fn() };
  const provider = new TemplatePropertiesProvider(mockPanel, {});
  return { provider, mockPanel };
}

function runGetGroups(provider, elementType, initialGroups) {
  const element = { $type: elementType };
  return provider.getGroups(element)(initialGroups || []);
}

describe('TemplatePropertiesProvider constructor', () => {
  test('calls registerProvider with LOW_PRIORITY=500 and the provider instance', () => {
    const { provider, mockPanel } = makeProvider();
    expect(mockPanel.registerProvider).toHaveBeenCalledWith(500, provider);
  });
});

describe('getGroups for bpmn:Task', () => {
  test('includes name, task-properties, permissions, and conditions groups', () => {
    const { provider } = makeProvider();
    const groups = runGetGroups(provider, 'bpmn:Task');
    const ids = groups.map(g => g.id);
    expect(ids).toContain('kitodo-name');
    expect(ids).toContain('kitodo-task-properties');
    expect(ids).toContain('kitodo-permissions');
    expect(ids).toContain('kitodo-conditions');
  });

  test('excludes script-task group', () => {
    const { provider } = makeProvider();
    const groups = runGetGroups(provider, 'bpmn:Task');
    const ids = groups.map(g => g.id);
    expect(ids).not.toContain('kitodo-script-task-properties');
  });
});

describe('getGroups for bpmn:ScriptTask', () => {
  test('includes script-task group', () => {
    const { provider } = makeProvider();
    const groups = runGetGroups(provider, 'bpmn:ScriptTask');
    const ids = groups.map(g => g.id);
    expect(ids).toContain('kitodo-script-task-properties');
  });

  test('excludes task-properties group', () => {
    const { provider } = makeProvider();
    const groups = runGetGroups(provider, 'bpmn:ScriptTask');
    const ids = groups.map(g => g.id);
    expect(ids).not.toContain('kitodo-task-properties');
  });
});

describe('getGroups for bpmn:StartEvent', () => {
  test('includes name group', () => {
    const { provider } = makeProvider();
    const groups = runGetGroups(provider, 'bpmn:StartEvent');
    const ids = groups.map(g => g.id);
    expect(ids).toContain('kitodo-name');
  });

  test('excludes task-properties group', () => {
    const { provider } = makeProvider();
    const groups = runGetGroups(provider, 'bpmn:StartEvent');
    const ids = groups.map(g => g.id);
    expect(ids).not.toContain('kitodo-task-properties');
  });
});

describe('getGroups for bpmn:EndEvent', () => {
  test('includes name group', () => {
    const { provider } = makeProvider();
    const groups = runGetGroups(provider, 'bpmn:EndEvent');
    const ids = groups.map(g => g.id);
    expect(ids).toContain('kitodo-name');
  });

  test('excludes task-properties group', () => {
    const { provider } = makeProvider();
    const groups = runGetGroups(provider, 'bpmn:EndEvent');
    const ids = groups.map(g => g.id);
    expect(ids).not.toContain('kitodo-task-properties');
  });
});

describe('getGroups for unknown element type (Gateway)', () => {
  test('adds no groups', () => {
    const { provider } = makeProvider();
    const groups = runGetGroups(provider, 'bpmn:ExclusiveGateway');
    expect(groups).toHaveLength(0);
  });
});

describe('getGroups pre-existing groups', () => {
  test('passes pre-existing groups through unchanged', () => {
    const { provider } = makeProvider();
    const existingGroup = { id: 'pre-existing' };
    const groups = runGetGroups(provider, 'bpmn:Task', [existingGroup]);
    expect(groups[0]).toBe(existingGroup);
  });
});
