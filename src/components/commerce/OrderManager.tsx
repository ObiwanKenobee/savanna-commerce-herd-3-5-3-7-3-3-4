import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Truck,
  MapPin,
  Clock,
  User,
  Phone,
  Star,
  MessageSquare,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Download,
  Share,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  vendor: string;
  sku: string;
}

interface Order {
  id: string;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "disputed";
  items: OrderItem[];
  total: number;
  currency: "KES" | "USD";
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  vendor: {
    name: string;
    phone: string;
    location: string;
    rating: number;
  };
  tracking: {
    driver?: {
      name: string;
      phone: string;
      vehicle: string;
      rating: number;
    };
    estimatedDelivery: Date;
    currentLocation?: string;
    progress: number;
  };
  timeline: Array<{
    status: string;
    timestamp: Date;
    description: string;
    location?: string;
  }>;
  paymentMethod: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderManagerProps {
  orders: Order[];
  onUpdateOrder?: (orderId: string, updates: Partial<Order>) => void;
  onCancelOrder?: (orderId: string, reason: string) => void;
  onContactVendor?: (vendorInfo: Order["vendor"]) => void;
  onContactDriver?: (driverInfo: Order["tracking"]["driver"]) => void;
  onTrackOrder?: (orderId: string) => void;
  userRole: "customer" | "vendor" | "driver" | "admin";
  className?: string;
}

const OrderManager: React.FC<OrderManagerProps> = ({
  orders,
  onUpdateOrder,
  onCancelOrder,
  onContactVendor,
  onContactDriver,
  onTrackOrder,
  userRole,
  className = "",
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "shipped":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "disputed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      case "disputed":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    if (onUpdateOrder) {
      onUpdateOrder(orderId, {
        status: newStatus,
        updatedAt: new Date(),
        timeline: [
          ...(orders.find((o) => o.id === orderId)?.timeline || []),
          {
            status: newStatus,
            timestamp: new Date(),
            description: `Order ${newStatus}`,
            location: "System Update",
          },
        ],
      });
    }
  };

  const renderOrderCard = (order: Order) => (
    <Card
      key={order.id}
      className={`cursor-pointer transition-all hover:shadow-md ${
        selectedOrderId === order.id ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => setSelectedOrderId(order.id)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold">#{order.id}</h3>
            <p className="text-sm text-muted-foreground">
              {order.items.length} item(s) • {order.vendor.name}
            </p>
          </div>
          <Badge
            className={`${getStatusColor(order.status)} flex items-center gap-1`}
          >
            {getStatusIcon(order.status)}
            {order.status}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold">
            {order.currency} {order.total.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">
            {order.createdAt.toLocaleDateString()}
          </span>
        </div>

        {order.tracking.progress > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Delivery Progress</span>
              <span>{order.tracking.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${order.tracking.progress}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderOrderDetails = () => {
    if (!selectedOrder) {
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <Package className="h-12 w-12 mx-auto mb-4" />
            <p>Select an order to view details</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Order Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Order #{selectedOrder.id}</h2>
            <p className="text-muted-foreground">
              Placed on {selectedOrder.createdAt.toLocaleDateString()} at{" "}
              {selectedOrder.createdAt.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTrackOrder?.(selectedOrder.id)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Track
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            {userRole !== "customer" && (
              <TabsTrigger value="actions">Actions</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 border rounded-lg"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          SKU: {item.sku} • Vendor: {item.vendor}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {selectedOrder.currency}{" "}
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × {selectedOrder.currency}{" "}
                          {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer & Vendor Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Customer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{selectedOrder.customer.name}</p>
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {selectedOrder.customer.phone}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {selectedOrder.customer.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Vendor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{selectedOrder.vendor.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {selectedOrder.vendor.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {selectedOrder.vendor.phone}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {selectedOrder.vendor.location}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => onContactVendor?.(selectedOrder.vendor)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Vendor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Estimated Delivery
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedOrder.tracking.estimatedDelivery.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.tracking.estimatedDelivery.toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Progress</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-600 h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${selectedOrder.tracking.progress}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {selectedOrder.tracking.progress}%
                      </span>
                    </div>
                  </div>
                </div>

                {selectedOrder.tracking.driver && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Driver Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">
                          {selectedOrder.tracking.driver.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrder.tracking.driver.vehicle}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">
                            {selectedOrder.tracking.driver.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() =>
                            onContactDriver?.(selectedOrder.tracking.driver)
                          }
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call Driver
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedOrder.tracking.currentLocation && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">Current Location</span>
                    </div>
                    <p className="text-blue-600 mt-1">
                      {selectedOrder.tracking.currentLocation}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedOrder.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        {index < selectedOrder.timeline.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-medium">{event.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.timestamp.toLocaleDateString()} at{" "}
                          {event.timestamp.toLocaleTimeString()}
                          {event.location && ` • ${event.location}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {userRole !== "customer" && (
            <TabsContent value="actions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedOrder.status === "pending" && (
                      <>
                        <Button
                          onClick={() =>
                            handleStatusUpdate(selectedOrder.id, "confirmed")
                          }
                          className="w-full"
                        >
                          Confirm Order
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            onCancelOrder?.(selectedOrder.id, "Out of stock")
                          }
                          className="w-full"
                        >
                          Cancel Order
                        </Button>
                      </>
                    )}

                    {selectedOrder.status === "confirmed" && (
                      <Button
                        onClick={() =>
                          handleStatusUpdate(selectedOrder.id, "processing")
                        }
                        className="w-full"
                      >
                        Start Processing
                      </Button>
                    )}

                    {selectedOrder.status === "processing" && (
                      <Button
                        onClick={() =>
                          handleStatusUpdate(selectedOrder.id, "shipped")
                        }
                        className="w-full"
                      >
                        Mark as Shipped
                      </Button>
                    )}

                    {selectedOrder.status === "shipped" &&
                      userRole === "driver" && (
                        <Button
                          onClick={() =>
                            handleStatusUpdate(selectedOrder.id, "delivered")
                          }
                          className="w-full"
                        >
                          Mark as Delivered
                        </Button>
                      )}
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    );
  };

  return (
    <div className={`flex gap-6 h-[800px] ${className}`}>
      {/* Orders List */}
      <div className="w-1/3 space-y-4">
        <div className="space-y-4">
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="shipped">Active</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-3 overflow-y-auto h-[600px]">
          {filteredOrders.map(renderOrderCard)}
        </div>
      </div>

      {/* Order Details */}
      <div className="flex-1 border-l pl-6">{renderOrderDetails()}</div>
    </div>
  );
};

export default OrderManager;
