import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  Bell,
  Settings,
  Volume2,
  VolumeX,
  LogOut,
  BarChart3,
  Package,
  CreditCard,
  Users,
  Sparkles,
  Brain,
  Shield,
  Zap,
  Globe,
  Building2,
  Coins,
  Truck,
  Heart,
  Star,
  Crown,
} from "lucide-react";

interface SavannahNavigationProps {
  pridePoints?: number;
  notifications?: number;
}

export const SavannahNavigation = ({
  pridePoints = 0,
  notifications = 0,
}: SavannahNavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationLinks = [
    {
      name: "Marketplace",
      href: "/open-market",
      emoji: "🛒",
      icon: <ShoppingCart className="w-4 h-4" />,
      description: "Trade in the digital bazaar",
      requiresAuth: false,
      allowedRoles: [],
      subItems: [
        {
          name: "Open Market",
          href: "/open-market",
          description: "Browse all products",
          icon: <ShoppingCart className="w-4 h-4" />,
        },
        {
          name: "Neo-Savannah",
          href: "/neo-savannah",
          description: "Cyberpunk marketplace",
          icon: <Sparkles className="w-4 h-4" />,
        },
        {
          name: "Group Buying",
          href: "/group-buying",
          description: "Bulk purchase power",
          icon: <Users className="w-4 h-4" />,
        },
        {
          name: "M-Pesa Goats",
          href: "/mpesa-goats",
          description: "Digital livestock trading",
          icon: <Coins className="w-4 h-4" />,
        },
        {
          name: "Chama DAOs",
          href: "/chama-daos",
          description: "Community organizations",
          icon: <Building2 className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Commerce",
      href: "/dashboard",
      emoji: "💼",
      icon: <BarChart3 className="w-4 h-4" />,
      description: "Business operations center",
      requiresAuth: true,
      allowedRoles: ["admin", "supplier", "retailer"],
      subItems: [
        {
          name: "Dashboard",
          href: "/dashboard#overview",
          description: "Overview & analytics",
          icon: <BarChart3 className="w-4 h-4" />,
        },
        {
          name: "Orders",
          href: "/orders",
          description: "Order management",
          icon: <Package className="w-4 h-4" />,
        },
        {
          name: "Inventory",
          href: "/inventory",
          description: "Stock management",
          icon: <Package className="w-4 h-4" />,
        },
        {
          name: "Payments",
          href: "/billing-management",
          description: "Payment processing",
          icon: <CreditCard className="w-4 h-4" />,
        },
        {
          name: "Analytics",
          href: "/analytics",
          description: "Business insights",
          icon: <BarChart3 className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Innovation",
      href: "/innovation",
      emoji: "🚀",
      icon: <Brain className="w-4 h-4" />,
      description: "Future-tech solutions",
      requiresAuth: false,
      allowedRoles: [],
      subItems: [
        {
          name: "AI Chiefs",
          href: "/ai-chiefs",
          description: "AI market guides",
          icon: <Brain className="w-4 h-4" />,
        },
        {
          name: "Blockchain",
          href: "/innovation#blockchain",
          description: "Distributed ledger",
          icon: <Shield className="w-4 h-4" />,
        },
        {
          name: "Matatu Mesh",
          href: "/matatu-mesh",
          description: "Transport network",
          icon: <Truck className="w-4 h-4" />,
        },
        {
          name: "Voice Commerce",
          href: "/sheng-voice",
          description: "Voice-enabled shopping",
          icon: <Volume2 className="w-4 h-4" />,
        },
        {
          name: "AR Scanner",
          href: "/innovation#ar-scanner",
          description: "Augmented reality tools",
          icon: <Zap className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Heritage",
      href: "/african-heritage",
      emoji: "🏛️",
      icon: <Crown className="w-4 h-4" />,
      description: "Cultural innovations",
      requiresAuth: false,
      allowedRoles: [],
      subItems: [
        {
          name: "Heritage Hub",
          href: "/african-heritage#hub",
          description: "Pre-colonial innovations",
          icon: <Crown className="w-4 h-4" />,
        },
        {
          name: "Maasai Merit",
          href: "/maasai-merit",
          description: "Cultural value system",
          icon: <Star className="w-4 h-4" />,
        },
        {
          name: "Oral Contracts",
          href: "/oral-contracts",
          description: "Trust-based agreements",
          icon: <Heart className="w-4 h-4" />,
        },
        {
          name: "Harambee Procurement",
          href: "/harambee-procurement",
          description: "Community sourcing",
          icon: <Users className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Enterprise",
      href: "/enterprise/watering-holes",
      emoji: "🏢",
      icon: <Building2 className="w-4 h-4" />,
      description: "Business solutions",
      requiresAuth: true,
      allowedRoles: ["admin", "supplier", "retailer", "enterprise"],
      subItems: [
        {
          name: "Watering Holes",
          href: "/enterprise/watering-holes",
          description: "Trading hubs",
          icon: <Building2 className="w-4 h-4" />,
        },
        {
          name: "Herd Directory",
          href: "/enterprise/herd-directory",
          description: "Supplier network",
          icon: <Users className="w-4 h-4" />,
        },
        {
          name: "Swift Retailers",
          href: "/enterprise/swift-retailers",
          description: "Fast retail solutions",
          icon: <Zap className="w-4 h-4" />,
        },
        {
          name: "Pack Stories",
          href: "/enterprise/pack-stories",
          description: "Success stories",
          icon: <Star className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Ecosystem",
      href: "/ecosystem-expansion",
      emoji: "🌍",
      icon: <Globe className="w-4 h-4" />,
      description: "Platform expansion",
      requiresAuth: false,
      allowedRoles: [],
      subItems: [
        {
          name: "Expansion Hub",
          href: "/ecosystem-expansion",
          description: "Growth framework",
          icon: <Globe className="w-4 h-4" />,
        },
        {
          name: "Features",
          href: "/features",
          description: "Platform capabilities",
          icon: <Zap className="w-4 h-4" />,
        },
        {
          name: "Scaling",
          href: "/next-gen-scaling",
          description: "Next-gen architecture",
          icon: <BarChart3 className="w-4 h-4" />,
        },
        {
          name: "Partners",
          href: "/partners",
          description: "Strategic alliances",
          icon: <Users className="w-4 h-4" />,
        },
      ],
    },
  ];

  const userMenuItems = [
    {
      name: "Profile",
      href: "/profile",
      icon: <User className="w-4 h-4" />,
    },
    {
      name: "Orders",
      href: "/orders",
      icon: <Package className="w-4 h-4" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: <Bell className="w-4 h-4" />,
    },
  ];

  const quickActions = [
    { name: "Search", icon: <Search className="w-4 h-4" />, action: () => {} },
    { name: "Cart", icon: <ShoppingCart className="w-4 h-4" />, href: "/cart" },
    { name: "Voice", icon: <Volume2 className="w-4 h-4" />, action: () => {} },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-green-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Enhanced Logo with Wildlife Theme */}
          <Link
            to="/"
            className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0"
          >
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-lg sm:text-xl lg:text-2xl group-hover:animate-bounce">
                  🌍
                </span>
              </div>
              {pridePoints > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-1 rounded-full"
                >
                  {pridePoints}
                </Badge>
              )}
            </div>
            <div className="hidden xs:block">
              <h1 className="text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Digital Savannah
              </h1>
              <p className="text-xs lg:text-xs text-emerald-600 font-medium hidden sm:block">
                Where Every Trade Thrives
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced with Icons */}
          <div className="hidden xl:flex items-center space-x-1 2xl:space-x-2 flex-1 justify-center max-w-5xl mx-4">
            {navigationLinks.map((link) => (
              <DropdownMenu key={link.name}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-foreground hover:text-green-600 hover:bg-green-50 transition-all duration-200 rounded-full px-2 xl:px-3 text-sm xl:text-sm flex items-center space-x-1"
                  >
                    <span className="text-sm">{link.emoji}</span>
                    <span className="hidden xl:inline font-medium">
                      {link.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 bg-white/95 backdrop-blur-md border-green-200 shadow-xl">
                  <DropdownMenuLabel className="text-green-700 font-semibold flex items-center space-x-2">
                    <span>{link.emoji}</span>
                    <span>{link.name}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to={link.href}
                      className="cursor-pointer font-medium p-3 hover:bg-green-50"
                    >
                      <div className="flex items-center space-x-3">
                        {link.icon}
                        <div>
                          <div className="font-medium">{link.name} Hub</div>
                          <div className="text-xs text-muted-foreground">
                            {link.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  {link.subItems && link.subItems.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      {link.subItems.map((subItem, subIndex) => (
                        <DropdownMenuItem
                          key={`${link.name}-${subItem.href}-${subIndex}`}
                          asChild
                        >
                          <Link
                            to={subItem.href}
                            className="cursor-pointer p-3 hover:bg-green-50"
                          >
                            <div className="flex items-center space-x-3">
                              {subItem.icon}
                              <div>
                                <div className="font-medium text-sm">
                                  {subItem.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {subItem.description}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {/* Quick Actions & User Menu */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
            {/* Quick Actions */}
            <div className="hidden lg:flex items-center space-x-1">
              {quickActions.map((action) => (
                <Button
                  key={action.name}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-50 rounded-full p-2"
                  onClick={action.action}
                  {...(action.href
                    ? { onClick: () => navigate(action.href!) }
                    : {})}
                >
                  {action.icon}
                </Button>
              ))}
            </div>

            {/* Shopping Cart with Badge */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-green-50 rounded-full p-1.5 sm:p-2 relative"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </Button>
            </Link>

            {/* Notifications */}
            <Link to="/notifications">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-green-50 rounded-full p-1.5 sm:p-2 relative"
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-50 rounded-full p-1.5 sm:p-2"
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-md border-green-200">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className="cursor-pointer flex items-center space-x-2"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons for Guests */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link to="/auth">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-200 hover:border-green-400 hover:bg-green-50 rounded-full text-xs sm:text-sm px-3 sm:px-4"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4"
                >
                  <span className="mr-1 sm:mr-2">🦬</span>
                  <span className="hidden md:inline">Join Herd</span>
                  <span className="md:hidden">Join</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden hover:bg-green-50 rounded-full p-1.5 sm:p-2"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] sm:w-[380px] bg-white/95 backdrop-blur-md overflow-y-auto"
              >
                <SheetHeader className="pb-4">
                  <SheetTitle className="flex items-center text-green-700 text-lg sm:text-xl">
                    <span className="mr-2 text-lg sm:text-xl">🌍</span>
                    <div>
                      <div>Digital Savannah</div>
                      <div className="text-xs text-emerald-600 font-normal">
                        Where Every Trade Thrives
                      </div>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                  {/* Quick Actions in Mobile */}
                  <div className="grid grid-cols-3 gap-2 p-4 bg-green-50 rounded-lg">
                    {quickActions.map((action) => (
                      <Button
                        key={action.name}
                        variant="ghost"
                        size="sm"
                        className="flex flex-col items-center space-y-1 h-auto py-3"
                        onClick={action.action}
                        {...(action.href
                          ? { onClick: () => navigate(action.href!) }
                          : {})}
                      >
                        {action.icon}
                        <span className="text-xs">{action.name}</span>
                      </Button>
                    ))}
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    {navigationLinks.map((link) => (
                      <div key={link.name} className="space-y-1">
                        <Link
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center space-x-3 p-3 text-lg font-medium text-foreground hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{link.emoji}</span>
                            {link.icon}
                          </div>
                          <div>
                            <div>{link.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {link.description}
                            </div>
                          </div>
                        </Link>
                        {link.subItems && link.subItems.length > 0 && (
                          <div className="ml-6 space-y-1">
                            {link.subItems.map((subItem, subIndex) => (
                              <Link
                                key={`mobile-${link.name}-${subItem.href}-${subIndex}`}
                                to={subItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center space-x-3 p-2 text-sm text-muted-foreground hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                              >
                                {subItem.icon}
                                <div>
                                  <div className="font-medium">
                                    {subItem.name}
                                  </div>
                                  <div className="text-xs">
                                    {subItem.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile Auth Section */}
                  <div className="sm:hidden border-t pt-4 space-y-2">
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-green-200 hover:border-green-400 hover:bg-green-50"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      to="/pricing"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <span className="mr-2">🦬</span>
                        Join the Herd
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SavannahNavigation;
