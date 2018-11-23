/**
 * (c) Kitodo. Key to digital objects e. V. <contact@kitodo.org>
 *
 * This file is part of the Kitodo project.
 *
 * It is licensed under MIT License by camunda Services GmbH
 *
 * For the full copyright and license information, please read the
 * Camunda-License.txt file that was distributed with this source code.
 */

var availableUserRoles = [];
$(window).on("load", function () {

	$.ready.then(function () {
		if ($('#editForm\\:workflowTabView\\:btnReadXmlDiagram').length > 0) {
			$('#editForm\\:workflowTabView\\:btnReadXmlDiagram')[0].click();
		} else {
			$('#editForm\\:workflowTabView\\:js-create-diagram')[0].click();
		}

		var userRoles = $("#editForm\\:workflowTabView\\:roleId_input").children();

		userRoles.each(function( index ) {
			var role = { name: $(this).text(), value: $(this).val() };
			availableUserRoles.push(role);
		});
	});
});
