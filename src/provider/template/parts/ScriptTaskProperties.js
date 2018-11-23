import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
    is
} from 'bpmn-js/lib/util/ModelUtil';


export default function (group, element) {

    // Only return an entry, if the currently selected
    // element is a task.

    if (is(element, 'bpmn:ScriptTask')) {
        group.entries.push(entryFactory.textField({
            id: 'scriptName',
            description: 'Insert script name',
            label: 'Script name',
            modelProperty: 'scriptName'
        }));

        group.entries.push(entryFactory.textField({
            id: 'scriptPath',
            description: 'Insert script path',
            label: 'Script path',
            modelProperty: 'scriptPath'
        }));
    }

}