'use strict';

const descriptor = require('../../src/moddle/TemplateModdleDescriptor.json');

describe('TemplateModdleDescriptor', () => {
  test('has correct namespace prefix and URI', () => {
    expect(descriptor.prefix).toBe('template');
    expect(descriptor.uri).toBe('http://www.kitodo.org/template');
  });

  test('defines exactly 2 types', () => {
    expect(descriptor.types).toHaveLength(2);
  });

  test('TemplateTaskEvent extends bpmn:Task', () => {
    const type = descriptor.types.find(t => t.name === 'TemplateTaskEvent');
    expect(type).toBeDefined();
    expect(type.extends).toContain('bpmn:Task');
  });

  test('TemplateScriptTaskEvent extends bpmn:ScriptTask', () => {
    const type = descriptor.types.find(t => t.name === 'TemplateScriptTaskEvent');
    expect(type).toBeDefined();
    expect(type.extends).toContain('bpmn:ScriptTask');
  });

  test('TemplateTaskEvent has all 11 BOOLEAN_PROPS attributes', () => {
    const type = descriptor.types.find(t => t.name === 'TemplateTaskEvent');
    const propNames = type.properties.map(p => p.name);
    const expectedBooleanAttrs = [
      'typeMetadata', 'typeImagesRead', 'typeImagesWrite', 'typeGenerateImages',
      'typeValidateImages', 'typeExportDMS', 'typeCloseVerify', 'typeAcceptClose',
      'typeAutomatic', 'batchStep', 'concurrent'
    ];
    expectedBooleanAttrs.forEach(attr => {
      expect(propNames).toContain(attr);
    });
  });

  test('permittedUserRole is type String with isAttr: true', () => {
    const type = descriptor.types.find(t => t.name === 'TemplateTaskEvent');
    const prop = type.properties.find(p => p.name === 'permittedUserRole');
    expect(prop).toBeDefined();
    expect(prop.type).toBe('String');
    expect(prop.isAttr).toBe(true);
  });

  test('TemplateScriptTaskEvent has scriptName and scriptPath properties', () => {
    const type = descriptor.types.find(t => t.name === 'TemplateScriptTaskEvent');
    const propNames = type.properties.map(p => p.name);
    expect(propNames).toContain('scriptName');
    expect(propNames).toContain('scriptPath');
  });
});
