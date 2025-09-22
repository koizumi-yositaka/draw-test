export type BaseNodeData = {
    title: string; // タイトル
    description: string; // 説明
}

type TitleAndDescription = {
    title: string; // タイトル
    description: string; // 説明
}

// 経験
// 経験とは、beforeの状態の時にActionを行った結果、afterの状態になったことを言う
export type Experience = TitleAndDescription & {
    before: string; // 前の状態
    after: string; // 後の状態
    actions: Action[]; // 行動 工夫したこと
}

// 行動ノードのデータ型
export type Action = TitleAndDescription & {
    rationales: Rationale[]; // 行動の根拠 why
    abilities: Ability[]; // 行動する際に活かした自分の能力 how
}

// 根拠
// 価値観や教訓といった行動原理は、過去の経験により得られる
export type Rationale = TitleAndDescription & {
    kind: "value" | "lesson"; // 価値観か教訓か
    experiences: Experience[]; // 経験
}

// 価値観
export type Value = Rationale & {

}

// 教訓
export type Lesson = Rationale & {

}

// その人の能力、大きく分けてskillと性格は、経験から得られる
export type Ability = TitleAndDescription & {
    type: "personality" | "skill"; // 性格かスキルか
    experiences: Experience[]; // 経験
}

// パーソナリティ 性格タイプ
export type Personality = Ability & {
    type: "extraversion" | "agreeableness" | "conscientiousness" | "emotional stability" | "openness to experience"; // 性格タイプ
    // 高いか低いか
    level: "high" | "low";
    // 長所か短所か
    kind: "strength" | "weakness";
}

// スキル できること
export type Skill = Ability & {
    achievements: string[]; // 達成したこと
}

// 将来像
export type Vision = TitleAndDescription & {
    causeRationale: Rationale[]; // きっかけとなった行動原理
    idealAchievements: string[]; // 達成したいこと
}

// その人の形は、行動原理(past)、能力(now)、将来像(future)から成る
export type Profile = TitleAndDescription & {
    rationales: Rationale[];
    abilities: Ability[];
    visions: Vision[];
}

   