"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ReactLenis as BaseReactLenis } from "lenis/react";

export * from "lenis/react";

export function ReactLenis({
  children,
  root,
  options,
  ...props
}: React.ComponentProps<typeof BaseReactLenis>) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <BaseReactLenis root={root} options={options} {...props}>
      {children}
    </BaseReactLenis>
  );
}
