SELECT * FROM (SELECT co.name AS mechanism, (
		SELECT _cog.uid
		FROM categoryoptiongroup _cog
		JOIN categoryoptiongroupsetmembers _cogsm ON _cog.categoryoptiongroupid = _cogsm.categoryoptiongroupid
		JOIN categoryoptiongroupmembers _cogm ON _cog.categoryoptiongroupid = _cogm.categoryoptiongroupid
		JOIN categoryoptioncombos_categoryoptions _coco ON _cogm.categoryoptionid = _coco.categoryoptionid
		WHERE _coco.categoryoptionid = co.categoryoptionid AND _cogsm.categoryoptiongroupsetid = 481662
		LIMIT 1
	) AS partnerId, (
		SELECT _cog.name
		FROM categoryoptiongroup _cog
		JOIN categoryoptiongroupsetmembers _cogsm ON _cog.categoryoptiongroupid = _cogsm.categoryoptiongroupid
		JOIN categoryoptiongroupmembers _cogm ON _cog.categoryoptiongroupid = _cogm.categoryoptiongroupid
		JOIN categoryoptioncombos_categoryoptions _coco ON _cogm.categoryoptionid = _coco.categoryoptionid
		WHERE _coco.categoryoptionid = co.categoryoptionid AND _cogsm.categoryoptiongroupsetid = 480936
		LIMIT 1
	) AS agency,
	o.name AS ou,
	co.startdate,
	co.enddate
	FROM dataelementcategoryoption co
	LEFT JOIN categoryoption_organisationunits coou ON coou.categoryoptionid = co.categoryoptionid
	LEFT JOIN organisationunit o ON o.organisationunitid = coou.organisationunitid
	WHERE co.name::text ~ '^\d{3}.*'::text AND o.uid = '${organisationUnitId}' ORDER BY co.name) as mechanismsForOrgUnit
WHERE partnerId = '${partnerId}';
