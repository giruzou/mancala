/**
 * Main game class
 */
var Game = (function () {
	'use strict';

	/**
	 * Initialise class
	 * @param {Mancala} Mancala
	 * @param {String} [current_player=one] The current player
	 * @constructor
	 */
	var Game = function (Mancala, current_player) {
		this.mancala = new Mancala(this);
		this.player = current_player === 'two' ? 'two' : 'one';
	};

	/**
	 * Refresh the query selectors and update pit stones
	 */
	Game.prototype.init = function () {
		this.refresh_queries();
		this.draw_all_stones();
	};

	/**
	 * Retrieve the name of the player not currently having a turn
	 * @return {String}
	 */
	Game.prototype.get_other_player = function () {
		return this.player === 'one' ? 'two' : 'one';
	};

	/**
	 * Run the query selectors for the pits
	 */
	Game.prototype.refresh_queries = function () {
		this.current_player_pits = document.querySelectorAll('.row.player-' + this.player + ' .pit p');
		this.other_player_pits = document.querySelectorAll('.row.player-' + this.get_other_player() + ' .pit p');
		this.current_player_store = document.querySelector('.store.player-' + this.player + ' p');
		this.other_player_store = document.querySelector('.store.player-' + this.get_other_player() + ' p');
	};

	/**
	 * Update the stones on the page
	 */
	Game.prototype.draw_all_stones = function () {
		var format = function (stones) {
			return stones === 0 ? '' : stones;
		};

		this.current_player_store.textContent = format(this.mancala.current_store);
		this.other_player_store.textContent = format(this.mancala.other_store);

		for (var pit = 0; pit < 6; pit++) {
			this.current_player_pits[pit].textContent = format(this.mancala.current_pits[pit]);
			this.other_player_pits[pit].textContent = format(this.mancala.other_pits[pit]);
		}
	};

	/**
	 * Update the number of stones in a pit
	 * @param {Number} pit The pit number
	 */
	Game.prototype.draw_stones = function (pit) {
		var format = function (stones) {
			return stones === 0 ? '' : stones;
		};

		if (pit === 6) {
			this.current_player_store.textContent = format(this.mancala.current_store);
		} else if(pit === 13) {
			this.other_player_store.textContent = format(this.mancala.other_store);
		} else if (pit < 6) {
			this.current_player_pits[pit].textContent = format(this.mancala.current_pits[pit]);
		} else if (pit > 6) {
			pit -= 7;
			this.other_player_pits[pit].textContent = format(this.mancala.other_pits[pit]);
		}
	};

	/**
	 * Perform the move for a player
	 * @param {Number} pit - The pit number chosen
	 * @returns {Boolean} false if the game is now over
	 */
	Game.prototype.do_player_turn = function (pit) {

		// perform the player's action
		var turn_over = this.mancala.move_stones(pit);

		// make sure that a player hasn't run out of stones
		if (this.check_game_over()) {
			return true;
		}

		// change the player if the current turn is ended
		if (turn_over) {
			this.switch_turn();
		}

		this.save_game();
	};

	/**
	 * Change the user currently having a turn
	 */
	Game.prototype.switch_turn = function () {
		this.player = this.get_other_player();
		this.mancala.flip_board();
		this.init();

		var player = this.player;
		setTimeout(function () {
			document.body.setAttribute('data-player', player);
			document.querySelector('.current-player').textContent = player;
		}, 700 );
	};

	/**
	 * Check if the game should end
	 * @returns {Boolean} Whether the game is over
	 */
	Game.prototype.check_game_over = function () {
		var winner = this.mancala.check_winner();

		if (winner < 0) {
			return false;
		}

		document.body.classList.add('game-over');
		var status = document.querySelector('.status');

		// Determine which player holds the most stones
		if (1 === winner) {
			status.textContent = 'Player one wins!';
		} else if (2 === winner) {
			status.textContent = 'Player two wins!';
		} else {
			status.textContent = 'Draw!';
		}

		this.player = '';
		return true;
	};

	return Game;
})();
