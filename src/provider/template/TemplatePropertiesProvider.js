import inherits from 'inherits';

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';
import sequenceFlowProps from 'bpmn-js-properties-panel/lib/provider/camunda/parts/SequenceFlowProps';

// Require your custom property entries.
import scriptTaskProperties from './parts/ScriptTaskProperties';
import taskProperties from './parts/TaskProperties';
//import sequenceFlowProperies from './parts/SequenceFlowProperties';

// The general tab contains all bpmn relevant properties.
// The properties are organized in groups.
function createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate) {

    var generalGroup = {
        id: 'general',
        label: 'General Properties',
        entries: []
    };
    idProps(generalGroup, element, translate);
    nameProps(generalGroup, element, translate);
    processProps(generalGroup, element, translate);

    var detailsGroup = {
        id: 'details',
        label: 'Details',
        entries: []
    };
    linkProps(detailsGroup, element, translate);
    eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);
    sequenceFlowProps(detailsGroup, element, bpmnFactory, translate);

    // Create a group called "Task Properties".
    var taskGroup = {
        id: 'task',
        label: 'Task Properties',
        entries: []
    };

    taskProperties(taskGroup, element);

    var scriptTaskGroup = {
        id: 'scriptTask',
        label: 'Script Properties',
        entries: []
    };

    scriptTaskProperties(scriptTaskGroup, element);

    return [
        generalGroup,
        detailsGroup,
        taskGroup,
        scriptTaskGroup
    ];
}

export default function TemplatePropertiesProvider(eventBus, bpmnFactory, elementRegistry,
                                                   translate) {

    PropertiesActivator.call(this, eventBus);

    this.getTabs = function (element) {

        var generalTab = {
            id: 'general',
            label: 'Properties',
            groups: createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate)
        };

        return [
            generalTab
        ];
    };
}

inherits(TemplatePropertiesProvider, PropertiesActivator);
