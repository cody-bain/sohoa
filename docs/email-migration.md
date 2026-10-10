# Scoping the email migration

Last of the three moves off Newfold. The website and DNS are done; the
mailboxes are what is still being paid for.

Prices below were checked in October 2026 and change often — confirm on each
provider's own pricing page before committing.

## What is known

Only two addresses appear anywhere on the website:

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

1. **How many mailboxes actually exist?** The site only references two, but
   the account may hold more that were never published.
2. **How much mail is stored, and how far back?** This sets how long the
   transfer takes and whether history is worth moving.
3. **Are there forwarders or aliases?** An address that merely forwards to
   someone's personal account is not a mailbox and migrates differently.
4. **Does anyone collect mail over POP?** POP clients often delete messages
   from the server after download, meaning the only copy of years of
   association correspondence may be on one person's laptop.
5. **Does the association send bulk email to residents?** This is the single
   biggest factor in choosing a provider — see the sending limits below.
6. **Who holds the passwords?** Mailbox migration needs the current
   credentials, and on an HOA board that knowledge tends to leave with the
   last treasurer.

## Options

Costs are for two mailboxes per year.

| Provider | Cost / year | Sending limit | Notes |
| -------- | ----------- | ------------- | ----- |
| **Migadu** Micro | ~$19 | ~20 messages/day | Priced per account, not per mailbox, so unlimited aliases. The daily cap rules out resident-wide email. |
| **Zoho Mail** free | $0 | modest | Up to five users on one domain, but no IMAP, so no Apple Mail or Outlook — webmail only. |
| **Zoho Mail** Lite | ~$24 | modest | Adds IMAP and real support. |
| **Fastmail** | ~$120 | generous | Simple and well supported. Confirm that a custom domain is included at the tier quoted. |
| **Google Workspace** Starter | ~$168 | ~2,000 recipients/day | Familiar to everyone, includes Drive and Meet, easiest handover between board members. |
| **Microsoft 365** Business Basic | ~$144 | generous | Comparable to Google; choose on which suite the board already knows. |

**Do not count on a nonprofit discount.** Google for Nonprofits requires
501(c)(3) status, and homeowners associations are normally 501(c)(4), which
does not qualify.

## Recommendation

It depends entirely on question 5 above.

- **If the association does not email all residents at once**, Migadu Micro
  at roughly $19/year is the best fit. Pricing per account rather than per
  mailbox means `info@`, `ARB@`, and a separate address per board role can
  all exist at no extra cost, which suits a body whose membership changes
  every year.
- **If the association does send newsletters or notices to every
  homeowner**, Migadu's ~20 messages per day will fail. Use Google Workspace
  Starter, or keep a cheap mailbox provider and send bulk mail through a
  service built for it.

Either way the bill should drop well below what the Newfold plan costs,
since that plan was mostly paying for web hosting that is no longer used.

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
