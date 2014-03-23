# rs-hiscores

A Node.js module to retrieve data from RuneScape's hiscores.

## Install
```
$ npm install rs-hiscores
```

## Examples
```javascript
var rsHiscores = require('rs-hiscores');

rsHiscores.lookup('zezima', 'rs3', function(err, stats) {
	var overall = stats.overall;
	var slayer = stats.slayer;
	
	if (err) {
		return console.error(err);
	}
	
	console.log('Zezima\'s is rank', overall.rank, 'at level', overall.level,
		'with', overall.xp, 'experience points.');
		
	console.log('He\'s also rank', slayer.rank, 'in Slayer at level', slayer.level,
		'with', slayer.xp, 'experience points.');
		
	//	Zezima's is rank 123 at level 2595 with 2058022154 experience points.
	//	He's also rank 3255 in Slayer at level 99 with 25349509 experience points.
});
```

## API
### .lookup(player, game, callback)
Looks up a player's stats.

`player` should be the exact display name
of the player.
`game` should either be `rs3` for RuneScape 3 hiscores, or `osrs` for 
Oldschool RuneScape hiscores. If not the lookup will default to RuneScape 3
hiscores.

`callback` returns an object with
each a property for each skill. And each skill object has the properties `rank`,
`level`, and `xp`. An example of such an object return would be:
```javascript
{
	overall: {
		rank: 1123,
		level: 2000,
		xp: 100234567
	},
	
	attack: {
		rank: 100,
		level: 99,
		xp: 13134000
	},
	
	strength: {
		rank: 1,
		level: 99,
		xp: 200000000
	},
	
	and so on...
}
```

License
-----------
Copyright 2014 Volunteers

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see [http://www.gnu.org/licenses/].
