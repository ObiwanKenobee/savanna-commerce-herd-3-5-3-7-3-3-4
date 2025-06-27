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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  Zap,
  Globe,
  Brain,
  Shield,
  Heart,
  Sparkles,
  Package,
  Coins,
  Building2,
  Truck,
  Timer,
  Filter,
  Grid,
  List,
  Map,
  Eye,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  seller: string;
  rating: number;
  reviews: number;
  category: string;
  featured: boolean;
  neoSavannah: boolean;
  badge?: string;
  location: string;
  inStock: boolean;
  shipping: "free" | "paid" | "pickup";
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  trending: boolean;
}

export default function DigitalSavannaMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");

  const categories: Category[] = [
    {
      id: "all",
      name: "All Products",
      icon: <Globe className="w-4 h-4" />,
      count: 1247,
      trending: false,
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: <Zap className="w-4 h-4" />,
      count: 324,
      trending: true,
    },
    {
      id: "clothing",
      name: "Fashion",
      icon: <Heart className="w-4 h-4" />,
      count: 567,
      trending: false,
    },
    {
      id: "food",
      name: "Fresh Food",
      icon: <Package className="w-4 h-4" />,
      count: 189,
      trending: true,
    },
    {
      id: "crafts",
      name: "African Crafts",
      icon: <Star className="w-4 h-4" />,
      count: 98,
      trending: false,
    },
    {
      id: "neo-savannah",
      name: "Neo-Savannah",
      icon: <Sparkles className="w-4 h-4" />,
      count: 156,
      trending: true,
    },
  ];

  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Neo-Savannah AR Headset",
      price: 89.99,
      originalPrice: 120.0,
      image: "/api/placeholder/400/300",
      seller: "TechSavannah Co.",
      rating: 4.8,
      reviews: 142,
      category: "electronics",
      featured: true,
      neoSavannah: true,
      badge: "AR-ENABLED",
      location: "Nairobi, KE",
      inStock: true,
      shipping: "free",
    },
    {
      id: "2",
      name: "Maasai Smart Shuka",
      price: 45.0,
      image: "/api/placeholder/400/300",
      seller: "Cultural Innovations",
      rating: 4.9,
      reviews: 87,
      category: "clothing",
      featured: true,
      neoSavannah: false,
      badge: "HERITAGE",
      location: "Mara, KE",
      inStock: true,
      shipping: "paid",
    },
    {
      id: "3",
      name: "AI-Powered Mzee Guide",
      price: 29.99,
      image: "/api/placeholder/400/300",
      seller: "WisdomTech",
      rating: 4.7,
      reviews: 203,
      category: "electronics",
      featured: true,
      neoSavannah: true,
      badge: "AI-POWERED",
      location: "Kampala, UG",
      inStock: true,
      shipping: "free",
    },
    {
      id: "4",
      name: "Organic Sukuma Wiki Bundle",
      price: 8.5,
      image: "/api/placeholder/400/300",
      seller: "Green Farms Collective",
      rating: 4.6,
      reviews: 56,
      category: "food",
      featured: true,
      neoSavannah: false,
      location: "Kisumu, KE",
      inStock: true,
      shipping: "pickup",
    },
    {
      id: "5",
      name: "Blockchain Livestock Token",
      price: 150.0,
      image: "/api/placeholder/400/300",
      seller: "CryptoRanch",
      rating: 4.5,
      reviews: 34,
      category: "neo-savannah",
      featured: true,
      neoSavannah: true,
      badge: "NFT",
      location: "Mombasa, KE",
      inStock: true,
      shipping: "free",
    },
    {
      id: "6",
      name: "Traditional Kiondo Basket",
      price: 25.0,
      image: "/api/placeholder/400/300",
      seller: "Heritage Crafts",
      rating: 4.8,
      reviews: 91,
      category: "crafts",
      featured: true,
      neoSavannah: false,
      badge: "HANDMADE",
      location: "Muranga, KE",
      inStock: true,
      shipping: "paid",
    },
  ];

  const quickActions = [
    {
      name: "Neo-Savannah Mode",
      description: "Enter the cyberpunk marketplace",
      icon: <Sparkles className="w-6 h-6" />,
      href: "/neo-savannah",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Voice Shopping",
      description: "Shop using Swahili voice commands",
      icon: <Brain className="w-6 h-6" />,
      href: "/sheng-voice",
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "Group Buying",
      description: "Join community purchases",
      icon: <Users className="w-6 h-6" />,
      href: "/group-buying",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "M-Pesa Goats",
      description: "Digital livestock trading",
      icon: <Coins className="w-6 h-6" />,
      href: "/mpesa-goats",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "AR-ENABLED":
        return "bg-purple-100 text-purple-800";
      case "AI-POWERED":
        return "bg-blue-100 text-blue-800";
      case "NFT":
        return "bg-pink-100 text-pink-800";
      case "HERITAGE":
        return "bg-amber-100 text-amber-800";
      case "HANDMADE":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getShippingIcon = (shipping: string) => {
    switch (shipping) {
      case "free":
        return <Truck className="w-3 h-3 text-green-600" />;
      case "paid":
        return <Truck className="w-3 h-3 text-blue-600" />;
      case "pickup":
        return <Package className="w-3 h-3 text-orange-600" />;
      default:
        return null;
    }
  };

  const filteredProducts = featuredProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Digital Savannah Marketplace
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Where African Innovation Meets Global Commerce
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products, sellers, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur-sm border-0 rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Card className="bg-gradient-to-br hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {action.name}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          {/* Category Navigation */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <TabsList className="bg-white/80 backdrop-blur-sm border border-green-200">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center space-x-2 px-4 py-2"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-green-100 text-green-700"
                  >
                    {category.count}
                  </Badge>
                  {category.trending && (
                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* View Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="p-2"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="p-2"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border border-green-200 ${
                  product.neoSavannah ? "ring-2 ring-purple-200" : ""
                } ${viewMode === "list" ? "flex" : ""}`}
              >
                <div
                  className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full object-cover ${
                      viewMode === "list" ? "h-full" : "h-48"
                    } group-hover:scale-105 transition-transform duration-300`}
                  />
                  {product.badge && (
                    <Badge
                      className={`absolute top-2 left-2 ${getBadgeColor(product.badge)} text-xs`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  {product.neoSavannah && (
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-5 h-5 text-purple-500" />
                    </div>
                  )}
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-gray-700 hover:bg-white"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                <CardContent
                  className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      {getShippingIcon(product.shipping)}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{product.seller}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {product.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-green-200 hover:border-green-400"
            >
              Load More Products
            </Button>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
