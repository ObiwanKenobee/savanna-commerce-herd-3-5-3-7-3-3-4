import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
} from "lucide-react";

// Import commerce components
import PaymentProcessor from "./PaymentProcessor";
import OrderManager from "./OrderManager";
import InventoryManager from "./InventoryManager";
import CustomerManager from "./CustomerManager";

interface DashboardMetrics {
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    growth: number;
  };
  orders: {
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    total: number;
  };
  customers: {
    total: number;
    active: number;
    new: number;
    retention: number;
  };
  inventory: {
    totalProducts: number;
    lowStock: number;
    outOfStock: number;
    totalValue: number;
  };
  performance: {
    conversionRate: number;
    avgOrderValue: number;
    customerSatisfaction: number;
    deliveryTime: number;
  };
}

interface CommerceDashboardProps {
  userRole: "admin" | "vendor" | "manager";
  vendorId?: string;
  className?: string;
}

const CommerceDashboard: React.FC<CommerceDashboardProps> = ({
  userRole,
  vendorId,
  className = "",
}) => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    revenue: {
      today: 45600,
      thisWeek: 234500,
      thisMonth: 987600,
      growth: 12.5,
    },
    orders: {
      pending: 23,
      processing: 45,
      shipped: 67,
      delivered: 89,
      total: 224,
    },
    customers: {
      total: 1847,
      active: 1234,
      new: 89,
      retention: 87.5,
    },
    inventory: {
      totalProducts: 456,
      lowStock: 23,
      outOfStock: 8,
      totalValue: 2340000,
    },
    performance: {
      conversionRate: 3.4,
      avgOrderValue: 1250,
      customerSatisfaction: 4.6,
      deliveryTime: 2.3,
    },
  });

  const [selectedTab, setSelectedTab] = useState("overview");
  const [realtimeUpdates, setRealtimeUpdates] = useState(true);

  // Mock data for components
  const mockOrders = [
    {
      id: "ORD-001",
      status: "pending" as const,
      items: [
        {
          id: "1",
          name: "Organic Maize",
          quantity: 50,
          price: 120,
          image: "/api/placeholder/100/100",
          vendor: "Green Farm Co",
          sku: "MAIZE-001",
        },
      ],
      total: 6000,
      currency: "KES" as const,
      customer: {
        name: "John Kiprotich",
        phone: "+254712345678",
        email: "john@example.com",
        address: "Nakuru, Kenya",
      },
      vendor: {
        name: "Green Farm Co",
        phone: "+254723456789",
        location: "Nakuru, Kenya",
        rating: 4.8,
      },
      tracking: {
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        progress: 25,
      },
      timeline: [
        {
          status: "pending",
          timestamp: new Date(),
          description: "Order placed",
          location: "System",
        },
      ],
      paymentMethod: "M-Pesa",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockProducts = [
    {
      id: "1",
      name: "Organic Maize",
      sku: "MAIZE-001",
      category: "Grains",
      description: "Premium organic maize from Nakuru highlands",
      images: ["/api/placeholder/300/300"],
      variants: [],
      vendor: {
        id: "vendor-1",
        name: "Green Farm Co",
        location: "Nakuru, Kenya",
      },
      pricing: {
        cost: 80,
        price: 120,
        currency: "KES" as const,
        margin: 33.3,
      },
      inventory: {
        quantity: 500,
        reserved: 50,
        available: 450,
        reorderLevel: 100,
        maxStock: 1000,
        location: "Warehouse A",
      },
      status: "active" as const,
      metrics: {
        sales30Days: 234,
        revenue30Days: 28080,
        turnoverRate: 2.3,
        lastSold: new Date(),
      },
      tags: ["organic", "premium", "highland"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockCustomers = [
    {
      id: "1",
      personalInfo: {
        firstName: "John",
        lastName: "Kiprotich",
        phone: "+254712345678",
        email: "john@example.com",
      },
      address: {
        street: "123 Kenyatta Avenue",
        city: "Nakuru",
        county: "Nakuru",
        postalCode: "20100",
      },
      preferences: {
        language: "en" as const,
        currency: "KES" as const,
        communicationChannel: "sms" as const,
        categories: ["grains", "vegetables"],
        priceRange: { min: 100, max: 5000 },
      },
      loyalty: {
        tier: "gold" as const,
        points: 2340,
        totalSpent: 45600,
        joinDate: new Date("2023-01-15"),
        referrals: 3,
      },
      analytics: {
        totalOrders: 23,
        avgOrderValue: 1980,
        lastOrderDate: new Date(),
        frequentCategories: ["grains", "vegetables", "fruits"],
        seasonalTrends: {},
        paymentMethods: { mpesa: 15, card: 8 },
      },
      engagement: {
        marketingConsent: true,
        lastActive: new Date(),
        accountStatus: "active" as const,
        riskLevel: "low" as const,
        supportTickets: 1,
        satisfaction: 4.8,
      },
      tags: ["premium-customer", "frequent-buyer"],
      notes: "VIP customer, always pays on time",
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date(),
    },
  ];

  // Simulate real-time updates
  useEffect(() => {
    if (!realtimeUpdates) return;

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        revenue: {
          ...prev.revenue,
          today: prev.revenue.today + Math.floor(Math.random() * 1000),
        },
        orders: {
          ...prev.orders,
          pending: prev.orders.pending + Math.floor(Math.random() * 3) - 1,
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [realtimeUpdates]);

  const renderMetricCard = (
    title: string,
    value: string | number,
    change?: number,
    icon: React.ReactNode,
    color: string,
  ) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium">{title}</p>
          <div className={`h-4 w-4 ${color}`}>{icon}</div>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold">{value}</p>
          {change !== undefined && (
            <p
              className={`text-xs flex items-center ${change >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {change >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(change)}% from last period
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {renderMetricCard(
          "Today's Revenue",
          `KES ${metrics.revenue.today.toLocaleString()}`,
          metrics.revenue.growth,
          <DollarSign />,
          "text-green-600",
        )}
        {renderMetricCard(
          "Pending Orders",
          metrics.orders.pending,
          undefined,
          <Clock />,
          "text-yellow-600",
        )}
        {renderMetricCard(
          "Active Customers",
          metrics.customers.active.toLocaleString(),
          5.2,
          <Users />,
          "text-blue-600",
        )}
        {renderMetricCard(
          "Low Stock Items",
          metrics.inventory.lowStock,
          undefined,
          <AlertTriangle />,
          "text-red-600",
        )}
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <p className="text-muted-foreground">
                  Revenue chart would be displayed here
                </p>
                <p className="text-sm text-muted-foreground">
                  Integration with charts library needed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Pending</span>
                </div>
                <Badge variant="outline">{metrics.orders.pending}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Processing</span>
                </div>
                <Badge variant="outline">{metrics.orders.processing}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Shipped</span>
                </div>
                <Badge variant="outline">{metrics.orders.shipped}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Delivered</span>
                </div>
                <Badge variant="outline">{metrics.orders.delivered}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Conversion Rate</p>
              <Target className="h-4 w-4 text-purple-600" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                {metrics.performance.conversionRate}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{
                    width: `${metrics.performance.conversionRate * 10}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Avg Order Value</p>
              <ShoppingCart className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                KES {metrics.performance.avgOrderValue}
              </p>
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Customer Satisfaction</p>
              <Star className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                {metrics.performance.customerSatisfaction}/5
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${
                      star <= metrics.performance.customerSatisfaction
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Avg Delivery Time</p>
              <Zap className="h-4 w-4 text-green-600" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                {metrics.performance.deliveryTime} days
              </p>
              <p className="text-xs text-green-600">-0.5 days improvement</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col gap-2">
              <Package className="h-6 w-6" />
              <span>Add Product</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>View Customers</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="h-6 w-6" />
              <span>Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Award className="h-6 w-6" />
              <span>Campaigns</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Commerce Dashboard
          </h1>
          <p className="text-muted-foreground">
            {userRole === "admin"
              ? "Platform overview"
              : "Your business overview"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${realtimeUpdates ? "bg-green-500" : "bg-gray-400"}`}
            />
            <span className="text-sm text-muted-foreground">
              {realtimeUpdates ? "Live" : "Static"}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRealtimeUpdates(!realtimeUpdates)}
          >
            <Activity className="h-4 w-4 mr-2" />
            {realtimeUpdates ? "Pause" : "Resume"} Updates
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <OrderManager
            orders={mockOrders}
            onUpdateOrder={(orderId, updates) =>
              console.log("Update order:", orderId, updates)
            }
            onCancelOrder={(orderId, reason) =>
              console.log("Cancel order:", orderId, reason)
            }
            onContactVendor={(vendor) => console.log("Contact vendor:", vendor)}
            onContactDriver={(driver) => console.log("Contact driver:", driver)}
            onTrackOrder={(orderId) => console.log("Track order:", orderId)}
            userRole={userRole === "admin" ? "admin" : "vendor"}
          />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <InventoryManager
            products={mockProducts}
            stockMovements={[]}
            onProductUpdate={(productId, updates) =>
              console.log("Update product:", productId, updates)
            }
            onStockMovement={(movement) =>
              console.log("Stock movement:", movement)
            }
            onReorderAlert={(product) => console.log("Reorder alert:", product)}
            userRole={userRole === "admin" ? "admin" : "vendor"}
          />
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <CustomerManager
            customers={mockCustomers}
            segments={[]}
            onCustomerUpdate={(customerId, updates) =>
              console.log("Update customer:", customerId, updates)
            }
            onSegmentCreate={(segment) =>
              console.log("Create segment:", segment)
            }
            onCampaignLaunch={(segmentId, campaign) =>
              console.log("Launch campaign:", segmentId, campaign)
            }
          />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentProcessor
                  amount={1250}
                  currency="KES"
                  orderId="ORD-001"
                  onSuccess={(transactionId) =>
                    console.log("Payment success:", transactionId)
                  }
                  onError={(error) => console.log("Payment error:", error)}
                  onCancel={() => console.log("Payment cancelled")}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">M-Pesa Payments</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">68%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: "68%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Card Payments</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">22%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "22%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Crypto Payments</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">7%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: "7%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">USSD Banking</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">3%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: "3%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommerceDashboard;
