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
md.use(require('markdown-it-container'), 'version-screenshots', {
    validate: function(params) {
        return params.trim().match(/^version-screenshots(.*)$/);
    },
    render: function (tokens, idx) {
        var id = tokens[idx].info.trim().match(/^version-screenshots\sid="(.*)"\s2\.x.*\s1\.7.*$/);
        var source_v2x = tokens[idx].info.trim().match(/^version-screenshots\sid=".*"\s2\.x(.*)\s1\.7.*$/);
        var source_v17 = tokens[idx].info.trim().match(/^version-screenshots\sid=".*"\s2\.x.*\s1\.7(.*)$/);
        return (tokens[idx].nesting === 1) ? '<div>' +
                    '<ul class="nav nav-tabs nav-tabs-versions" role="tablist">' +
                        '<li role="presentation" class="active"><a href="#v2_' + id[1] + '" aria-controls="v2_' + id[1] + '" role="tab" data-toggle="tab">Since v2</a></li>' +
                        '<li role="presentation"><a href="#v17_' + id[1] + '" aria-controls="v17_' + id[1] + '" role="tab" data-toggle="tab">v1.7</a></li>' +
                    '</ul>' +
                    '<div class="panel panel-default">' +
                        '<div class="panel-body">' +
                            '<div class="row tab-content">'+
                                '<div role="tabpanel" class="col-xs-12 tab-pane active" id="v2_' + id[1] + '">' + md.render(source_v2x[1]) + '</div>' +
                                '<div role="tabpanel" class="col-xs-12 tab-pane" id="v17_' + id[1] + '">' + md.render(source_v17[1]) + '</div>'
                         : '</div>\n</div>\n</div>\n</div>\n';
    }
});
md.use(require('markdown-it-container'), 'toc', {
    validate: function(params) {
        return params.trim().match(/^toc$/);
    },
    render: function (tokens, idx) {
        return (tokens[idx].nesting === 1) ? '<div id="navbar" class="col-sm-3 hidden-xs sticky">' +
        '<nav role="tablist" id="navbar-nav"><ul class="nav nav-stacked" style="counter-increment: step-counter;"><p class="pre-nav">Summary</p>' :
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


gulp.task('build-getting-started', ['clean-dist','less'], function () {

    var pages = {
        'your-first-tutorial-4x': {
            gettingStartedName: 'your-first-tutorial',
            pimVersion: 'v4 / v5 / SaaS',
            title: 'Your very first tutorial',
            image: 'illustrations/illus--v4.svg',
            files: {
                'welcome.md': 'Welcome',
                'step-1.md': 'Step 1 | Create a Connection',
                'step-2.md': 'Step 2 | Set up Postman',
                'step-3.md': 'Step 3 | Make the REST API request'
            },
            availability: {
                serenity: "4x",
                v5: "4x",
                v4: "4x",
                old: "old"
            }
        },
        'your-first-tutorial-old': {
            gettingStartedName: 'your-first-tutorial',
            pimVersion: 'v1.7 / v2 / v3',
            title: 'Your very first tutorial',
            image: 'illustrations/illus--old-versions.svg',
            files: {
                'welcome.md': 'Welcome',
                'step-1.md': 'Step 1 | Generate the credentials',
                'step-2.md': 'Step 2 | Set up Postman',
                'step-3.md': 'Step 3 | Make the REST API request'
            },
            availability: {
                serenity: "4x",
                v5: "4x",
                v4: "4x",
                old: "old"
            }
        },
        'connect-the-pim-4x': {
            gettingStartedName: 'connect-the-pim',
            pimVersion: 'v4 / v5 / SaaS',
            title: 'The "Connect the PIM" tutorial',
            image: 'illustrations/illus--v4.svg',
            files: {
                'welcome.md': 'Welcome',
                'step-1.md': 'Step 1 | Create a Connection',
                'step-2.md': 'Step 2 | Cook your connector',
                'step-3.md': 'Step 3 | Identify your connector in the PIM'
            },
            availability: {
                serenity: "4x",
                v5: "4x",
                v4: "4x",
                old: "old"
            }
        },
        'connect-the-pim-old': {
            gettingStartedName: 'connect-the-pim',
            pimVersion: 'v1.7 / v2 / v3',
            title: 'The "Connect the PIM" tutorial',
            image: 'illustrations/illus--v4.svg',
            files: {
                'welcome.md': 'Welcome',
                'step-1.md': 'Step 1 | Cook your connector',
                'step-2.md': 'Step 2 | Generate the credentials',
                'step-3.md': 'Step 3 | Configure your connector'
            },
            availability: {
                serenity: "4x",
                v5: "4x",
                v4: "4x",
                old: "old"
            }
        },
        'quick-start-my-first-webhook-5x': {
            gettingStartedName: 'quick-start-my-first-webhook',
            pimVersion: 'v5 / SaaS',
            title: 'Quick start my first webhook',
            files: {
                'welcome.md': 'Welcome',
                'step-1.md': 'Step 1 | Receive my first set of data',
                'step-2.md': 'Step 2 | Create your own Symfony app to display event subscriptions data'
            },
            availability: {
                serenity: "5x",
                v5: "5x"
            }
        },
        'events-api-best-practices-5x': {
            gettingStartedName: 'events-api-best-practices',
            pimVersion: 'v5 / SaaS',
            title: 'Events API best practices',
            files: {
                'welcome.md': 'Best practices',
            },
            availability: {
                serenity: "5x",
                v5: "5x"
            }
        }
    };
    var isOnePage = false;

    return gulp.src('content/getting-started/**/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/getting-started/**/*.md')
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages[path.basename(path.dirname(file.path))].files, path.basename(file.path), '/getting-started/' +  path.basename(path.dirname(file.path))) + "\n"))
              .pipe(gulpMarkdownIt(md))
              .pipe(gulp.dest('tmp/getting-started/'))
              .on('end', function () {
                  return gulp.src('src/partials/getting-started.handlebars')
                    .pipe(gulpHandlebars({
                        active_guides:  true,
                        title: pages[path.basename(path.dirname(file.path))].title,
                        image: pages[path.basename(path.dirname(file.path))].image,
                        gettingStartedName: pages[path.basename(path.dirname(file.path))].gettingStartedName,
                        pimVersion: pages[path.basename(path.dirname(file.path))].pimVersion,
                        availability: pages[path.basename(path.dirname(file.path))].availability,
                        mainContent: fs.readFileSync('tmp/getting-started/' + path.basename(path.dirname(file.path)) + '/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/getting-started/' + path.basename(path.dirname(file.path))));
              })
        }));
  }
);

