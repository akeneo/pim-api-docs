/**
 * Transform Markdown documentation to HTML
 */
var gulp = require('gulp');
var MarkdownIt = require('markdown-it');
var mdToc = require('markdown-it-toc-and-anchor').default;
var mdEmoji = require('markdown-it-emoji');
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
var concat = require('gulp-concat');
var revReplace = require('gulp-rev-replace');
var swagger = require('gulp-swagger');
var jsonTransform = require('gulp-json-transform');
var _ = require('lodash');
var yaml = require('js-yaml');

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

function getTocMarkdown(isOnePage, pages, currentPage, baseUrl) {
    if(isOnePage){
        return "\n\n:::: toc\n@[toc]\n\n::::\n\n";
    } else {
        return "\n\n:::: toc\n\n" + Object.keys(pages).map(function (page) {
            if (page === currentPage) {
                return '::: preToc ' + pages[page] + "\n:::\n@[toc]\n:::postToc\n:::";
            } else {
                return '::: tocLink [' + pages[page]+ '](' + baseUrl + '/' + page.replace(/\.md$/, '.html') + ")\n:::";
            }
        }).join("\n") + "\n\n::::\n\n";
    }
}

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

function imageTokenOverride(tokens, idx, options, env, self) {
    return '<img class="img-responsive in-article" alt="'+ tokens[idx].content +'" src="'+ tokens[idx].attrs[0][1] + '"/>';
}

var optionsMd = {
    html: true,
    xhtmlOut: true,
    typographer: false,
    linkify: false,
    breaks: false,
    highlight: highlight
};
var md = new MarkdownIt('default', optionsMd);

var glogalOptionsToc = {
    toc: true,
    tocFirstLevel: 2,
    tocLastLevel: 3,
    anchorLink: true,
    anchorLinkSpace: false,
    anchorLinkBefore: true,
    tocClassName: 'nav'
};

md.renderer.rules['image'] = imageTokenOverride;
md.renderer.rules.table_open = function(tokens, idx) {
    return '<table class="table">';
};
md.renderer.rules.heading_open = function(tokens, idx) {
    return '<a class="anchor" id="' + tokens[idx].attrs[0][1] + '"></a>'+
        '<'+tokens[idx].tag+' title-id="' + tokens[idx].attrs[0][1] + '">';
};

