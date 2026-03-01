import { TextAreaEntry, isTextAreaEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';
import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';

export function kitodoNameGroup(element) {
  if (is(element, 'bpmn:Collaboration')) {
    return null;
  }

  if (!is(element, 'bpmn:Task') && !is(element, 'bpmn:StartEvent') && !is(element, 'bpmn:EndEvent')) {
    return null;
  }

  return {
    id: 'kitodo-name',
    label: getLocalizedStringForKey('generalGroupLabel'),
    entries: [
      {
        id: 'name',
        component: KitodoName,
        isEdited: isTextAreaEntryEdited
      }
    ]
  };
}

function KitodoName(props) {
  var element = props.element;
  var modeling = useService('modeling');
  var debounce = useService('debounceInput');

  var getValue = function() {
    var name = getBusinessObject(element).get('name');
    if (name === undefined || name === null) {
      if (is(element, 'bpmn:Task')) {
        return getLocalizedStringForKey('taskDefaultName');
      } else if (is(element, 'bpmn:StartEvent')) {
        return getLocalizedStringForKey('startEventDefaultName');
      } else if (is(element, 'bpmn:EndEvent')) {
        return getLocalizedStringForKey('endEventDefaultName');
      }
    }
    return name || '';
  };

  var setValue = function(value) {
    modeling.updateProperties(element, { name: value });
  };

  return TextAreaEntry({
    element: element,
    id: 'name',
    label: 'Name',
    getValue: getValue,
    setValue: setValue,
    debounce: debounce
  });
}
