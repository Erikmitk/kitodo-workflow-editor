import { CheckboxEntry, SelectEntry, isCheckboxEntryEdited, isSelectEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export function taskPropertiesGroup(element) {
  return {
    id: 'kitodo-task-properties',
    label: getLocalizedStringForKey('propertiesLabel'),
    entries: [
      {
        id: 'correction',
        component: RepeatOnCorrection,
        isEdited: isCheckboxEntryEdited
      },
      {
        id: 'processingStatus',
        component: ProcessingStatus,
        isEdited: isSelectEntryEdited
      }
    ].concat(booleanCheckboxEntries())
  };
}

function RepeatOnCorrection(props) {
  var element = props.element;
  var commandStack = useService('commandStack');

  return CheckboxEntry({
    element: element,
    id: 'correction',
    label: getLocalizedStringForKey('correction'),
    description: getLocalizedStringForKey('correctionDescription'),
    getValue: function() {
      return getBusinessObject(element).get('template:repeatOnCorrection');
    },
    setValue: function(value) {
      commandStack.execute('element.updateModdleProperties', {
        element: element,
        moddleElement: getBusinessObject(element),
        properties: { 'template:repeatOnCorrection': value }
      });
    }
  });
}

function ProcessingStatus(props) {
  var element = props.element;
  var commandStack = useService('commandStack');

  return SelectEntry({
    element: element,
    id: 'processingStatus',
    label: getLocalizedStringForKey('processingstatus'),
    description: getLocalizedStringForKey('processingstatusDescription'),
    getOptions: function() {
      return [
        { value: '0', label: getLocalizedStringForKey('locked') },
        { value: '3', label: getLocalizedStringForKey('closed') }
      ];
    },
    getValue: function() {
      var val = getBusinessObject(element).get('template:processingStatus');
      return val !== undefined && val !== null ? String(val) : '';
    },
    setValue: function(value) {
      commandStack.execute('element.updateModdleProperties', {
        element: element,
        moddleElement: getBusinessObject(element),
        properties: { 'template:processingStatus': parseInt(value, 10) }
      });
    }
  });
}

// Helper: generate entry descriptors for all boolean checkbox properties
var BOOLEAN_PROPS = [
  { id: 'typeMetadata', labelKey: 'metadata', descKey: 'metadataDescription', attr: 'typeMetadata' },
  { id: 'typeImagesRead', labelKey: 'typeImagesRead', descKey: 'typeImagesReadDescription', attr: 'typeImagesRead' },
  { id: 'typeImagesWrite', labelKey: 'typeImagesWrite', descKey: 'typeImagesWriteDescription', attr: 'typeImagesWrite' },
  { id: 'typeGenerateImages', labelKey: 'typeGenerateImages', descKey: 'typeGenerateImagesDescription', attr: 'typeGenerateImages' },
  { id: 'typeValidateImages', labelKey: 'typeValidateImages', descKey: 'typeValidateImagesDescription', attr: 'typeValidateImages' },
  { id: 'typeExportDMS', labelKey: 'typeExportDMS', descKey: 'typeExportDMSDescription', attr: 'typeExportDMS' },
  { id: 'typeCloseVerify', labelKey: 'typeCloseVerify', descKey: 'typeCloseVerifyDescription', attr: 'typeCloseVerify' },
  { id: 'typeAcceptClose', labelKey: 'typeAcceptClose', descKey: 'typeAcceptCloseDescription', attr: 'typeAcceptClose' },
  { id: 'typeAutomatic', labelKey: 'typeAutomatic', descKey: 'typeAutomaticDescription', attr: 'typeAutomatic' },
  { id: 'batchStep', labelKey: 'batchStep', descKey: 'batchStepDescription', attr: 'batchStep' },
  { id: 'concurrent', labelKey: 'concurrent', descKey: 'concurrentDescription', attr: 'concurrent' }
];

function createBooleanCheckboxComponent(propDef) {
  return function(props) {
    var element = props.element;
    var commandStack = useService('commandStack');

    return CheckboxEntry({
      element: element,
      id: propDef.id,
      label: getLocalizedStringForKey(propDef.labelKey),
      description: getLocalizedStringForKey(propDef.descKey),
      getValue: function() {
        return getBusinessObject(element).get('template:' + propDef.attr);
      },
      setValue: function(value) {
        var properties = {};
        properties['template:' + propDef.attr] = value;
        commandStack.execute('element.updateModdleProperties', {
          element: element,
          moddleElement: getBusinessObject(element),
          properties: properties
        });
      }
    });
  };
}

function booleanCheckboxEntries() {
  return BOOLEAN_PROPS.map(function(propDef) {
    return {
      id: propDef.id,
      component: createBooleanCheckboxComponent(propDef),
      isEdited: isCheckboxEntryEdited
    };
  });
}
