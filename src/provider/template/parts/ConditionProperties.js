import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
    is
} from 'bpmn-js/lib/util/ModelUtil';


export default function (group, element) {

    // Only return an entry, if the currently selected
    // element is a task.

    if (is(element, 'bpmn:Task')) {
        group.entries.push(entryFactory.selectBox({
            id: 'conditionType',
            description:  getLocalizedStringForKey('kitodoConditionTypeDescription'),
            label: getLocalizedStringForKey('kitodoConditionType'),
            selectOptions : [
                {name: getLocalizedStringForKey('kitodoConditionTypeNone'), value: "none"},
                {name: getLocalizedStringForKey('kitodoConditionTypeScript'), value: "script"},
                {name: getLocalizedStringForKey('kitodoConditionTypeXPath'), value: "xpath"}],
            modelProperty: 'kitodoConditionType'
        }));

        group.entries.push(entryFactory.textField({
            id: 'conditionValue',
            description: getLocalizedStringForKey('kitodoConditionValueDescription'),
            label: getLocalizedStringForKey('kitodoConditionValue'),
            modelProperty: 'kitodoConditionValue'
        }));
    }

}
