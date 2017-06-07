/**
 * Transform Markdown API client documentation to HTML
 */
var gulp = require('gulp');
var MarkdownIt = require('markdown-it');
var mdToc = require('markdown-it-toc-and-anchor').default;
var flatmap = require('gulp-flatmap');
var insert = require('gulp-insert');
var path = require('path');
var gulpMarkdownIt = require('gulp-markdown-it-adapter');
var highlightJs = require('highlightjs');
var hbs = require('handlebars');
var gulpHandlebars = require('gulp-handlebars-html')(hbs);
var fs = require('fs');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var remoteSrc = require('gulp-remote-src');

/**
 * Generate the table of content.
 * @param pages
 * @param currentPage
 *
 * @returns {string}
 */
function getTocMarkdown(pages, currentPage) {
    return "\n\n:::: toc\n\n" + Object.keys(pages).map(function (page) {
          if (page === currentPage) {
              return '::: preToc ' + pages[page] + "\n:::\n@[toc]\n:::postToc\n:::";
          } else {
              return '::: tocLink [' + pages[page]+ '](/php-client/' + page.replace(/\.md$/, '.html') + ")\n:::";
          }
      }).join("\n") + "\n\n::::\n\n";
}

/**
 * Highlight code snippet according to the language specified in the markdown.
 *
 * @param str
 * @param lang
 * @returns {string}
 */
function highlight(str, lang) {
    if (lang && highlightJs.getLanguage(lang)) {
        try {
            return '<pre class="hljs"><code>' +
                highlightJs.highlight(lang, str, true).value +
                '</code></pre>';
        } catch (__) {}
    }
    return '<pre class="hljs"><code>' + str + '</code></pre>';
}

