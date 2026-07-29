# Plan: "Extension Platform" documentation section

Status: draft for review — not yet reflected in `content/`.

## 1. What this section needs to cover

Today, `content/extensions/` documents the four extension *types* you can register in the
PIM (`link`, `action`, `iframe`, `data-component`), and `content/advanced-extensions/`
documents `sdk_script` Custom Components, which Akeneo hosts for you.

The gap: three of those four types (`action`, `iframe`, `data-component`) rely on the
customer running their **own backend** somewhere to receive the POST / serve the iframe /
answer the GET. Nothing in the docs today explains *where* and *how* to run that backend.
That's what the new Extension Platform is: Akeneo-managed hosting (on Upsun, i.e.
Platform.sh) so customers/partners can deploy that backend without owning infra, billed
through Akeneo (OEM reseller relationship) instead of contracting Upsun directly.

**Scope note (2026-07-23, broadened 2026-07-29):** the platform isn't only for extension
backends — the same hosted app can also consume Event Platform webhooks, trigger custom
workflows unrelated to any PIM extension, or serve as the backend for a **Custom App**
([content/apps/create-custom-app.md](content/apps/create-custom-app.md) — an App-Store-style
app connected via OAuth, distinct from the four extension types). Frame `overview.md` as
"a place to run your backend, connected to the PIM," with extensions as the
primary/first-documented use case rather than the only one. This affects the `overview.md`
positioning bullet in §3 and softens the framing of the FAQ question "Can I use this
hosting for something unrelated to a PIM extension?" — that's not an edge case, it's core
to the value prop.

This was pieced together from three sibling repos (none of which are documentation —
all internal engineering/reference implementations):

- **`extension-platform`** — Akeneo's internal Cloud Run jobs that read Upsun's billing
  API and ship cost metrics to Datadog + billing events to the Event Platform. Confirms the
  reseller billing model and what Upsun exposes (metrics, cost estimates, deployment
  events) but is not itself customer-facing.
- **`extension-platform-symfony-test-app`** and **`extension-platform-node-test-app`** —
  two parallel reference implementations (PHP/Symfony and Node/Express) of the *same*
  demo app: a product-catalogue sync backend that (a) receives an `action` extension POST,
  (b) receives Event Platform webhooks, (c) calls back into the PIM REST API, all deployed
  on Upsun via `.upsun/config.yaml`. These are the best available model for "what a
  customer's app on this platform looks like."

**Decisions from review (2026-07-16):**
- **Status**: Beta. **Confirmed (2026-07-29)**: the docs menu badge reads "Beta", not
  "New".
- **Name**: "Extension Platform" is confirmed as the go-to customer-facing name.
- **Provisioning**: Akeneo creates the Upsun organization and project for the customer,
  along with one admin account on that project — this is not self-service account
  creation. Two more things to surface prominently in "Getting started":
  - A **CLI tool** is available for download/use (on top of the standard Upsun CLI).
    Install method confirmed (2026-07-23): `curl -sfSk https://cli.extension.akeneo.cloud/installer | sh`.
  - **Two app templates** are downloadable to start from a working project. **Confirmed
    (2026-07-29)**: customers browse/download these from
    [`extension-platform-demo-apps`](https://github.com/akeneo/extension-platform-demo-apps/tree/main),
    a catalog repo of example apps — reference it as the source in `getting-started.md`
    rather than the internal `extension-platform-symfony-test-app` /
    `extension-platform-node-test-app` repos.
- **Billing**: **Confirmed (2026-07-29)**: billing/cost documentation belongs in the Help
  Desk / support knowledge base, not in these API docs. Do not document the cost-model
  internals from the `extension-platform` repo here at all —
  `monitoring-and-troubleshooting.md`'s billing bullet is just a link out to the Help Desk
  article.
- **Supported stacks**: Any Upsun-supported language/runtime — this is not limited to
  PHP/Node. The Symfony and Node test apps are demo/reference material only, not an
  indication of the supported set.

**Still open — need input before drafting:** none — both remaining items (badge wording,
billing placement) were confirmed 2026-07-29, see Status and Billing decisions above.

## 2. Where it fits in the site

**Correction (2026-07-29):** not the PIM API dropdown — this goes in the **Apps** dropdown
(`src/partials/layout.handlebars`, lines ~75–89), as a new entry under "Host your app".
That dropdown is currently a flat list (`Start building your App`, `Overview`,
`Authentication and authorization`, `Design an App (UX)`, `Secure your App`,
`Catalogs for Apps`, `Developer tools`, `App concepts and use cases`, `Custom Apps`) with
no existing "Host your app" item or sub-heading, so this needs a new entry (and possibly a
new sub-grouping — to confirm exact placement/wording with you before implementing).
Rationale: `content/apps/overview.md`'s "Hosting, Updating, and Maintaining Apps" section
currently frames hosting as entirely the developer's own responsibility — Extension
Platform is the answer to that, so it belongs with the Apps docs, not alongside
Extensions/Advanced in the PIM API dropdown.

**Cleanup (2026-07-23, already applied):** the existing "Advanced" entry in the PIM API
dropdown (line 184) had a stale `New` badge from when `advanced-extensions/` shipped —
removed directly (see `git diff src/partials/layout.handlebars`).

New folder: `content/extension-platform/` (mirrors the `extension-platform*` repo naming
so cross-team vocabulary stays consistent). Images under `content/img/extension-platform/`.

## 3. Proposed page outline

Following the site's existing pattern (overview → getting-started → deep dives →
faq/troubleshooting, see `content/mcp/`, `content/px-insights/`, `content/advanced-extensions/`):

