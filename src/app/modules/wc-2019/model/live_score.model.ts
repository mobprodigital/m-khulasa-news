import { battingModel } from './batting.model';
import { bowlingModel } from './bowling.model';
import { runModel } from './runs.model';

export class liveScoreModel {
    localTeamId: Number;
    round: string;
    visitarTeamId: number;
    note: string;
    tossWinTeamId: number;
    tossWinTeamName: string;
    elected: string;
    status: string;

    localTeam: any;
    visitarTeam: any;
    batting: battingModel[];
    bowling: bowlingModel[];
    runs: runModel[];
}