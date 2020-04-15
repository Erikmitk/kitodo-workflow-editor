/**
 * (c) Kitodo. Key to digital objects e. V. <contact@kitodo.org>
 *
 * This file is part of the Kitodo project.
 *
 * It is licensed under GNU General Public License version 3 or later.
 *
 * For the full copyright and license information, please read the
 * GPL3-License.txt file that was distributed with this source code.
 */

var availableUserRoles = [];
var saveDiagramFunctionCall;
var language = "en_EN";

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

function getLocalizedStringForKey(key) {
	
	var availableLanguages = ["en_EN", "de_DE"];
	
	var localizedString;
		
	switch (availableLanguages.indexOf(language)) {	
		// de_DE
		case 1: {
				localizedString = de_DE[key];
			break; 
		}
		
		// en_EN
		default: {
			localizedString = en_EN[key];
			break;
		}
	}
	
	if(!localizedString) {
		localizedString = key;
	}
	
	return localizedString;
}
