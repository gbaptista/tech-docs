$(document).on('ready page:load', function () {
  var file_to_load = 'pages/' + window.location.hash.replace('#', '') + '.html'

  Handlebars.registerHelper('if', function(conditional, options) {
    if(conditional) {
      return options.fn(this);
    }
  });

  Handlebars.registerHelper('each', function(context, options) {
    var ret = "";
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + options.fn(context[i]);
    }
    return ret;
  });


  $.ajax({
      url: file_to_load,
      dataType: 'text'
  }).done(function(data) {
    $('#temporary-html-render').html(data);

    var file_html = $('#temporary-html-render');

    Handlebars.registerPartial(
      'page-header-partial',
      $("#page-header-partial").html()
    );

    Handlebars.registerPartial(
      'action-panel-partial',
      $("#action-panel-partial").html()
    );

    Handlebars.registerPartial(
      'stage-header-partial',
      $("#stage-header-partial").html()
    );

    $('#container').append(Handlebars.compile(
      '{{> page-header-partial }}')({
        title: $(file_html).find('title').first().text(),
        category: $(file_html).find('category').first().text(),
        back_to_index: tech_docs_l18n[tech_docs_language].back_to_index
      })
    );

    $(file_html).find('stage').each(function(index) {

      var state = this;

      if($(file_html).find('stage').length > 1) {
          var has_more_than_one = true;
        } else {
          var has_more_than_one = false;
        }

      var number = tech_docs_l18n[tech_docs_language].stage_number;
          number = number.replace('{number}', (parseInt(index) + 1));

      var title  = $(state).find('title').first().text();

      $('#container').append(Handlebars.compile(
        '{{> stage-header-partial }}')({
          number:  number,
          title: title,
          has_more_than_one: has_more_than_one
        })
      );

      $('#container').append('<div class="row"></div>');

      $(state).find('action').each(function(index) {

        var action = this;

        if($(state).find('action').length > 1) {
          var has_more_than_one = true;
        } else {
          var has_more_than_one = false;
        }

        var number = tech_docs_l18n[tech_docs_language].action_number;
            number = number.replace('{number}', (parseInt(index) + 1));

        var title       = $(action).find('title').text();
        var description = $(action).find('description').html();
        var code        = $(action).find('> code').text();
        var language    = $(action).find('> code').attr('language');
        var tables      = [];

        $(action).find('table').each(function() {
          tables.push($(this).html())
        });

        var has_tables = false;

        if(tables.length > 0) { has_tables = true; }

        $('#container').find('.row').last().append(Handlebars.compile(
          '{{> action-panel-partial }}')({
            number: number,
            title: title,
            description: description,
            code: code,
            language: language,
            tables: tables,
            has_tables: has_tables,
            has_more_than_one: has_more_than_one
          })
        );
      });

      $('#container').append('<div class="clearfix"></div>');

    });

    $('#temporary-html-render').html('');

    $.each(tech_docs_external_references, function() {
      var external_refence = this;
      $('#container ' + external_refence.tag ).each(function() {

        var result = external_refence.replace_with;
            result = result.replace(/{text}/g, $(this).text());

        $(this).replaceWith(result);
      });
    });

    $('#container code.highlight').each(function() {
      var code_container = this
      var code_source =   $(this).text();

      var white_space_size = 0;

      $.each(code_source.split('\n'), function(row, row_content) {
        var match = /[^\s]/.exec(row_content);
        if(match) {
          white_space_size = match.index;
          return false;
        }
      });

      if(white_space_size > 0) {
        var indented_code = [];

        use_indented_code = true;

        $.each(code_source.split('\n'), function(row, row_content) {

          check_if_has_code = row_content.substring(0, white_space_size);

          if(check_if_has_code.replace(/\s/g, '') != '') {
            use_indented_code = false;
          }

          row_content = row_content.substring(white_space_size);

          indented_code.push(row_content);
        });

        if(use_indented_code) {
          code_source = indented_code.join("\n");
        }
      }

      $(this).html('');

      CodeMirror(code_container, {
        value: $.trim(code_source),
        mode: $(code_container).attr('language'),
        lineNumbers: true,
        theme: 'solarized dark',
        viewportMargin: Infinity
      });
    });
  });
});
