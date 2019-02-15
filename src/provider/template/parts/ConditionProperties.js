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
            description: '',
            label: 'Type',
            selectOptions : [
                {name: 'Script', value: "script"},
                {name: 'XPath', value: "xpath"}],
            modelProperty: 'kitodoConditionType'
        }));

        group.entries.push(entryFactory.textField({
            id: 'conditionValue',
            description: '',
            label: 'Value',
            modelProperty: 'kitodoConditionValue'
        }));
    }

}