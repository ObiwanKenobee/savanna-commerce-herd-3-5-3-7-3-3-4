import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  ShoppingBag,
  DollarSign,
  Calendar,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Crown,
  Heart,
  Gift,
  Target,
  Zap,
  Users,
  Award,
} from "lucide-react";

interface Customer {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dateOfBirth?: Date;
    gender?: "male" | "female" | "other";
  };
  address: {
    street: string;
    city: string;
    county: string;
    postalCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  businessInfo?: {
    businessName: string;
    businessType: string;
    taxId?: string;
    employees?: number;
  };
  preferences: {
    language: "en" | "sw" | "ki";
    currency: "KES" | "USD";
    communicationChannel: "sms" | "whatsapp" | "email" | "ussd";
    categories: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
  loyalty: {
    tier: "bronze" | "silver" | "gold" | "platinum";
    points: number;
    totalSpent: number;
    joinDate: Date;
    referrals: number;
  };
  analytics: {
    totalOrders: number;
    avgOrderValue: number;
    lastOrderDate?: Date;
    frequentCategories: string[];
    seasonalTrends: { [key: string]: number };
    paymentMethods: { [key: string]: number };
  };
  engagement: {
    marketingConsent: boolean;
    lastActive: Date;
    accountStatus: "active" | "inactive" | "suspended";
    riskLevel: "low" | "medium" | "high";
    supportTickets: number;
    satisfaction: number; // 1-5 scale
  };
  tags: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: any;
  count: number;
  color: string;
}

interface CustomerManagerProps {
  customers: Customer[];
  segments: CustomerSegment[];
  onCustomerUpdate?: (customerId: string, updates: Partial<Customer>) => void;
  onSegmentCreate?: (segment: Omit<CustomerSegment, "id" | "count">) => void;
  onCampaignLaunch?: (segmentId: string, campaign: any) => void;
  className?: string;
}

const CustomerManager: React.FC<CustomerManagerProps> = ({
  customers,
  segments,
  onCustomerUpdate,
  onSegmentCreate,
  onCampaignLaunch,
  className = "",
}) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState("all");

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);

  // Customer analytics
  const customerMetrics = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(
      (c) => c.engagement.accountStatus === "active",
    ).length,
    newThisMonth: customers.filter((c) => {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return c.createdAt > monthAgo;
    }).length,
    totalLifetimeValue: customers.reduce(
      (sum, c) => sum + c.loyalty.totalSpent,
      0,
    ),
    avgOrderValue:
      customers.reduce((sum, c) => sum + c.analytics.avgOrderValue, 0) /
      customers.length,
    loyaltyDistribution: {
      bronze: customers.filter((c) => c.loyalty.tier === "bronze").length,
      silver: customers.filter((c) => c.loyalty.tier === "silver").length,
      gold: customers.filter((c) => c.loyalty.tier === "gold").length,
      platinum: customers.filter((c) => c.loyalty.tier === "platinum").length,
    },
  };

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      searchQuery === "" ||
      `${customer.personalInfo.firstName} ${customer.personalInfo.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      customer.personalInfo.phone.includes(searchQuery) ||
      customer.personalInfo.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      customer.businessInfo?.businessName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesTier =
      tierFilter === "all" || customer.loyalty.tier === tierFilter;
    const matchesStatus =
      statusFilter === "all" ||
      customer.engagement.accountStatus === statusFilter;

    return matchesSearch && matchesTier && matchesStatus;
  });

  const getTierColor = (tier: Customer["loyalty"]["tier"]) => {
    switch (tier) {
      case "platinum":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "gold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "silver":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  const getTierIcon = (tier: Customer["loyalty"]["tier"]) => {
    switch (tier) {
      case "platinum":
        return <Crown className="h-4 w-4" />;
      case "gold":
        return <Award className="h-4 w-4" />;
      case "silver":
        return <Star className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Customer["engagement"]["accountStatus"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskColor = (risk: Customer["engagement"]["riskLevel"]) => {
    switch (risk) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      default:
        return "text-green-600";
    }
  };

  const renderCustomerCard = (customer: Customer) => (
    <Card
      key={customer.id}
      className={`cursor-pointer transition-all hover:shadow-md ${
        selectedCustomerId === customer.id ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => setSelectedCustomerId(customer.id)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold">
              {customer.personalInfo.firstName} {customer.personalInfo.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {customer.personalInfo.phone}
            </p>
            {customer.businessInfo && (
              <p className="text-xs text-muted-foreground">
                {customer.businessInfo.businessName}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Badge
              className={`${getTierColor(customer.loyalty.tier)} flex items-center gap-1`}
            >
              {getTierIcon(customer.loyalty.tier)}
              {customer.loyalty.tier}
            </Badge>
            <Badge
              className={getStatusColor(customer.engagement.accountStatus)}
            >
              {customer.engagement.accountStatus}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Total Spent</p>
            <p className="font-semibold">
              {customer.preferences.currency}{" "}
              {customer.loyalty.totalSpent.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Orders</p>
            <p className="font-semibold">{customer.analytics.totalOrders}</p>
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">
              {customer.engagement.satisfaction.toFixed(1)}
            </span>
          </div>
          <span
            className={`text-xs font-medium ${getRiskColor(customer.engagement.riskLevel)}`}
          >
            {customer.engagement.riskLevel} risk
          </span>
        </div>
      </CardContent>
    </Card>
  );

  const renderCustomerDetails = () => {
    if (!selectedCustomer) {
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <User className="h-12 w-12 mx-auto mb-4" />
            <p>Select a customer to view details</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">
              {selectedCustomer.personalInfo.firstName}{" "}
              {selectedCustomer.personalInfo.lastName}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getTierColor(selectedCustomer.loyalty.tier)}>
                {selectedCustomer.loyalty.tier} Customer
              </Badge>
              <Badge
                className={getStatusColor(
                  selectedCustomer.engagement.accountStatus,
                )}
              >
                {selectedCustomer.engagement.accountStatus}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact
            </Button>
            <Button variant="outline" size="sm">
              <Gift className="h-4 w-4 mr-2" />
              Offer
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">
                        {selectedCustomer.personalInfo.firstName}{" "}
                        {selectedCustomer.personalInfo.lastName}
                      </p>
                      {selectedCustomer.personalInfo.gender && (
                        <p className="text-sm text-muted-foreground capitalize">
                          {selectedCustomer.personalInfo.gender}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">
                        {selectedCustomer.personalInfo.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Primary contact
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">
                        {selectedCustomer.personalInfo.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Email address
                      </p>
                    </div>
                  </div>

                  {selectedCustomer.personalInfo.dateOfBirth && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium">
                          {selectedCustomer.personalInfo.dateOfBirth.toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Date of birth
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address & Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {selectedCustomer.address.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedCustomer.address.city},{" "}
                        {selectedCustomer.address.county}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedCustomer.address.postalCode}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {selectedCustomer.businessInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Business Name
                      </Label>
                      <p>{selectedCustomer.businessInfo.businessName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Business Type
                      </Label>
                      <p>{selectedCustomer.businessInfo.businessType}</p>
                    </div>
                    {selectedCustomer.businessInfo.employees && (
                      <div>
                        <Label className="text-sm font-medium">Employees</Label>
                        <p>{selectedCustomer.businessInfo.employees}</p>
                      </div>
                    )}
                    {selectedCustomer.businessInfo.taxId && (
                      <div>
                        <Label className="text-sm font-medium">Tax ID</Label>
                        <p className="font-mono text-sm">
                          {selectedCustomer.businessInfo.taxId}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Language</Label>
                    <p className="uppercase">
                      {selectedCustomer.preferences.language}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Currency</Label>
                    <p>{selectedCustomer.preferences.currency}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Communication</Label>
                    <p className="capitalize">
                      {selectedCustomer.preferences.communicationChannel}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Preferred Categories
                  </Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedCustomer.preferences.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="text-xs"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Price Range</Label>
                  <p>
                    {selectedCustomer.preferences.currency}{" "}
                    {selectedCustomer.preferences.priceRange.min} -{" "}
                    {selectedCustomer.preferences.priceRange.max}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">
                    {selectedCustomer.analytics.totalOrders}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">
                    {selectedCustomer.preferences.currency}{" "}
                    {selectedCustomer.analytics.avgOrderValue.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Avg Order Value
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">
                    {selectedCustomer.preferences.currency}{" "}
                    {selectedCustomer.loyalty.totalSpent.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lifetime Value
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">
                    {selectedCustomer.analytics.lastOrderDate
                      ? Math.floor(
                          (Date.now() -
                            selectedCustomer.analytics.lastOrderDate.getTime()) /
                            (1000 * 60 * 60 * 24),
                        )
                      : "N/A"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Days Since Last Order
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedCustomer.analytics.frequentCategories.map(
                      (category, index) => (
                        <div
                          key={category}
                          className="flex justify-between items-center"
                        >
                          <span>{category}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${100 - index * 20}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {100 - index * 20}%
                            </span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(
                      selectedCustomer.analytics.paymentMethods,
                    ).map(([method, count]) => (
                      <div
                        key={method}
                        className="flex justify-between items-center"
                      >
                        <span className="capitalize">{method}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {count} times
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${(count / Math.max(...Object.values(selectedCustomer.analytics.paymentMethods))) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Crown className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <p className="text-2xl font-bold capitalize">
                    {selectedCustomer.loyalty.tier}
                  </p>
                  <p className="text-sm text-muted-foreground">Loyalty Tier</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">
                    {selectedCustomer.loyalty.points.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Points Balance
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">
                    {selectedCustomer.loyalty.referrals}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Referrals Made
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">
                    {Math.floor(
                      (Date.now() -
                        selectedCustomer.loyalty.joinDate.getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Days as Member
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Loyalty Program Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Current Tier Benefits</h4>
                    {selectedCustomer.loyalty.tier === "bronze" && (
                      <ul className="text-sm space-y-1">
                        <li>• 1 point per KES 100 spent</li>
                        <li>• Birthday discount: 5%</li>
                        <li>• Free delivery on orders over KES 2000</li>
                      </ul>
                    )}
                    {selectedCustomer.loyalty.tier === "silver" && (
                      <ul className="text-sm space-y-1">
                        <li>• 1.5 points per KES 100 spent</li>
                        <li>• Birthday discount: 10%</li>
                        <li>• Free delivery on orders over KES 1500</li>
                        <li>• Early access to sales</li>
                      </ul>
                    )}
                    {selectedCustomer.loyalty.tier === "gold" && (
                      <ul className="text-sm space-y-1">
                        <li>• 2 points per KES 100 spent</li>
                        <li>• Birthday discount: 15%</li>
                        <li>• Free delivery on all orders</li>
                        <li>• Priority customer support</li>
                        <li>• Exclusive member events</li>
                      </ul>
                    )}
                    {selectedCustomer.loyalty.tier === "platinum" && (
                      <ul className="text-sm space-y-1">
                        <li>• 3 points per KES 100 spent</li>
                        <li>• Birthday discount: 20%</li>
                        <li>• Free express delivery</li>
                        <li>• Dedicated account manager</li>
                        <li>• VIP member events</li>
                        <li>• Personal shopping assistance</li>
                      </ul>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Next Tier Progress</h4>
                    {selectedCustomer.loyalty.tier !== "platinum" && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress to next tier</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full"
                            style={{ width: "75%" }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Spend KES 5,000 more to reach the next tier
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">
                    {Math.floor(
                      (Date.now() -
                        selectedCustomer.engagement.lastActive.getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}
                    d
                  </p>
                  <p className="text-sm text-muted-foreground">Last Active</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <p className="text-2xl font-bold">
                    {selectedCustomer.engagement.satisfaction.toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">
                    {selectedCustomer.engagement.supportTickets}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Support Tickets
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Target
                    className={`h-8 w-8 mx-auto mb-2 ${getRiskColor(selectedCustomer.engagement.riskLevel)}`}
                  />
                  <p
                    className={`text-2xl font-bold capitalize ${getRiskColor(selectedCustomer.engagement.riskLevel)}`}
                  >
                    {selectedCustomer.engagement.riskLevel}
                  </p>
                  <p className="text-sm text-muted-foreground">Risk Level</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Marketing Preferences</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Marketing Consent</span>
                      <Badge
                        className={
                          selectedCustomer.engagement.marketingConsent
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {selectedCustomer.engagement.marketingConsent
                          ? "Yes"
                          : "No"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Preferred Channel</span>
                      <span className="text-sm capitalize">
                        {selectedCustomer.preferences.communicationChannel}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline">
                        Send Offer
                      </Button>
                      <Button size="sm" variant="outline">
                        Request Review
                      </Button>
                      <Button size="sm" variant="outline">
                        Schedule Call
                      </Button>
                      <Button size="sm" variant="outline">
                        Add to Campaign
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Customer Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">
              {customerMetrics.totalCustomers}
            </p>
            <p className="text-sm text-muted-foreground">Total Customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">
              {customerMetrics.activeCustomers}
            </p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{customerMetrics.newThisMonth}</p>
            <p className="text-sm text-muted-foreground">New This Month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-2xl font-bold">
              {customerMetrics.totalLifetimeValue > 1000000
                ? `${(customerMetrics.totalLifetimeValue / 1000000).toFixed(1)}M`
                : `${(customerMetrics.totalLifetimeValue / 1000).toFixed(0)}K`}
            </p>
            <p className="text-sm text-muted-foreground">Total LTV</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
            <p className="text-2xl font-bold">
              KES {customerMetrics.avgOrderValue.toFixed(0)}
            </p>
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Crown className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">
              {customerMetrics.loyaltyDistribution.gold +
                customerMetrics.loyaltyDistribution.platinum}
            </p>
            <p className="text-sm text-muted-foreground">VIP Customers</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-6 h-[700px]">
        {/* Customers List */}
        <div className="w-1/3 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Customers</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>

          <div className="space-y-3">
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-2">
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>

              <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  {segments.map((segment) => (
                    <SelectItem key={segment.id} value={segment.id}>
                      {segment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto h-[500px]">
            {filteredCustomers.map(renderCustomerCard)}
          </div>
        </div>

        {/* Customer Details */}
        <div className="flex-1 border-l pl-6">{renderCustomerDetails()}</div>
      </div>
    </div>
  );
};

export default CustomerManager;
