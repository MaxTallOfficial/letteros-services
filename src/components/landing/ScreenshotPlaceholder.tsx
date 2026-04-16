import { colors, radius } from "@/tokens";

interface ScreenshotPlaceholderProps {
  caption: string;
  imageSrc?: string;
}

export default function ScreenshotPlaceholder({ caption, imageSrc }: ScreenshotPlaceholderProps) {
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={caption}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#EFEFEF",
        borderRadius: radius.card,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <span
        style={{
          fontSize: "14px",
          color: colors.text.placeholder,
          textAlign: "center",
          lineHeight: "1.4",
        }}
      >
        {caption}
      </span>
    </div>
  );
}
