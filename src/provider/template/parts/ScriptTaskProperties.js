import { TextFieldEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export function scriptTaskPropertiesGroup(element) {
  return {
    id: 'kitodo-script-task',
    label: getLocalizedStringForKey('scriptGroupLabel'),
    entries: [
      {
        id: 'scriptName',
        component: ScriptName,
        isEdited: isTextFieldEntryEdited
      },
      {
        id: 'scriptPath',
        component: ScriptPath,
        isEdited: isTextFieldEntryEdited
      }
    ]
  };
}

function ScriptName(props) {
  var element = props.element;
  var commandStack = useService('commandStack');
  var debounce = useService('debounceInput');

  return TextFieldEntry({
    element: element,
    id: 'scriptName',
    label: getLocalizedStringForKey('scriptName'),
    description: getLocalizedStringForKey('scriptNameDescription'),
    getValue: function() {
      return getBusinessObject(element).get('template:scriptName') || '';
    },
    setValue: function(value) {
      commandStack.execute('element.updateModdleProperties', {
        element: element,
        moddleElement: getBusinessObject(element),
        properties: { 'template:scriptName': value }
      });
    },
    debounce: debounce
  });
}

function ScriptPath(props) {
  var element = props.element;
  var commandStack = useService('commandStack');
  var debounce = useService('debounceInput');

  return TextFieldEntry({
    element: element,
    id: 'scriptPath',
    label: getLocalizedStringForKey('scriptPath'),
    description: getLocalizedStringForKey('scriptPathDescription'),
    getValue: function() {
      return getBusinessObject(element).get('template:scriptPath') || '';
    },
    setValue: function(value) {
      commandStack.execute('element.updateModdleProperties', {
        element: element,
        moddleElement: getBusinessObject(element),
        properties: { 'template:scriptPath': value }
      });
    },
    debounce: debounce
  });
}