gulp.task('build-guides', ['clean-dist','less'], function () {

    var pages = {
        'dam-connection': {
            title: 'The complete guide to connect a DAM to your PIM',
            files: {
                'introduction.md': 'Introduction',
                'pre-requisites.md': 'Structure your DAM and your PIM',
                'technical-stack.md': 'Define your technical stack',
                'synchronize-assets.md': 'Dive into the synchronisation',
                'glossary.md': 'Glossary'
            }
        },
        'ecommerce-connection': {
            title: 'The complete guide to connect Akeneo PIM to your eCommerce solution',
            files: {
                'introduction.md': 'Introduction',
                'step0-who-is-your-connector-for.md': 'Who is your connector for?',
                'step1-who-does-what.md': 'Who does what?',
                'step2-understand-akeneo-pim.md': 'Understand Akeneo PIM data',
                'step3-reconcile-PIM-data-with-eCommerce-data.md': 'Reconcile PIM data with eCommerce data',
                'step4-define-your-first-scope.md': 'Define the first scope of your connector'
            }
        },
        'translation-connection': {
            title: 'The complete guide to connect Akeneo PIM to your online translation solution',
            files: {
                'introduction.md': 'Introduction',
                'step1-who-is-your-connector-for.md': 'Who is your connector for?',
                'step2-understand-akeneo-pim.md': 'Understand Akeneo PIM data',
                'step3-how-to-build-your-connector.md': 'How to build your connector?',
                'step4-known-limits.md': 'Known limits'
            }
        },
        'erp-connection': {
            title: 'The complete guide to connect your ERP solution to Akeneo PIM',
            files: {
                'introduction.md': 'Introduction',
                'step1-who-is-your-connector-for.md': 'Who is your connector for?',
                'step2-analyze-erp-data.md': 'Analyze your ERP data',
                'step3-understand-akeneo-pim.md': 'Understand Akeneo PIM',
                'step4-how-to-build-your-connector.md': 'How to build your connector'
            }
        },
        'syndication-connection': {
            title: 'The complete guide to connect Akeneo PIM to your syndication solution',
            files: {
              'introduction.md': 'Introduction',
              'step0-who-is-your-connector-for.md': 'Who is your connector for?',
              'step1-who-does-what.md': 'Who does what?',
              'step2-understand-akeneo-pim.md': 'Understand Akeneo PIM data',
              'step3-define-your-first-scope.md': 'How to build your connector'
            }
        },
        'print-connection': {
            title: 'A high-level guide to connecting Akeneo PIM to your print solution',
            files: {
              'introduction.md': 'Introduction',
              'step0-who-is-your-connector-for.md': 'Who is your connector for?',
              'step1-who-does-what.md': 'Who does what?',
              'step2-understand-akeneo-pim.md': 'Understand Akeneo PIM data',
              'step3-reconcile-PIM-data-with-print-features.md': 'Reconcile PIM data with print capabilities',
              'step4-define-your-first-scope.md': 'How to build your connector'
            }
        }
    };

    var isOnePage = false;

    return gulp.src('content/guides/**/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/guides/**/*.md')
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages[path.basename(path.dirname(file.path))].files, path.basename(file.path), '/guides/' + path.basename(path.dirname(file.path))) + "\n"))
              .pipe(gulpMarkdownIt(md))
              .pipe(gulp.dest('tmp/guides/'))
              .on('end', function () {
                  return gulp.src('src/partials/documentation.handlebars')
                    .pipe(gulpHandlebars({
                        active_guides: true,
                        title: pages[path.basename(path.dirname(file.path))].title,
                        mainContent: fs.readFileSync('tmp/guides/' + path.basename(path.dirname(file.path)) + '/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/guides/' + path.basename(path.dirname(file.path))));
              })
        }));
  }
);

