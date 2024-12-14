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

const menuItems = [
  {
    title: "Signature Dishes",
    href: "/menu/signature-dishes",
    description:
      "Explore our mouthwatering signature dishes, including our famous Mandhi and Kabsa specials.",
  },
  {
    title: "Appetizers",
    href: "/menu/appetizers",
    description: "Start your meal with our delectable range of authentic appetizers.",
  },
  {
    title: "Desserts",
    href: "/menu/desserts",
    description:
      "Indulge in our delightful selection of traditional and modern desserts.",
  },
  {
    title: "Beverages",
    href: "/menu/beverages",
    description: "Quench your thirst with our refreshing drinks and exotic teas.",
  },
  {
    title: "Special Offers",
    href: "/menu/special-offers",
    description:
      "Don’t miss our exclusive offers and combo meals for a perfect dining experience.",
  },
  {
    title: "Catering Services",
    href: "/services/catering",
    description:
      "Let Nahdi Mandhi make your events special with our exquisite catering services.",
  },
];

export default function HeaderMenu() {
  return (
    <NavigationMenu className="">
      <NavigationMenuList>
        {/* About Nahdi Mandhi */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent font-extrabold">
            About Nahdi Mandhi
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
                      Nahdi Mandhi
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Experience the authentic taste of Arabia with Nahdi Mandhi’s specially curated menu, combining traditional flavors and modern dining.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/about/mission" title="Our Mission">
                Serving authentic Arabian cuisine with a focus on quality, tradition, and unforgettable flavors.
              </ListItem>
              <ListItem href="/about/values" title="Our Values">
                Committed to providing exceptional dining experiences with fresh ingredients and outstanding service.
              </ListItem>
              <ListItem href="/about/story" title="Our Story">
                Discover how Nahdi Mandhi brings the rich culinary heritage of Arabia to your table.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent font-extrabold">
            Menu
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {menuItems.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Services */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent font-extrabold">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <ListItem title="Private Dining" href="/services/private-dining">
                Enjoy an exclusive dining experience with personalized service in our private dining spaces.
              </ListItem>
              <ListItem title="Event Catering" href="/services/event-catering">
                Make your special occasions unforgettable with our premium catering services.
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
