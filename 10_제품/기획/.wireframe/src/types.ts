export interface FeatureInfo {
  wireframe: boolean;
  policy: boolean;
  policies: string[];
}

export type FeatureTree = Record<string, Record<string, FeatureInfo>>;

export interface Selection {
  module: string;
  feature: string;
}
