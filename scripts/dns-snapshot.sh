#!/usr/bin/env bash
# Dump every DNS record that matters for sohoa.org from a given nameserver.
#
# Used to prove the zone at a new DNS host answers identically to the old one
# BEFORE the nameservers are switched over. Run it against each in turn and
# diff the output; anything that differs would break when the switch happens.
#
#   ./scripts/dns-snapshot.sh ns1.ipower.com > before.txt
#   ./scripts/dns-snapshot.sh <cloudflare-ns>  > after.txt
#   diff before.txt after.txt

set -u
NS="${1:?usage: dns-snapshot.sh <nameserver> [domain]}"
D="${2:-sohoa.org}"

q() { # q <type> <name>
  local out
  out=$(dig +norecurse +short "$1" "$2" "@$NS" 2>/dev/null | sort | tr '\n' ' ' | sed 's/ *$//')
  printf '%-6s %-22s %s\n' "$1" "$2" "${out:-(none)}"
}

echo "# $D via $NS"
echo
echo "## mail — these must never change"
q MX    "$D"
q TXT   "$D"
q A     "mx.$D"
q CNAME "dkim._domainkey.$D"
for h in mail smtp imap pop webmail email; do q A "$h.$D"; done
echo
echo "## website"
q A     "$D"
q A     "www.$D"
q CNAME "www.$D"
echo
echo "## other"
q A     "ftp.$D"
q A     "wildcard-probe-zzq7x9.$D"
q CNAME "_acme-challenge.$D"
q NS    "$D"
q AAAA  "$D"
q CAA   "$D"
