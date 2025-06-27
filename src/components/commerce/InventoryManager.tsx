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
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Truck,
  BarChart3,
  Eye,
  Download,
  Upload,
  RefreshCw,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  vendor: {
    id: string;
    name: string;
    location: string;
  };
  pricing: {
    cost: number;
    price: number;
    currency: "KES" | "USD";
    margin: number;
  };
  inventory: {
    quantity: number;
    reserved: number;
    available: number;
    reorderLevel: number;
    maxStock: number;
    location: string;
  };
  status: "active" | "inactive" | "discontinued";
  metrics: {
    sales30Days: number;
    revenue30Days: number;
    turnoverRate: number;
    lastSold?: Date;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  attributes: { [key: string]: string };
  pricing: {
    cost: number;
    price: number;
    margin: number;
  };
  inventory: {
    quantity: number;
    reserved: number;
    available: number;
  };
}

interface StockMovement {
  id: string;
  productId: string;
  type: "in" | "out" | "adjustment" | "reserved" | "released";
  quantity: number;
  reason: string;
  reference?: string;
  location: string;
  performedBy: string;
  timestamp: Date;
  notes?: string;
}

interface InventoryManagerProps {
  products: Product[];
  stockMovements: StockMovement[];
  onProductUpdate?: (productId: string, updates: Partial<Product>) => void;
  onStockMovement?: (movement: Omit<StockMovement, "id" | "timestamp">) => void;
  onReorderAlert?: (product: Product) => void;
  userRole: "vendor" | "admin" | "manager";
  className?: string;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({
  products,
  stockMovements,
  onProductUpdate,
  onStockMovement,
  onReorderAlert,
  userRole,
  className = "",
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newStockMovement, setNewStockMovement] = useState({
    type: "in" as "in" | "out" | "adjustment",
    quantity: 0,
    reason: "",
    location: "",
    notes: "",
  });

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  // Get unique categories
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendor.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;

    let matchesStock = true;
    if (stockFilter === "low") {
      matchesStock =
        product.inventory.available <= product.inventory.reorderLevel;
    } else if (stockFilter === "out") {
      matchesStock = product.inventory.available === 0;
    } else if (stockFilter === "overstock") {
      matchesStock =
        product.inventory.available > product.inventory.maxStock * 0.9;
    }

    return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  });

  // Get stock alerts
  const stockAlerts = products.filter(
    (p) =>
      p.inventory.available <= p.inventory.reorderLevel &&
      p.status === "active",
  );

  // Calculate inventory metrics
  const inventoryMetrics = {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.status === "active").length,
    lowStockItems: stockAlerts.length,
    outOfStockItems: products.filter((p) => p.inventory.available === 0).length,
    totalValue: products.reduce(
      (sum, p) => sum + p.inventory.available * p.pricing.cost,
      0,
    ),
    totalRevenue30Days: products.reduce(
      (sum, p) => sum + p.metrics.revenue30Days,
      0,
    ),
  };

  const getStockStatusColor = (product: Product) => {
    if (product.inventory.available === 0)
      return "bg-red-100 text-red-800 border-red-200";
    if (product.inventory.available <= product.inventory.reorderLevel)
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (product.inventory.available > product.inventory.maxStock * 0.9)
      return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getStockStatusText = (product: Product) => {
    if (product.inventory.available === 0) return "Out of Stock";
    if (product.inventory.available <= product.inventory.reorderLevel)
      return "Low Stock";
    if (product.inventory.available > product.inventory.maxStock * 0.9)
      return "Overstock";
    return "In Stock";
  };

  const handleStockAdjustment = (productId: string) => {
    if (onStockMovement && newStockMovement.quantity !== 0) {
      onStockMovement({
        productId,
        type: newStockMovement.type,
        quantity: Math.abs(newStockMovement.quantity),
        reason: newStockMovement.reason,
        location: newStockMovement.location,
        performedBy: "current-user", // This would come from auth context
        notes: newStockMovement.notes,
      });

      // Reset form
      setNewStockMovement({
        type: "in",
        quantity: 0,
        reason: "",
        location: "",
        notes: "",
      });
    }
  };

  const renderProductCard = (product: Product) => (
    <Card
      key={product.id}
      className={`cursor-pointer transition-all hover:shadow-md ${
        selectedProductId === product.id ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => setSelectedProductId(product.id)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
            <p className="text-xs text-muted-foreground">
              {product.vendor.name}
            </p>
          </div>
          <Badge className={getStockStatusColor(product)}>
            {getStockStatusText(product)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Available</p>
            <p className="font-semibold">{product.inventory.available}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-semibold">
              {product.pricing.currency} {product.pricing.price}
            </p>
          </div>
        </div>

        {product.inventory.available <= product.inventory.reorderLevel && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              <span>
                Reorder needed (minimum: {product.inventory.reorderLevel})
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderProductDetails = () => {
    if (!selectedProduct) {
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <Package className="h-12 w-12 mx-auto mb-4" />
            <p>Select a product to view details</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
            <p className="text-muted-foreground">SKU: {selectedProduct.sku}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Public
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="movements">Stock History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Category</Label>
                    <p>{selectedProduct.category}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm">{selectedProduct.description}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Vendor</Label>
                    <p>{selectedProduct.vendor.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedProduct.vendor.location}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedProduct.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Margins</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Cost</Label>
                      <p className="text-lg font-semibold">
                        {selectedProduct.pricing.currency}{" "}
                        {selectedProduct.pricing.cost.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Selling Price
                      </Label>
                      <p className="text-lg font-semibold">
                        {selectedProduct.pricing.currency}{" "}
                        {selectedProduct.pricing.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Margin</Label>
                    <p className="text-lg font-semibold text-green-600">
                      {selectedProduct.pricing.margin.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Profit per Unit
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedProduct.pricing.currency}{" "}
                      {(
                        selectedProduct.pricing.price -
                        selectedProduct.pricing.cost
                      ).toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {selectedProduct.variants.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Product Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedProduct.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex justify-between items-center p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{variant.name}</p>
                          <p className="text-sm text-muted-foreground">
                            SKU: {variant.sku}
                          </p>
                          <div className="flex gap-2 mt-1">
                            {Object.entries(variant.attributes).map(
                              ([key, value]) => (
                                <Badge
                                  key={key}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {key}: {value}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {selectedProduct.pricing.currency}{" "}
                            {variant.pricing.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Stock: {variant.inventory.available}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">Available Stock</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {selectedProduct.inventory.available}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Reserved: {selectedProduct.inventory.reserved}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm font-medium">Reorder Level</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {selectedProduct.inventory.reorderLevel}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Max: {selectedProduct.inventory.maxStock}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {selectedProduct.inventory.location}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Stock Adjustment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="adjustmentType">Adjustment Type</Label>
                    <Select
                      value={newStockMovement.type}
                      onValueChange={(value: any) =>
                        setNewStockMovement((prev) => ({
                          ...prev,
                          type: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">Stock In</SelectItem>
                        <SelectItem value="out">Stock Out</SelectItem>
                        <SelectItem value="adjustment">Adjustment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newStockMovement.quantity}
                      onChange={(e) =>
                        setNewStockMovement((prev) => ({
                          ...prev,
                          quantity: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reason">Reason</Label>
                    <Input
                      id="reason"
                      value={newStockMovement.reason}
                      onChange={(e) =>
                        setNewStockMovement((prev) => ({
                          ...prev,
                          reason: e.target.value,
                        }))
                      }
                      placeholder="e.g., Received shipment, Damage, Sale"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newStockMovement.location}
                      onChange={(e) =>
                        setNewStockMovement((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      placeholder="Warehouse location"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input
                    id="notes"
                    value={newStockMovement.notes}
                    onChange={(e) =>
                      setNewStockMovement((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Additional notes"
                  />
                </div>

                <Button
                  onClick={() => handleStockAdjustment(selectedProduct.id)}
                  disabled={
                    !newStockMovement.quantity || !newStockMovement.reason
                  }
                  className="w-full"
                >
                  Apply Stock Adjustment
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Stock Movements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stockMovements
                    .filter(
                      (movement) => movement.productId === selectedProduct.id,
                    )
                    .slice(0, 10)
                    .map((movement) => (
                      <div
                        key={movement.id}
                        className="flex justify-between items-center p-3 border rounded-lg"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                movement.type === "in"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {movement.type === "in" ? "+" : "-"}
                              {movement.quantity}
                            </Badge>
                            <span className="font-medium">
                              {movement.reason}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {movement.location} • by {movement.performedBy}
                          </p>
                          {movement.notes && (
                            <p className="text-xs text-muted-foreground italic">
                              {movement.notes}
                            </p>
                          )}
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>{movement.timestamp.toLocaleDateString()}</p>
                          <p>{movement.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">30-Day Sales</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {selectedProduct.metrics.sales30Days}
                  </p>
                  <p className="text-sm text-muted-foreground">units sold</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">30-Day Revenue</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {selectedProduct.pricing.currency}{" "}
                    {selectedProduct.metrics.revenue30Days.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium">Turnover Rate</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {selectedProduct.metrics.turnoverRate.toFixed(1)}x
                  </p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">
                      Sales Performance
                    </h4>
                    <p className="text-sm text-blue-700">
                      This product has sold{" "}
                      {selectedProduct.metrics.sales30Days} units in the last 30
                      days, generating {selectedProduct.pricing.currency}{" "}
                      {selectedProduct.metrics.revenue30Days.toFixed(2)} in
                      revenue.
                    </p>
                  </div>

                  {selectedProduct.metrics.lastSold && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">
                        Last Sale
                      </h4>
                      <p className="text-sm text-green-700">
                        Last sold on{" "}
                        {selectedProduct.metrics.lastSold.toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {selectedProduct.inventory.available <=
                    selectedProduct.inventory.reorderLevel && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">
                        Stock Alert
                      </h4>
                      <p className="text-sm text-yellow-700">
                        Current stock ({selectedProduct.inventory.available}) is
                        below reorder level (
                        {selectedProduct.inventory.reorderLevel}). Consider
                        restocking soon.
                      </p>
                      <Button
                        size="sm"
                        className="mt-2"
                        onClick={() => onReorderAlert?.(selectedProduct)}
                      >
                        Create Reorder
                      </Button>
                    </div>
                  )}
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
      {/* Inventory Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">
              {inventoryMetrics.totalProducts}
            </p>
            <p className="text-sm text-muted-foreground">Total Products</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">
              {inventoryMetrics.activeProducts}
            </p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-2xl font-bold">
              {inventoryMetrics.lowStockItems}
            </p>
            <p className="text-sm text-muted-foreground">Low Stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <p className="text-2xl font-bold">
              {inventoryMetrics.outOfStockItems}
            </p>
            <p className="text-sm text-muted-foreground">Out of Stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">
              {inventoryMetrics.totalValue > 1000000
                ? `${(inventoryMetrics.totalValue / 1000000).toFixed(1)}M`
                : `${(inventoryMetrics.totalValue / 1000).toFixed(0)}K`}
            </p>
            <p className="text-sm text-muted-foreground">Inventory Value</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
            <p className="text-2xl font-bold">
              {inventoryMetrics.totalRevenue30Days > 1000000
                ? `${(inventoryMetrics.totalRevenue30Days / 1000000).toFixed(1)}M`
                : `${(inventoryMetrics.totalRevenue30Days / 1000).toFixed(0)}K`}
            </p>
            <p className="text-sm text-muted-foreground">30d Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Alerts */}
      {stockAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="h-5 w-5" />
              Stock Alerts ({stockAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {stockAlerts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    SKU: {product.sku}
                  </p>
                  <p className="text-sm">
                    Available:{" "}
                    <span className="font-semibold text-yellow-700">
                      {product.inventory.available}
                    </span>
                    (Min: {product.inventory.reorderLevel})
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 w-full"
                    onClick={() => onReorderAlert?.(product)}
                  >
                    Reorder
                  </Button>
                </div>
              ))}
            </div>
            {stockAlerts.length > 6 && (
              <p className="text-center mt-3 text-sm text-muted-foreground">
                +{stockAlerts.length - 6} more items need attention
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-6 h-[600px]">
        {/* Products List */}
        <div className="w-1/3 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Products</h3>
            <Button size="sm" onClick={() => setShowAddProduct(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          <div className="space-y-3">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
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
                  <SelectItem value="discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>

              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="out">Out of Stock</SelectItem>
                  <SelectItem value="overstock">Overstock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto h-[400px]">
            {filteredProducts.map(renderProductCard)}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 border-l pl-6">{renderProductDetails()}</div>
      </div>
    </div>
  );
};

export default InventoryManager;
