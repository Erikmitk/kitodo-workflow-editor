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

import inherits from 'inherits-browser';
import ReplaceMenuProvider from 'bpmn-js/lib/features/popup-menu/ReplaceMenuProvider';
import { is } from 'bpmn-js/lib/util/ModelUtil';

var KITODO_TASK_OPTIONS = [
  {
    label: 'Task',
    actionName: 'replace-with-task',
    className: 'bpmn-icon-task',
    target: { type: 'bpmn:Task' }
  },
  {
    label: 'Script task',
    actionName: 'replace-with-script-task',
    className: 'bpmn-icon-script',
    target: { type: 'bpmn:ScriptTask' }
  }
];

export default function KitodoReplaceMenuProvider(
    bpmnFactory, popupMenu, modeling, moddle,
    bpmnReplace, rules, translate, moddleCopy) {
  ReplaceMenuProvider.call(
    this, bpmnFactory, popupMenu, modeling, moddle,
    bpmnReplace, rules, translate, moddleCopy
  );
}

inherits(KitodoReplaceMenuProvider, ReplaceMenuProvider);

KitodoReplaceMenuProvider.$inject = ReplaceMenuProvider.$inject;

KitodoReplaceMenuProvider.prototype.getPopupMenuEntries = function(element) {
  if (!is(element, 'bpmn:Task')) {
    return ReplaceMenuProvider.prototype.getPopupMenuEntries.call(this, element);
  }

  var options = KITODO_TASK_OPTIONS.filter(function(opt) {
    return opt.target.type !== element.type;
  });

  return this._createEntries(element, options);
};
