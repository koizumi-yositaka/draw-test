export type BaseNodeData = {
    title: string; // タイトル
    description: string; // 説明
}



// 経験
// 経験とは、beforeの状態の時にActionを行った結果、afterの状態になったことを言う
export type Experience = {
    title: string; // タイトル
    description: string; // 説明
    before: string; // 前の状態
    after: string; // 後の状態
    actions: Action[]; // 行動
}

// 行動ノードのデータ型
export type Action = {
    title: string; // タイトル
    description: string; // 説明
    rationales: Rationale[]; // 行動の根拠
}

// 根拠
// 価値観や教訓といった行動原理は、過去の経験により得られる
export type Rationale = {
    kind: "value" | "lesson"; // 価値観か教訓か
    title: string; // タイトル
    description: string; // 説明
    experiences: Experience[]; // 経験
}

// 価値観
export type Value = Rationale & {

}

// 教訓
export type Lesson = Rationale & {

}