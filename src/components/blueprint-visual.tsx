import Image from "next/image";
import { CheckIcon, CrosshairIcon } from "@phosphor-icons/react/ssr";

export function BlueprintVisual() {
  return (
    <div className="hero-visual" aria-label="New home construction moving from physical framing into a digital blueprint model">
      <Image
        className="hero-image"
        src="/images/hero-construction-digital.jpg"
        alt="New home framing transitioning into cyan digital blueprint lines at night"
        width={1024}
        height={576}
        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1200px) 52vw, 700px"
        preload
      />
      <div className="hero-vignette" aria-hidden="true" />
      <svg
        className="blueprint-overlay"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M48 510 L294 510 L294 395 L438 260 L726 260" />
        <path d="M438 260 L438 510 L726 510 L726 260" />
        <path d="M438 260 L582 135 L726 260" />
        <path d="M90 544 H714" className="measure-line" />
        <path d="M90 534 V554 M714 534 V554" className="measure-line" />
        <circle cx="294" cy="395" r="5" />
        <circle cx="438" cy="260" r="5" />
        <circle cx="582" cy="135" r="5" />
        <circle cx="726" cy="260" r="5" />
      </svg>
      <div className="visual-readout readout-top">
        <span className="pulse-dot" aria-hidden="true" />
        <div>
          <small>Workflow signal</small>
          <strong>Physical → digital</strong>
        </div>
      </div>
      <div className="visual-readout readout-bottom">
        <CrosshairIcon size={20} weight="light" aria-hidden="true" />
        <div>
          <small>Systems aligned</small>
          <strong>Plans / field / finance</strong>
        </div>
        <CheckIcon className="readout-check" size={16} weight="bold" aria-hidden="true" />
      </div>
      <div className="coordinate-label coordinate-a" aria-hidden="true">A.01 / FIELD</div>
      <div className="coordinate-label coordinate-b" aria-hidden="true">GRID / FIELD DATA</div>
    </div>
  );
}
