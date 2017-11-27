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
var revReplace = require('gulp-rev-replace');
var concat = require('gulp-concat');

/**
 * Generate the table of content.
 * @param pages
 * @param currentPage
 *
 * @returns {string}
 */
function getTocMarkdown(pages, currentPage) {
    return "\n\n:::: toc\n@[toc]\n\n::::\n\n";
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

gulp.task('misc-documentation', ['clean-dist','less'], function () {
    var optionsMd = {
        html: true,
        xhtmlOut: true,
        typographer: false,
        linkify: false,
        breaks: false,
        highlight: highlight
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
    });

    var optionsToc = {
        toc: true,
        tocFirstLevel: 1,
        tocLastLevel: 2,
        anchorLink: true,
        anchorLinkSpace: false,
        anchorLinkBefore: true,
        tocClassName: 'nav'
    };
    md.use(mdToc, optionsToc)
        .use(require('markdown-it-container'), 'toc', {
            validate: function(params) {
                return params.trim().match(/^toc$/);
            },
            render: function (tokens, idx) {
                return (tokens[idx].nesting === 1) ? '<div id="navbar" class="col-sm-3 hidden-xs">' +
                    '<nav role="tablist" id="navbar-nav" data-spy="affix" data-offset-top="160"><ul class="nav nav-stacked"><p class="pre-nav">Summary</p>' :
                    '</ul></nav></div>\n';
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
                          '<div class="panel panel-default panel-btn">'+
                          '<a href="' + md.utils.escapeHtml(link[1]) + '">' +
                          '<div class="panel-body">' +
                          '<div class="panel-btn-big">'+ md.utils.escapeHtml(text[1]) + '</div>'+
                          '<p class="text-center">'+ md.utils.escapeHtml(linkTitle[1]) + '</p>';
                } else {
                    // closing tag
                    return '</div></a></div></div></div>\n';
                }
            }
        });

    /*
     * First, concat every resource file into the file resource.md
     * Then, transform the markdown into html and add some custom style.
     * Then, add this generated html into the documentation template.
     * Then, rename the file from "md" to "html".
     * Finally, move the file to dist directory.
     */
    return gulp.src(['content/misc/*.md'])
        .pipe(flatmap(function(stream, file){
            return gulp.src(file.path)
                .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
                .pipe(insert.prepend(getTocMarkdown(path.basename(file.path)) + "\n"))
                .pipe(gulpMarkdownIt(md))
                .pipe(gulp.dest('tmp/misc/'))
                .on('end', function () {
                    return gulp.src('src/partials/misc.handlebars')
                        .pipe(gulpHandlebars({
                            title: 'Documentation',
                            mainContent: fs.readFileSync('tmp/misc/' + path.basename(file.path).replace(/\.md/, '.html'))
                        }, {
                            partialsDirectory: ['./src/partials']
                        }))
                        .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                        .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                        .pipe(gulp.dest('./dist/documentation'));
                });
        }));
    }
);
