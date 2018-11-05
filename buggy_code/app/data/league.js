const Team = require('./team').Team;

/**
 * A class that represents a fantasy football league.
 */
class League{
    /**
     * Class constructor for the league
     * @param {Number} numberOfTeams An integer that represents the number of teams that should participate in the league
     */
    constructor(numberOfTeams){
        this.listTeams = new Array();
        this.numberOfTeams = numberOfTeams;
        this.calendar = null;
        this.leagueTable = null;
    }

    /**
     * Method employed to add a team to the current league.
     * @param {Team} team The team to be added to the league
     * @throws {Error} In case that the league is already full
     */
    addTeam(team){
        if(this.listTeams.length==this.numberOfTeams){
            throw Error('The league is full with teams!');
        }
        this.listTeams.push(team);
    }

    /*
    * TODO: Creates a calendar that determines when teams play against each other.
    * Each team should play another team twice: First home, and then away
    * A team can only re-match another team when it has matched all other teams (e.g., 2 rounds league)
    * A team must play the same number of away and home matches throughout the league
    */
    createCalendar(){
        this.calendar = [];
    }

    /**
     * Creates a League object based on a pool of players, a number of teams to compete, and a minimum and maximum team value
     * @param {Array<Player>} playerData An array of player profiles that will be selected to generate the teams
     * @param {Number} numberOfTeams An integer that delimits the number of teams that will compete in the league
     * @param {Number} minTeamValue The minimum amount of euros that will be spent by clubs on forming the team
     * @param {Number} maxTeamValue The maximum amount of euros that will be spent by clubs on forming the team
     * @returns {League} The league that has been created
     * @throws {Error} In case that there are not enough players to create the desired number of teams, or in case that the minimum team value is higher than the maximum team value 
     */
    static createRandomLeague(playerData,numberOfTeams,minTeamValue,maxTeamValue){
        
        if(playerData.length < numberOfTeams * 11){
            throw Error('Not enough players to create the league');
        }
        
        let newLeague = new League(numberOfTeams);
        let playersInLeague = new Set();
        for(let i=0;i<numberOfTeams;i++){ //For each team to be created
            //Filter players that are currently available
            let playersAvailable = playerData.filter(player=>!playersInLeague.has(player));
            //Select random team budget between the minimum and maximum specified as parameter
            let teamValue = Math.random() * (maxTeamValue-minTeamValue) + minTeamValue;
            //Create the team randomly
            let team = Team.createRandomTeam(playersAvailable,Team.getRandomTeamTactic(),"Team"+i,teamValue);
            //Add the team to the league
            newLeague.addTeam(team);
        }
        return newLeague;
    }
}

exports.League = League;