import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SavannahNavigation from "@/components/wildlife/SavannahNavigation";
import {
  ShoppingCart,
  Users,
  Zap,
  Globe,
  Brain,
  Shield,
  Heart,
  Sparkles,
  TrendingUp,
  Star,
  Package,
  Coins,
  Building2,
  Truck,
  Activity,
  Crown,
  Headphones,
  BarChart3,
  Timer,
  ArrowRight,
  CheckCircle,
  Play,
  Volume2,
  Eye,
  MapPin,
  Award,
  Lightbulb,
  Target,
  Layers,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  status: "live" | "beta" | "coming-soon";
  category:
    | "marketplace"
    | "innovation"
    | "commerce"
    | "heritage"
    | "enterprise";
}

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

export default function Index() {
  const [currentTheme, setCurrentTheme] = useState<"classic" | "neo-savannah">(
    "classic",
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const platformStats: Stat[] = [
    {
      label: "Active Traders",
      value: "10,000+",
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      label: "Products Listed",
      value: "50,000+",
      icon: <Package className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      label: "Countries Served",
      value: "15+",
      icon: <Globe className="w-5 h-5" />,
      color: "text-purple-600",
    },
    {
      label: "AI Interactions",
      value: "1M+",
      icon: <Brain className="w-5 h-5" />,
      color: "text-indigo-600",
    },
  ];

  const platformFeatures: Feature[] = [
    {
      title: "Open Marketplace",
      description:
        "Trade in Africa's digital savannah with personalized shops and AI-powered recommendations",
      icon: <ShoppingCart className="w-6 h-6" />,
      href: "/open-market",
      color: "from-green-500 to-emerald-600",
      status: "live",
      category: "marketplace",
    },
    {
      title: "Neo-Savannah Cyberpunk",
      description:
        "Experience the future of commerce with AR, blockchain, and cyber-enhanced trading",
      icon: <Sparkles className="w-6 h-6" />,
      href: "/neo-savannah",
      color: "from-purple-500 to-pink-600",
      status: "live",
      category: "innovation",
    },
    {
      title: "AI Market Guides",
      description:
        "Meet Mzee Cyber and other AI assistants that speak your language and understand culture",
      icon: <Brain className="w-6 h-6" />,
      href: "/ai-chiefs",
      color: "from-blue-500 to-indigo-600",
      status: "live",
      category: "innovation",
    },
    {
      title: "African Heritage Hub",
      description:
        "Celebrate pre-colonial innovations and traditional wisdom in modern commerce",
      icon: <Crown className="w-6 h-6" />,
      href: "/african-heritage",
      color: "from-amber-500 to-orange-600",
      status: "live",
      category: "heritage",
    },
    {
      title: "Commerce Dashboard",
      description:
        "Complete business management with payments, inventory, and analytics",
      icon: <BarChart3 className="w-6 h-6" />,
      href: "/dashboard",
      color: "from-teal-500 to-cyan-600",
      status: "live",
      category: "commerce",
    },
    {
      title: "Voice Commerce",
      description:
        "Shop using natural Swahili voice commands and conversational AI",
      icon: <Volume2 className="w-6 h-6" />,
      href: "/sheng-voice",
      color: "from-rose-500 to-pink-600",
      status: "beta",
      category: "innovation",
    },
    {
      title: "Group Buying Power",
      description: "Community-driven bulk purchases with Chama DAO integration",
      icon: <Users className="w-6 h-6" />,
      href: "/group-buying",
      color: "from-violet-500 to-purple-600",
      status: "live",
      category: "marketplace",
    },
    {
      title: "M-Pesa Goats",
      description: "Digital livestock trading with blockchain verification",
      icon: <Coins className="w-6 h-6" />,
      href: "/mpesa-goats",
      color: "from-yellow-500 to-amber-600",
      status: "live",
      category: "innovation",
    },
    {
      title: "Enterprise Watering Holes",
      description: "B2B trading hubs for suppliers, retailers, and enterprises",
      icon: <Building2 className="w-6 h-6" />,
      href: "/enterprise/watering-holes",
      color: "from-slate-500 to-gray-600",
      status: "live",
      category: "enterprise",
    },
    {
      title: "Matatu Mesh Network",
      description: "Decentralized transport and delivery ecosystem",
      icon: <Truck className="w-6 h-6" />,
      href: "/matatu-mesh",
      color: "from-orange-500 to-red-600",
      status: "beta",
      category: "innovation",
    },
    {
      title: "Platform Analytics",
      description: "Real-time insights and performance monitoring",
      icon: <Activity className="w-6 h-6" />,
      href: "/analytics",
      color: "from-emerald-500 to-green-600",
      status: "live",
      category: "commerce",
    },
    {
      title: "Support Ecosystem",
      description: "24/7 multilingual support with cultural sensitivity",
      icon: <Headphones className="w-6 h-6" />,
      href: "/support",
      color: "from-cyan-500 to-blue-600",
      status: "live",
      category: "commerce",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-green-100 text-green-800 text-xs">Live</Badge>
        );
      case "beta":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 text-xs">Beta</Badge>
        );
      case "coming-soon":
        return (
          <Badge className="bg-gray-100 text-gray-800 text-xs">Soon</Badge>
        );
      default:
        return null;
    }
  };

  const categoryColors = {
    marketplace: "border-green-200 hover:border-green-400",
    innovation: "border-purple-200 hover:border-purple-400",
    commerce: "border-blue-200 hover:border-blue-400",
    heritage: "border-amber-200 hover:border-amber-400",
    enterprise: "border-gray-200 hover:border-gray-400",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <SavannahNavigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">🌍</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold">
                Digital Savannah
              </h1>
            </div>

            <p className="text-xl lg:text-2xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Africa's Most Advanced Commerce Platform - Where Traditional
              Wisdom Meets Cutting-Edge Technology
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/open-market">
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Explore Marketplace
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link to="/neo-savannah">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Enter Neo-Savannah
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Star className="w-6 h-6 text-yellow-300" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Zap className="w-8 h-8 text-blue-300" />
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 delay-${index * 100} ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div
                  className={`inline-flex p-3 rounded-full bg-gray-50 ${stat.color} mb-4`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Complete Commerce Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From traditional marketplaces to futuristic cyber-commerce, we've
              built the most comprehensive platform for African trade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {platformFeatures.map((feature, index) => (
              <Link key={index} to={feature.href}>
                <Card
                  className={`group h-full hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-2 ${categoryColors[feature.category]} hover:scale-105`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        {feature.icon}
                      </div>
                      {getStatusBadge(feature.status)}
                    </div>
                    <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <div className="mt-4 flex items-center text-sm text-green-600 group-hover:text-green-700 transition-colors">
                      <span>Explore feature</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Theme Toggle Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Choose Your Experience
            </h2>
            <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
              Switch between classic African marketplace vibes and futuristic
              cyber-commerce
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Classic Savannah</h3>
                  <p className="text-green-100 mb-6">
                    Traditional African marketplace with warm, earthy tones and
                    cultural heritage
                  </p>
                  <Link to="/open-market">
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-green-700"
                    >
                      Enter Classic Mode
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Neo-Savannah</h3>
                  <p className="text-green-100 mb-6">
                    Cyberpunk marketplace with AR, AI, blockchain, and
                    futuristic aesthetics
                  </p>
                  <Link to="/neo-savannah">
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-green-700"
                    >
                      Enter Cyber Mode
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Dashboard */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access all platform features from your unified dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/dashboard">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Dashboard
                  </h3>
                  <p className="text-sm text-gray-600">
                    Comprehensive business control center
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/platform-status">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-400">
                <CardContent className="p-6 text-center">
                  <Activity className="w-12 h-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    System Health
                  </h3>
                  <p className="text-sm text-gray-600">
                    Real-time platform monitoring
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/analytics">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:border-purple-400">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Analytics
                  </h3>
                  <p className="text-sm text-gray-600">
                    Deep business insights
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/support">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:border-orange-400">
                <CardContent className="p-6 text-center">
                  <Headphones className="w-12 h-12 text-orange-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Support
                  </h3>
                  <p className="text-sm text-gray-600">
                    24/7 multilingual assistance
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link to="/auth">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
