import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
    is
} from 'bpmn-js/lib/util/ModelUtil';


export default function (group, element) {

    // Only return an entry, if the currently selected
    // element is a task.

    if (is(element, 'bpmn:Task')) {
        group.entries.push(entryFactory.textField({
            id: 'priority',
            description: '',
            label: 'Priority',
            modelProperty: 'priority'
        }));

        group.entries.push(entryFactory.selectBox({
            id: 'processingStatus',
            description: '',
            label: 'Processing status',
            selectOptions : [
                {name: 'Locked', value: 0},
                {name: 'Open', value: 1},
                {name: 'In processing', value: 2},
                {name: 'Closed', value: 3}],
            modelProperty: 'processingStatus'
        }));

        group.entries.push(entryFactory.selectBox({
            id: 'permittedUserRole',
            description: '',
            label: 'Permitted User Role',
            selectOptions : availableUserRoles,
            modelProperty: 'permittedUserRole'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeMetadata',
            description: 'Is it task metadata type?',
            label: 'Metadata',
            modelProperty: 'typeMetadata'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeImagesRead',
            description: '',
            label: 'Read images',
            modelProperty: 'typeImagesRead'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeImagesWrite',
            description: '',
            label: 'Write images',
            modelProperty: 'typeImagesWrite'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeExportDMS',
            description: '',
            label: 'Export DMS',
            modelProperty: 'typeExportDMS'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeCloseVerify',
            description: '',
            label: 'Validate on exit',
            modelProperty: 'typeCloseVerify'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeAcceptClose',
            description: '',
            label: 'Finalise task after accepting',
            modelProperty: 'typeAcceptClose'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeAutomatic',
            description: 'Is it task automatic type?',
            label: 'Automatic task',
            modelProperty: 'typeAutomatic'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'batchStep',
            description: '',
            label: 'Batch task',
            modelProperty: 'batchStep'
        }));
    }

}