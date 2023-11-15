type TScoreModifier = 0 | 1 | 2 | 3;

interface IContestZone {
    players: [number, number];
    score: number;
    modifiers: [TScoreModifier, TScoreModifier];
    currentTeam: null | 0 | 1; // null при отсутствии команд
    isCaptured: boolean;
    currentModifier: TScoreModifier;
    time: number;
}

class ContestZone implements IContestZone {
    players: [number, number] = [0, 0];
    modifiers: [TScoreModifier, TScoreModifier] = [0, 0];
    score: number = 0;
    currentTeam: null | 0 | 1 = null;
    isCaptured: boolean = false;
    currentModifier: TScoreModifier = 0;
    time: number = 0;

    addPlayer(team: 0 | 1) {
        this.players[team]++;
        this.modifiers[team] = (this.modifiers[team] < 3 ? this.modifiers[team] + 1 : 3) as TScoreModifier;

        if (team === this.currentTeam && !this.players[1 - team]) { // если в противоположной команде 0 игроков
            this.currentModifier = this.modifiers[team];
        } else {
            if (this.currentTeam === null) { // ни одна из команд не находится в зоне
                this.currentTeam = team;
                this.currentModifier = this.modifiers[team];
            } else {
                this.currentModifier = 0;
            }
        }
    }

    removePlayer(team: 0 | 1) {
        this.players[team] = this.players[team] > 0 ? this.players[team] - 1 : 0; // игроков не должно быть меньше 0, мало ли что
        this.modifiers[team] = (this.modifiers[team] > 0 ? this.modifiers[team] - 1 : 0) as TScoreModifier;

        this.updateScore(Date.now());

        if (!this.players[team] && !this.players[1 - team]) { //если в обеих командах нет игроков
            if (!this.isCaptured) { // если зона не захвачена
                this.currentTeam = null;
                this.score = 0;
            } else {
                this.score = -100; // сделано так, чтобы зону надо было отбить в нейтральную
            }
            return; // выход из функции, так чуть более читаемо без лишних else
        }

        if (!this.players[team]) { // в текущей команде не осталось игроков, а в ведущей остались
            this.currentModifier = this.modifiers[1 - team];
            return; // аналогично
        }

        if (!this.players[1 - team]) { // в другой команде не осталось игроков, а в текущей остались
            this.currentModifier = this.modifiers[team];
            return; // аналогично
        }
    }

    updateScore(time: number) {
        const unit = 1;
        if (this.players[0] && this.players[1]) { // обе команды не пустые
            this.currentModifier = 0;
        }

        if (!this.players[0] && !this.players[1]) { // обе команды пустые
            this.currentModifier = 0;
        }

        if (this.isCaptured) { // если у захватившей команды есть игроки в зоне, то очки не будут начисляться
            if (this.players[0] && this.currentTeam === 0
                || this.players[1] && this.currentTeam === 1) {
                this.currentModifier = 0;
            }
        }

        if (time - this.time >= 1000) {
            this.time = time;
            this.score += unit * this.currentModifier;
        }

        if (this.score > 100) {
            this.score = -100;
            this.isCaptured = true;
        } else if (this.score >= 0) {
            this.isCaptured = false;
        }
    }
}
export default ContestZone;