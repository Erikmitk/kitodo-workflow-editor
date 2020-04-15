import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
    is
} from 'bpmn-js/lib/util/ModelUtil';


export default function (group, element) {

    // Only return an entry, if the currently selected
    // element is a task.

    if (is(element, 'bpmn:Task')) {
        group.entries.push(entryFactory.checkbox({
            id: 'correction',
            description: getLocalizedStringForKey('correctionDescription'),
            label: getLocalizedStringForKey('correction'),
            modelProperty: 'correction'
        }));

        group.entries.push(entryFactory.selectBox({
            id: 'processingStatus',
            description: getLocalizedStringForKey('processingstatusDescription'),
            label: getLocalizedStringForKey('processingstatus'),
            selectOptions : [
                {name: getLocalizedStringForKey('locked'), value: 0},
                {name: getLocalizedStringForKey('closed'), value: 3}],
            modelProperty: 'processingStatus'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeMetadata',
            description: getLocalizedStringForKey('metadataDescription'),
            label: getLocalizedStringForKey('metadata'),
            modelProperty: 'typeMetadata'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'separateStructure',
            description: getLocalizedStringForKey('separateStructureDescription'),
            label: getLocalizedStringForKey('separateStructure'),
            modelProperty: 'separateStructure'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeImagesRead',
            description: getLocalizedStringForKey('typeImagesReadDescription'),
            label: getLocalizedStringForKey('typeImagesRead'),
            modelProperty: 'typeImagesRead'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeImagesWrite',
            description: getLocalizedStringForKey('typeImagesWriteDescription'),
            label: getLocalizedStringForKey('typeImagesWrite'),
            modelProperty: 'typeImagesWrite'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeGenerateImages',
            description: getLocalizedStringForKey('typeGenerateImagesDescription'),
            label: getLocalizedStringForKey('typeGenerateImages'),
            modelProperty: 'typeGenerateImages'
        }));


        group.entries.push(entryFactory.checkbox({
            id: 'typeValidateImages',
            description: getLocalizedStringForKey('typeValidateImageDescription'),
            label: getLocalizedStringForKey('typeValidateImages'),
            modelProperty: 'typeValidateImages'
        }));


        group.entries.push(entryFactory.checkbox({
            id: 'typeExportDMS',
            description: getLocalizedStringForKey('typeExportDMSDescription'),
            label: getLocalizedStringForKey('typeExportDMS'),
            modelProperty: 'typeExportDMS'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeCloseVerify',
            description: getLocalizedStringForKey('typeCloseVerifyDescription'),
            label: getLocalizedStringForKey('typeCloseVerify'),
            modelProperty: 'typeCloseVerify'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeAcceptClose',
            description: getLocalizedStringForKey('typeAcceptClose'),
            label: getLocalizedStringForKey('typeAcceptClose'),
            modelProperty: 'typeAcceptClose'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'typeAutomatic',
            description: getLocalizedStringForKey('typeAutomaticDescription'),
            label: getLocalizedStringForKey('typeAutomatic'),
            modelProperty: 'typeAutomatic'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'batchStep',
            description: getLocalizedStringForKey('batchStepDescription'),
            label: getLocalizedStringForKey('batchStep'),
            modelProperty: 'batchStep'
        }));

        group.entries.push(entryFactory.checkbox({
            id: 'concurrent',
            description: getLocalizedStringForKey('concurrentDescription'),
            label: getLocalizedStringForKey('concurrent'),
            modelProperty: 'concurrent'
        }));

    }
}