export interface SectionScore {
  name: string;
  score: number;
  description: string;
}

export interface ImprovementTip {
  impact: "high" | "medium" | "low";
  title: string;
  description: string;
}

export interface ATSResult {
  overallScore: number;
  sections: SectionScore[];
  tips: ImprovementTip[];
}
