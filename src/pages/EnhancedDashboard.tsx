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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  Package,
  CreditCard,
  Bell,
  Star,
  Activity,
  Zap,
  Globe,
  Brain,
  Shield,
  Heart,
  Sparkles,
  Building2,
  Coins,
  Truck,
  Eye,
  Clock,
  Filter,
  Download,
  Share2,
  RefreshCw,
  Settings,
  HelpCircle,
  Calendar,
  MessageSquare,
  FileText,
  Target,
  Award,
  Lightbulb,
  Headphones,
} from "lucide-react";

interface DashboardMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  urgent?: boolean;
}

interface Activity {
  id: string;
  type: "sale" | "order" | "review" | "system" | "user";
  message: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
}

export default function EnhancedDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [isLoading, setIsLoading] = useState(false);

  const dashboardMetrics: DashboardMetric[] = [
    {
      title: "Total Revenue",
      value: "$24,847",
      change: 12.5,
      icon: <CreditCard className="w-5 h-5" />,
      color: "text-green-600",
      description: "Last 7 days",
    },
    {
      title: "Active Orders",
      value: "1,247",
      change: 8.2,
      icon: <Package className="w-5 h-5" />,
      color: "text-blue-600",
      description: "Currently processing",
    },
    {
      title: "Total Customers",
      value: "8,934",
      change: 15.3,
      icon: <Users className="w-5 h-5" />,
      color: "text-purple-600",
      description: "Active users",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: -2.1,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-orange-600",
      description: "Sales conversion",
    },
    {
      title: "Platform Health",
      value: "99.8%",
      change: 0.1,
      icon: <Activity className="w-5 h-5" />,
      color: "text-emerald-600",
      description: "System uptime",
    },
    {
      title: "AI Interactions",
      value: "4,567",
      change: 23.7,
      icon: <Brain className="w-5 h-5" />,
      color: "text-indigo-600",
      description: "Mzee Cyber engagements",
    },
  ];

  const quickActions: QuickAction[] = [
    {
      title: "View Orders",
      description: "Manage pending and active orders",
      icon: <Package className="w-6 h-6" />,
      href: "/orders",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Inventory",
      description: "Check stock levels and alerts",
      icon: <Package className="w-6 h-6" />,
      href: "/inventory",
      color: "from-green-500 to-green-600",
      urgent: true,
    },
    {
      title: "Analytics",
      description: "Deep dive into performance data",
      icon: <BarChart3 className="w-6 h-6" />,
      href: "/analytics",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Neo-Savannah",
      description: "Manage cyberpunk marketplace",
      icon: <Sparkles className="w-6 h-6" />,
      href: "/neo-savannah",
      color: "from-pink-500 to-purple-600",
    },
    {
      title: "Payments",
      description: "Handle transactions and billing",
      icon: <CreditCard className="w-6 h-6" />,
      href: "/billing-management",
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "AI Chiefs",
      description: "Configure AI market guides",
      icon: <Brain className="w-6 h-6" />,
      href: "/ai-chiefs",
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Platform Status",
      description: "Monitor system health",
      icon: <Activity className="w-6 h-6" />,
      href: "/platform-status",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Support Center",
      description: "Customer service and help",
      icon: <Headphones className="w-6 h-6" />,
      href: "/support",
      color: "from-teal-500 to-cyan-600",
    },
  ];

  const recentActivity: Activity[] = [
    {
      id: "1",
      type: "sale",
      message: "New order #1247 - Neo-Savannah AR Headset",
      timestamp: "2 minutes ago",
      icon: <ShoppingCart className="w-4 h-4" />,
      color: "text-green-600",
    },
    {
      id: "2",
      type: "user",
      message: "New customer registered from Nairobi",
      timestamp: "5 minutes ago",
      icon: <Users className="w-4 h-4" />,
      color: "text-blue-600",
    },
    {
      id: "3",
      type: "review",
      message: "5-star review received for Maasai Smart Shuka",
      timestamp: "12 minutes ago",
      icon: <Star className="w-4 h-4" />,
      color: "text-yellow-600",
    },
    {
      id: "4",
      type: "system",
      message: "AI Guide processed 50+ interactions",
      timestamp: "18 minutes ago",
      icon: <Brain className="w-4 h-4" />,
      color: "text-purple-600",
    },
    {
      id: "5",
      type: "order",
      message: "Bulk order shipped - Group Buying success",
      timestamp: "25 minutes ago",
      icon: <Truck className="w-4 h-4" />,
      color: "text-indigo-600",
    },
  ];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Platform Dashboard
            </h1>
            <p className="text-gray-600 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>
                Welcome back! Here's what's happening in your savannah.
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              className="flex items-center space-x-2"
              disabled={isLoading}
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {dashboardMetrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-gray-50 ${metric.color}`}>
                    {metric.icon}
                  </div>
                  <Badge
                    variant={metric.change > 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-xs text-gray-500">{metric.title}</p>
                  <p className="text-xs text-gray-400">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                  Fast access to key platform features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.href}>
                      <Card className="relative group hover:shadow-md transition-all duration-300 cursor-pointer bg-gradient-to-br hover:scale-105">
                        <CardContent className="p-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 text-white group-hover:scale-110 transition-transform duration-300`}
                          >
                            {action.icon}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {action.description}
                          </p>
                          {action.urgent && (
                            <Badge
                              variant="destructive"
                              className="absolute top-2 right-2 text-xs px-1"
                            >
                              !
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Latest platform events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className={`p-1 rounded ${activity.color} bg-white`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 font-medium">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 border-green-200 hover:border-green-400"
                >
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="mt-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="overview" className="space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="commerce" className="space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Commerce</span>
              </TabsTrigger>
              <TabsTrigger value="innovation" className="space-x-2">
                <Brain className="w-4 h-4" />
                <span>Innovation</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="space-x-2">
                <Shield className="w-4 h-4" />
                <span>System</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                  <CardDescription>
                    Key performance indicators across all platform sections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Marketplace Activity
                        </span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          User Engagement
                        </span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          System Health
                        </span>
                        <span className="text-sm font-medium">99%</span>
                      </div>
                      <Progress value={99} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commerce" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Sales Overview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Today's Sales</span>
                        <span className="font-bold">$3,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Pending Orders</span>
                        <span className="font-bold">127</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Return Rate</span>
                        <span className="font-bold">1.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="w-5 h-5" />
                      <span>Inventory Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Products</span>
                        <span className="font-bold">1,847</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Low Stock Alerts</span>
                        <Badge variant="destructive" className="text-xs">
                          23
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Out of Stock</span>
                        <span className="font-bold">5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="innovation" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>AI Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Mzee Cyber Active</span>
                        <Badge className="bg-green-100 text-green-800">
                          Online
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Voice Commands</span>
                        <span className="text-sm font-medium">4,567</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">AI Recommendations</span>
                        <span className="text-sm font-medium">892</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Neo-Savannah</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">AR Sessions</span>
                        <span className="text-sm font-medium">234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Cyber Sales</span>
                        <span className="text-sm font-medium">$1,847</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">NFT Trades</span>
                        <span className="text-sm font-medium">67</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Blockchain</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Smart Contracts</span>
                        <span className="text-sm font-medium">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Network Health</span>
                        <Badge className="bg-green-100 text-green-800">
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Gas Efficiency</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>System Health</span>
                  </CardTitle>
                  <CardDescription>
                    Real-time platform monitoring and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">
                        99.8%
                      </div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">
                        23ms
                      </div>
                      <div className="text-sm text-gray-600">Response Time</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">
                        2,847
                      </div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600">
                        0.02%
                      </div>
                      <div className="text-sm text-gray-600">Error Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
