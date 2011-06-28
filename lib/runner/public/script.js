(function() {
  $(document).ready(function() {
    var counts = { successful_step: 0, failed_step: 0, pending_step: 0,
                   skipped_step: 0, unimplemented_step: 0 };
    var socket = new io.Socket();
    var templates = ['feature', 'scenario', 'step',
      'step_template', 'failed_step_error_message'];

    var cachedTemplates = {};
    var backgroundSteps = {};
    var tags = [];
    var unimplementedSteps = [];

    var currentTag;
    var runType;

    templates.forEach(function(template) {
      cachedTemplates[template] = $('#templates .' + template).html();
    });
    $('#templates').remove();

    function autocompleteTags() {
      $('input#tagsAC').smartAutoComplete({
        source: tags, forceSelect: true, typeAhead: true
      });
      $('input#tagsAC').bind({
        itemSelect: function(e) {
          var tag = e.smartAutocompleteData.item.innerText;
          socket.send({ key: 'run tag', tag: tag });
          currentTag = tag;
          showView("#features");
        }
      });
    };

    function createStep(templateClass, obj) {
      var backgroundStepClass = '#features .' + obj.val.feature +
        ' #background #backgroundSteps';
      var stepClass = '#features .' + obj.val.feature +
        ' .scenarios #' + obj.val.scenario;

      stepClass += obj.val.exampleClass ?
        ' #' + obj.val.exampleClass + ' .steps' : ' .steps';
      obj.stepId = templateClass;

      if (obj.val.isBackground &&
          !_(backgroundSteps[obj.val.feature]).include(obj.val.lineno)) {
        backgroundSteps[obj.val.feature].push(obj.val.lineno);
        $(backgroundStepClass).append(tmpl('step', obj));
      } else if (!obj.val.isBackground) {
        $(stepClass).append(tmpl('step', obj));
      }
    };

    function increaseCountOf(countClass) {
      counts[countClass] += 1;
      $('#key .' + countClass + ' .count').html(counts[countClass]);
    };

    function resetCounters() {
      counts = { successful_step: 0, failed_step: 0, pending_step: 0,
                 skipped_step: 0, unimplemented_step: 0 };
      _(counts).each(function(val, key) {
        $('#key .' + key + ' .count').html(counts[key]);
      });
    };

    function resetFeatures() {
      unimplementedSteps = [];
      backgroundSteps = {};
      resetCounters();
      $("#features").empty();
      $("#steps_to_implement .steps").empty();
      $("#steps_to_implement .message").show();
      $("#failed_steps .steps").empty();
      $("#failed_steps .message").show();
    };

    function showView(divToShow) {
      var divs = "#features, #steps_to_implement, #failed_steps";
      $(divs).hide();
      $(divToShow).show();
    };

    function tmpl(tmpl, payload) {
      var template = doU.template(cachedTemplates[tmpl]);
      return template(payload);
    };

    socket.connect();
    socket.send({ key: 'refresh' });
    socket.on('connect', function(){});
    socket.on('message', function(obj) {
      console.log(obj);
      switch(obj.key) {
      case 'run features':
        tags = [];
        runType = 'all';
        resetFeatures();
        break;
      case 'run tag':
        runType = 'tag';
        resetFeatures();
        break;
      case 'feature':
        if (obj.tag && runType === 'all') {
          tags.push(obj.tag.replace('@',''));
          tags = _.uniq(tags);
          autocompleteTags();
        }
        backgroundSteps[obj.val.class] = [];
        $('#features').append(tmpl('feature', obj));
        break;
      case 'scenario':
        if (obj.val.tag && runType === 'all') {
          tags.push(obj.val.tag.replace('@',''));
          tags = _.uniq(tags);
          autocompleteTags();
        }
        var stepClass = '#features .' + obj.val.feature +
          ' .scenarios';
        if (obj.val.isOutline) {
          if ($(stepClass + ' #' + obj.val.class).length === 0)
            $(stepClass).append(tmpl('scenario', obj));
          $(stepClass + ' #' + obj.val.class + ' .examples').append(
            '<div class="example" id=' + obj.val.exampleClass + '>' +
            '<div class="steps"></div></div>');
        } else {
          $(stepClass).append(tmpl('scenario', obj));
        }
        break;
      case 'successful step':
        increaseCountOf('successful_step');
        createStep('successful_step', obj);
        break;
      case 'failed step':
        createStep('failed_step', obj);
        $("#failed_steps .message").hide();
        if (obj.val.showError) {
          increaseCountOf('failed_step');
          $('#failed_steps .steps').append(
            tmpl('failed_step_error_message', obj));
        }
        break;
      case 'pending step':
        increaseCountOf('pending_step');
        createStep('pending_step', obj);
        break;
      case 'skipped step':
        increaseCountOf('skipped_step');
        createStep('skipped_step', obj);
        break;
      case 'unimplemented step':
        $("#steps_to_implement .message").hide();
        createStep('unimplemented_step', obj);
        if (!_(unimplementedSteps).include(obj.val.pattern)) {
          increaseCountOf('unimplemented_step');
          $('#steps_to_implement .steps').append(tmpl('step_template', obj));
        }
        unimplementedSteps.push(obj.val.pattern);
        break;
      };
    });
    socket.on('disconnect', function() {});

    $(window).jkey("shift+t",function() {
      $('html, body').animate({ scrollTop: 0 }, 'fast');
      $('input#tagsAC').focus();
      autocompleteTags();
    });

    $(window).jkey("shift+h",function() {
      $("#help").modal({
        minHeight: 150,
        overlayClose: true,
        onClose: function(dialog) {
          dialog.data.fadeOut('fast', function () {
          dialog.container.slideUp('fast', function () {
          dialog.overlay.fadeOut('fast', function () {
            $.modal.close();
          });});});
        }
      });
    });

    $(window).jkey("shift+r",function() {
      showView("#features");
      var transportObj = { key: 'refresh' };
      if (currentTag) transportObj.tag = currentTag;
      socket.send(transportObj);
    });

    $(window).jkey("shift+l",function() {
      showView("#features");
      currentTag = null;
      $('input#tagsAC').val('');
      $('input#tagsAC').blur();
      socket.send({ key: 'rerun all features' });
    });

    $(window).jkey("shift+a",function() {
      showView("#features");
    });

    $(window).jkey("shift+u",function() {
      showView("#steps_to_implement");
    });

    $(window).jkey("shift+f",function() {
      showView("#failed_steps");
    });

  });
})();
