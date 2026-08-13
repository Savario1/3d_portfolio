import { useMagnetic } from "../../hooks/useMagnetic";

/**
 * Shared action button. Renders as a link, a button, or — when no real destination
 * exists yet — a disabled "Coming Soon" element instead of a dead `#` link.
 */
export default function Button({
  href,
  external = false,
  disabled = false,
  comingSoonLabel = "Coming Soon",
  variant = "secondary",
  small = false,
  magnetic = false,
  onClick,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const magneticRef = useMagnetic(0.3);
  const ref = magnetic ? magneticRef : undefined;

  const classes = ["btn", `btn--${variant}`, small ? "btn--small" : "", className]
    .filter(Boolean)
    .join(" ");

  if (disabled || (!href && external)) {
    return (
      <span className={`${classes} btn--disabled`} aria-disabled="true" {...rest}>
        <span>{children}</span>
        <span className="btn__badge">{comingSoonLabel}</span>
      </span>
    );
  }

  if (href) {
    const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a className={classes} href={href} ref={ref} {...externalProps} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick} ref={ref} {...rest}>
      {children}
    </button>
  );
}
