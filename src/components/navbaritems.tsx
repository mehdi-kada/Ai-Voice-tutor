"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Home", href: "/" },
  { label: "Learning Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

function NavBarItems() {
  const path = usePathname();
  return (
    <nav className="flex items-center gap-8">
      {items.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            "cursor-pointer",
            path === href && "text-primary font-semibold"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default NavBarItems;
