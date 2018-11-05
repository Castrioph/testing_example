/**
 * Object that containst the constants to access the fields of the JSONs parsed from the database
 */
var constants = {
    name : 'Name',
    age : 'Age',
    country: 'Nationality',
    club: 'Club',
    overall_quality : 'Overall',
    market_value : 'Value',
    player_id : 'ID',
    acceleration: 'Acceleration',
    aggression: 'Aggression',
    agility: 'Agility',
    balance: 'Balance',
    ball_control: 'Ball control',
    composure: 'Composure',
    crossing: 'Crossing',
    curve: 'Curve',
    dribbling: 'Dribbling',
    finishing: 'Finishing',
    free_kick_accuracy: 'Free kick accuracy',
    goalkeeper_diving: 'GK diving',
    goalkeeper_handling: 'GK handling',
    goalkeeper_kicking: 'GK kicking',
    goalkeeper_positioning: 'GK positioning',
    goalkeeper_reflexes: 'GK reflexes',
    heading_accuracy: 'Heading accuracy',
    interceptions: 'Interceptions',
    jumping: 'Jumping',
    long_passing: 'Long passing',
    long_shots: 'Long shots',
    marking: 'Marking',
    penalties: 'Penalties',
    positioning: 'Positioning',
    reactions: 'Reactions',
    short_passing: 'Short passing',
    shot_power: 'Shot power',
    sliding_tackle: 'Sliding tackle',
    sprint_speed: 'Spring speed',
    stamina: 'Stamina',
    standing_tackle: 'Standing tackle',
    strength: 'Strength',
    vision: 'Vision',
    volleys: 'Volleys',
    preferred_positions: 'Preferred Positions',
    center_attacking_midfielder: 'CAM',
    center_back: 'CB',
    center_defensive_midfielder: 'CDM',
    center_forward: 'CF',
    center_midfielder: 'CM',
    left_attacking_midfielder: 'LAM',
    left_back: 'LB',
    left_center_back: 'LCB',
    left_center_midfielder: 'LCM',
    left_defensive_midfielder: 'LDM',
    left_forward: 'LF',
    left_midfielder: 'LM',
    left_striker: 'LS',
    left_wing: 'LW',
    left_wing_back: 'LWB',
    right_attacking_midfielder: 'RAM',
    right_back: 'RB',
    right_center_back: 'RCB',
    right_center_midfielder: 'RCM',
    right_defensive_midfielder: 'RDM',
    right_forward: 'RF',
    right_midfielder: 'RM',
    right_striker: 'RS',
    right_wing: 'RW',
    right_wing_back: 'RWB',
    striker: 'ST',
    goalkeeper: 'GK'
};

/**
 * Helper function employed to check if any of the specified positions is that of a forwarder
 * @param {Set<String>} preferredPositions A set containing strings representing the player's positions
 * @returns {Boolean} true in case that the set contains a forwarder position
 */
function isForward(preferredPositions){
    if(preferredPositions.has(constants.center_forward) || 
    preferredPositions.has(constants.left_forward) || 
    preferredPositions.has(constants.right_forward) ||
    preferredPositions.has(constants.striker) || 
    preferredPositions.has(constants.right_striker) || 
    preferredPositions.has(constants.left_striker)){
        return true;
    }
    return false;
    
}

/**
 * Helper function employed to check if any of the specified positions is that of a defender
 * @param {Set<String>} preferredPositions A set containing strings representing the player's positions
 * @returns {Boolean} true in case that the set contains a defender position
 */
function isBack(preferred_positions){
    if(preferred_positions.has(constants.center_back) || 
    preferred_positions.has(constants.left_back) || 
    preferred_positions.has(constants.left_center_back) ||
    preferred_positions.has(constants.left_wing_back) || 
    preferred_positions.has(constants.right_back) || 
    preferred_positions.has(constants.right_center_back) ||
    preferred_positions.has(constants.right_wing_back)){
        return true;
    }
    return false;
}

/**
 * Helper function employed to check if any of the specified positions is that of a midfielder
 * @param {Set<String>} preferredPositions A set containing strings representing the player's positions
 * @returns {Boolean} true in case that the set contains a midfielder position
 */
function isMidfielder(preferred_positions){
    if(preferred_positions.has(constants.center_attacking_midfielder) || 
    preferred_positions.has(constants.center_defensive_midfielder) || 
    preferred_positions.has(constants.center_midfielder) || 
    preferred_positions.has(constants.left_attacking_midfielder) || 
    preferred_positions.has(constants.left_center_midfielder) || 
    preferred_positions.has(constants.left_defensive_midfielder) || 
    preferred_positions.has(constants.left_midfielder) || 
    preferred_positions.has(constants.right_attacking_midfielder) || 
    preferred_positions.has(constants.right_center_midfielder) || 
    preferred_positions.has(constants.right_defensive_midfielder) || 
    preferred_positions.has(constants.right_midfielder) || 
    preferred_positions.has(constants.right_wing) || 
    preferred_positions.has(constants.left_wing)){
        return true;
    }
    return false;
}

/**
 * Helper function employed to check if any of the specified positions is that of a goalkeeper. 
 * @param {Set<String>} preferredPositions A set containing strings representing the player's positions
 * @returns {Boolean} true if the player cannot play as any of the other positions, false otherwise
 */
function isGoalKeeper(preferred_positions){
    if(preferred_positions.has(constants.goalkeeper)){
        return true;
    } else if(!isMidfielder(preferred_positions) && !isBack(preferred_positions) && !isForward(preferred_positions)){
        return true;
    }
    return false;
}

exports.datasetConstants = constants;
exports.isGoalKeeper = isGoalKeeper;
exports.isBack = isBack;
exports.isForward = isForward;
exports.isMidfielder = isMidfielder;