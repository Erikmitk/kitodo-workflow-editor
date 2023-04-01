import { entryFactory } from 'bpmn-js-properties-panel';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import { cmdHelper } from 'bpmn-js-properties-panel';



module.exports = function(group, element, translate) {

  if (!is(element, 'bpmn:Collaboration')) {

    var options;
    if (is(element, 'bpmn:TextAnnotation')) {
      options = { modelProperty: 'text' };
    }

    options = { id: 'name', label: 'Name', modelProperty: 'name' };

    options.get = function() {
        var res = {};
        var assignedName = getBusinessObject(element).get(options.modelProperty);

        // Set a default value if none is assigned
        if(assignedName == undefined) {
            if (is(element, 'bpmn:Task')) {
                res[options.modelProperty] = getLocalizedStringForKey('taskDefaultName');
            } else if (is(element, 'bpmn:StartEvent')) {
                res[options.modelProperty] = getLocalizedStringForKey('startEventDefaultName')
            } else if (is(element, 'bpmn:EndEvent')) {
                res[options.modelProperty] = getLocalizedStringForKey('endEventDefaultName')
            }
        } else {
            res[options.modelProperty] = assignedName;
        }

        cmdHelper.updateProperties(element, res);

        return res;
    }


    var nameEntryTextBox = entryFactory.textBox(translate, options);

    if(!is(element, 'bpmn:Task') && !is(element, 'bpmn:StartEvent') && !is(element, 'bpmn:EndEvent')) {
        nameEntryTextBox.cssClasses = ['hidden'];
    }

    group.entries = group.entries.concat(nameEntryTextBox);

  }

};
