export interface ServerInfoDTO {
    success?: boolean;
    message?: string;
    results?: Result[];
}

export interface Result {
    name: string;
    value: Value;
    date: string;
}

export interface Ares {
    AveragePing: number;
    BossTime: number;
    BossTime2: number;
    DropRate: number;
    EXPRate: number;
    HellsGateNextBoss: string;
    HellsGateNextRound: number;
    IsNight: boolean;
    LastUpdateTime: number;
    MedianPing: number;
    PotionRate: number;
    Uptime: number;
    WorldClock: number;
}

export interface Bellatra {
    Clan1: string;
    Clan2: string;
    Clan3: string;
    Clan4: string;
    Clan5: string;
    Clan6: string;
    Clan7: string;
    Clan8: string;
    Clan9: string;
}

export interface BlessCastle {
    Clan1: string;
    Clan2: string;
    Clan3: string;
    SiegeWarDay: number;
    SiegeWarHour: number;
    TaxRate: number;
}

export interface Mars {
    AveragePing: number;
    BossTime: number;
    BossTime2: number;
    DropRate: number;
    EXPRate: number;
    HellsGateNextBoss: string;
    HellsGateNextRound: number;
    IsNight: boolean;
    LastUpdateTime: number;
    MedianPing: number;
    PotionRate: number;
    Uptime: number;
    WorldClock: number;
}

export interface Odin {
    AveragePing: number;
    BossTime: number;
    BossTime2: number;
    DropRate: number;
    EXPRate: number;
    HellsGateNextBoss: string;
    HellsGateNextRound: number;
    IsNight: boolean;
    LastUpdateTime: number;
    MedianPing: number;
    PotionRate: number;
    Uptime: number;
    WorldClock: number;
}

export interface Value {
    Ares: Ares;
    AveragePing: number;
    Bellatra: Bellatra;
    BlessCastle: BlessCastle;
    GameVersion: number;
    LastUpdateTime: number;
    Mars: Mars;
    MedianPing: number;
    Odin: Odin;
    ServerOnline: number;
    Uptime: number;
}