gulp.task('client-documentation', ['clean-dist'], function () {
    var optionsMd = {
        html: true,
        xhtmlOut: true,
        typographer: false,
        linkify: false,
        breaks: false,
        highlight: highlight
    };
    var optionsToc = {
        toc: true,
        tocFirstLevel: 2,
        tocLastLevel: 3,
        anchorLink: true,
        anchorLinkSpace: false,
        anchorLinkBefore: true,
        tocClassName: 'nav'
    };

    var md = new MarkdownIt('default', optionsMd);

    function imageTokenOverride(tokens, idx, options, env, self) {
        return '<img class="img-responsive" alt="'+ tokens[idx].content +'" src="'+ tokens[idx].attrs[0][1] + '"/>';
    }
    md.renderer.rules['image'] = imageTokenOverride;
    md.renderer.rules.table_open = function(tokens, idx) {
        return '<table class="table">';
    };
    md.renderer.rules.heading_open = function(tokens, idx) {
        return '<a class="anchor" id="' + tokens[idx].attrs[0][1] + '"></a>'+
            '<'+tokens[idx].tag+' title-id="' + tokens[idx].attrs[0][1] + '">';
    };

    md.use(require('markdown-it-container'), 'danger', {
        validate: function(params) {
            return params.trim().match(/^danger(.*)$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div class="alert alert-danger">' : '</div>\n';
        }
    })
    .use(require('markdown-it-container'), 'warning', {
        validate: function(params) {
            return params.trim().match(/^warning(.*)$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div class="alert alert-warning">' : '</div>\n';
        }
    })
    .use(require('markdown-it-container'), 'info', {
        validate: function(params) {
            return params.trim().match(/^info(.*)$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div class="alert alert-info">' : '</div>\n';
        }
    })
    .use(require('markdown-it-container'), 'dodont', {
        validate: function(params) {
            return params.trim().match(/^dodont(.*)$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div class="row">' :
                '</div>\n';
        }
    })
    .use(require('markdown-it-container'), 'dont', {
        validate: function(params) {
            return params.trim().match(/^dont(.*)$/);
        },
        render: function (tokens, idx) {
            var text = tokens[idx].info.trim().match(/^dont\s+(.*).*$/);
            return (tokens[idx].nesting === 1) ?
            '<div class="col-xs-6">'+
            '<div class="panel panel-danger" data-text="' +  md.utils.escapeHtml(text[1]) + '">'+
            '<div class="panel-body">' :
                '<strong>DON\'T</strong></div>\n</div>\n</div>\n';
        }
    })
    .use(require('markdown-it-container'), 'do', {
        validate: function(params) {
            return params.trim().match(/^do(.*)$/);
        },
        render: function (tokens, idx) {
            var text = tokens[idx].info.trim().match(/^do\s+(.*).*$/);
            return (tokens[idx].nesting === 1) ?
            '<div class="col-xs-6">'+
            '<div class="panel panel-success" data-text="' +  md.utils.escapeHtml(text[1]) + '">'+
            '<div class="panel-body">' :
                '<strong>DO</strong></div>\n</div>\n</div>\n';
        }
    });

    md.use(mdToc, optionsToc)
    .use(require('markdown-it-container'), 'toc', {
        validate: function(params) {
            return params.trim().match(/^toc$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div id="navbar" class="col-sm-3 hidden-xs">' +
            '<nav role="tablist" id="navbar-nav" data-spy="affix" data-offset-top="80" class="affix-top"><ul class="nav nav-stacked">' :
                "</ul></nav></div>\n";
        }
    })
    .use(require('markdown-it-container'), 'preToc', {
        validate: function(params) {
            return params.trim().match(/^preToc .*/);
        },
        render: function (tokens, idx) {
            var text = tokens[idx].info.trim().match(/^preToc (.*)$/);
            return (tokens[idx].nesting === 1) ? '<li class="active"><a href="#">' + text[1] + '</a>': '';
        }
    })
    .use(require('markdown-it-container'), 'postToc', {
        validate: function(params) {
            return params.trim().match(/^postToc$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '</li>' : '';
        }
    })
    .use(require('markdown-it-container'), 'mainContent', {
        validate: function(params) {
            return params.trim().match(/^mainContent$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div class="col-xs-12 col-sm-9">' : '</div>';
        }
    })
    .use(require('markdown-it-container'), 'tocLink', {
        validate: function(params) {
            return params.trim().match(/^tocLink\s+(.*)$/);
        },
        render: function (tokens, idx) {
            var linkTitle = tokens[idx].info.trim().match(/^tocLink.*\[(.*)\]\(.*\)$/);
            var link = tokens[idx].info.trim().match(/^tocLink.*\((.*)\)$/);
            return (tokens[idx].nesting === 1) ? '<li><a href="' + md.utils.escapeHtml(link[1]) + '">' + linkTitle[1] + '</a></li>' : '';
        }
    })

    .use(require('markdown-it-container'), 'panel-link', {
        validate: function(params) {
            return params.trim().match(/^panel-link\s+(.*)$/);
        },
        render: function (tokens, idx) {
            var text = tokens[idx].info.trim().match(/^panel-link\s+(.*)\[.*\].*$/);
            var linkTitle = tokens[idx].info.trim().match(/^panel-link\s+.*\[(.*)\].*$/);
            var link = tokens[idx].info.trim().match(/^panel-link\s+.*\((.*)\)$/);
            if (tokens[idx].nesting === 1) {
                // opening tag
                return '<div class="row" style="margin-top: 80px;"><div class="col-sm-offset-3 col-sm-6">' +
                    '<div class="panel panel-default panel-landing-page panel-clickable">'+
                    '<a href="' + md.utils.escapeHtml(link[1]) + '">' +
                    '<div class="panel-body">' +
                    '<p>'+ md.utils.escapeHtml(text[1]) + '</p>'+
                    '<p>'+ md.utils.escapeHtml(linkTitle[1]) + '</p>';
            } else {
                // closing tag
                return '</div></a></div></div></div>\n';
            }
        }
    });

    var pages = {
        'getting-started.md': 'Getting started',
        'category.md': 'Categories',
    };

    /*
     * First, download the getting started from Github in temporary directory and rename as getting started.
     * Then, transform the markdown into html and add some custom style.
     * Then, add this generated html into the documentation template.
     * Then, rename the file from "md" to "html".
     * Finally, move the file to dist directory.
     */
    return remoteSrc(['README.md'], {
            base: 'https://raw.githubusercontent.com/akeneo/php-api-client/master/'
        })
        .pipe(rename('getting-started.md'))
        .pipe(gulp.dest('./tmp/php-client-github'))
        .on('end', function () {
            return gulp.src(['content/php-client/*.md', 'tmp/php-client-github/*.md'])
                .pipe(flatmap(function(stream, file){
                    return gulp.src(file.path)
                        .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
                        .pipe(insert.prepend(getTocMarkdown(pages, path.basename(file.path)) + "\n"))
                        .pipe(gulpMarkdownIt(md))
                        .pipe(gulp.dest('tmp/php-client'))
                        .on('end', function () {
                            return gulp.src('src/documentation.handlebars')
                                .pipe(gulpHandlebars({
                                    active_client_documentation: true,
                                    mainContent: fs.readFileSync('tmp/php-client/' + path.basename(file.path).replace(/\.md/, '.html'))
                                }, {
                                    partialsDirectory: ['./src/partials']
                                }))
                                .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                                .pipe(gulp.dest('./dist/php-client'));
                        })
                }));
        });
    }
);
