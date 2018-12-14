import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
	cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

import {
    is
} from 'bpmn-js/lib/util/ModelUtil';


export default function (group, element) {

    // Only return an entry, if the currently selected
    // element is a task.

	if (is(element, 'bpmn:Task')) {

		$.each(availableUserRoles, function( index, value ) {
			var permissionCheckbox = entryFactory.checkbox({
				id: 'permittedUserRole_' + value['value'],
				description: '',
				label: value['name'],
				modelProperty: 'permittedUserRole_' + index
			});

			permissionCheckbox.get = function(element) {
				var res = {};

				var assignedRoles = getBusinessObject(element).get("permittedUserRole");

				if (assignedRoles == undefined) {
					// There are no roles selected so nothing is checked
					res["permittedUserRole_" + index] = false;
					return res;
				}

				var searchIndex = $.inArray(value['value'], assignedRoles.split(','));

				res["permittedUserRole_" + index] = searchIndex >= 0;

				return res;
			};

			permissionCheckbox.set = function(element, values) {
				var res = {};
				var assignedRoles = getBusinessObject(element).get("permittedUserRole");
				var rolesArray;

				if (assignedRoles == undefined) {
					assignedRoles = "";
					rolesArray = [];
				} else {
					rolesArray = assignedRoles.split(',');
				}

				var checkboxValue = !!values["permittedUserRole_" + index];

				if (checkboxValue) {
					rolesArray.push(value['value']);
				} else {
					rolesArray.splice(value['value']);
				}

				res['permittedUserRole'] = rolesArray.join(',');

				return cmdHelper.updateProperties(element, res);
			};

			group.entries.push(permissionCheckbox);
		});
	}
}









