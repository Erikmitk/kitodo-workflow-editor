import $ from 'jquery';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from './provider/template';
import templateModdleDescriptor from './descriptors/template';

import {
  debounce
} from 'min-dash';

import diagramXML from '../resources/initialDiagram.bpmn';

var container = $('#js-drop-zone');

var bpmnModeler = new BpmnModeler({
  container: '#js-canvas',
  propertiesPanel: {
    parent: '#js-properties-panel'
  },
  additionalModules: [
    propertiesPanelModule,
    propertiesProviderModule
  ],
  moddleExtensions: {
    template: templateModdleDescriptor,
  }

});

function setDiagramXML() {
  var placeholderForDiagram = document.getElementById('editForm:workflowTabView:xmlDiagram');
  if (placeholderForDiagram) {
    var loadDiagramXML = placeholderForDiagram.value;
    openDiagram(loadDiagramXML);
  } else {
    alert('diagram is empty!');
  }
}

function createNewDiagram() {
  openDiagram(diagramXML);
}

function openDiagram(xml) {
  var xmlParam;
  var svgParam;
  bpmnModeler.importXML(xml, function(err) {
    err ? (container.removeClass('with-diagram').addClass('with-error'), container.find('.error pre').text(err.message), console.error(err)) : container.removeClass('with-error').addClass('with-diagram');
  })
};

saveDiagramFunctionCall = function saveDiagramAction() {
  var xmlParam = "";
  var svgParam = "";
  bpmnModeler.saveXML({
    format: !0
  }, function(err, xml) {
    err ? alert('diagram xml save failed', err) : xmlParam = xml;
  });
  bpmnModeler.saveSVG({
    format: !0
  }, function(err, svg) {
    err ? alert('diagram svg save failed', err) : svgParam = svg;
  });

  document.getElementById('editForm:workflowTabView:xmlDiagram').value = xmlParam + "kitodo-diagram-separator" + svgParam;
};











  }




// bootstrap diagram functions

$(function() {

  $('#editForm\\:workflowTabView\\:js-create-diagram').click(function(e) {
    e.stopPropagation();
    e.preventDefault();

    createNewDiagram();
  });

  $('#editForm\\:workflowTabView\\:btnReadXmlDiagram').click(function(e) {
    e.stopPropagation();
    e.preventDefault();

    setDiagramXML();
  });

});
