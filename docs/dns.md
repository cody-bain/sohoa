# sohoa.org DNS

## Who runs what

The domain is registered at **OnlineNIC**. Its DNS zone is hosted by
**Newfold Digital**, the company that owns both Network Solutions and
iPower — which is why the Network Solutions panel shows `ns1.ipower.com`
and `ns2.ipower.com` as the nameservers.

The same Newfold account also runs the domain's **email**. That matters:
cancelling the hosting plan would take the mailboxes with it.

## The zone before the website moved

Captured 2026-09-29, before any records were changed. Every record here was
created by Newfold's hosting and email setup.

| Type  | Name               | Points to                                            | Purpose |
| ----- | ------------------ | ---------------------------------------------------- | ------- |
| A     | `@`                | `66.96.149.32`                                       | old website |
| A     | `www`              | `66.96.149.32`                                       | old website |
| A     | `*`                | `66.96.130.75`                                       | wildcard, catches every other name |
| A     | `mx`               | `66.96.140.66`                                       | **inbound mail** |
| A     | `mx`               | `66.96.140.67`                                       | **inbound mail** |
| A     | `mail`             | `66.96.130.75`                                       | mail client hostname |
| A     | `smtp`             | `66.96.130.75`                                       | outgoing mail |
| A     | `imap`             | `66.96.130.75`                                       | mail retrieval |
| A     | `pop`              | `66.96.130.75`                                       | mail retrieval |
| A     | `webmail`          | `66.96.130.233`                                      | webmail |
| A     | `email`            | `66.96.130.233`                                      | webmail |
| A     | `ftp`              | `66.96.130.75`                                       | legacy file transfer |
| MX    | `@`                | `mx.sohoa.org`                                       | **mail routing** |
| TXT   | `@`                | `v=spf1 ip4:66.96.128.0/18 include:websitewelcome.com ?all` | **SPF** |
| CNAME | `dkim._domainkey`  | `cur.dkim.v.eigmail.net`                             | **DKIM signing** |
| CNAME | `_acme-challenge`  | `sohoa.org.letsencrypt.vdeck.eigdyn.com`             | Newfold's certificate renewal |

No DMARC, CAA or AAAA records exist.

## What the website move changes

Only the two records that point at the old website. Everything else is mail
or Newfold infrastructure and is left alone.

| Type  | Name  | Before          | After |
| ----- | ----- | --------------- | ----- |
| A     | `@`   | `66.96.149.32`  | Netlify's load balancer address |
| CNAME | `www` | (A record, same IP) | the site's `.netlify.app` address |

## Leaving Newfold entirely

Pointing the website elsewhere does not end the Newfold bill, because the
mailboxes still live there. Three things have to move first, in this order:

1. **Website** → Netlify. Done by the two record changes above.
2. **Email** → a new provider. The mailboxes have to be migrated and the
   `MX`, `SPF`, `DKIM` and `mail`/`smtp`/`imap`/`pop`/`webmail` records
   repointed. This is the real work, and it is what the bill is for.
3. **DNS** → somewhere free, such as Cloudflare. Change the nameservers at
   OnlineNIC and recreate whatever records still matter.

Only then is the hosting plan safe to cancel. Cancelling earlier loses the
mailboxes and, once the zone is deleted, takes the whole domain offline.
