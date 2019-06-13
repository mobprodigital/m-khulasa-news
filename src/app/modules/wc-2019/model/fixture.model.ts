
export class fixtureModel {
    id: number;
    date: Date;
    status: string;
    live: string;
}

export class FixtureModel {
    id: number;
    live: boolean;
    localteam: TeamModel;
    localteam_dl_data: any;
    localteam_id: number;
    note: string;
    round: string;
    runs: RunsModel[];
    season_id: number;
    starting_at: Date;
    status: string;
    toss_won_team_id: number;
    total_overs_played: number;
    visitorteam: TeamModel;
    visitorteam_dl_data: any;
    visitorteam_id: number;
    winner_team_id: number;
    batting: BattingModel[];
}

export class TeamModel {
    code: number;
    country_id: number;
    id: number;
    image_path: string;
    name: string;
}


export class RunsModel {
    fixture_id: number;
    id: number;
    inning: number;
    overs: number;
    pp1: string;
    pp2: string;
    pp3: string;
    score: number;
    team_id: number;
    wickets: number;
}


export class BattingModel {
    active: boolean;
    ball: number;
    batsmanout_id: number;
    bowling_player_id: number;
    catch_stump_player_id: number;
    fixture_id: number;
    four_x: number;
    fow_balls: number;
    fow_score: number;
    id: number;
    player_id: number;
    rate: number;
    score: number;
    six_x: number;
    team_id: number;
}

