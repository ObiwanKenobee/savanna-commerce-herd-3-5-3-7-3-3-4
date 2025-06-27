import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Package,
  CreditCard,
  Truck,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SavannahNavigation } from "@/components/wildlife/SavannahNavigation";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart`,
    });
  };

  const handleClearCart = () => {
    if (cart.totalItems > 0) {
      clearCart();
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    }
  };

  const handleCheckout = () => {
    if (cart.totalItems === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out",
        variant: "destructive",
      });
      return;
    }

    console.log("🛒 Proceeding to checkout with:", cart);
    toast({
      title: "Proceeding to checkout! 🚀",
      description: `Processing ${cart.totalItems} items worth KES ${cart.totalAmount.toLocaleString()}`,
    });

    // Simulate checkout process
    setTimeout(() => {
      navigate("/billing");
    }, 1500);
  };

  const shipping = cart.totalAmount > 5000 ? 0 : 300; // Free shipping over KES 5,000
  const tax = Math.round(cart.totalAmount * 0.16); // 16% VAT
  const total = cart.totalAmount + shipping + tax;

  if (cart.totalItems === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <SavannahNavigation />

        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center py-20">
              <div className="text-6xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Start adding some amazing products from our marketplace!
              </p>
              <div className="space-y-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Link to="/open-market">
                    <Package className="h-4 w-4 mr-2" />
                    Browse Products
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <Link to="/group-buying">
                    <span className="text-lg mr-2">🤝</span>
                    Join Group Buying
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <SavannahNavigation />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/open-market">
                <Button variant="ghost" className="hover:bg-green-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  🛒 Shopping Cart
                </h1>
                <p className="text-gray-600">
                  {cart.totalItems} items in your cart
                </p>
              </div>
            </div>

            {cart.totalItems > 0 && (
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="text-red-600 border-red-600 hover:bg-red-50 self-start sm:self-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Clear Cart</span>
                <span className="sm:hidden">Clear</span>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-green-200"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Product Image Placeholder */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 w-full sm:w-auto">
                        <h3 className="font-semibold text-base sm:text-lg">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          by {item.product.supplier?.name || "Local Supplier"}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {item.product.category}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {item.product.unit_of_measure}
                          </span>
                        </div>
                        <p className="text-base sm:text-lg font-bold text-green-600 mt-2">
                          KES {item.unitPrice.toLocaleString()} per{" "}
                          {item.product.unit_of_measure}
                        </p>
                      </div>

                      {/* Quantity Controls & Actions */}
                      <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto gap-4 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value) || 1,
                              )
                            }
                            className="w-16 h-8 text-center"
                            min="1"
                          />

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-gray-600">Total</div>
                          <div className="font-bold text-green-600">
                            KES {item.totalPrice.toLocaleString()}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleRemoveItem(item.id, item.product.name)
                          }
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    <span>Order Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal ({cart.totalItems} items)</span>
                      <span>KES {cart.totalAmount.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center space-x-1">
                        <Truck className="h-4 w-4" />
                        <span>Shipping</span>
                      </span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600 font-medium">
                            FREE
                          </span>
                        ) : (
                          `KES ${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>

                    {shipping === 0 && (
                      <div className="text-xs text-green-600 flex items-center space-x-1">
                        <span>🎉</span>
                        <span>You qualified for free shipping!</span>
                      </div>
                    )}

                    {cart.totalAmount < 5000 && (
                      <div className="text-xs text-blue-600 flex items-center space-x-1">
                        <span>💡</span>
                        <span>
                          Add KES {(5000 - cart.totalAmount).toLocaleString()}{" "}
                          more for free shipping
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>VAT (16%)</span>
                      <span>KES {tax.toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">
                      KES {total.toLocaleString()}
                    </span>
                  </div>

                  {/* Payment Methods Preview */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Payment Options:</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold">
                          MP
                        </div>
                        <span>M-Pesa</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs">
                          💳
                        </div>
                        <span>Cards</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-xs">
                          💧
                        </div>
                        <span>BNPL</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Button>

                  <div className="text-xs text-gray-500 text-center flex items-center justify-center space-x-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>Secure checkout powered by M-Pesa</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
