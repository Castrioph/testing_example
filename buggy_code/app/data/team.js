const Player = require('./player').Player;
const dataset_utils = require('./dataset_utils');
const constants = dataset_utils.datasetConstants;

/**
 * A class that represents a team in the fantasy football game
 */
class Team {

    /**
     * Creates an empty team object by providing a specified team name
     * @param {String} teamName
     */
    constructor(teamName) {
        this.teamName = teamName;
        this.listPlayers = new Array();
        this.teamValue = 0;
    }

    /**
     * Retrieves the team name from the team
     * @returns {String} The name of the team
     */
    getTeamName() {
        return this.teamName;
    }

    /**
     * Retrieves the money spent by the team on the players
     * @returns {Number} The amount in euros
     */
    getTeamValue() {
        return this.teamValue;
    }

    /**
     * Retrieves the players that have been signed by the team
     * @returns {Array<Player>} An array of Player objects that represent the players that play for the team
     */
    getPlayers() {
        return this.listPlayers.slice();
    }

    /**
     * Method employed to determine if a player already plays for the team
     * @param {Player} player The player to be checked
     * @returns {Boolean} true in case that the player is in the team, false otherwise
     */
    hasPlayer(player) {
        for (let playerInTeam of this.listPlayers) {
            if (playerInTeam.equals(player)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Gets the total number of players currently in the team
     * @returns {Number} the number of players in the team
     */
    getNumberPlayers() {
        return this.listPlayers.length;
    }

    /**
     * Adds a new player to the team
     * @param {Player} player The player to be added
     * @returns {Boolean} true in case that the player was successfully added to the team, false otherwise
     */
    addPlayer(player) {
        if (!this.hasPlayer(player)) {
            this.listPlayers.push(player);
            this.teamValue += player.getValue();
            return true;
        }
        return false;
    }

    /**
     * Adds a collection of new players to the team
     * @param {Array<Player>} listPlayers The collection of players to be added
     */
    addPlayers(listPlayers) {
        for (let player of listPlayers) {
            this.addPlayer(player);
        }
    }

    /**
     * Gets the team overall quality. It is calculated as the average of the players' quality
     * @returns {Number} representing the overall quality of the team
     */
    getTeamOverallQuality() {
        let listPlayers = this.listPlayers;
        let quality = 0;
        let overall = constants.overall_quality;
        for (let player of listPlayers) {
            quality += player.overall
        }
        return quality / listPlayers.length;
    }

    /**
     * Static method that gets a random valid tactic for a team: 3-4-3, 3-5-2, 3-6-1, 4-3-3, 4-4-2, 4-5-1, 5-3-2
     * @returns {String} representing a tactic in the format numberBackers-numberMidFielders-numberForwarders
     */
    static getRandomTeamTactic() {
        let availableTactics = ['3-4-3', '3-5-2', '3-6-1', '4-3-3', '4-4-2', '4-5-1', '5-3-2'];
        let randomIndex = parseInt(Math.random() * availableTactics.length);
        return availableTactics[randomIndex];
    }

    /**
     * Static method that gets a tactic and parses it to extract the number of defenders, midfielders, and attackers
     * @param {String} tactic A tactic in string format numberBackers-numberMifielders-numberForwarders
     * @returns {Array<Number>} An array of numbers with 3 positions: numberBackers, numberMidfielders, numberForwarders
     * @throws {Error} In case that the tactic is not specified in the format numberBackers-numberMidfielders-numberForwarders
     * @throws {Error} In case that the specified tactic employs more than 10 (+1) players
     */
    static _parseTactic(tactic) {
        //Split the string using the - character
        let playersPerPosition = tactic.split('-');
        //If more or less than 3 positions, the tactic is in incorrect format
        if (playersPerPosition.length !== 3) {
            throw Error('Tactics may only take 3 positions and got ' + playersPerPosition + ' with ' +
                playersPerPosition.length + ' elements');
        }
        //Parse tactic elements to numbers
        playersPerPosition = playersPerPosition.map(elem => parseInt(elem));
        //If any of the elements is not an integer, then raise error
        if (playersPerPosition.some(n => isNaN(n))) {
            throw Error('One of the specified positions is not a number');
        }

        return playersPerPosition;
    }

    /**
     * Gets a random number of players from a group of players
     * @param {Array<Player>} listPlayers The group of players to select from
     * @param {Number} numberPlayers The total number of players to select
     * @returns {Array<Player>} The group of players selected
     * @throws Error in case that there are not enough players to choose randomly
     */
    static _getRandomPlayers(listPlayers, numberPlayers) {
        if (listPlayers.length < numberPlayers) {
            throw Error('Insufficient players to make a team');
        }
        let selectedPlayers = new Array(); //Array used to put chosen players
        let copyListPlayers = listPlayers.slice(); //Array that copies the original pool of players. Used to dynamically remove players

        for (let playersAdded = 0; playersAdded < numberPlayers; playersAdded++) { //For each random player to select
            let indexPlayer = Math.floor(Math.random() * copyListPlayers.length); //Index of the random player to be chosen
            let player = copyListPlayers[indexPlayer];
            selectedPlayers.push(player);
        }
        return selectedPlayers;
    }

    /**
     * Static method employed to generate a random team (11 players) from a list of possible players
     * @param {Array<Player>} listPossiblePlayers The pool of players to choose from
     * @param {String} tactic The tactic that specifies the players per position. Follows the numberBackers-numberMidifielders-numberForwarders format
     * @param {String} teamName The name for the new team
     * @param {Number} teamValue The maximum budget to spend on adding players to the team
     * @returns {Team} A new team formed by random players
     * @throws {Error} In case that the tactic specifies less or more than 11 players, or if an invalid tactic is provided (<3 defenders, <3 midfielders, <1 attacker)
     */
    static createRandomTeam(listPossiblePlayers, tactic, teamName, teamValue) {

        let playersPerPosition = Team._parseTactic(tactic);
        let numberBackers = parseInt(playersPerPosition[0]);
        let numberMidfielders = parseInt(playersPerPosition[1]);
        let numberForwarders = parseInt(playersPerPosition[2]);
        let totalPlayersInTeam = numberBackers + numberForwarders + numberMidfielders + 1;
        if (totalPlayersInTeam != 11) {
            throw Error('The team must have exactly 11 players');
        }
        if (numberBackers < 3) {
            throw Error('At least 3 defenders are required');
        }
        if (numberMidfielders < 3) {
            throw Error('At least 3 midfielders are required');
        }
        if (numberForwarders < 1) {
            throw Error('At least 1 forward player is required');
        }

        /*Infinite loop employed to generate random teams. It will break in case that the team
        generated takes less than the maximum budget*/
        while (true) {
            let newTeam = new Team(teamName);

            let setPlayersInTeam = new Set(); //Used to check for players already employed

            for (let selectionConfiguration of [ //For loop employed to select goalkeeper, backers, midfielders, and forwarders
                [player => player.isGoalKeeper(), 1], //Elements to iterate over are an array of [functionToFilterPosition,numberPlayerstoChooseInPosition]
                [player => player.isBack(), numberBackers],
                [player => player.isMidfielder(), numberMidfielders],
                [player => player.isForward(), numberForwarders]
            ]) {
                let conditionFunction = selectionConfiguration[0];

                let numberOfPlayersToSelect = selectionConfiguration[1];

                let poolPlayers = listPossiblePlayers.filter(conditionFunction);

                let selectedPlayers = Team._getRandomPlayers(poolPlayers, numberOfPlayersToSelect);

                selectedPlayers.forEach(player => setPlayersInTeam.add(player.getID()));

                newTeam.addPlayers(selectedPlayers);
            }


        }

    }

}

exports.Team = Team;