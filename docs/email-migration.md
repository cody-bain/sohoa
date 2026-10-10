# Scoping the email migration

Last of the three moves off Newfold. The website and DNS are done; the
mailboxes are what is still being paid for.

Prices below were checked in October 2026 and change often — confirm on each
provider's own pricing page before committing.

## The mailboxes

Five, read from the Newfold panel on 2026-10-10:

| Mailbox | Used | Quota |
| ------- | ---- | ----- |
| `info@sohoa.org` | 415.4 MB | 512 MB — **81% full** |
| `treasurer@sohoa.org` | 204.0 MB | 512 MB |
| `arb@sohoa.org` | 179.0 MB | 512 MB |
| `billing@sohoa.org` | 98.7 MB | 512 MB |
| `residents@sohoa.org` | 26.9 MB | 512 MB |
| **Total** | **924 MB** | |

Small enough that an IMAP transfer runs in well under an hour.

`info@` being at 81% of its quota is a problem today, independent of any
migration. Newfold caps each mailbox at 512 MB; pooled-storage providers do
not.

Only two of the five appear anywhere on the website:

| Address | Used for |
| ------- | -------- |
| `info@sohoa.org` | general contact, disclosure packets, complaints, and **all nine board members** |
| `ARB@sohoa.org` | architectural change requests |

Board members do not have their own mailboxes. Every one of them is reached
through `info@sohoa.org` with a subject tag, for example
`mailto:info@sohoa.org?Subject=Attn:%20Jason%20Hamilton`. Whoever reads
`info@` sorts the mail by subject line.

That makes this a one- or two-mailbox migration rather than a nine-person
one, which changes both the cost and the effort considerably.

Current mail infrastructure, all Newfold:

| Service | Host |
| ------- | ---- |
| Inbound (`MX`) | `mx.sohoa.org` → `66.96.140.66` / `.67` |
| SMTP / IMAP / POP | `66.96.130.75` |
| Webmail | `66.96.130.233` |
| DKIM signing | `cur.dkim.v.eigmail.net` |
| SPF | `v=spf1 ip4:66.96.128.0/18 include:websitewelcome.com ?all` |

## What still has to be found out

These come from the Newfold control panel, not from DNS, and they decide
which provider makes sense:

1. **Does `residents@` send to all homeowners?** The deciding question —
   see sending limits below.
2. **How far back does the mail go?** The sizes are known; the age of the
   archive decides how much of it is an association record worth keeping.
3. **Are there forwarders or aliases?** An address that merely forwards to
   someone's personal account is not a mailbox and migrates differently.
4. **Does anyone collect mail over POP?** POP clients often delete messages
   from the server after download, meaning the only copy of years of
   association correspondence may be on one person's laptop.
5. **Who holds the passwords?** Mailbox migration needs the current
   credentials, and on an HOA board that knowledge tends to leave with the
   last treasurer.

## Options

Costs are for five mailboxes per year.

| Provider | Cost / year | Storage | Outgoing limit | Notes |
| -------- | ----------- | ------- | -------------- | ----- |
| **Migadu** Micro | $19 | 5 GB pooled | 20/day | Priced per account, so five mailboxes cost the same as one. Soft limits; mail never bounces for full storage. |
| **Migadu** Mini | $90 | 30 GB pooled | 100/day | Same, with room for resident-wide email. |
| **Zoho Mail** free | $0 | 5 GB/user | modest | Exactly five users allowed, so no headroom. No IMAP — webmail only. |
| **Zoho Mail** Lite | ~$60 | 5 GB/user | modest | Adds IMAP. |
| **Fastmail** | ~$300 | varies | generous | Confirm a custom domain is included at the tier quoted. |
| **Google Workspace** Starter | ~$420 | 30 GB/user | ~2,000/day | Familiar, includes Drive and Meet. |
| **Microsoft 365** Business Basic | ~$360 | 50 GB/user | generous | Comparable to Google. |

**Do not count on a nonprofit discount.** Google for Nonprofits requires
501(c)(3) status, and homeowners associations are normally 501(c)(4), which
does not qualify.

## Recommendation

**Migadu Micro, $19/year**, unless `residents@` sends to every homeowner.

Pricing is per account rather than per mailbox, so all five cost the same as
one, and new role addresses are free — which suits a body whose membership
changes every year. The 924 MB of existing mail sits comfortably inside the
5 GB pool, and pooled storage removes the 512 MB per-mailbox cap that
`info@` is already pressing against.

If the association does email all homeowners at once, 20 outgoing messages a
day will fail on the first newsletter. Use Migadu Mini at $90/year, or
Google Workspace, or keep a cheap mailbox provider and send bulk mail
through a service built for it.

### Why not iCloud+

It is the cheapest option on paper and the wrong shape for an association.
All the addresses on a domain deliver into the single mailbox of the Apple
Account that owns them, so the five role mailboxes would collapse into one.
Separate mailboxes require sharing the domain with up to five other people,
each using their own Apple Account — which puts association mail inside
board members' personal inboxes, where it leaves with them. Apple also
states that Custom Email Domain does not support managed accounts, so there
is no admin, no delegation and no reassigning a mailbox when an officer
steps down.

## How the migration would go

Unlike the DNS move, this one has a real cutover window. Mail arriving
during the switch can land at either provider.

1. **Create the mailboxes at the new provider** and add its SPF and DKIM
   records to Cloudflare DNS, without touching `MX`. Nothing changes yet.
2. **Copy the existing mail across** with an IMAP transfer tool, which most
   providers supply. The old mailboxes stay live and keep receiving.
3. **Test** by sending to a temporary address at the new provider and
   confirming delivery, SPF alignment and DKIM signing.
4. **Lower the `MX` TTL** to five minutes a day ahead, so the switch takes
   effect quickly and can be reversed quickly.
5. **Switch `MX`** to the new provider and update SPF. From here new mail
   arrives at the new host; a little may still reach the old one.
6. **Run a second IMAP sync** after a day or two to collect stragglers.
7. **Repoint `mail`, `smtp`, `imap`, `pop`, `webmail`** at the new provider,
   or delete them if its clients use their own hostnames.
8. **Add DMARC**, which the domain currently lacks. Worth doing once SPF and
   DKIM are settled at the new provider.
9. **Keep the Newfold account for at least a month** after the switch before
   cancelling, as the fallback.

## Risks

- **Losing history.** The mailboxes may hold years of association
  correspondence. Virginia's Property Owners' Association Act requires
  associations to keep their books and records, so treat the archive as
  something to preserve, not discard. Copy it before cancelling anything.
- **Cancelling too early.** Ending the Newfold plan deletes the mailboxes
  and their contents. It is the very last step.
- **Account ownership.** Register the new account to the association, using
  a role address and a password held by more than one officer. An account
  tied to one volunteer's personal identity becomes a problem the moment
  they leave the board. This rules out things like iCloud custom domains,
  which are bound to a personal Apple ID.
- **Deliverability.** Changing providers changes which servers send mail for
  the domain. SPF and DKIM have to be right on the first day or messages
  start landing in spam.
