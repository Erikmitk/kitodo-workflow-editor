import inherits from 'inherits';

// Require all properties you need from existing providers.
import { processProps } from 'bpmn-js-properties-panel';
import { eventProps } from 'bpmn-js-properties-panel';
import { linkProps } from 'bpmn-js-properties-panel';
import { idProps } from  'bpmn-js-properties-panel';
import { nameProps } from 'bpmn-js-properties-panel';
import { conditionalProps } from 'bpmn-js-properties-panel';

// Require your custom property entries.
import { scriptTaskProperties }  from './parts/ScriptTaskProperties';
import { taskProperties } from './parts/TaskProperties';
import { permissionProps } from './parts/PermissionProperties';
import { conditionProps } from './parts/ConditionProperties';
import { kitodoNameProps } from './parts/KitodoNameProps';

import { is } from 'bpmn-js/lib/util/ModelUtil';


function createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate) {

    var title = "";

    if(is(element, 'bpmn:Task') || is(element, 'bpmn:StartEvent') || is(element, 'bpmn:EndEvent')) {
        title = getLocalizedStringForKey('generalGroupLabel');
    }

    var generalGroup = {
        id: 'general',
        label: title,
        entries: []
    };

    idProps(generalGroup, element, translate);
    kitodoNameProps(generalGroup, element, translate);

    processProps(generalGroup, element, translate);

    var detailsGroup = {
        id: 'details',
        label: getLocalizedStringForKey('detailsGroupLabel'),
        entries: []
    };

    linkProps(detailsGroup, element, translate);
    eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);
    conditionalProps(detailsGroup, element, bpmnFactory, translate);

    var taskGroup = {
        id: 'task',
        label: getLocalizedStringForKey('taskGroupLabel'),
        entries: []
    };

    taskProperties(taskGroup, element, translate);

    var scriptTaskGroup = {
        id: 'scriptTask',
        label: getLocalizedStringForKey('scriptGroupLabel'),
        entries: []
    };

    scriptTaskProperties(scriptTaskGroup, element);

    return [
        generalGroup,
        taskGroup,
        scriptTaskGroup
    ];
}

function createPermissionTabGroups(element, bpmnFactory, elementRegistry, translate) {

  var permissionGroup = {
    id: 'permission',
    label: '',
    entries: []
  };

  permissionProps(permissionGroup, element);

  return [
    permissionGroup
  ];
}

function createConditionTabGroups(element, bpmnFactory, elementRegistry, translate) {

  var conditionGroup = {
    id: 'condition',
    label: '',
    entries: []
  };

  conditionProps(conditionGroup, element, translate);

  return [
    conditionGroup
  ];
}

export default function TemplatePropertiesProvider(eventBus, bpmnFactory, elementRegistry,
                                                   translate) {

    PropertiesActivator.call(this, eventBus);

    this.getTabs = function (element) {

        var generalTab = {
                id: 'general',
                label: getLocalizedStringForKey('propertiesLabel'),
                groups: createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate)
            };


        var permissionTab = {
            id: 'permissions',
            label: getLocalizedStringForKey('permissionsLabel'),
            groups: createPermissionTabGroups(element, bpmnFactory, elementRegistry, translate)
        };

        var conditionTab = {
            id: 'conditions',
            label: getLocalizedStringForKey('conditionLabel'),
            groups: createConditionTabGroups(element, bpmnFactory, elementRegistry, translate)
        };


            return [
                generalTab,
                permissionTab,
                conditionTab
            ];

    };
}

inherits(TemplatePropertiesProvider, PropertiesActivator);
