const dataset_utils = require('./dataset_utils');
const constants = dataset_utils.datasetConstants;
const isGoalkeeper = dataset_utils.isGoalKeeper;
const isMidfielder = dataset_utils.isMidfielder;
const isForward = dataset_utils.isForward;
const isBack = dataset_utils.isBack;

/**
 * A class that holds the information of a player profile
 */
class Player {
    /**
     * Minimum constructor employed to create an empty player, just consisting of a player id
     * @param {Number} playerId
     */
    constructor(playerId) {
        this.id = playerId;
    }

    /**
     * Method employed to generate a Player object from a JSON object parsed from a file/database/external source
     * @param {Number} playerId The ID to be assigned to the newly created player
     * @param {Object} jsonObject The JSON object used to parse the data from
     * @returns {Player} A new Player object filled with the relevant information from the JSON object
     */
    static fromDatasetJSONObject(playerId, jsonObject) {
        let player = new Player(playerId);
        player.id = jsonObject[constants.player_id];
        player.name = jsonObject[constants.name];
        player.country = jsonObject[constants.country];
        player.age = jsonObject[constants.age];
        player.club = jsonObject[constants.club];
        player.overall = jsonObject[constants.overall_quality];
        let value = jsonObject[constants.market_value];
        let letter = value.substr(value.length - 1, value.length);
        value = value.substr(1, value.length - 2);
        if (letter == 'M') {
            player.value = parseFloat(value) * 1000000;
        } else {
            player.value = parseFloat(value) * 1000;
        }
        let preferredPositions = new Set(jsonObject[constants.preferred_positions].split(' '));
        player._isGoalKeeper = isGoalkeeper(preferredPositions);
        player._isBack = isBack(preferredPositions);
        player._isForward = isForward(preferredPositions);
        player._isMidfielder = isMidfielder(preferredPositions);
        return player;
    }


    /**
     * Returns if the player can play as a goalkeeper
     * @returns {Boolean} true in case that the player may play as a goalie, false otherwise
     */
    isGoalKeeper() {
        return this._isGoalKeeper;
    }

    /**
     * Returns if the player can play as a forward
     * @returns {Boolean} true in case that the player may play as a forward/striker, false otherwise
     */
    isForward() {
        return this._isForward;
    }

    /**
     * Returns if the player can play as a defender
     * @returns {Boolean} true in case that the player may play as a defender, false otherwise
     */
    isBack() {
        return this._isBack;
    }

    /**
     * Returns if the player can play as a midfielder
     * @returns {Boolean} true in case that the player may play as a midfielder, false otherwise
     */
    isMidfielder() {
        return this._isMidfielder;
    }

    /**
     * Gets the market value for the player
     * @returns {Number} the market value of the player
     */
    getValue() {
        return this.value;
    }

    /**
     * Gets the nationality of the player
     * @returns {String} with the nationality of the player
     */
    getNationality() {
        return this.country;
    }

    /**
     * Gets the previous club of the player
     * @returns {String} with the previous club of the player
     */
    getTeam() {
        return this.club;
    }

    /**
     * Gets the age of the player
     * @returns {Number} the age of the player
     */
    getAge() {
        return this.age;
    }

    /**
     * Gets the name of the player
     * @returns {String} the name of the player
     */
    getName() {
        return this.name;
    }

    /**
     * Gets the ID of the player
     * @returns {Number} the id of the player
     */
    getID() {
        return this.id;
    }

    /**
     * Gets the quality of the player
     * @returns {Number} the overall quality of the player
     */
    getQuality() {
        return this.overall;
    }

    /**
     * Checks if the Player is the same than another Player. Both must have the same ID and must be of the same object type
     * @param {Object} obj The other object to compare with
     * @returns {Boolean} true if both represent the same player, false otherwise
     */
    equals(obj) {
        if (typeof(obj) == typeof(this) && this.getID() == obj.getID()) {
            return true;
        }
        return false;
    }
}

exports.Player = Player;