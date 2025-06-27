import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Users,
  ShoppingCart,
  Zap,
  Globe,
  Server,
  Database,
  Cpu,
  MemoryStick,
  Network,
  Shield,
  Coins,
  Package,
  Brain,
  Heart,
  Star,
  Timer,
} from "lucide-react";

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  icon: React.ReactNode;
  trend: "up" | "down" | "stable";
}

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  uptime: number;
  responseTime: number;
  icon: React.ReactNode;
  description: string;
}

export default function PlatformStatus() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    {
      name: "CPU Usage",
      value: 45,
      unit: "%",
      status: "healthy",
      icon: <Cpu className="w-4 h-4" />,
      trend: "stable",
    },
    {
      name: "Memory Usage",
      value: 67,
      unit: "%",
      status: "warning",
      icon: <MemoryStick className="w-4 h-4" />,
      trend: "up",
    },
    {
      name: "Active Users",
      value: 2847,
      unit: "",
      status: "healthy",
      icon: <Users className="w-4 h-4" />,
      trend: "up",
    },
    {
      name: "Transactions/min",
      value: 156,
      unit: "",
      status: "healthy",
      icon: <ShoppingCart className="w-4 h-4" />,
      trend: "up",
    },
    {
      name: "Network Latency",
      value: 23,
      unit: "ms",
      status: "healthy",
      icon: <Network className="w-4 h-4" />,
      trend: "stable",
    },
    {
      name: "Error Rate",
      value: 0.02,
      unit: "%",
      status: "healthy",
      icon: <AlertTriangle className="w-4 h-4" />,
      trend: "down",
    },
  ]);

  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: "Marketplace API",
      status: "operational",
      uptime: 99.97,
      responseTime: 145,
      icon: <ShoppingCart className="w-4 h-4" />,
      description: "Core marketplace functionality",
    },
    {
      name: "Payment Gateway",
      status: "operational",
      uptime: 99.95,
      responseTime: 89,
      icon: <Coins className="w-4 h-4" />,
      description: "M-Pesa & card processing",
    },
    {
      name: "Neo-Savannah Engine",
      status: "operational",
      uptime: 99.89,
      responseTime: 234,
      icon: <Zap className="w-4 h-4" />,
      description: "Cyberpunk marketplace features",
    },
    {
      name: "AI Market Guide",
      status: "operational",
      uptime: 99.92,
      responseTime: 312,
      icon: <Brain className="w-4 h-4" />,
      description: "Mzee Cyber assistant",
    },
    {
      name: "Blockchain Network",
      status: "operational",
      uptime: 99.98,
      responseTime: 567,
      icon: <Shield className="w-4 h-4" />,
      description: "Smart contracts & NFTs",
    },
    {
      name: "Voice Commerce",
      status: "degraded",
      uptime: 98.23,
      responseTime: 1234,
      icon: <Globe className="w-4 h-4" />,
      description: "Swahili voice processing",
    },
    {
      name: "Inventory System",
      status: "operational",
      uptime: 99.94,
      responseTime: 178,
      icon: <Package className="w-4 h-4" />,
      description: "Stock management",
    },
    {
      name: "Heritage Database",
      status: "operational",
      uptime: 99.99,
      responseTime: 67,
      icon: <Heart className="w-4 h-4" />,
      description: "African cultural data",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
      case "healthy":
        return "text-green-600 bg-green-100";
      case "degraded":
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "down":
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "degraded":
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "down":
      case "critical":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-600" />;
      case "down":
        return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />;
      default:
        return <Timer className="w-3 h-3 text-gray-600" />;
    }
  };

  const overallStatus = services.every((s) => s.status === "operational")
    ? "operational"
    : services.some((s) => s.status === "down")
      ? "critical"
      : "degraded";

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * 5,
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Platform Status
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real-time monitoring of Digital Savannah platform health and
            performance
          </p>

          {/* Overall Status */}
          <div className="mt-6 flex items-center justify-center space-x-3">
            {getStatusIcon(overallStatus)}
            <Badge
              variant="secondary"
              className={`px-4 py-2 text-sm font-medium ${getStatusColor(overallStatus)}`}
            >
              {overallStatus.charAt(0).toUpperCase() + overallStatus.slice(1)}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="overview" className="space-x-2">
              <Activity className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="space-x-2">
              <Server className="w-4 h-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="space-x-2">
              <Database className="w-4 h-4" />
              <span>Metrics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemMetrics.slice(0, 6).map((metric, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {metric.icon}
                        <CardTitle className="text-sm font-medium text-gray-600">
                          {metric.name}
                        </CardTitle>
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {metric.value.toFixed(
                          metric.name.includes("Rate") ? 2 : 0,
                        )}
                      </span>
                      <span className="text-sm text-gray-500">
                        {metric.unit}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`mt-2 text-xs ${getStatusColor(metric.status)}`}
                    >
                      {metric.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Critical Services Status */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="w-5 h-5" />
                  <span>Critical Services</span>
                </CardTitle>
                <CardDescription>
                  Status of essential platform components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {services.slice(0, 4).map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        {service.icon}
                        {getStatusIcon(service.status)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {service.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {service.uptime}% uptime
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-green-200"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {service.icon}
                        <div>
                          <CardTitle className="text-lg">
                            {service.name}
                          </CardTitle>
                          <CardDescription>
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusIcon(service.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge
                          variant="secondary"
                          className={getStatusColor(service.status)}
                        >
                          {service.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Uptime</span>
                          <span className="text-sm font-medium">
                            {service.uptime}%
                          </span>
                        </div>
                        <Progress value={service.uptime} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Response Time
                        </span>
                        <span className="text-sm font-medium">
                          {service.responseTime}ms
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {systemMetrics.map((metric, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-green-200"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {metric.icon}
                        <CardTitle className="text-base">
                          {metric.name}
                        </CardTitle>
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          {metric.value.toFixed(
                            metric.name.includes("Rate") ? 2 : 0,
                          )}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {metric.unit}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Progress
                          value={metric.value > 100 ? 100 : metric.value}
                          className="h-3"
                        />
                        <Badge
                          variant="secondary"
                          className={`w-full justify-center ${getStatusColor(metric.status)}`}
                        >
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="border-green-200 hover:border-green-400 hover:bg-green-50"
          >
            View Historical Data
          </Button>
        </div>
      </div>
    </div>
  );
}
