#!/usr/bin/env python3

# ====================================

import os
import json
import requests
import re

# ====================================

if os.environ.get('DHIS_BASEURL'):
    api = os.environ['DHIS_BASEURL'] + '/api/'
    credentials = (os.environ['DHIS_USERNAME'], os.environ['DHIS_PASSWORD'])
else:
    try:
        config = json.load(open('/opt/dhis2/dish.json', 'r'))
        api = config['dhis']['baseurl'] + '/api/'
        credentials = (config['dhis']['username'], config['dhis']['password'])
    except FileNotFoundError:
        print('/opt/dhis2 files not found')

r = requests.get(api + 'categoryOptions?paging=false' +
                 '&fields=id,name,categoryOptionGroups[id,name,code]',
                 auth=credentials)

categoryOptions = r.json()
multiple_list = []

for co in categoryOptions['categoryOptions']:
    agencyCount = 0
    for cog in co['categoryOptionGroups']:
        if 'code' in cog:
            if re.match('^Agency_.+', cog['code']):
                agencyCount += 1
        if agencyCount > 1:
            multiple_list.append(co['id'])
            break
print("','".join(multiple_list))
