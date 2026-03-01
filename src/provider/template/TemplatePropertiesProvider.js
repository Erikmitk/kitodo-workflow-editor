import { is } from 'bpmn-js/lib/util/ModelUtil';
import { kitodoNameGroup } from './parts/KitodoNameProps';
import { taskPropertiesGroup } from './parts/TaskProperties';
import { permissionPropertiesGroup } from './parts/PermissionProperties';
import { scriptTaskPropertiesGroup } from './parts/ScriptTaskProperties';
import { conditionPropertiesGroup } from './parts/ConditionProperties';

var LOW_PRIORITY = 500;

export default function TemplatePropertiesProvider(propertiesPanel, injector) {
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
  this._injector = injector;
}

TemplatePropertiesProvider.$inject = ['propertiesPanel', 'injector'];

TemplatePropertiesProvider.prototype.getGroups = function(element) {
  return function(groups) {
    if (is(element, 'bpmn:Task') || is(element, 'bpmn:StartEvent') || is(element, 'bpmn:EndEvent')) {
      var nameGroup = kitodoNameGroup(element);
      if (nameGroup) {
        groups.push(nameGroup);
      }
    }

    if (is(element, 'bpmn:Task')) {
      groups.push(taskPropertiesGroup(element));
      groups.push(permissionPropertiesGroup(element));
      groups.push(conditionPropertiesGroup(element));
    }

    if (is(element, 'bpmn:ScriptTask')) {
      groups.push(scriptTaskPropertiesGroup(element));
    }

    return groups;
  };
};