gulp.task('build-rest-api', ['clean-dist','less'], function () {

    var pages = {
        'why-the-api.md': "Why the REST API?",
        'overview.md': 'Overview',
        'authentication.md': 'Authentication',
        'permissions.md': 'Permissions',
        'responses.md': 'Response codes',
        'pagination.md': 'Pagination',
        'update.md': 'Update behavior',
        'filter.md': 'Filters',
        'troubleshooting.md': 'Troubleshooting guide'
    };

    var isOnePage = false;

    return gulp.src('content/rest-api/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/rest-api/*.md')
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/documentation') + "\n"))
              .pipe(gulpMarkdownIt(md))
              .pipe(gulp.dest('tmp/documentation/'))
              .on('end', function () {
                  return gulp.src('src/partials/documentation.handlebars')
                    .pipe(gulpHandlebars({
                        active_documentation:  true,
                        title: 'The REST API basics',
                        mainContent: fs.readFileSync('tmp/documentation/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/documentation'));
              })
        }));
  }
);

gulp.task('build-events-api', ['clean-dist','less'], function () {

    var pages = {
        'introduction.md': 'Introduction',
        'overview.md': 'Overview',
        'subscription.md': 'Subscribe and receive events',
        'security.md': 'Security',
        'limits-and-scalability.md': 'Limits and scalibility',
        'more-about-events.md': 'More about events'
    };

    var isOnePage = false;

    return gulp.src('content/events-api/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/events-api/*.md')
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/events-documentation') + "\n"))
              .pipe(gulpMarkdownIt(md))
              .pipe(gulp.dest('tmp/events-documentation/'))
              .on('end', function () {
                  return gulp.src('src/partials/events-documentation.handlebars')
                    .pipe(gulpHandlebars({
                        active_documentation:  true,
                        title: 'The Events API basics',
                        mainContent: fs.readFileSync('tmp/events-documentation/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/events-documentation'));
              })
        }));
  }
);

gulp.task('build-apps', ['clean-dist','less'], function () {
    var pages = {
        'introduction.md': 'What\'s an App ?',
        'using-oauth2.md': 'Using OAuth 2.0 to connect an App',
        'create-app.md': 'Create an App',
    };

    var isOnePage = false;

    return gulp.src('content/apps/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/apps/*.md')
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/apps') + "\n"))
              .pipe(gulpMarkdownIt(md))
              .pipe(gulp.dest('tmp/apps/'))
              .on('end', function () {
                  return gulp.src('src/partials/apps.handlebars')
                    .pipe(gulpHandlebars({
                        active_documentation:  true,
                        title: 'The Apps',
                        mainContent: fs.readFileSync('tmp/apps/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/apps'));
              })
        }));
  }
);

gulp.task('build-concepts', ['clean-dist','less'], function () {

    var pages = {
        'products.md': 'Products',
        'catalog-structure.md': 'Catalog structure',
        'target-market-settings.md': 'Target market settings',
        'reference-entities.md': 'Reference entities',
        'asset-manager.md': 'Asset Manager',
        'pam.md': 'PAM <em>- Deprecated</em>'
    };

    var isOnePage = false;

    return gulp.src('content/concepts/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/concepts/*.md')
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/concepts') + "\n"))
              .pipe(gulpMarkdownIt(md))
              .pipe(gulp.dest('tmp/concepts/'))
              .on('end', function () {
                  return gulp.src('src/partials/documentation.handlebars')
                    .pipe(gulpHandlebars({
                        active_documentation:  true,
                        title: 'Concepts & resources',
                        mainContent: fs.readFileSync('tmp/concepts/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/concepts'));
              })
        }));
  }
);

