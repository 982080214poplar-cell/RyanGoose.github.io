#!/bin/bash
cd "$(dirname "$0")"

python3 -m http.server 5180 &
SERVER_PID=$!

sleep 2
open http://localhost:5180

echo "Server is running at http://localhost:5180"
echo "Do not close this window while using the site."

wait $SERVER_PID