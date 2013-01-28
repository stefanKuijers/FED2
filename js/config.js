define([], function() {
	return {

        access_token: '109f8a19ae',
        //api_url: 'https://api.leaguevine.com/v1/tournaments/',
        api_url: 'https://api.leaguevine.com/v1/',
        //api_url: 'https://api.leaguevine.com/v1/games/?season_id=20167&tournament_id=18519&pool_id=18744',

        //https://api.leaguevine.com/v1/game_scores/?tournament_id=18519&game_id=88452
        season_id: '20167',
        pool_id : '18742', //Pool D
        tournament_id : '18519',

        // haalts ALLE games van dit season and tournament
        //https://api.leaguevine.com/v1/games/?season_id=20167&tournament_id=18519


        //pool A pool_id=18739 | poul b = pool_id=18744| pool D =  pool_id=18742
        //https://api.leaguevine.com/v1/games/?season_id=20167&tournament_id=18519&pool_id=18742
        // object.start_time  

        //location of the leaguevine API
        //api : "https://api.leaguevine.com/v1/",
        api : "http://api.leaguevine.com/v1/",
        
        //list of tournament ID's you wish to include
        tournamentID : 18519,

        localStorageEnabled : typeof(Storage)!=="undefined" ? true : false,

        data : {
        	ranking : [ 
            	{ team: "Chasing", won: 2, lost: 2, setsWon: 7, setsLost: 9, pointsWon: 35, pointsLost: 39},
            	{ team: "Boomsquad", won: 2, lost: 2, setsWon: 9, setsLost: 8, pointsWon: 36, pointsLost: 34},
            	{ team: "Burning Snow", won: 3, lost: 1, setsWon: 11, setsLost: 4, pointsWon: 36, pointsLost: 23},
            	{ team: "Beast Amsterdam", won: 2, lost: 2, setsWon: 6, setsLost: 8, pointsWon: 30, pointsLost: 34},
            	{ team: "Amsterdam Money Gang", won: 1, lost: 3, setsWon: 6, setsLost: 10, pointsWon: 30, pointsLost: 37}
        	],
        	game : [
                { set: "1", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "1"},
                { set: "2", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "4"},
                { set: "3", team1: "Boomsquad", team1Score: "0", team2: "Burning Snow", team2Score: "4"},
                { set: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "4"},
                { set: "5", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "3"}
            ],
            schedule : [
                { date: "Monday, 9:00am", team1: "Chasing", team1Score: 3, team2: "Amsterdam Money Gang", team2Score: 1},
                { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: 3, team2: "Beast Amsterdam", team2Score: 0},
                { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: 3, team2: "Amsterdam Money Gang", team2Score: 0},
                { date: "Monday, 10:00am", team1: "Chasing", team1Score: 3, team2: "Burning Snow", team2Score: 0},
                { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: 3, team2: "Amsterdam Money Gang", team2Score: 0},    
                { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: 3, team2: "Beast Amsterdam", team2Score: 0},
                { date: "Monday, 12:00pm", team1: "Chasing", team1Score: 3, team2: "Beast Amsterdam", team2Score: 0},
                { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: 3, team2: "Burning Snow", team2Score: 0},
                { date: "Monday, 1:00pm", team1: "Chasing", team1Score: 3, team2: "Boomsquad", team2Score: 0},
                { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: 3, team2: "Amsterdam Money Gang", team2Score: 0}
            ]
        }
    
    }
});