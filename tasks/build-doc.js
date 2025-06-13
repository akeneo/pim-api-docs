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
var Prism = require('prismjs');
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
var titleDescription = require('../title-description.json')

const loadLanguages = require('prismjs/components/');
loadLanguages(['php','javascript','python', 'java', 'shell', 'json', 'graphql']);

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

function highlightGt(str, lang) {
    if (lang && lang in Prism.languages) {
        try {
            return Prism.highlight(str, Prism.languages[lang], lang);
        } catch (__) {}
    }
    return '<pre><code class="language-markup">' + str + '</code></pre>';
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

var optionsMdGt = {
    html: true,
    xhtmlOut: true,
    typographer: false,
    linkify: false,
    breaks: false,
    highlight: highlightGt
};

var md = new MarkdownIt('default', optionsMd);
var mdGt = new MarkdownIt('default', optionsMdGt);

var glogalOptionsToc = {
    toc: true,
    tocFirstLevel: 2,
    tocLastLevel: 3,
    anchorLink: true,
    anchorLinkSpace: false,
    anchorLinkBefore: true,
    tocClassName: 'nav'
};

initMd(md);
initMd(mdGt);
function initMd(markdown) {
    markdown.renderer.rules['image'] = imageTokenOverride;
    markdown.renderer.rules.table_open = function(tokens, idx) {
        return '<table class="table">';
    };
    markdown.renderer.rules.heading_open = function(tokens, idx) {
        return '<a class="anchor" id="' + tokens[idx].attrs[0][1] + '"></a>'+
            '<'+tokens[idx].tag+' title-id="' + tokens[idx].attrs[0][1] + '">';
    };

    markdown.use(mdEmoji);
    markdown.use(mdToc, glogalOptionsToc);
    markdown.use(require('markdown-it-container'), 'danger', {
        validate: function(params) {
            return params.trim().match(/^danger(.*)$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div class="alert alert-danger">' : '</div>\n';
        }
    });
    markdown.use(require('markdown-it-container'), 'warning', {
        validate: function(params) {
            return params.trim().match(/^warning(.*)$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div class="alert alert-warning">' : '</div>\n';
        }
    });
    markdown.use(require('markdown-it-container'), 'info', {
        validate: function(params) {
            return params.trim().match(/^info(.*)$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div class="alert alert-info">' : '</div>\n';
        }
    });
    markdown.use(require('markdown-it-container'), 'tips', {
        validate: function(params) {
            return params.trim().match(/^tips(.*)$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div class="alert alert-tips">' : '</div>\n';
        }
    });
    markdown.use(require('markdown-it-container'), 'availability', {
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
    markdown.use(require('markdown-it-container'), 'php-client-availability', {
        validate: function(params) {
            return params.trim().match(/^php-client-availability(.*)$/);
        },
        render: function (tokens, idx) {
            let html = '';
            if(tokens[idx].nesting === 1) {
                const matchedAllVersions = tokens[idx].info.trim().match(/^php-client-availability.*all-versions(\s|$)/);
                if (matchedAllVersions !== null) {
                    html += '<p><em class="small text-primary">Available in all client versions</em>';
                }
                const matchedVersions = tokens[idx].info.trim().match(/^php-client-availability.*versions=(.*?)(\s|$)/);
                if (matchedVersions !== null) {
                    const versions = matchedVersions[1].split(',');
                    html += _.reduce(versions, function(res, version) {
                        return res + ' <span class="label label-version">' + version + '</span>';
                    }, '<p><em class="small text-primary">Available since client version:</em>');
                }
                const matchedEE = tokens[idx].info.trim().match(/^php-client-availability.*ee-only(\s|$)/);
                if (matchedEE !== null) {
                    html += '<em class="small text-primary">&nbsp;&nbsp;|&nbsp;&nbsp;Only available for PIM </em><span class="label label-info">EE</span>'
                }
            } else {
                html = '</p>';
            }
            return html;
        }
    });
    markdown.use(require('markdown-it-container'), 'version-screenshots', {
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
                '<div role="tabpanel" class="col-xs-12 tab-pane active" id="v2_' + id[1] + '">' + markdown.render(source_v2x[1]) + '</div>' +
                '<div role="tabpanel" class="col-xs-12 tab-pane" id="v17_' + id[1] + '">' + markdown.render(source_v17[1]) + '</div>'
                : '</div>\n</div>\n</div>\n</div>\n';
        }
    });
    markdown.use(require('markdown-it-container'), 'toc', {
        validate: function(params) {
            return params.trim().match(/^toc$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div id="navbar" class="col-sm-3 hidden-xs sticky">' +
                '<nav role="tablist" id="navbar-nav"><ul class="nav nav-stacked" style="counter-increment: step-counter;"><p class="pre-nav">Summary</p>' :
                "</ul></nav></div>\n";
        }
    });
    markdown.use(require('markdown-it-container'), 'preToc', {
        validate: function(params) {
            return params.trim().match(/^preToc .*/);
        },
        render: function (tokens, idx) {
            var text = tokens[idx].info.trim().match(/^preToc (.*)$/);
            return (tokens[idx].nesting === 1) ? '<li class="active"> <a href="#">' + text[1] + '</a>': '';
        }
    });
    markdown.use(require('markdown-it-container'), 'postToc', {
        validate: function(params) {
            return params.trim().match(/^postToc$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '</li>' : '';
        }
    });
    markdown.use(require('markdown-it-container'), 'mainContent', {
        validate: function(params) {
            return params.trim().match(/^mainContent$/);
        },
        render: function (tokens, idx) {
            return (tokens[idx].nesting === 1) ? '<div class="col-xs-12 col-sm-offset-1 col-sm-8">' : '</div>';
        }
    });
    markdown.use(require('markdown-it-container'), 'tocLink', {
        validate: function(params) {
            return params.trim().match(/^tocLink\s+(.*)$/);
        },
        render: function (tokens, idx) {
            var linkTitle = tokens[idx].info.trim().match(/^tocLink.*\[(.*)\]\(.*\)$/);
            var link = tokens[idx].info.trim().match(/^tocLink.*\((.*)\)$/);
            return (tokens[idx].nesting === 1) ? '<li><a href="' + markdown.utils.escapeHtml(link[1]) + '">' + linkTitle[1] + '</a></li>' : '';
        }
    });
    markdown.use(require('markdown-it-container'), 'panel-link', {
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
                    '<a href="' + markdown.utils.escapeHtml(link[1]) + '">' +
                    '<div class="panel-body">' +
                    '<div class="panel-btn-big">'+ markdown.utils.escapeHtml(text[1]) + '</div>'+
                    '<p class="text-center">'+ markdown.utils.escapeHtml(linkTitle[1]) + '</p>';
            } else {
                // closing tag
                return '</div></a></div></div></div>\n';
            }
        }
    });
    markdown.use(require("markdown-it-codetabs"));
    markdown.use(require("markdown-it-include"));
}

function getPageTitle(fileName, defaultTitle = '') {
    let title = defaultTitle;
    titleDescription.forEach(function (element) {
        if(fileName
            .replace('/opt/workdir/content/', '')
            .replace('/opt/workdir/tmp/', '')
            .replace('.md', '') === element.content_dir) {
            title = element.title;
        }
    });
    return title;
}

function getPageDescription(fileName, defaultDescription = 'Description') {
    let description = defaultDescription;
    titleDescription.forEach(function (element) {
        if(fileName
            .replace('/opt/workdir/content/', '')
            .replace('/opt/workdir/tmp/', '')
            .replace('.md', '') === element.content_dir) {
            description = element.description;
        }
    });
    return description;
}

gulp.task('build-getting-started', ['clean-dist','less'], function () {

    const synchronizePimProductsName = 'synchronize-pim-products';
    var pages = {
        'your-first-tutorial-4x': {
            gettingStartedName: 'your-first-tutorial',
            pimVersion: 'v4 / v5 / v6 / v7 / SaaS',
            deprecated: false,
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
                v7: "4x",
                v6: "4x",
                v5: "4x",
                v4: "4x",
                old: "old"
            }
        },
        'your-first-tutorial-old': {
            gettingStartedName: 'your-first-tutorial',
            pimVersion: 'v1.7 / v2 / v3',
            deprecated: false,
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
                v7: "4x",
                v6: "4x",
                v5: "4x",
                v4: "4x",
                old: "old"
            }
        },
        'connect-the-pim-4x': {
            gettingStartedName: 'connect-the-pim',
            pimVersion: 'v4 / v5 / v6 / v7 / SaaS',
            deprecated: false,
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
                v7: "4x",
                v6: "4x",
                v5: "4x",
                v4: "4x",
                old: "old"
            }
        },
        'connect-the-pim-old': {
            gettingStartedName: 'connect-the-pim',
            pimVersion: 'v1.7 / v2 / v3',
            deprecated: false,
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
                v7: "4x",
                v6: "4x",
                v5: "4x",
                v4: "4x",
                old: "old"
            }
        },
        'quick-start-my-first-webhook-5x': {
            gettingStartedName: 'quick-start-my-first-webhook',
            pimVersion: 'v5 / v6 / v7/ SaaS',
            deprecated: true,
            title: 'Quick start my first webhook',
            files: {
                'welcome.md': 'Welcome',
                'step-1.md': 'Step 1 | Receive my first set of data',
                'step-2.md': 'Step 2 | Create your own Symfony app to display event subscriptions data'
            },
            availability: {
                serenity: "5x",
                v7: "5x",
                v6: "5x",
                v5: "5x"
            }
        },
        'events-api-best-practices-5x': {
            gettingStartedName: 'events-api-best-practices',
            pimVersion: 'v5 / v6 / v7 / SaaS',
            deprecated: true,
            title: 'Events API best practices',
            files: {
                'welcome.md': 'Best practices',
            },
            availability: {
                serenity: "5x",
                v7: "5x",
                v6: "5x",
                v5: "5x"
            }
        },
        'synchronize-pim-products-6x': {
            gettingStartedName: synchronizePimProductsName,
            pimVersion: 'v6 / v7 / SaaS',
            deprecated: false,
            title: 'Synchronize PIM products with your App',
            files: {
                'welcome.md': 'Welcome',
                'step-0.md': 'Discover the PIM objects relationship schema',
                'step-1.md': 'Synchronize PIM structure',
                'step-2.md': 'Synchronize Catalog structure: families and attributes',
                'step-3.md': 'Synchronize Catalog structure: categories',
                'step-4.md': 'Synchronize Products and product models',
                'step-5.md': 'Synchronize Reference entities',
                'step-6.md': 'Synchronize Assets'
            },
            availability: {
                serenity: "6x",
                v7: "6x",
                v6: "6x"
            }
        },
        'from-identifiers-to-uuid-7x': {
            gettingStartedName: 'from-identifiers-to-uuid',
            pimVersion: 'v7 / SaaS',
            deprecated: false,
            title: 'From product identifiers to UUID',
            files: {
                'welcome.md': 'Guide',
            },
            availability: {
                serenity: "7x",
                v7: "7x",
            }
        },
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
                  const gettingStartedName = pages[path.basename(path.dirname(file.path))].gettingStartedName;

                  return gulp.src('src/partials/getting-started.handlebars')
                    .pipe(gulpHandlebars({
                        active_api_resources: gettingStartedName !== synchronizePimProductsName,
                        active_apps: gettingStartedName === synchronizePimProductsName,
                        title: pages[path.basename(path.dirname(file.path))].title,
                        deprecated: pages[path.basename(path.dirname(file.path))].deprecated,
                        description: getPageDescription(file.path),
                        image: pages[path.basename(path.dirname(file.path))].image,
                        gettingStartedName: gettingStartedName,
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
                'step0-who-is-your-app-intended-for.md': 'Who is your App intended for?',
                'step1-who-does-what.md': 'Who does what?',
                'step2-understand-akeneo-pim.md': 'Understand Akeneo PIM data',
                'step3-reconcile-PIM-data-with-eCommerce-data.md': 'Reconcile PIM data with eCommerce data',
                'step4-define-your-first-scope.md': 'Define the first scope of your App'
            }
        },
        'translation-connection': {
            title: 'The complete guide to connect Akeneo PIM to your online translation solution',
            files: {
                'introduction.md': 'Introduction',
                'step1-who-is-your-app-intended-for.md': 'Who is your App intended for?',
                'step2-understand-akeneo-pim.md': 'Understand Akeneo PIM data',
                'step3-how-to-build-your-app.md': 'How to build your App?',
                'step4-known-limits.md': 'Known limits'
            }
        },
        'erp-connection': {
            title: 'The complete guide to connect your ERP solution to Akeneo PIM',
            files: {
                'introduction.md': 'Introduction',
                'step1-who-is-your-app-intended-for.md': 'Who is your App intended for?',
                'step2-analyze-erp-data.md': 'Analyze your ERP data',
                'step3-understand-akeneo-pim.md': 'Understand Akeneo PIM',
                'step4-how-to-build-your-app.md': 'How to build your App?'
            }
        },
        'syndication-connection': {
            title: 'The complete guide to connect Akeneo PIM to your syndication solution',
            files: {
              'introduction.md': 'Introduction',
              'step0-who-is-your-app-intended-for.md': 'Who is your App intended for?',
              'step1-who-does-what.md': 'Who does what?',
              'step2-understand-akeneo-pim.md': 'Understand Akeneo PIM data',
              'step3-define-your-first-scope.md': 'How to build your App?'
            }
        },
        'print-connection': {
            title: 'A high-level guide to connecting Akeneo PIM to your print solution',
            files: {
              'introduction.md': 'Introduction',
              'step0-who-is-your-app-intended-for.md': 'Who is your App intended for?',
              'step1-who-does-what.md': 'Who does what?',
              'step2-understand-akeneo-pim.md': 'Understand Akeneo PIM data',
              'step3-reconcile-PIM-data-with-print-features.md': 'Reconcile PIM data with print capabilities',
              'step4-define-your-first-scope.md': 'How to build your App'
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
                        active_apps: true,
                        title: pages[path.basename(path.dirname(file.path))].title,
                        description: getPageDescription(file.path),
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
        'good-practices.md': 'Good practices',
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
                        active_api_resources: true,
                        title: 'The REST API basics',
                        description: getPageDescription(file.path),
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

gulp.task('build-graphql', ['clean-dist','less'], function () {
        var pages = {
            'getting-started.md': "Getting started",
            'browse-graphql-capabilities.md': "Browse capabilities",
            'common-notions.md': "Common notions",
            'queries-and-arguments.md': "Available queries & arguments",
            'use-cases.md': "Use cases examples",
            'integration.md': "Integrate GraphQL into your project",
            'best-practices.md': "Best practices",
            'compatibility.md': "Pim compatibility",
            'recommendations.md': "Usage recommendations",
            'limitations.md': "Limitations",
            'error-codes.md': "Status and error codes",
            'advanced.md': "Advanced",
        };

        var isOnePage = false;

        return gulp.src('content/graphql/*.md')
            .pipe(flatmap(function(stream, file){
                return gulp.src('content/graphql/*.md')
                    .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
                    .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/graphql') + "\n"))
                    .pipe(gulpMarkdownIt(mdGt))
                    .pipe(gulp.dest('tmp/graphql/'))
                    .on('end', function () {
                        return gulp.src('src/partials/graphql-documentation.handlebars')
                            .pipe(gulpHandlebars({
                                active_api_resources: true,
                                title: 'The GraphQL API',
                                description: getPageDescription(file.path, "The Akeneo GraphQL API"),
                                mainContent: fs.readFileSync('tmp/graphql/' + path.basename(file.path).replace(/\.md/, '.html'))
                            }, {
                                partialsDirectory: ['./src/partials']
                            }))
                            .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                            .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                            .pipe(gulp.dest('./dist/graphql'));
                    })
            }));
    }
);

gulp.task('build-supplier-data-manager', ['clean-dist','less'], function () {
    var pages = {
        'getting-started.md': "Getting started",
        'common-usage.md': "Common usage",
        'api-reference.md': 'API reference',
    };

    var isOnePage = false;

    return gulp.src('content/supplier-data-manager/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/supplier-data-manager/*.md')
                .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
                .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/supplier-data-manager') + "\n"))
                .pipe(gulpMarkdownIt(mdGt))
                .pipe(gulp.dest('tmp/supplier-data-manager/'))
                .on('end', function () {
                    return gulp.src('src/partials/supplier-data-manager-documentation.handlebars')
                        .pipe(gulpHandlebars({
                            active_sdm_api_resources: true,
                            title: 'Supplier Data Manager API',
                            description: getPageDescription(file.path, "Explore Akeneo’s Supplier Data Manager API with this step-by-step guide. Learn how to get started quickly, onboard high-quality supplier data, and integrate effortlessly with common use cases for brands, manufacturers, and retailers."),
                            mainContent: fs.readFileSync('tmp/supplier-data-manager/' + path.basename(file.path).replace(/\.md/, '.html'))
                        }, {
                            partialsDirectory: ['./src/partials']
                        }))
                        .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                        .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                        .pipe(gulp.dest('./dist/supplier-data-manager'));
                })
        }));
}
);

gulp.task('build-event-platform', ['clean-dist','less'], function () {
      var pages = {
          'overview.md': "Overview",
          'getting-started.md': "Getting started",
          'concepts.md': "Concepts",
          'authentication-and-authorization.md': "Authentication and authorization",
          'key-platform-behaviors.md': "Key platform behaviors",
          'api-reference.md': "API Reference",
          'available-events.md': "Available events",
          'available-filters.md': 'Available filters',
          'best-practices.md': "Best practices",
          'integration-examples.md': "Integration examples",
          'compatibility.md': "Compatibility",
          'limitations.md': "Quota & Limits",
          // 'migrate-from-deprecated-event-api.md': "Migrate from deprecated event API",
          'logs.md': "Logs",
          'faq.md': "FAQ",
      };

      var isOnePage = false;

      return gulp.src('content/event-platform/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/event-platform/*.md')
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/event-platform') + "\n"))
              .pipe(gulpMarkdownIt(mdGt))
              .pipe(gulp.dest('tmp/event-platform/'))
              .on('end', function () {
                  return gulp.src('src/partials/event-platform.handlebars')
                    .pipe(gulpHandlebars({
                        active_api_resources: true,
                        title: 'The Event Platform',
                        description: getPageDescription(file.path, "The Event Platform"),
                        mainContent: fs.readFileSync('tmp/event-platform/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/event-platform'));
              })
        }));
  }
);

gulp.task('build-extensions', ['clean-dist','less'], function () {
      var pages = {
          'overview.md': "Overview",
          'getting-started.md': "Getting started",
          'types.md': "Types",
          'positions.md': "Positions",
          'credentials.md': "Credentials",
          'filtering.md': "Filter and display",
          'api.md': "API",
          'faq.md': "FAQ",
      };

      var isOnePage = false;

      return gulp.src('content/extensions/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/extensions/*.md')
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/extensions') + "\n"))
              .pipe(gulpMarkdownIt(mdGt))
              .pipe(gulp.dest('tmp/extensions/'))
              .on('end', function () {
                  return gulp.src('src/partials/extensions.handlebars')
                    .pipe(gulpHandlebars({
                        active_api_resources: true,
                        title: 'Extensions',
                        description: getPageDescription(file.path, "Extensions"),
                        mainContent: fs.readFileSync('tmp/extensions/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/extensions'));
              })
        }));
  }
);

gulp.task('build-px-insights', ['clean-dist','less'], function () {
      var pages = {
          'overview.md': "Overview",
      };

      var isOnePage = false;

      return gulp.src('content/px-insights/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/px-insights/*.md')
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/px-insights') + "\n"))
              .pipe(gulpMarkdownIt(mdGt))
              .pipe(gulp.dest('tmp/px-insights/'))
              .on('end', function () {
                  return gulp.src('src/partials/px-insights.handlebars')
                    .pipe(gulpHandlebars({
                        active_api_resources: true,
                        title: 'PX Insights',
                        description: getPageDescription(file.path, "PX Insights"),
                        mainContent: fs.readFileSync('tmp/px-insights/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/px-insights'));
              })
        }));
  }
);

gulp.task('build-events-api', ['clean-dist','less'], function () {

    var pages = {
        'overview.md': 'Overview',
        'subscription.md': 'Subscribe and receive events',
        'security.md': 'Security',
        'limits-and-scalability.md': 'Limits and scalibility',
        'more-about-events.md': 'More about events',
        'migrate-to-event-platform.md': 'Migrate to Event Platform',
        'deprecation-faq.md': 'Deprecation FAQ'
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
                        active_api_resources: true,
                        title: 'The Events API basics',
                        description: getPageDescription(file.path),
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

gulp.task('build-app-developer-tools', ['clean-dist','less'], function () {
    var pages = {
        'homepage.md': 'Start building your App',
        'overview.md': 'Overview',
        'authentication-and-authorization.md': 'Authentication and authorization',
        'create-the-ux-of-your-app.md': 'Design an App (UX)',
        'secure-your-app.md': 'Secure your App',
        'catalogs.md': 'Catalogs for Apps',
        'app-developer-tools.md': 'Developer tools',
        'app-concepts-and-use-cases.md': 'App concepts and use cases',
        'create-custom-app.md': 'Custom apps'
    };

    const startApp = {
        'title': 'Start Apps',
        'badge_name' : 'New',
        'content': 'Starter for bootstraping your first Akeneo App quickly.',
        'image': 'apps/dev-tools-langages.svg',
        'rows': [
            {
                'image': 'icons/icon--github.png',
                'content': 'Github repository:',
                'breakline': true,
                'link': 'https://github.com/akeneo/sample-apps',
                'link_content': 'akeneo/sample-apps',
            }
        ],
        'author': 'By Akeneo'
    };

    const apiTools = [
        {
            'title': 'Postman collection',
            'badge_image' : 'apps/dev-tools-postman.svg',
            'content': 'Test Akeneo APIs right away with our Postman collection.',
            'rows': [
                {
                    'image': 'apps/dev-tools-download.svg',
                    'link': '/files/Akeneo PIM API.postman_collection.json',
                    'link_content': 'Download',
                    'download': true,
                },
                {
                    'image': 'apps/dev-tools-akeneo.svg',
                    'breakline': true,
                    'content': 'Documentation:',
                    'link': '/getting-started/your-first-tutorial-4x/step-2.html',
                    'link_content': 'Importing data into Postman',
                },
            ],
            'author': 'By Akeneo'
        },
        {
            'title': 'PHP API client',
            'content': 'The PHP client eases the usage of the REST API in your PHP projects when building extensions and/or tools for your PIM.',
            'rows': [
                {
                    'image': 'icons/icon--github.png',
                    'content': 'Github repository:',
                    'breakline': true,
                    'link': 'https://github.com/akeneo/api-php-client',
                    'link_content': 'akeneo/api-php-client',
                },
                {
                    'image': 'apps/dev-tools-akeneo.svg',
                    'content': 'Documentation:',
                    'link': '/php-client/introduction.html',
                    'link_content': 'PHP API client',
                },
            ],
            'author': 'By Akeneo'
        },
    ];

    const app = {
        'title': 'Demo App',
        'content': 'Our official and already-in-production ' +
            'Demo App will help you to understand ' +
            'how to use Akeneo App features.',
        'image': 'apps/dev-tools-php.svg',
        'rows': [
            {
                'image': 'icons/icon--github.png',
                'content': 'Github repository:',
                'breakline': true,
                'link': 'https://github.com/akeneo/demo-app',
                'link_content': 'akeneo/demo-app',
            }
        ],
        'author': 'By Akeneo'
    };

    var isOnePage = false;

    return gulp.src(['content/apps/app-developer-tools.md'])
        .pipe(flatmap(function (stream, file) {
            return gulp.src('content/apps/app-developer-tools.md')
                .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
                .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/apps') + "\n"))
                .pipe(gulpMarkdownIt(md))
                .pipe(gulp.dest('tmp/apps/'))
                .on('end', function () {
                    return gulp.src('src/partials/apps-developer-tools.handlebars')
                        .pipe(gulpHandlebars({
                            active_apps:  true,
                            startApp : startApp,
                            apiTools : apiTools,
                            app : app,
                            mainContent: fs.readFileSync('tmp/apps/' + path.basename(file.path).replace(/\.md/, '.html')),
                            title: getPageTitle(file.path),
                            description: getPageDescription(file.path),
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

gulp.task('build-apps', ['clean-dist','less'], function () {
    var pages = {
        'homepage.md': 'Start building your App',
        'overview.md': 'Overview',
        'authentication-and-authorization.md': 'Authentication and authorization',
        'create-the-ux-of-your-app.md': 'Design an App (UX)',
        'secure-your-app.md': 'Secure your App',
        'catalogs.md': 'Catalogs for Apps',
        'app-developer-tools.md': 'Developer tools',
        'app-concepts-and-use-cases.md': 'App concepts and use cases',
        'create-custom-app.md': 'Custom apps'
    };

    var isOnePage = false;

    return gulp.src(['content/apps/*.md', '!content/apps/app-developer-tools.md'])
        .pipe(flatmap(function(stream, file){
            return gulp.src(['content/apps/*.md'])
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/apps') + "\n"))
              .pipe(gulpMarkdownIt(md))
              .pipe(gulp.dest('tmp/apps/'))
              .on('end', function () {
                  return gulp.src('src/partials/apps.handlebars')
                    .pipe(gulpHandlebars({
                        active_apps:  true,
                        title: getPageTitle(file.path, 'Apps'),
                        description: getPageDescription(file.path),
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

gulp.task('build-app-portal', ['clean-dist','less'], function () {
    var pages = {
        'get-started.md': 'Get started',
        'manage-your-team.md': 'Manage your team',
        'create-app-record.md': 'Create an app record',
        'publish-your-app.md': 'App Publication Requirements',
        'manage-app-notifications.md': 'Manage your app notifications',
        'manage-app-availability.md': 'Manage your app\'s availability',
        'measure-app-performance.md': 'Measure app performance'
    };

    var isOnePage = false;

    return gulp.src(['content/app-portal/*.md'])
        .pipe(flatmap(function(stream, file){
            return gulp.src(['content/app-portal/*.md'])
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/app-portal') + "\n"))
              .pipe(gulpMarkdownIt(md))
              .pipe(gulp.dest('tmp/app-portal/'))
              .on('end', function () {
                  return gulp.src('src/partials/app-portal.handlebars')
                    .pipe(gulpHandlebars({
                        active_apps_portal:  true,
                        title: getPageTitle(file.path, 'App portal'),
                        description: getPageDescription(file.path),
                        mainContent: fs.readFileSync('tmp/app-portal/' + path.basename(file.path).replace(/\.md/, '.html'))
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/app-portal'));
              })
        }));
  }
);

gulp.task('build-redirections', [
    'to-get-your-app-token-redirection',
    'to-apps-homepage',
    'to-app-concepts-and-use-cases',
]);

gulp.task('to-get-your-app-token-redirection', ['clean-dist','less'], function () {
    return gulp.src('content/redirections/to-get-your-app-token.html')
        .pipe(rename('apps-getting-started.html'))
        .pipe(gulp.dest('./dist/apps'))
});

gulp.task('to-apps-homepage', ['clean-dist', 'less'], function () {
    return gulp.src('content/redirections/to-apps-homepage.html')
        .pipe(rename('apps.html'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('to-app-concepts-and-use-cases', ['clean-dist', 'less'], function () {
    return gulp.src('content/redirections/to-app-concepts-and-use-cases.html')
        .pipe(rename('guides-index.html'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('build-concepts', ['clean-dist','less'], function () {

    var pages = {
        'products.md': 'Products',
        'catalog-structure.md': 'Catalog structure',
        'target-market-settings.md': 'Target market settings',
        'reference-entities.md': 'Reference entities',
        'asset-manager.md': 'Asset Manager'
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
                        active_api_resources: true,
                        title: 'Concepts & resources',
                        description: getPageDescription(file.path),
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

gulp.task('create-app-catalog-md', function () {
    return gulp.src(['content/php-client/resources/app-catalog/app-catalog.md','content/php-client/resources/app-catalog/app-catalog.md','content/php-client/resources/app-catalog/*.md'])
        .pipe(concat('app-catalog.md'))
        .pipe(insert.prepend('## Catalogs for Apps\n'))
        .pipe(gulp.dest('tmp/php-client-resources/'));
});

gulp.task('create-products-md', function () {
    return gulp.src(['content/php-client/resources/products/products.md',
        'content/php-client/resources/products/products-uuid.md',
        'content/php-client/resources/products/product-models.md',
        'content/php-client/resources/products/product-drafts-uuid.md',
        'content/php-client/resources/products/*.md'])
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
gulp.task('create-resources-md', ['create-app-catalog-md','create-products-md','create-catalog-structure-md', 'create-target-market-settings-md', 'create-PAM-md', 'create-reference-entity-md', 'create-asset-manager-md'], function () {
    return gulp.src(['tmp/php-client-resources/products.md',
                    'tmp/php-client-resources/catalog-structure.md',
                    'tmp/php-client-resources/target-market-settings.md',
                    'tmp/php-client-resources/asset-manager.md',
                    'tmp/php-client-resources/PAM.md',
                    'tmp/php-client-resources/reference-entity.md',
                    'tmp/php-client-resources/app-catalog.md'])
        .pipe(concat('resources.md'))
        .pipe(insert.prepend('# Resources\n'))
        .pipe(gulp.dest('tmp/php-client'));
});

gulp.task('build-php-client', ['clean-dist','less', 'create-resources-md'], function () {

    var pages = {
        'introduction.md': 'Introduction',
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
                        active_api_resources: true,
                        title: 'PHP API Client documentation',
                        description: getPageDescription(file.path),
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
                            active_api_resources: true,
                            title: 'Documentation',
                            description: getPageDescription(file.path),
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

gulp.task('build-tutorials-homepage', ['clean-dist','less'], function () {
    const pages = {
        "how-to-get-your-app-token.md": "How to get your App token",
        "how-to-retrieve-pim-structure.md": "How to retrieve PIM structure",
        "how-to-get-families-and-attributes.md": "How to get families, family variants, and attributes",
        "how-to-get-pim-product-information.md": "How to get PIM product information",
        "how-to-collect-product-variations.md": "How to collect product variations",
        "how-to-get-pim-category-tree.md": "How to get PIM category tree",
    };

    const useCases = [
        {'color': 'light-blue', 'use_case': 'App Workflow'},
    ];

    const features = [
        {'color': 'yellow', 'feature': 'Products'},
        {'color': 'purple', 'feature': 'Product Models'},
        {'color': 'light-green', 'feature': 'Variant Products'},
        {'color': 'pink', 'feature': 'Families'},
        {'color': 'orange', 'feature': 'Attributes'},
        {'color': 'blue', 'feature': 'Categories'},
        {'color': 'coral', 'feature': 'Channel'},
    ]

    const tutorials = [
        {
            'title': 'How to get your App token',
            'link': '/tutorials/how-to-get-your-app-token.html',
            'features': [],
            'use_cases': useCases
        },
        {
            'title': 'How to retrieve PIM structure',
            'link': '/tutorials/how-to-retrieve-pim-structure.html',
            'features': [features[6]],
            'use_cases': useCases
        },
        {
            'title': 'How to get families, family variants, and attributes',
            'link': '/tutorials/how-to-get-families-and-attributes.html',
            'features': [ features[4], features[3]],
            'use_cases': useCases
        },
        {
            'title': 'How to get PIM product information',
            'link': '/tutorials/how-to-get-pim-product-information.html',
            'features': [features[0]],
            'use_cases': useCases
        },
        {
            'title': 'How to collect product variations',
            'link': '/tutorials/how-to-collect-product-variations.html',
            'features': [features[1], features[2]],
            'use_cases': useCases
        },
        {
            'title': 'How to get PIM category tree',
            'link': '/tutorials/how-to-get-pim-category-tree.html',
            'features': [features[5]],
            'use_cases': useCases
        },
    ];

    const isOnePage = false;

    return gulp.src('content/tutorials/homepage/*.md')
        .pipe(flatmap(function (stream, file) {
            return gulp.src('content/tutorials/homepage/*.md')
                .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
                .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/tutorials') + "\n"))
                .pipe(gulpMarkdownIt(md))
                .pipe(gulp.dest('tmp/tutorials/'))
                .on('end', function () {
                    return gulp.src('src/partials/guided-tutorials-homepage.handlebars')
                        .pipe(gulpHandlebars({
                            active_guided_tutorials: true,
                            tutorials: tutorials,
                            features: features,
                            useCases: useCases,
                            mainContent: fs.readFileSync('tmp/tutorials/' + path.basename(file.path).replace(/\.md/, '.html')),
                            title: getPageTitle(file.path),
                            description: getPageDescription(file.path),
                        }, {
                            partialsDirectory: ['./src/partials']
                        }))
                        .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                        .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                        .pipe(gulp.dest('./dist/tutorials'));
                })
        }));
    }
);

gulp.task('build-tutorials', ['clean-dist', 'less'], function () {
    const pages = {
        "how-to-get-your-app-token.md": "How to get your App token",
        "how-to-retrieve-pim-structure.md": "How to retrieve PIM structure",
        "how-to-get-families-and-attributes.md": "How to get families, family variants, and attributes",
        "how-to-get-pim-product-information.md": "How to get PIM product information",
        "how-to-collect-product-variations.md": "How to collect product variations",
        "how-to-get-pim-category-tree.md": "How to get PIM category tree",
    };

    const isOnePage = false;

    return gulp.src('content/tutorials/guides/*.md')
        .pipe(flatmap(function (stream, file) {
            return gulp.src('content/tutorials/guides/*.md')
                .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
                .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/tutorials') + "\n"))
                .pipe(gulpMarkdownIt(mdGt))
                .pipe(gulp.dest('tmp/tutorials/'))
                .on('end', function () {
                    return gulp.src('src/partials/guided-tutorials.handlebars')
                        .pipe(gulpHandlebars({
                            active_guided_tutorials: true,
                            mainContent: fs.readFileSync('tmp/tutorials/' + path.basename(file.path).replace(/\.md/, '.html')),
                            title: getPageTitle(file.path),
                            description: getPageDescription(file.path),
                        }, {
                            partialsDirectory: ['./src/partials']
                        }))
                        .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                        .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                        .pipe(gulp.dest('./dist/tutorials'));
                })
        }));
    }
);

gulp.task('build-news', ['clean-dist','less'], function () {
    var pages = {
        '2024.md': '2024',
        '2023.md': '2023',
        '2022.md': '2022',
        // 'whats-next.md': 'What\'s next?',
    };

    var isOnePage = false;

    return gulp.src('content/news/*.md')
        .pipe(flatmap(function(stream, file){
            return gulp.src('content/news/*.md')
              .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
              .pipe(insert.prepend(getTocMarkdown(isOnePage, pages, path.basename(file.path), '/news') + "\n"))
              .pipe(gulpMarkdownIt(md))
              .pipe(gulp.dest('tmp/news/'))
              .on('end', function () {
                  return gulp.src('src/partials/news.handlebars')
                    .pipe(gulpHandlebars({
                        active_news:  true,
                        mainContent: fs.readFileSync('tmp/news/' + path.basename(file.path).replace(/\.md/, '.html')),
                        title: getPageTitle(file.path),
                        description: getPageDescription(file.path),
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename(path.basename(file.path).replace(/\.md/, '.html')))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist/news'));
              })
        }));
  }
);
