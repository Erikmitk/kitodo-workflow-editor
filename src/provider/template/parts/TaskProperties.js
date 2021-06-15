import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
    is
} from 'bpmn-js/lib/util/ModelUtil';


export default function (group, element, translate) {

    // Only return an entry, if the currently selected
    // element is a task.

    if (is(element, 'bpmn:Task')) {
        group.entries.push(entryFactory.checkbox(translate, {
            id: 'correction',
            description: getLocalizedStringForKey('correctionDescription'),
            label: getLocalizedStringForKey('correction'),
            modelProperty: 'correction'
        }));

        group.entries.push(entryFactory.selectBox(translate, {
            id: 'processingStatus',
            description: getLocalizedStringForKey('processingstatusDescription'),
            label: getLocalizedStringForKey('processingstatus'),
            selectOptions : [
                {name: getLocalizedStringForKey('locked'), value: 0},
                {name: getLocalizedStringForKey('closed'), value: 3}],
            modelProperty: 'processingStatus'
        }));

        group.entries.push(entryFactory.checkbox(translate, {
            id: 'typeMetadata',
            description: getLocalizedStringForKey('metadataDescription'),
            label: getLocalizedStringForKey('metadata'),
            modelProperty: 'typeMetadata'
        }));

        group.entries.push(entryFactory.checkbox(translate, {
            id: 'typeImagesRead',
            description: getLocalizedStringForKey('typeImagesReadDescription'),
            label: getLocalizedStringForKey('typeImagesRead'),
            modelProperty: 'typeImagesRead'
        }));

        group.entries.push(entryFactory.checkbox(translate, {
            id: 'typeImagesWrite',
            description: getLocalizedStringForKey('typeImagesWriteDescription'),
            label: getLocalizedStringForKey('typeImagesWrite'),
            modelProperty: 'typeImagesWrite'
        }));

        group.entries.push(entryFactory.checkbox(translate, {
            id: 'typeGenerateImages',
            description: getLocalizedStringForKey('typeGenerateImagesDescription'),
            label: getLocalizedStringForKey('typeGenerateImages'),
            modelProperty: 'typeGenerateImages'
        }));


        group.entries.push(entryFactory.checkbox(translate, {
            id: 'typeValidateImages',
            description: getLocalizedStringForKey('typeValidateImagesDescription'),
            label: getLocalizedStringForKey('typeValidateImages'),
            modelProperty: 'typeValidateImages'
        }));


        group.entries.push(entryFactory.checkbox(translate, {
            id: 'typeExportDMS',
            description: getLocalizedStringForKey('typeExportDMSDescription'),
            label: getLocalizedStringForKey('typeExportDMS'),
            modelProperty: 'typeExportDMS'
        }));

        group.entries.push(entryFactory.checkbox(translate, {
            id: 'typeCloseVerify',
            description: getLocalizedStringForKey('typeCloseVerifyDescription'),
            label: getLocalizedStringForKey('typeCloseVerify'),
            modelProperty: 'typeCloseVerify'
        }));

        group.entries.push(entryFactory.checkbox(translate, {
            id: 'typeAcceptClose',
            description: getLocalizedStringForKey('typeAcceptCloseDescription'),
            label: getLocalizedStringForKey('typeAcceptClose'),
            modelProperty: 'typeAcceptClose'
        }));

        group.entries.push(entryFactory.checkbox(translate, {
            id: 'typeAutomatic',
            description: getLocalizedStringForKey('typeAutomaticDescription'),
            label: getLocalizedStringForKey('typeAutomatic'),
            modelProperty: 'typeAutomatic'
        }));

        group.entries.push(entryFactory.checkbox(translate, {
            id: 'batchStep',
            description: getLocalizedStringForKey('batchStepDescription'),
            label: getLocalizedStringForKey('batchStep'),
            modelProperty: 'batchStep'
        }));

        group.entries.push(entryFactory.checkbox(translate, {
            id: 'concurrent',
            description: getLocalizedStringForKey('concurrentDescription'),
            label: getLocalizedStringForKey('concurrent'),
            modelProperty: 'concurrent'
        }));

    }
}