/**
 * F1 Drivers Database - 2025 Season
 * 
 * Complete performance data for all 20 Formula 1 drivers including
 * base pace, skills, and consistency ratings.
 */

const F1_DRIVERS = {
    'VER': { 
        name: 'Max Verstappen', 
        team: 'Red Bull', 
        basePace: 93.191, 
        baseConfidence: 92, 
        qualiSkill: 0.95, 
        consistency: 0.92 
    },
    'NOR': { 
        name: 'Lando Norris', 
        team: 'McLaren', 
        basePace: 93.429, 
        baseConfidence: 88, 
        qualiSkill: 0.90, 
        consistency: 0.85 
    },
    'PIA': { 
        name: 'Oscar Piastri', 
        team: 'McLaren', 
        basePace: 93.232, 
        baseConfidence: 85, 
        qualiSkill: 0.88, 
        consistency: 0.87 
    },
    'LEC': { 
        name: 'Charles Leclerc', 
        team: 'Ferrari', 
        basePace: 93.419, 
        baseConfidence: 87, 
        qualiSkill: 0.93, 
        consistency: 0.82 
    },
    'SAI': { 
        name: 'Carlos Sainz', 
        team: 'Ferrari', 
        basePace: 94.497, 
        baseConfidence: 82, 
        qualiSkill: 0.85, 
        consistency: 0.88 
    },
    'RUS': { 
        name: 'George Russell', 
        team: 'Mercedes', 
        basePace: 93.833, 
        baseConfidence: 84, 
        qualiSkill: 0.89, 
        consistency: 0.90 
    },
    'HAM': { 
        name: 'Lewis Hamilton', 
        team: 'Mercedes', 
        basePace: 94.021, 
        baseConfidence: 86, 
        qualiSkill: 0.91, 
        consistency: 0.86 
    },
    'ALO': { 
        name: 'Fernando Alonso', 
        team: 'Aston Martin', 
        basePace: 94.784, 
        baseConfidence: 79, 
        qualiSkill: 0.87, 
        consistency: 0.91 
    },
    'STR': { 
        name: 'Lance Stroll', 
        team: 'Aston Martin', 
        basePace: 95.318, 
        baseConfidence: 72, 
        qualiSkill: 0.75, 
        consistency: 0.78 
    },
    'GAS': { 
        name: 'Pierre Gasly', 
        team: 'Alpine', 
        basePace: 95.682, 
        baseConfidence: 75, 
        qualiSkill: 0.82, 
        consistency: 0.84 
    },
    'OCO': { age: 28, experience: 8, nationality: 'FRA' },
    'TSU': { age: 24, experience: 4, nationality: 'JPN' },
    'MAG': { age: 32, experience: 9, nationality: 'DEN' },
    'STR': { age: 26, experience: 8, nationality: 'CAN' },
    'ZHO': { age: 25, experience: 3, nationality: 'CHN' },
    'SAR': { age: 24, experience: 2, nationality: 'USA' }
}; { 
        name: 'Esteban Ocon', 
        team: 'Alpine', 
        basePace: 95.891, 
        baseConfidence: 73, 
        qualiSkill: 0.80, 
        consistency: 0.85 
    },
    'TSU': { 
        name: 'Yuki Tsunoda', 
        team: 'RB', 
        basePace: 95.445, 
        baseConfidence: 71, 
        qualiSkill: 0.83, 
        consistency: 0.79 
    },
    'RIC': { 
        name: 'Daniel Ricciardo', 
        team: 'RB', 
        basePace: 95.678, 
        baseConfidence: 74, 
        qualiSkill: 0.86, 
        consistency: 0.82 
    },
    'HUL': { 
        name: 'Nico Hulkenberg', 
        team: 'Haas', 
        basePace: 95.345, 
        baseConfidence: 76, 
        qualiSkill: 0.84, 
        consistency: 0.89 
    },
    'MAG': { 
        name: 'Kevin Magnussen', 
        team: 'Haas', 
        basePace: 95.567, 
        baseConfidence: 73, 
        qualiSkill: 0.78, 
        consistency: 0.81 
    },
    'ALB': { 
        name: 'Alexander Albon', 
        team: 'Williams', 
        basePace: 95.789, 
        baseConfidence: 70, 
        qualiSkill: 0.81, 
        consistency: 0.86 
    },
    'SAR': { 
        name: 'Logan Sargeant', 
        team: 'Williams', 
        basePace: 96.123, 
        baseConfidence: 68, 
        qualiSkill: 0.72, 
        consistency: 0.75 
    },
    'BOT': { 
        name: 'Valtteri Bottas', 
        team: 'Kick Sauber', 
        basePace: 96.234, 
        baseConfidence: 69, 
        qualiSkill: 0.88, 
        consistency: 0.90 
    },
    'ZHO': { 
        name: 'Zhou Guanyu', 
        team: 'Kick Sauber', 
        basePace: 96.456, 
        baseConfidence: 67, 
        qualiSkill: 0.76, 
        consistency: 0.83 
    }
};

/**
 * Driver Skill Specializations
 * Additional attributes for specific racing scenarios
 */
