# Moving sohoa.org DNS to Cloudflare

Goal: get DNS off Newfold without the mailboxes noticing.

## Why this is safe

A nameserver change has no cutover moment. While the change propagates, some
resolvers ask the old nameservers and some ask the new ones. If both return
**identical** records, mail is delivered to the same servers either way, so
there is no window where anything is down.

Mail itself does not move. `MX` keeps pointing at `mx.sohoa.org`, which keeps
pointing at Newfold's mail servers `66.96.140.66` and `.67`. Only the
question "who answers DNS for this domain" changes.

The risk is therefore not downtime, it is a record that was copied wrong. So
the zone is built and verified at Cloudflare **before** the nameservers move,
and the website is repointed **after** — never both at once.

## Order of operations

| Phase | What happens | Email risk |
| ----- | ------------ | ---------- |
| 1 | Build an exact copy of the zone at Cloudflare. Nameservers untouched, nothing live. | none |
| 2 | Query Cloudflare's nameservers directly and diff against the old ones. | none |
| 3 | Change nameservers at OnlineNIC. Records are identical, so nothing changes in practice. | none if phase 2 was clean |
| 4 | Repoint `@` and `www` at the site. Touches no mail record. | none |

## Phase 1 — build the zone at Cloudflare

Add `sohoa.org` to Cloudflare, but **do not change the nameservers yet**.
Cloudflare scans and imports what it can find; reconcile the result against
this table, which is the zone exactly as it stood on 2026-09-29.

Every record must be **DNS only** (grey cloud), including the website ones
for now. Proxying a mail hostname would break mail.

| Type  | Name              | Value                                                        | Proxy |
| ----- | ----------------- | ------------------------------------------------------------ | ----- |
| A     | `@`               | `66.96.149.32`                                                 | DNS only |
| A     | `www`             | `66.96.149.32`                                                 | DNS only |
| A     | `*`               | `66.96.130.75`                                                 | DNS only |
| A     | `mx`              | `66.96.140.66`                                                 | DNS only |
| A     | `mx`              | `66.96.140.67`                                                 | DNS only |
| A     | `mail`            | `66.96.130.75`                                                 | DNS only |
| A     | `smtp`            | `66.96.130.75`                                                 | DNS only |
| A     | `imap`            | `66.96.130.75`                                                 | DNS only |
| A     | `pop`             | `66.96.130.75`                                                 | DNS only |
| A     | `webmail`         | `66.96.130.233`                                                | DNS only |
| A     | `email`           | `66.96.130.233`                                                | DNS only |
| A     | `ftp`             | `66.96.130.75`                                                 | DNS only |
| MX    | `@`               | `mx.sohoa.org`, priority `30`                                  | n/a |
| TXT   | `@`               | `v=spf1 ip4:66.96.128.0/18 include:websitewelcome.com ?all`    | n/a |
| CNAME | `dkim._domainkey` | `cur.dkim.v.eigmail.net`                                       | DNS only |
| CNAME | `_acme-challenge` | `sohoa.org.letsencrypt.vdeck.eigdyn.com`                       | DNS only |

Sixteen records. Delete anything Cloudflare invented that is not on this list.

The website records keep pointing at the old host on purpose. Phase 1 is a
copy, not a change — that way, if anything goes wrong in phase 3, the only
variable is which nameservers are being asked.

## Phase 2 — prove the copy is exact

Cloudflare assigns two nameservers when the zone is added. Snapshot both the
old and new and diff them:

```bash
./scripts/dns-snapshot.sh ns1.ipower.com > /tmp/before.txt
./scripts/dns-snapshot.sh <your-cloudflare-ns> > /tmp/after.txt
diff /tmp/before.txt /tmp/after.txt
```

Only the `NS` line should differ. Any other difference must be fixed before
going near phase 3.

## Phase 3 — change the nameservers

At **OnlineNIC**, replace `ns1.ipower.com` and `ns2.ipower.com` with the two
Cloudflare nameservers.

Do not delete the zone at Newfold, and do not cancel the hosting plan. The
old zone is the rollback: switching the nameservers back restores the
previous setup.

Registrars can take up to 48 hours to fully propagate a nameserver change.
That is fine here, because both sides answer identically for the whole
period.

## Phase 4 — point the domain at the site

Once phase 3 has settled, in the Cloudflare dashboard under
**Workers &amp; Pages → sohoa → Settings → Domains &amp; Routes**, add
`sohoa.org` and `www.sohoa.org` as custom domains. Cloudflare replaces the
two placeholder A records with proxied records of its own.

Then set the site's own address, so canonical tags and the sitemap follow:

- `site` in `astro.config.mjs` → `https://sohoa.org`

No mail record is touched in this phase.

## What must never be proxied

Turning on Cloudflare's proxy (orange cloud) for any of these breaks mail,
because the proxy only forwards HTTP and mail does not travel over HTTP:

`mx` · `mail` · `smtp` · `imap` · `pop` · `webmail` · `email` · `ftp` · `*`

Cloudflare's free plan cannot proxy a wildcard anyway, so `*` will stay
DNS only on its own.

## Rolling back

Change the nameservers at OnlineNIC back to `ns1.ipower.com` and
`ns2.ipower.com`. The Newfold zone is still there and still correct.