### `overview.md`
- What it is: managed hosting for a backend app connected to the PIM — most commonly the
  backend behind `action`/`iframe`/`data-component` extensions, but also usable to consume
  Event Platform webhooks, run custom workflows unrelated to an extension, or host a
  [Custom App](content/apps/create-custom-app.md)'s backend — so you don't run your own
  servers/SSL/domains.
- Where it sits relative to the other two extension mechanisms already documented
  (Custom Components = Akeneo-hosted JS sandbox; Extensions API = wiring/positions;
  this = your own server-side app, hosted for you).
- Responsibility split, same spirit as `advanced-extensions/overview.md`'s "Understanding
  Your Responsibilities" section: Akeneo manages the infra (Upsun runtime, routing,
  TLS, scaling primitives), customer/partner owns the application code, its dependencies,
  and its behavior.
- Link out to Upsun's own documentation for anything infra-specific we don't want to
  re-document (see §4).

### `getting-started.md`
**Scope correction (2026-07-29):** this page starts *after* provisioning, not after an
extension is configured. Prerequisite is just: Akeneo has already created your Upsun
organization + project and given you an admin account on it (see Provisioning decision in
§1 — not self-service). Nothing PIM-specific is required to complete this page — no
extension, no PIM API credentials. The page's arc is CLI install → repo linked → hello-world
deployed and reachable at its live URL. Wiring that deployed app into an actual
`action`/`iframe`/`data-component` extension, an Event Platform webhook, or a Custom App
happens afterwards — that integration surface (signature verification, calling the PIM
API, credentials) is already documented in `content/extensions/action.md`,
`content/extensions/credentials.md`, and the Event Platform docs, so this page just links
out to those rather than growing a dedicated "connecting to the PIM" page (dropped
2026-07-29 — redundant with existing sections, see note below).
- Starting point, spelled out: you have a project on the platform and an admin account on
  it. That's it.
- **CLI tool**, front and center since it's how every remaining step gets done: install
  (`curl -sfSk https://cli.extension.akeneo.cloud/installer | sh`), then use it to confirm
  access to your provisioned project (`upsun project:info` style command) and to add the
  git remote (below).
- **Git remote integration**: the provisioned project comes with a Upsun git remote
  (e.g. `upsun`); this is the deploy mechanism end-to-end — add it locally (via the CLI),
  and every `git push upsun <branch>` triggers a build + deploy on Upsun. Cover:
  - adding the remote via the CLI tool,
  - pushing a branch to get a live environment,
  - the live URL pattern (`https://<branch>-<hash>.<region>.platformsh.site`),
  - how subsequent pushes redeploy automatically (build hook → deploy hook, as declared
    in `.upsun/config.yaml`).
- Walkthrough, ending at a working hello-world (not at extension wiring):
  1. Install the CLI tool; confirm it can see your provisioned project.
  2. Add the `upsun` git remote locally.
  3. Grab one of the two downloadable app templates — link to
     [`extension-platform-demo-apps`](https://github.com/akeneo/extension-platform-demo-apps/tree/main)
     as the catalog to start from — or start from the minimal skeleton below. Project
     layout note: a `.upsun/config.yaml` defines `routes`, `services` (Postgres/Redis/queue
     as needed), the `applications.app` runtime, `build`/`deploy` hooks, optional `workers`
     and `crons`.
  4. Optional local dev loop (`compose.yaml`/`docker compose up`, `.env`) before pushing.
  5. `git push upsun <branch>` and hit the live URL — hello world running.
  6. **Next step, out of scope for this page**: wire the deployed app up to an actual
     extension/webhook/Custom App — point to the existing integration docs
     ([content/extensions/action.md](content/extensions/action.md) for signature
     verification, [content/extensions/credentials.md](content/extensions/credentials.md)
     and [content/advanced-extensions/sdk-credentials.md](content/advanced-extensions/sdk-credentials.md)
     for credentials, the Event Platform docs for webhook signatures) rather than a
     dedicated page here.
- Minimal skeleton example, framed explicitly as "pick whichever of the downloadable
  templates matches your stack" rather than implying PHP/Node are the only options.

**Dropped (2026-07-29):** a standalone `connecting-to-the-pim.md` page — calling the PIM
API (OAuth client credentials/password grant, token caching), receiving `action` signature
verification, Event Platform webhook dual-signature headers, and credentials are all
already documented in `content/extensions/action.md`, `content/extensions/credentials.md`,
`content/advanced-extensions/sdk-credentials.md`, and the Event Platform docs. Rather than
duplicate that material on a new page, `getting-started.md`'s "next step" (above) links out
to it directly.

### `infrastructure-and-resources.md`
What's available on the platform, in plain terms (not a repeat of Upsun's own reference):
- Supported languages/runtimes: any stack Upsun supports — explicitly note that the
  Symfony/Node examples elsewhere in these docs are demo material, not a limitation.
