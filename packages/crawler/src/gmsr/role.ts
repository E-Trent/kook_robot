import { numberFormat, typedBoolean } from "helper";

export const getRole = (name: string) => {
  const url = `https://api.maplestory.gg/v2/public/character/gms/${name}`;
  return fetch(url)
    .then((res) => res.json() as Promise<Role>)
    .then((res) => {
      const { GraphData, ...data } = res.CharacterData;
      GraphData.sort(
        (a: any, b: any) =>
          new Date(b.DateLabel).getTime() - new Date(a.DateLabel).getTime()
      );

      const graph = GraphData.map((element, index) => {
        if (index === GraphData.length - 1) return;
        const LevelNeed = element.CurrentEXP + element.EXPToNextLevel;
        const Percent =
          `${((element.CurrentEXP / LevelNeed) * 100).toFixed(2)}` + "%";
        const TodayEXPDifference = numberFormat(
          GraphData[index + 1].EXPDifference
        );
        return {
          ...element,
          TodayEXPDifference,
          LevelNeed,
          Percent,
        };
      }).filter(typedBoolean);
      return {
        ...data,
        graph,
      };
    })
    .catch(() => null);
};

export interface Role {
  CharacterData: CharacterData;
}
interface CharacterData {
  AchievementRank: number;
  ClassRank: number;
  EXP: number;
  EXPPercent: number;
  Guild: string;
  LegionCoinsPerDay: number;
  LegionLevel: number;
  LegionPower: number;
  LegionRank: number;
  Level: number;
  Name: string;
  Server: string;
  ServerClassRanking: number;
  ServerRank: number;
  ServerSlug: string;
  CharacterImageURL: string;
  GlobalRanking: string;
  AchievementPoints: number;
  Class: string;
  GraphData: GraphItem[];
}
interface GraphItem {
  AvatarURL: string;
  ClassID: number;
  ClassRankGroupID: number;
  CurrentEXP: number;
  DateLabel: string;
  EXPDifference: number;
  EXPToNextLevel: number;
  ImportTime: number;
  Level: number;
  Name: string;
  ServerID: number;
  ServerMergeID: number;
  TotalOverallEXP: number;
}
