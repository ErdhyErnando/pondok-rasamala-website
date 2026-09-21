#!/usr/bin/env bash
# Route + redirect verification matrix. The single hard gate before DNS cutover.
# Usage: BASE=https://pondokrasamala.com ./scripts/verify-routes.sh
set -u
BASE="${BASE:-http://localhost:4321}"
PASS=0; FAIL=0; FAILED_URLS=()

check() { # $1=url $2=expected_status $3=expected_location(optional)
	local code loc
	code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$1")
	if [[ "$code" == "$2" ]]; then
		PASS=$((PASS+1))
	else
		FAIL=$((FAIL+1)); FAILED_URLS+=("$1 -> got $code, want $2")
		return
	fi
	if [[ -n "${3:-}" ]]; then
		loc=$(curl -s -o /dev/null -w "%{redirect_url}" "$BASE$1")
		if [[ "$loc" == *"$3"* ]]; then PASS=$((PASS+1));
		else FAIL=$((FAIL+1)); FAILED_URLS+=("$1 -> location $loc, want *$3*"); fi
	fi
}

VILLAS="kiriung bambu cendana dayak kihyang ilegole kisampang pinus puspa batarua gaharu mindi kilanang kimerak"
GLAMPING="salak gede pangrango papandayan burangrang malabar cikuray ciremey"
STATIC="/ /about-us/ /location/ /gallery/ /contact-us/ /villa/ /glamping/ /package/ /package/outbound/ /package/special-school-package/ /package/company-outing/ /package/family/ /attractions/ /blog/ /aula/ /campsite/ /type-leuit/ /type-damar/"

for p in $STATIC; do check "$p" 200; check "/en$p" 200; done
for v in $VILLAS; do check "/type-$v/" 200; check "/en/type-$v/" 200; done
for g in $GLAMPING; do check "/glamping-type-$g/" 200; check "/en/glamping-type-$g/" 200; done

check "/category/type-of-villa/" 301 "/villa/"
check "/category/glamping/" 301 "/glamping/"
check "/category/campsite/" 301 "/campsite/"
check "/outbound/" 301 "/package/outbound/"
check "/special-school-package/" 301 "/package/special-school-package/"
check "/dexter" 301 "/"
check "/author/adminpondok/" 301 "/"

echo "PASS=$PASS FAIL=$FAIL"
if [[ $FAIL -gt 0 ]]; then printf '%s\n' "${FAILED_URLS[@]}"; exit 1; fi
