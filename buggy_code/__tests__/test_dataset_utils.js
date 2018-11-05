const extractDataFromRawJSON = require('../app/data/json_reader').extractDataFromRawJSON;
const readJSONData = require('../app/data/json_reader').readJSONData;
const Team = require('../app/data/team').Team;
const Player = require('../app/data/player').Player;
test('Test readJSONData 1: Valid JSON', () => {
    let jsonObj = readJSONData('./data/sample.json');
    //Check that exacly 3 objects were read
    expect(jsonObj.length).toBe(3);
    expect(jsonObj[0].Name).toBe('Cristiano Ronaldo');
    expect(jsonObj[0].Age).toBe(32);
    expect(jsonObj[0].Overall).toBe(94);
    expect(jsonObj[0].Nationality).toBe('Portugal');
    expect(jsonObj[0].Value).toBe('€95.5M');
    expect(jsonObj[0].Club).toBe('Real Madrid CF');
    expect(jsonObj[0]['Preferred Positions']).toBe('ST LW');

    expect(jsonObj[1].Name).toBe('L. Messi');
    expect(jsonObj[1].Age).toBe(30);
    expect(jsonObj[1].Overall).toBe(93);
    expect(jsonObj[1].Nationality).toBe('Argentina');
    expect(jsonObj[1].Value).toBe('€105M');
    expect(jsonObj[1].Club).toBe('FC Barcelona');
    expect(jsonObj[1]['Preferred Positions']).toBe('RW');

    expect(jsonObj[2].Name).toBe('Neymar');
    expect(jsonObj[2].Age).toBe(25);
    expect(jsonObj[2].Overall).toBe(92);
    expect(jsonObj[2].Nationality).toBe('Brazil');
    expect(jsonObj[2].Value).toBe('€123M');
    expect(jsonObj[2].Club).toBe('Paris Saint-Germain');
    expect(jsonObj[2]['Preferred Positions']).toBe('LW');
});

test('Test readJSONData 2: Error JSON', () => {
    expect(f => readJSONData('./data/sample_error.json')).toThrowError(SyntaxError)
});

test('Test readJSONData 3: No file found', () => {
    expect(f => readJSONData('./data/idontexist.json')).toThrowError(Error);
});

test('Test extractDataFromRawJSON', () => {
    let jsonObjects = readJSONData('./data/sample.json');
    let arrayPlayers = extractDataFromRawJSON(jsonObjects);
    expect(arrayPlayers.length).toBe(3);
    expect(arrayPlayers[0].getName()).toBe('Cristiano Ronaldo');
    expect(arrayPlayers[0].getAge()).toBe(32);
    expect(arrayPlayers[0].getQuality()).toBe(94);
    expect(arrayPlayers[0].getNationality()).toBe('Portugal');
    expect(arrayPlayers[0].getValue()).toBe(95500000);
    expect(arrayPlayers[0].getTeam()).toBe('Real Madrid CF');
    expect(arrayPlayers[0].isForward()).toBe(true);
    expect(arrayPlayers[0].isMidfielder()).toBe(true);
    expect(arrayPlayers[0].isBack()).toBe(false);
});

test('Test team_constructor: Default team', () => {
    let name = 'Testing';
    let team = new Team(name);
    expect(team.getTeamName()).toBe('Testing');
    expect(team.getTeamValue()).toBe(0);
    expect(team.getPlayers()).toEqual([]);
    expect(team.getNumberPlayers()).toBe(0);
});

test('Test team_constructor: Add player', () => {
    let name = 'Testing';
    let team = new Team(name);
    let player = new Player(5);
    player.value = 1;
    player.name = 'Miguel';
    team.addPlayer(player);
    expect(team.getTeamName()).toBe('Testing');
    expect(team.getTeamValue()).toBe(1);
    expect(team.getNumberPlayers()).toBe(1);
    expect(team.hasPlayer(player)).toBe(true);
});

test('Test team_constructor: Add players at the same time', () => {
    let name = 'Testing';
    let team = new Team(name);
    let player = new Player(5);
    player.value = 1;
    player.name = 'Miguel';
    let second_player = new Player(6);
    second_player.value = 2;
    second_player.name = 'Marcos';
    let players = [player,second_player];
    team.addPlayers(players);
    expect(team.getTeamName()).toBe('Testing');
    expect(team.getTeamValue()).toBe(3);
    expect(team.getNumberPlayers()).toBe(2);
    expect(team.hasPlayer(player)).toBe(true);
    expect(team.hasPlayer(second_player)).toBe(true);
});