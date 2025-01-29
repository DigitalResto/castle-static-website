"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Castle, 
  UtensilsCrossed, 
  Coffee,
  Target,
  HeartHandshake,
  History,
  UtensilsCrossed as Signature,
  Soup,
  Cake,
  Wine,
  Tag,
  Users,
  UtensilsCrossed as PrivateDining,
  PartyPopper
} from "lucide-react";

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
    href: "/menu",
    description: "Explore our mouthwatering signature dishes, including our famous Mandhi and Kabsa specials.",
    icon: <Signature className="w-4 h-4 text-amber-600" />
  },
  {
    title: "Appetizers",
    href: "/menu",
    description: "Start your meal with our delectable range of authentic appetizers.",
    icon: <Soup className="w-4 h-4 text-green-600" />
  },
  {
    title: "Desserts",
    href: "/menu",
    description: "Indulge in our delightful selection of traditional and modern desserts.",
    icon: <Cake className="w-4 h-4 text-pink-600" />
  },
  {
    title: "Beverages",
    href: "/menu",
    description: "Quench your thirst with our refreshing drinks and exotic teas.",
    icon: <Wine className="w-4 h-4 text-purple-600" />
  },
  {
    title: "Special Offers",
    href: "/menu",
    description: "Don't miss our exclusive offers and combo meals for a perfect dining experience.",
    icon: <Tag className="w-4 h-4 text-red-600" />
  },
  {
    title: "Catering Services",
    href: "/services/catering",
    description: "Let Castle Resto make your events special with our exquisite catering services.",
    icon: <Users className="w-4 h-4 text-blue-600" />
  },
];

export default function HeaderMenu() {
  return (
    <NavigationMenu className="px-4">
      <NavigationMenuList>
        {/* About Castle Resto */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-white font-extrabold">
            <Castle className="w-4 h-4 mr-2 text-amber-600" />
            About Castle Resto
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Castle className="w-8 h-8 mb-4 text-amber-600" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Castle Resto
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Experience the authentic taste of Arabia with Castle Resto's specially curated menu, combining traditional flavors and modern dining.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/about/mission" title="Our Mission" icon={<Target className="w-4 h-4 text-blue-600" />}>
                Serving authentic Arabian cuisine with a focus on quality, tradition, and unforgettable flavors.
              </ListItem>
              <ListItem href="/about/values" title="Our Values" icon={<HeartHandshake className="w-4 h-4 text-red-600" />}>
                Committed to providing exceptional dining experiences with fresh ingredients and outstanding service.
              </ListItem>
              <ListItem href="/about/story" title="Our Story" icon={<History className="w-4 h-4 text-purple-600" />}>
                Discover how Castle Resto brings the rich culinary heritage of Arabia to your table.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-white  font-extrabold">
            <UtensilsCrossed className="w-4 h-4 mr-2 text-amber-600" />
            Menu
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {menuItems.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Services */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-white  font-extrabold">
            <Coffee className="w-4 h-4 mr-2 text-amber-600" />
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <ListItem 
                title="Private Dining" 
                href="/services/private-dining"
                icon={<PrivateDining className="w-4 h-4 text-amber-600" />}
              >
                Enjoy an exclusive dining experience with personalized service in our private dining spaces.
              </ListItem>
              <ListItem 
                title="Event Catering" 
                href="/services/event-catering"
                icon={<PartyPopper className="w-4 h-4 text-purple-600" />}
              >
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
  { className, title, children, icon, ...props },
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
          <div className="text-sm font-medium leading-none flex items-center gap-2">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});