- Backing services customers can request: Postgres, Redis, a message queue — with a note
  that async work (webhook/action handling) should go through a worker + queue rather
  than blocking the HTTP response, exactly as both demo apps do (`202 Accepted` +
  background job).
- Scheduled jobs (`crons`) and background workers as first-class deploy concepts.
- Persistent storage (mounts) for things like a local image cache.
- One paragraph pointing at Upsun's docs for the full application/runtime reference
  (`.upsun/config.yaml` schema, supported languages, autoscaling) — see §4.

### `monitoring-and-troubleshooting.md`
- What Akeneo/the customer can see: deployment status, logs, resource metrics (CPU/
  memory/disk), request-level APM — available through the Upsun console/CLI on the
  project.
- Common failure modes worth calling out explicitly since they show up in the test apps:
  signature validation failures (wrong secret, testing with a stale `timestamp`), webhook
  events arriving before the corresponding local record exists (test app explicitly
  ignores webhook updates for products it doesn't know about yet — "no automatic
  addition of new products via webhook" is a deliberate design choice worth flagging as a
  pattern), build/deploy hook failures, missing environment variables after a fresh
  environment is provisioned.
- Billing/usage visibility: **confirmed (2026-07-29)** this bullet is a link out to the
  Help Desk article, not a section documenting the cost model or portal usage here — see
  Billing decision in §1.
- Where to escalate (Akeneo support) vs. self-serve (Upsun console/CLI), given Akeneo
  owns provisioning but the customer has an admin account on the project.

### `faq.md`
Same format as the other sections' FAQ pages. Seed questions:
- Who's responsible if my hosted app goes down / has a bug?
- Can I bring my own Upsun/Platform.sh account instead of the Akeneo-provisioned one?
- What languages/runtimes are supported?
- Where do I see what this is costing me? (confirmed: links to the Help Desk article
  rather than answering inline — see §1)
- Can I use this hosting for something unrelated to a PIM extension? (yes — cover this as
  a straightforward "yes, it's a general-purpose backend host" rather than an edge case,
  per the scope note in §1)
- Can I use this to host a Custom App instead of an extension backend? (yes — same answer
  as above; Custom Apps are a distinct concept from extensions, see §1 scope note)

## 4. What to link out to vs. document ourselves

Per your instruction ("point to the Upsun doc for more advanced topics"), the line I'd
draw:
- **Document here**: anything about the *integration* with the PIM (auth, signatures,
  webhooks, extension config) and the parts of the Upsun config that are specific to
  "this is an Akeneo extension backend" (the two test apps' `.upsun/config.yaml` as
  annotated examples).
- **Link to Upsun's docs**: the general `.upsun/config.yaml` schema reference, supported
  languages/runtimes list, the CLI, autoscaling configuration, backup/restore, custom
  domains — anything that's true of Upsun regardless of Akeneo.

## 5. Next steps

1. ~~You confirm the remaining open items in §1 (Beta vs. New badge, whether billing lives
   in Help Desk instead of here).~~ Done — badge is "Beta", billing lives in Help Desk.
   CLI install method and app template source are also confirmed.
2. I draft `overview.md` and `getting-started.md` first and we review tone/depth before
   I do the rest.
3. Menu entry + folder scaffolding added once the page list is confirmed.

**2026-07-23 session:** reviewed with you — gap framing broadened (not extension-only,
also events/custom workflows), stale "New" badge removed from the live "Advanced" menu
entry (`src/partials/layout.handlebars`), CLI install command confirmed, billing
placement (docs vs. Help Desk) flagged as open. Continuing tomorrow.

**2026-07-29 session:** confirmed the two app templates' source — customers browse/
download from [`extension-platform-demo-apps`](https://github.com/akeneo/extension-platform-demo-apps/tree/main),
a catalog repo of example apps (distinct from the internal
`extension-platform-symfony-test-app` / `extension-platform-node-test-app` reference
repos in §1). Also confirmed the two remaining open items: docs badge reads "Beta" (not
"New"), and billing/cost documentation belongs in the Help Desk rather than these API
docs. No open items remain in §1.
