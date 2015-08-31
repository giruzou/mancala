var Mancala=function(){"use strict";var a=function(a,b){b=b||[4,4,4,4,4,4,0,4,4,4,4,4,4,0],this.stones=b,this.game=a};return a.prototype.set_stones=function(a){this.stones=a},a.prototype.flip_board=function(){this.stones=this.stones.slice(7,14).concat(this.stones.slice(0,7))},a.prototype.update_pit=function(a,b){2===arguments.length?this.stones[a]=b:b=this.stones[a],this.game.draw_stones(a,b)},a.prototype.move_stones=function(a){if(this.stones[a]<1)return!1;var b=this.stones[a];this.update_pit(a,0);for(var c=a;b>0;)++c,c>12&&(c=0),this.stones[c]++,b--,this.update_pit(c);var d=12-c;return 6>c&&1===this.stones[c]&&this.stones[d]>0&&(this.stones[6]+=this.stones[d]+1,this.update_pit(6),this.update_pit(c,0),this.update_pit(d,0)),6!==c},a.prototype.check_winner=function(){var a=function(a){return a.every(function(a){return 0===a})},b=a(this.stones.slice(0,6)),c=a(this.stones.slice(7,13));if(!b&&!c)return-1;var d;if(b&&!c)for(d=7;13>d;d++)this.stones[13]+=this.stones[d],this.stones[d]=0;else if(c&&!b)for(d=0;6>d;d++)this.stones[6]+=this.stones[d],this.stones[d]=0;return this.game.draw_all_stones(),this.stones[6]>this.stones[13]?"two"===this.game.player?2:1:this.stones[13]>this.stones[6]?"two"===this.game.player?1:2:0},a}(),Game=function(){"use strict";var a=function(a,b){this.mancala=new a(this),this.player="two"===b?"two":"one"};return a.prototype.load_game=function(){localStorage.getItem("player")?(this.mancala.stones=JSON.parse(localStorage.getItem("stones")),"two"===localStorage.getItem("player")&&this.switch_turn()):(localStorage.setItem("player",this.player),localStorage.setItem("stones",JSON.stringify(this.mancala.stones)))},a.prototype.init=function(){this.refresh_queries(),this.draw_all_stones()},a.prototype.get_other_player=function(){return"one"===this.player?"two":"one"},a.prototype.refresh_queries=function(){this.current_player_pits=document.querySelectorAll(".row.player-"+this.player+" .pit p"),this.other_player_pits=document.querySelectorAll(".row.player-"+this.get_other_player()+" .pit p"),this.current_player_store=document.querySelector(".store.player-"+this.player+" p"),this.other_player_store=document.querySelector(".store.player-"+this.get_other_player()+" p")},a.prototype.draw_all_stones=function(){for(var a=0;13>=a;a++)this.draw_stones(a,this.mancala.stones[a])},a.prototype.draw_stones=function(a,b){0===b&&(b=""),6===a?this.current_player_store.textContent=b:13===a?this.other_player_store.textContent=b:6>a?this.current_player_pits[a].textContent=b:a>6&&(this.other_player_pits[a-7].textContent=b)},a.prototype.do_player_turn=function(a){var b=this.mancala.move_stones(a);return this.check_game_over()?!0:(b&&(this.switch_turn(),localStorage.setItem("player",this.player)),void localStorage.setItem("stones",JSON.stringify(this.mancala.stones)))},a.prototype.switch_turn=function(){this.player=this.get_other_player(),this.mancala.flip_board(),this.init();var a=this.player;setTimeout(function(){document.body.setAttribute("data-player",a),document.querySelector(".current-player").textContent=a},700)},a.prototype.check_game_over=function(){var a=this.mancala.check_winner();if(0>a)return!1;document.body.classList.add("game-over");var b=document.querySelector(".status");return 1===a?b.textContent="Player one wins!":2===a?b.textContent="Player two wins!":b.textContent="Draw!",this.player="",!0},a}(),game=function(){"use strict";var a=new Game(Mancala);a.load_game(),a.init();var b=!0,c=function(c,d){for(var e=function(){if(a.player===c&&b){b=!1;var d=parseInt(this.getAttribute("data-pit"));a.do_player_turn(d)||(b=!0)}},f=0;f<d.length;f++)d[f].setAttribute("data-pit",f),d[f].onclick=e};return c("one",document.querySelectorAll(".row.player-one .pit")),c("two",document.querySelectorAll(".row.player-two .pit")),document.querySelector(".new-game").onclick=function(){localStorage.removeItem("player"),localStorage.removeItem("stones"),window.location.reload()},a}();
//# sourceMappingURL=app.js.map