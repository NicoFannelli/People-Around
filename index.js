
module.exports = function Ppl(mod) {
	let enabled   = true;
		let people = [];


	mod.command.add('ppl', () => {
		enumerar();
	});
	
	mod.command.add('pplmore', () => {
		senumerar();
	});
	
	mod.command.add('pplon', () => {
		enabled = !enabled;
		mod.command.message('Module ' + (enabled ? 'enabled' : 'disabled'));
	});

	mod.hook('S_LOAD_TOPO', 3, packet => {
		people = [];
	});	

	mod.hook('S_SPAWN_USER', 17, (packet) => {

		people.push({
			gameId: packet.gameId,
			loc: packet.loc,
			w: packet.w,
			guild: packet.guildName,
			name: packet.name,
		})
	})	

	mod.hook('S_DESPAWN_USER', 3, (packet) => {
		people = people.filter(m => m.gameId != packet.gameId);
	})	

	function enumerar(){
		mod.command.message('----------------');
		for(let person of people) {
		mod.command.message(person.name +' / Guild: ' + person.guild);
		}
	};		
	
	function senumerar(){
		mod.command.message('----------------');
		for(let person of people) {
		mod.command.message(person.name +' / Guild: ' + person.guild +' / Id: ' + person.gameId +' / Loc: ' + person.loc);
		}
	};	

}
