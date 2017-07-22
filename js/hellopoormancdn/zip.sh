#! /bin/bash

if [ $# -eq 0 ]; then
	echo "Error: Version must be provided."
	exit 0
fi

7z a -x!node_modules -x!zip.sh "helloawseb-v$1.zip" *
