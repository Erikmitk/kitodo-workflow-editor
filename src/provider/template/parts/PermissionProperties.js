import { CheckboxEntry, isCheckboxEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export function isRoleAssigned(assignedRolesCSV, roleValue) {
  if (!assignedRolesCSV) return false;
  return assignedRolesCSV.split(',').indexOf(roleValue) !== -1;
}

export function toggleRole(assignedRolesCSV, roleValue, enable) {
  var rolesArray = assignedRolesCSV
    ? assignedRolesCSV.split(',').filter(function(r) { return r !== ''; })
    : [];
  if (enable) {
    if (rolesArray.indexOf(roleValue) === -1) rolesArray.push(roleValue);
  } else {
    var pos = rolesArray.indexOf(roleValue);
    if (pos !== -1) rolesArray.splice(pos, 1);
  }
  return rolesArray.join(',');
}

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
        return isRoleAssigned(assignedRoles, role.value);
      },
      setValue: function(value) {
        var assignedRoles = getBusinessObject(element).get('template:permittedUserRole');
        var updated = toggleRole(assignedRoles, role.value, value);
        commandStack.execute('element.updateModdleProperties', {
          element: element,
          moddleElement: getBusinessObject(element),
          properties: { 'template:permittedUserRole': updated }
        });
      }
    });
  };
}
