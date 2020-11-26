import inherits from 'inherits';

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';

// Require all properties you need from existing providers.
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';
import conditionalProps from 'bpmn-js-properties-panel/lib/provider/camunda/parts/ConditionalProps';

// Require your custom property entries.
import scriptTaskProperties from './parts/ScriptTaskProperties';
import taskProperties from './parts/TaskProperties';
import permissionProps from './parts/PermissionProperties';
import conditionProps from './parts/ConditionProperties';
import kitodoNameProps from './parts/KitodoNameProps';

var is = require('bpmn-js/lib/util/ModelUtil').is;


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
