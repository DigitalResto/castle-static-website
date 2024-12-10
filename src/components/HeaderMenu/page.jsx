"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const initiatives = [
  {
    title: "Tree Planting Programs",
    href: "/initiatives/tree-planting",
    description:
      "Join our nationwide tree planting initiatives and contribute to increasing forest cover.",
  },
  {
    title: "Carbon Calculator",
    href: "/tools/carbon-calculator",
    description: "Calculate your carbon footprint and learn ways to reduce it.",
  },
  {
    title: "Education Resources",
    href: "/resources/education",
    description:
      "Access educational materials about climate change, carbon neutrality, and environmental conservation.",
  },
  {
    title: "Community Projects",
    href: "/initiatives/community",
    description: "Discover local community-led environmental projects and how to participate.",
  },
  {
    title: "Progress Tracker",
    href: "/impact/tracker",
    description:
      "Track our progress towards national carbon neutrality goals and tree planting targets.",
  },
  {
    title: "Get Involved",
    href: "/get-involved",
    description:
      "Find out how you can contribute to the Rebuild Earth initiative through volunteering or partnerships.",
  },
];

export default function HeaderMenu() {
  return (
    <NavigationMenu className="">
      <NavigationMenuList>
        {/* About Rebuild Earth */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent font-extrabold">
            About Rebuild Earth
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Rebuild Earth
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A government initiative to combat climate change through tree planting
                      and promoting carbon neutrality awareness across the nation.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/about/mission" title="Our Mission">
                Creating a sustainable future through nationwide tree planting and carbon reduction.
              </ListItem>
              <ListItem href="/about/goals" title="Goals">
                Achieving carbon neutrality and increasing forest cover through community engagement.
              </ListItem>
              <ListItem href="/about/impact" title="Impact">
                Track our progress and see the difference we're making together.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Initiatives */}
        <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-transparent hover:bg-transparent font-extrabold">
            Initiatives
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {initiatives.map((initiative) => (
                <ListItem
                  key={initiative.title}
                  title={initiative.title}
                  href={initiative.href}
                >
                  {initiative.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Get Involved */}
        <NavigationMenuItem>
        <NavigationMenuTrigger className="bg-transparent hover:bg-transparent font-extrabold">
            Get Involved
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <ListItem title="Volunteer" href="/get-involved/volunteer">
                Join our tree planting events and community initiatives to make a direct impact on our environment.
              </ListItem>
              <ListItem title="Partners" href="/get-involved/partners">
                Discover partnership opportunities for organizations and businesses committed to environmental sustainability.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef(function ListItem(
  { className, title, children, ...props },
  ref
) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