md.use(mdEmoji);
md.use(mdToc, glogalOptionsToc);
md.use(require('markdown-it-container'), 'danger', {
    validate: function(params) {
        return params.trim().match(/^danger(.*)$/);
    },
    render: function (tokens, idx) {
        return (tokens[idx].nesting === 1) ? '<div class="alert alert-danger">' : '</div>\n';
    }
});
md.use(require('markdown-it-container'), 'warning', {
    validate: function(params) {
        return params.trim().match(/^warning(.*)$/);
    },
    render: function (tokens, idx) {
        return (tokens[idx].nesting === 1) ? '<div class="alert alert-warning">' : '</div>\n';
    }
});
md.use(require('markdown-it-container'), 'info', {
    validate: function(params) {
        return params.trim().match(/^info(.*)$/);
    },
    render: function (tokens, idx) {
        return (tokens[idx].nesting === 1) ? '<div class="alert alert-info">' : '</div>\n';
    }
});
md.use(require('markdown-it-container'), 'tips', {
    validate: function(params) {
        return params.trim().match(/^tips(.*)$/);
    },
    render: function (tokens, idx) {
        return (tokens[idx].nesting === 1) ? '<div class="alert alert-tips">' : '</div>\n';
    }
});
md.use(require('markdown-it-container'), 'availability', {
    validate: function(params) {
        return params.trim().match(/^availability(.*)$/);
    },
    render: function (tokens, idx) {
        var versionsAndEditions = tokens[idx].info.trim().match(/^availability\sversions=(.*)\seditions=(.*)$/);
        var html = '';
        if(tokens[idx].nesting === 1) {
            var versions = versionsAndEditions[1].split(',');
            html += _.reduce(versions, function(res, version) {
                return res + ' <span class="label label-version">' + version + '</span>';
            }, '<p><em class="small text-primary">Available in the PIM versions:</em>');
            var editions = versionsAndEditions[2].split(',');
            html += _.reduce(editions, function(res, edition) {
                return res + ' <span class="label label-info">' + edition + '</span>';
            }, '<em class="small text-primary">&nbsp;&nbsp;|&nbsp;&nbsp;Available in the PIM editions:</em>');
        } else {
            html = '</p>';
        }
        return html;
    }
});
md.use(require('markdown-it-container'), 'php-client-availability', {
    validate: function(params) {
        return params.trim().match(/^php-client-availability(.*)$/);
    },
    render: function (tokens, idx) {
        var versionsAndEditions = tokens[idx].info.trim().match(/^php-client-availability\sversions=(.*)\seditions=(.*)$/);
        var html = '';
        if(tokens[idx].nesting === 1) {
            var versions = versionsAndEditions[1].split(',');
            html += _.reduce(versions, function(res, version) {
                return res + ' <span class="label label-version">' + version + '</span>';
            }, '<p><em class="small text-primary">Available in the client versions:</em>');
            var editions = versionsAndEditions[2].split(',');
            html += _.reduce(editions, function(res, edition) {
                return res + ' <span class="label label-info">' + edition + '</span>';
            }, '<em class="small text-primary">&nbsp;&nbsp;|&nbsp;&nbsp;Available in the client editions:</em>');
        } else {
            html = '</p>';
        }
        return html;
    }
});
md.use(require('markdown-it-container'), 'toc', {
    validate: function(params) {
        return params.trim().match(/^toc$/);
    },
    render: function (tokens, idx) {
        return (tokens[idx].nesting === 1) ? '<div id="navbar" class="col-sm-3 hidden-xs sticky">' +
        '<nav role="tablist" id="navbar-nav"><ul class="nav nav-stacked" style="counter-increment: step-counter;"><p class="pre-nav events"><img src="/img/icons/icon--swagger.svg"> Events API reference</p>' :
                  "</ul></nav></div>\n";
            }
});
md.use(require('markdown-it-container'), 'preToc', {
    validate: function(params) {
        return params.trim().match(/^preToc .*/);
    },
    render: function (tokens, idx) {
        var text = tokens[idx].info.trim().match(/^preToc (.*)$/);
        return (tokens[idx].nesting === 1) ? '<li class="active"> <a href="#">' + text[1] + '</a>': '';
    }
});
md.use(require('markdown-it-container'), 'postToc', {
    validate: function(params) {
        return params.trim().match(/^postToc$/);
    },
    render: function (tokens, idx) {
        return (tokens[idx].nesting === 1) ? '</li>' : '';
    }
});
md.use(require('markdown-it-container'), 'mainContent', {
    validate: function(params) {
        return params.trim().match(/^mainContent$/);
    },
    render: function (tokens, idx) {
        return (tokens[idx].nesting === 1) ? '<div class="col-xs-12 col-sm-offset-1 col-sm-8">' : '</div>';
    }
});
md.use(require('markdown-it-container'), 'tocLink', {
    validate: function(params) {
        return params.trim().match(/^tocLink\s+(.*)$/);
    },
    render: function (tokens, idx) {
        var linkTitle = tokens[idx].info.trim().match(/^tocLink.*\[(.*)\]\(.*\)$/);
        var link = tokens[idx].info.trim().match(/^tocLink.*\((.*)\)$/);
        return (tokens[idx].nesting === 1) ? '<li><a href="' + md.utils.escapeHtml(link[1]) + '">' + linkTitle[1] + '</a></li>' : '';
    }
});
md.use(require('markdown-it-container'), 'panel-link', {
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

md.use(require("markdown-it-container"), "event_api_reference", {
    validate: function (params) {
        return params.trim().match(/^event_api_reference(.*)$/);
    },
    render: function (tokens, idx) {
        if (tokens[idx].nesting !== 1) {
            return '';
        }
        
        const m = tokens[idx].info.trim().match(/^event_api_reference(.*)$/);
        const referenceFilePath = m[1].trim();

        const data = yaml.safeLoad(
            fs.readFileSync(referenceFilePath, "utf8")
        );

        const template = hbs.compile(
            fs.readFileSync("src/events-reference/reference.handlebars", "utf8")
        );

        return template(data);
    },
});

gulp.task('build-events-reference-page', ['clean-dist','less'], function () {

    var pages = {
        'events-reference-v5': {
            gettingStartedName: 'events-api-reference',
            pimVersion: 'v5',
            title: 'Events API reference',
            image: 'illustrations/illus--v5.svg',
            files: {
                'products-50.md': 'Products',
                'product-models-50.md': 'Product models'
            }
        },
        'events-reference-serenity': {
            gettingStartedName: 'events-api-reference',
            pimVersion: 'Serenity',
            title: 'Events API reference',
            image: 'illustrations/illus--serenity.svg',
            files: {
                'products.md': 'Products',
                'product-models.md': 'Product models'
            }
        }
    };
    var isOnePage = false;

    return gulp.src('content/events-reference/**/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/events-reference/**/*.md')
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages[path.basename(path.dirname(file.path))].files, path.basename(file.path), '/events-reference/' +  path.basename(path.dirname(file.path))) + "\n"))
              .pipe(gulpMarkdownIt(md))
              .pipe(gulp.dest('tmp/events-reference/'))
              .on('end', function () {
                  return gulp.src('src/partials/events-reference.handlebars')
                    .pipe(gulpHandlebars({
                        active_api_reference:  true,
                        title: pages[path.basename(path.dirname(file.path))].title,
                        image: pages[path.basename(path.dirname(file.path))].image,
                        gettingStartedName: pages[path.basename(path.dirname(file.path))].gettingStartedName,
                        pimVersion: pages[path.basename(path.dirname(file.path))].pimVersion,
                        mainContent: fs.readFileSync('tmp/events-reference/' + path.basename(path.dirname(file.path)) + '/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/events-reference/' + path.basename(path.dirname(file.path))));
              })
        }));
  }
);