const DRIVER_SKILLS = {
    overtaking: {
        'VER': 0.95, 'HAM': 0.90, 'ALO': 0.88, 'LEC': 0.82, 'NOR': 0.78,
        'RUS': 0.75, 'PIA': 0.73, 'SAI': 0.70, 'GAS': 0.72, 'ALB': 0.68,
        'OCO': 0.65, 'TSU': 0.70, 'HUL': 0.75, 'BOT': 0.78, 'RIC': 0.80,
        'STR': 0.55, 'MAG': 0.62, 'SAR': 0.45, 'ZHO': 0.58
    },
    
    rainMastery: {
        'VER': 0.95, 'HAM': 0.93, 'ALO': 0.90, 'RUS': 0.85, 'GAS': 0.83,
        'BOT': 0.82, 'LEC': 0.78, 'NOR': 0.75, 'PIA': 0.72, 'SAI': 0.70,
        'ALB': 0.68, 'HUL': 0.75, 'OCO': 0.65, 'TSU': 0.60, 'RIC': 0.72,
        'STR': 0.55, 'MAG': 0.58, 'SAR': 0.45, 'ZHO': 0.52
    },
    
    tireManagement: {
        'ALO': 0.95, 'HAM': 0.92, 'VER': 0.90, 'HUL': 0.88, 'BOT': 0.87,
        'RUS': 0.85, 'PIA': 0.83, 'SAI': 0.82, 'LEC': 0.78, 'NOR': 0.76,
        'GAS': 0.74, 'ALB': 0.72, 'OCO': 0.70, 'RIC': 0.75, 'TSU': 0.65,
        'MAG': 0.68, 'STR': 0.60, 'ZHO': 0.62, 'SAR': 0.50
    },
    
    streetCircuits: {
        'LEC': 0.92, 'VER': 0.88, 'HAM': 0.87, 'RUS': 0.82, 'ALO': 0.80,
        'NOR': 0.78, 'GAS': 0.76, 'PIA': 0.74, 'SAI': 0.72, 'BOT': 0.70,
        'ALB': 0.68, 'OCO': 0.66, 'HUL': 0.72, 'RIC': 0.75, 'TSU': 0.62,
        'MAG': 0.60, 'STR': 0.55, 'ZHO': 0.58, 'SAR': 0.45
    }
};

/**
 * Driver Career Statistics (for context)
 */
const DRIVER_STATS = {
    'VER': { championships: 3, wins: 61, podiums: 107, poles: 40 },
    'HAM': { championships: 7, wins: 103, podiums: 197, poles: 104 },
    'LEC': { championships: 0, wins: 5, podiums: 29, poles: 24 },
    'RUS': { championships: 0, wins: 2, podiums: 13, poles: 3 },
    'NOR': { championships: 0, wins: 1, podiums: 15, poles: 1 },
    'ALO': { championships: 2, wins: 32, podiums: 106, poles: 22 },
    'SAI': { championships: 0, wins: 3, podiums: 23, poles: 1 },
    'PIA': { championships: 0, wins: 2, podiums: 8, poles: 0 },
    'GAS': { championships: 0, wins: 1, podiums: 4, poles: 0 },
    'BOT': { championships: 0, wins: 10, podiums: 67, poles: 20 },
    'HUL': { championships: 0, wins: 0, podiums: 0, poles: 1 },
    'RIC': { championships: 0, wins: 8, podiums: 32, poles: 3 },
    'ALB': { championships: 0, wins: 0, podiums: 2, poles: 0 },
    'OCO': { championships: 0, wins: 1, podiums: 3, poles: 0 },
    'TSU': { championships: 0, wins: 0, podiums: 1, poles: 0 },
    'MAG': { championships: 0, wins: 0, podiums: 1, poles: 1 },
    'STR': { championships: 0, wins: 0, podiums: 3, poles: 1 },
    'ZHO': { championships: 0, wins: 0, podiums: 0, poles: 0 },
    'SAR': { championships: 0, wins: 0, podiums: 0, poles: 0 }
};

/**
 * Driver Age and Experience Data
 */
const DRIVER_INFO = {
    'VER': { age: 27, experience: 10, nationality: 'NED' },
    'HAM': { age: 40, experience: 18, nationality: 'GBR' },
    'LEC': { age: 27, experience: 7, nationality: 'MON' },
    'RUS': { age: 27, experience: 6, nationality: 'GBR' },
    'NOR': { age: 25, experience: 6, nationality: 'GBR' },
    'ALO': { age: 43, experience: 23, nationality: 'ESP' },
    'SAI': { age: 30, experience: 10, nationality: 'ESP' },
    'PIA': { age: 24, experience: 2, nationality: 'AUS' },
    'GAS': { age: 28, experience: 8, nationality: 'FRA' },
    'BOT': { age: 35, experience: 12, nationality: 'FIN' },
    'HUL': { age: 37, experience: 12, nationality: 'GER' },
    'RIC': { age: 35, experience: 14, nationality: 'AUS' },
    'ALB': { age: 28, experience: 5, nationality: 'THA' },
    'OCO':