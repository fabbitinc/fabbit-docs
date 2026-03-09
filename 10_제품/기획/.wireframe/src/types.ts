export interface ScreenInfo {
  policies: string[];
}

export interface FeatureInfo {
  planning: boolean;
  policy: boolean;
  screens: Record<string, ScreenInfo>;
  flows: string[];
}

export type CenterTab = "wireframe" | "flow" | "planning" | "policy";

export type FeatureTree = Record<string, Record<string, FeatureInfo>>;

export interface Selection {
  module: string;
  feature: string;
}
