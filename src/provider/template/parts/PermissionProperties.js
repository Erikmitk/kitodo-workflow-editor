import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
	cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

import {
    is
} from 'bpmn-js/lib/util/ModelUtil';


export default function (group, element, translate) {

    // Only return an entry, if the currently selected
    // element is a task.

	if (is(element, 'bpmn:Task')) {

		$.each(availableUserRoles, function( index, value ) {
			var permissionCheckbox = entryFactory.checkbox(translate, {
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

				var rolesArray = assignedRoles.split(',');
				var isSet = rolesArray.indexOf(value['value']);

				if (isSet !== -1) {
					res["permittedUserRole_" + index] = true;
				} else {
					res["permittedUserRole_" + index] = false;
				}

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

				var checkboxValue = values["permittedUserRole_" + index ];

				if (checkboxValue == undefined) {
					var position = rolesArray.indexOf(value['value']);
					rolesArray.splice(position, 1);
				}

				if (checkboxValue == true) {
					rolesArray.push(value['value']);
				}

				var propertyString = rolesArray.join(',');

				if(propertyString.charAt(0) == ",") {
					propertyString = propertyString.substr(1)
				}

				res['permittedUserRole'] = propertyString;

				return cmdHelper.updateProperties(element, res);
			};

			group.entries.push(permissionCheckbox);
		});
	}
}









