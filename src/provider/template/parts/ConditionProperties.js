import { entryFactory } from 'bpmn-js-properties-panel';
import { is } from 'bpmn-js/lib/util/ModelUtil';

export default function (group, element, translate) {

    // Only return an entry, if the currently selected
    // element is a task.

    if (is(element, 'bpmn:Task')) {
        group.entries.push(entryFactory.selectBox(translate, {
            id: 'conditionType',
            description:  getLocalizedStringForKey('kitodoConditionTypeDescription'),
            label: getLocalizedStringForKey('kitodoConditionType'),
            selectOptions : [
                {name: getLocalizedStringForKey('kitodoConditionTypeNone'), value: "none"},
                {name: getLocalizedStringForKey('kitodoConditionTypeScript'), value: "script"},
                {name: getLocalizedStringForKey('kitodoConditionTypeXPath'), value: "xpath"}],
            modelProperty: 'kitodoConditionType'
        }));

        group.entries.push(entryFactory.textBox(translate, {
            id: 'conditionValue',
            description: getLocalizedStringForKey('kitodoConditionValueDescription'),
            label: getLocalizedStringForKey('kitodoConditionValue'),
            modelProperty: 'kitodoConditionValue'
        }));
    }

}