gulp.task('create-products-md', function () {
    return gulp.src(['content/php-client/resources/products/products.md','content/php-client/resources/products/product-models.md','content/php-client/resources/products/*.md'])
        .pipe(concat('products.md'))
        .pipe(insert.prepend('## Products\n'))
        .pipe(gulp.dest('tmp/php-client-resources/'));
});
gulp.task('create-catalog-structure-md', function () {
    return gulp.src(['content/php-client/resources/catalog-structure/*.md'])
        .pipe(concat('catalog-structure.md'))
        .pipe(insert.prepend('## Catalog structure\n'))
        .pipe(gulp.dest('tmp/php-client-resources/'));
});
gulp.task('create-target-market-settings-md', function () {
    return gulp.src(['content/php-client/resources/target-market-settings/*.md'])
        .pipe(concat('target-market-settings.md'))
        .pipe(insert.prepend('## Target market settings\n'))
        .pipe(gulp.dest('tmp/php-client-resources/'));
});
gulp.task('create-PAM-md', function () {
    return gulp.src(['content/php-client/resources/PAM/*.md'])
        .pipe(concat('PAM.md'))
        .pipe(insert.prepend('## PAM <em>- Deprecated</em>\n'))
        .pipe(gulp.dest('tmp/php-client-resources/'));
});
gulp.task('create-reference-entity-md', function () {
    return gulp.src(['content/php-client/resources/reference-entity/reference-entities.md', 'content/php-client/resources/reference-entity/*.md'])
        .pipe(concat('reference-entity.md'))
        .pipe(insert.prepend('## Reference entities\n'))
        .pipe(gulp.dest('tmp/php-client-resources/'));
});
gulp.task('create-asset-manager-md', function () {
    return gulp.src(['content/php-client/resources/asset-manager/assets.md', 'content/php-client/resources/asset-manager/*.md'])
        .pipe(concat('asset-manager.md'))
        .pipe(insert.prepend('## Asset Manager\n'))
        .pipe(gulp.dest('tmp/php-client-resources/'));
});
gulp.task('create-resources-md', ['create-products-md','create-catalog-structure-md', 'create-target-market-settings-md', 'create-PAM-md', 'create-reference-entity-md', 'create-asset-manager-md'], function () {
    return gulp.src(['tmp/php-client-resources/products.md',
                    'tmp/php-client-resources/catalog-structure.md',
                    'tmp/php-client-resources/target-market-settings.md',
                    'tmp/php-client-resources/asset-manager.md',
                    'tmp/php-client-resources/PAM.md',
                    'tmp/php-client-resources/reference-entity.md'])
        .pipe(concat('resources.md'))
        .pipe(insert.prepend('# Resources\n'))
        .pipe(gulp.dest('tmp/php-client'));
});

gulp.task('build-php-client', ['clean-dist','less', 'create-resources-md'], function () {

    var pages = {
        'getting-started.md': 'Getting started',
        'authentication.md': 'Authentication',
        'exception.md': 'Exception handling',
        'http-client.md': 'HTTP client abstraction',
        'list-resources.md': 'List resources',
        'resources.md': 'Resources'
    };


    var isOnePage = false;

    return gulp.src(['content/php-client/*.md', 'tmp/php-client/resources.md'])
        .pipe(flatmap(function(stream, file){
        return gulp.src(file.path)
            .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
            .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/php-client') + "\n"))
            .pipe(gulpMarkdownIt(md))
            .pipe(gulp.dest('tmp/php-client'))
            .on('end', function () {
                return gulp.src('src/partials/documentation.handlebars')
                    .pipe(gulpHandlebars({
                        active_documentation: true,
                        title: 'PHP API Client documentation',
                        image: 'illustrations/illus--php-client.svg',
                        mainContent: fs.readFileSync('tmp/php-client/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/php-client'));
            })
    }));
});

gulp.task('build-misc-documentation', ['clean-dist','less'], function () {

    var isOnePage = true;

    return gulp.src(['content/misc/*.md'])
        .pipe(flatmap(function(stream, file){
            return gulp.src(file.path)
                .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
                .pipe(insert.prepend(getTocMarkdown(isOnePage, path.basename(file.path)) + "\n"))
                .pipe(gulpMarkdownIt(md))
                .pipe(gulp.dest('tmp/misc/'))
                .on('end', function () {
                    return gulp.src('src/partials/misc.handlebars')
                        .pipe(gulpHandlebars({
                            active_documentation: true,
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
