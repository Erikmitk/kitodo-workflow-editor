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
    conditionalProps(detailsGroup, element, bpmnFactory, translate);

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
