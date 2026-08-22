#!/usr/bin/env bash
# Ölçüm sunucusunu TEMİZ başlatır.
# 🔴 `pkill -f "next start"` YETMEZ: çalışan sürecin adı `next-server`.
# 21 Ağustos'ta bu yüzden aylar öncesine ait bir derleme ölçüldü.
set -u
cd "$(dirname "$0")/.."
pkill -9 -f next-server 2>/dev/null || true
sleep 1
setsid nohup npx next start -p 3401 > /tmp/ll_site3401.log 2>&1 < /dev/null &
disown || true
for i in $(seq 1 30); do
  sleep 1
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 2 http://localhost:3401/ || true)
  if [ "$code" = "200" ]; then
    echo "sunucu ayakta · sunulan sürüm: $(curl -s http://localhost:3401/ | grep -o 'll-surum" content="[^"]*"' | head -1)"
    exit 0
  fi
done
echo "🔴 sunucu 30 saniyede açılmadı — /tmp/ll_site3401.log"
exit 1
