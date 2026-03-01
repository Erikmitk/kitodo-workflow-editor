import { CheckboxEntry, isCheckboxEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export function permissionPropertiesGroup(element) {
  var entries = [];

  if (typeof availableUserRoles !== 'undefined' && availableUserRoles) {
    for (var i = 0; i < availableUserRoles.length; i++) {
      entries.push(createRoleEntry(availableUserRoles[i]));
    }
  }

  return {
    id: 'kitodo-permissions',
    label: getLocalizedStringForKey('permissionsLabel'),
    entries: entries
  };
}

function createRoleEntry(role) {
  return {
    id: 'permittedUserRole_' + role.value,
    component: createRoleComponent(role),
    isEdited: isCheckboxEntryEdited
  };
}

function createRoleComponent(role) {
  return function(props) {
    var element = props.element;
    var commandStack = useService('commandStack');

    return CheckboxEntry({
      element: element,
      id: 'permittedUserRole_' + role.value,
      label: role.name,
      getValue: function() {
        var assignedRoles = getBusinessObject(element).get('template:permittedUserRole');
        if (!assignedRoles) {
          return false;
        }
        var rolesArray = assignedRoles.split(',');
        return rolesArray.indexOf(role.value) !== -1;
      },
      setValue: function(value) {
        var assignedRoles = getBusinessObject(element).get('template:permittedUserRole');
        var rolesArray = assignedRoles ? assignedRoles.split(',').filter(function(r) { return r !== ''; }) : [];

        if (value) {
          if (rolesArray.indexOf(role.value) === -1) {
            rolesArray.push(role.value);
          }
        } else {
          var position = rolesArray.indexOf(role.value);
          if (position !== -1) {
            rolesArray.splice(position, 1);
          }
        }

        commandStack.execute('element.updateModdleProperties', {
          element: element,
          moddleElement: getBusinessObject(element),
          properties: { 'template:permittedUserRole': rolesArray.join(',') }
        });
      }
    });
  };
}
