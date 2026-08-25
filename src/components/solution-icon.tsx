import {
  BlueprintIcon,
  CalendarCheckIcon,
  CubeFocusIcon,
  ReceiptIcon,
} from "@phosphor-icons/react/ssr";
import type { SolutionIcon as SolutionIconName } from "@/lib/solutions";

type Props = {
  name: SolutionIconName;
  size?: number;
  className?: string;
};

export function SolutionIcon({ name, size = 24, className }: Props) {
  const iconProps = {
    size,
    className,
    weight: "light" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "blueprint":
      return <BlueprintIcon {...iconProps} />;
    case "materials":
      return <CubeFocusIcon {...iconProps} />;
    case "operations":
      return <CalendarCheckIcon {...iconProps} />;
    case "billing":
      return <ReceiptIcon {...iconProps} />;
  }
}
