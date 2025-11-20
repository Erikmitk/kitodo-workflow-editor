import inherits from 'inherits';

import scriptTaskProperties from './parts/ScriptTaskProperties';
import taskProperties from './parts/TaskProperties';
import permissionProps from './parts/PermissionProperties';
import conditionProps from './parts/ConditionProperties';
import kitodoNameProps from './parts/KitodoNameProps';

export default function TemplatePropertiesProvider(eventBus, bpmnFactory, elementRegistry, translate) {

    PropertiesActivator.call(this, eventBus);

    // Create general tab groups
    function createGeneralTabGroups(element) {
        const generalGroup = {
            id: 'general',
            label: getLocalizedStringForKey('generalGroupLabel'),
            entries: []
        };

        // Add name properties
        kitodoNameProps(generalGroup, element, translate);

        // Add task-specific properties
        if (element.type === 'bpmn:Task') {
            taskProperties(generalGroup, element, translate);
        }

        const scriptTaskGroup = {
            id: 'scriptTask',
            label: getLocalizedStringForKey('scriptGroupLabel'),
            entries: []
        };

        if (element.type === 'bpmn:ScriptTask') {
            scriptTaskProperties(scriptTaskGroup, element);
        }

        // Only include scriptTaskGroup if it has entries
        const groups = [generalGroup];
        if (scriptTaskGroup.entries.length > 0) {
            groups.push(scriptTaskGroup);
        }

        return groups;
    }

    // Create permissions tab
    function createPermissionTabGroups(element) {
        const permissionGroup = { id: 'permission', label: getLocalizedStringForKey('permissionsLabel'), entries: [] };
        permissionProps(permissionGroup, element);
        return [permissionGroup];
    }

    // Create conditions tab
    function createConditionTabGroups(element) {
        const conditionGroup = { id: 'condition', label: getLocalizedStringForKey('conditionLabel'), entries: [] };
        conditionProps(conditionGroup, element, translate);
        return [conditionGroup];
    }

    // Define tabs
    this.getTabs = function(element) {
        return [
            {
                id: 'general',
                label: getLocalizedStringForKey('propertiesLabel'),
                groups: createGeneralTabGroups(element)
            },
            {
                id: 'permissions',
                label: getLocalizedStringForKey('permissionsLabel'),
                groups: createPermissionTabGroups(element)
            },
            {
                id: 'conditions',
                label: getLocalizedStringForKey('conditionLabel'),
                groups: createConditionTabGroups(element)
            }
        ];
    };
}

inherits(TemplatePropertiesProvider, PropertiesActivator);
