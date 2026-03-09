interface Props {
  module: string;
  feature: string;
}

export function WireframePanel({ module: mod, feature }: Props) {
  const src = `/files/${encodeURIComponent(mod)}/${encodeURIComponent(feature)}/와이어프레임.html`;

  return (
    <iframe
      key={`${mod}/${feature}`}
      src={src}
      className="w-full h-full border-0"
      title="와이어프레임"
    />
  );
}
