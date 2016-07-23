var jQueryPPG;

$(document).ready(function() {
  if (typeof jQueryPPG != 'undefined') {
    jQueryPPG('.pixel_perfect_gadget_loading').remove();
    return;
  }

  jQueryPPG = jQuery.noConflict(true);
  jQueryPPG('.pixel_perfect_gadget_loading').remove();

  var head = document.getElementsByTagName('head')[0];
  var s = document.createElement('link');
  s.setAttribute('rel', 'stylesheet');
  s.setAttribute('type', 'text/css');
  s.setAttribute('media', 'screen');
  s.setAttribute('href', 'https://dv0akt2986vzh.cloudfront.net/unstable/build/selectorgadget_combined.css');
  (head ? head : document.body).appendChild(s);

  var ppgDiv = jQueryPPG('<div>')
    .attr('id', 'pixelperfect_main')
    .addClass('pixelperfect_ignore')
    .css('width', 'auto')
    .css('height', 'auto')
    .css('position', 'fixed')
    .css('bottom', '0px')
    .css('border', 'solid 1px black')
    .css('right', '0px')
    .css('z-index', '1000')
    .css('background', 'white')
    .css('padding', '10px');
  jQueryPPG('body').append(ppgDiv);

  var currentElement = null;
  var marginMode = false;
  jQueryPPG(document).keydown(function(e) {
    if (currentElement == null) return;
    var increment = (e.shiftKey ? '-' : '+') + '=' + '1';
    var mode = marginMode ? 'margin' : 'padding';
    switch(e.which) {
      case 37: // left
        jQueryPPG(currentElement).css(mode + '-left', increment);
        break;
      case 38: // up
        jQueryPPG(currentElement).css(mode + '-top', increment);
        break;
      case 39: // right
        jQueryPPG(currentElement).css(mode + '-right', increment);
        break;
      case 40: // down
        jQueryPPG(currentElement).css(mode + '-bottom', increment);
        break;
      case 84: // down
        marginMode = !marginMode;
        break;
      default: return; // exit this handler for other keys
    }
    updateDivStatus();
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  function updateDivStatus() {
    var elem = jQueryPPG(currentElement);
    var html = (marginMode ? 'Margin' : 'Padding') + ' mode enabled. ';
    html += 'Press t to toggle mode. Maintain shift to decrement.<br>';
    html += 'padding: ' + getPropertyShorthand(elem, 'padding') + ';<br>';
    html += 'margin: ' + getPropertyShorthand(elem, 'margin') + ';';
    jQueryPPG(ppgDiv).html(html);

    var resetButton = jQueryPPG('<input type="button" value="Select an ' +
      'element" style="float:right; border: 1px solid #dedede;" />');
    resetButton.click(function () {
      myDomOutline.start();
    });
    ppgDiv.append(resetButton);
  }

  function getPropertyShorthand(elem, property) {
    return elem.css(property + '-top') + ' ' +
      elem.css(property + '-right') + ' ' +
      elem.css(property + '-bottom') + ' ' +
      elem.css(property + '-left');
  }

  var clickHandler = function (element) {
    currentElement = element;
    updateDivStatus();
  };

  var myDomOutline = DomOutline({ onClick: clickHandler});

  myDomOutline.start();
});
