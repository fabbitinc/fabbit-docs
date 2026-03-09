export interface ScreenInfo {
  policies: string[];
}

export interface FeatureInfo {
  planning: boolean;
  policy: boolean;
  screens: Record<string, ScreenInfo>;
}

export type CenterTab = "wireframe" | "planning" | "policy";

export type FeatureTree = Record<string, Record<string, FeatureInfo>>;

export interface Selection {
  module: string;
  feature: string;
}
