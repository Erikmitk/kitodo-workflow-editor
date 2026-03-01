import { SelectEntry, TextFieldEntry, isSelectEntryEdited, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export function conditionPropertiesGroup(element) {
  return {
    id: 'kitodo-conditions',
    label: getLocalizedStringForKey('conditionLabel'),
    entries: [
      {
        id: 'conditionType',
        component: ConditionType,
        isEdited: isSelectEntryEdited
      },
      {
        id: 'conditionValue',
        component: ConditionValue,
        isEdited: isTextFieldEntryEdited
      }
    ]
  };
}

function ConditionType(props) {
  var element = props.element;
  var commandStack = useService('commandStack');

  return SelectEntry({
    element: element,
    id: 'conditionType',
    label: getLocalizedStringForKey('kitodoConditionType'),
    description: getLocalizedStringForKey('kitodoConditionTypeDescription'),
    getOptions: function() {
      return [
        { value: 'none', label: getLocalizedStringForKey('kitodoConditionTypeNone') },
        { value: 'script', label: getLocalizedStringForKey('kitodoConditionTypeScript') },
        { value: 'xpath', label: getLocalizedStringForKey('kitodoConditionTypeXPath') }
      ];
    },
    getValue: function() {
      return getBusinessObject(element).get('template:kitodoConditionType') || '';
    },
    setValue: function(value) {
      commandStack.execute('element.updateModdleProperties', {
        element: element,
        moddleElement: getBusinessObject(element),
        properties: { 'template:kitodoConditionType': value }
      });
    }
  });
}

function ConditionValue(props) {
  var element = props.element;
  var commandStack = useService('commandStack');
  var debounce = useService('debounceInput');

  return TextFieldEntry({
    element: element,
    id: 'conditionValue',
    label: getLocalizedStringForKey('kitodoConditionValue'),
    description: getLocalizedStringForKey('kitodoConditionValueDescription'),
    getValue: function() {
      return getBusinessObject(element).get('template:kitodoConditionValue') || '';
    },
    setValue: function(value) {
      commandStack.execute('element.updateModdleProperties', {
        element: element,
        moddleElement: getBusinessObject(element),
        properties: { 'template:kitodoConditionValue': value }
      });
    },
    debounce: debounce
  });
}
