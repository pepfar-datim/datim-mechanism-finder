select ou.name, g.name, count(*)
from categories_categoryoptions cc
join dataelementcategory c on c.categoryid = cc.categoryid and c.name = 'Funding Mechanism'
join categoryoptiongroupmembers gm on gm.categoryoptionid = cc.categoryoptionid
join categoryoptiongroup g on g.categoryoptiongroupid = gm.categoryoptiongroupid
join categoryoptiongroupsetmembers sm on sm.categoryoptiongroupid = g.categoryoptiongroupid
join categoryoptiongroupset s on s.categoryoptiongroupsetid = sm.categoryoptiongroupsetid and s.name = 'Implementing Partner'
join categoryoption_organisationunits co on co.categoryoptionid = cc.categoryoptionid
join organisationunit ou on ou.organisationunitid = co.organisationunitid
group by ou.name, g.name
