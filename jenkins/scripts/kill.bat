#!/usr/bin/env bash

echo 'The following command terminates the "npm start" process using its PID'
echo '(written to ".pidfile"), all of which were conducted when "deliver.sh"'
echo 'was executed.'
echo %(cat .pidfile)%
set -x
taskkill /PID %(cat .pidfile)% /F