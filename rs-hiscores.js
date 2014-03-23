/*
*	Copyright 2014 Volunteers
*
*	This program is free software: you can redistribute it and/or modify
*	it under the terms of the GNU General Public License as published by
*	the Free Software Foundation, either version 3 of the License, or
*	(at your option) any later version.
*
*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*	GNU General Public License for more details.
*
*	You should have received a copy of the GNU General Public License
*	along with this program.  If not, see <http://www.gnu.org/licenses/gpl.txt> .
*/

var request = require('request');

var BASE_SKILLS = [ 
	'overall', 'attack', 'defence', 'strength', 'hitpoints', 'ranged',
	'prayer', 'magic', 'cooking', 'woodcutting', 'fletching', 'fishing',
	'firemaking', 'crafting', 'smithing', 'mining', 'herblore', 'agility', 
	'thieving', 'slayer', 'farming', 'runecraft', 'hunter', 'construction'
];

var urls = {
	'osrs': 'http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=',
	'rs3': 'http://hiscore.runescape.com/index_lite.ws?player='
};

var skills = {
	'osrs': BASE_SKILLS,
	'rs3': BASE_SKILLS.concat('summoning', 'dungeoneering', 'divination')
};

module.exports.lookup = function(player, game, callback) {
	if (!urls.hasOwnProperty(game)) {
		game = 'rs3';
	}
	var url = urls[game].concat(encodeURIComponent(player));
	request(url, function(err, res, body) {
		if (err) {
			return callback(err);
		}
		var statusCode = res.statusCode;
		switch(statusCode) {
			case 200:
				return callback(null, parseStats(body,skills[game]));
			case 404:
				return callback(new Error('Player not found'));
			default:
				return callback(new Error(statusCode));
		}
	});
};

function parseStats(raw, skillsList) {
	var stats = raw.split('\n').slice(0, skillsList.length);
	var statsObj = { };
	stats.forEach(function(stat, index) {
		var chunk = stat.split(',');
		statsObj[skillsList[index]] = {
			rank: +chunk[0],
			level: +chunk[1],
			xp: +chunk[2]
		};
	});
	return statsObj;
}