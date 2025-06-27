import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Smartphone,
  Coins,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";
import { NEO_SAVANNAH_THEME } from "@/theme/neo-savannah-theme";

interface PaymentMethod {
  id: string;
  name: string;
  type: "mpesa" | "card" | "crypto" | "ussd";
  icon: React.ReactNode;
  fee: number;
  processingTime: string;
  isAvailable: boolean;
  description: string;
}

interface PaymentProcessorProps {
  amount: number;
  currency: "KES" | "USD";
  orderId: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  onCancel?: () => void;
  className?: string;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  amount,
  currency,
  orderId,
  onSuccess,
  onError,
  onCancel,
  className = "",
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    phoneNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    walletAddress: "",
    ussdCode: "",
  });
  const [mbogaAmount, setMbogaAmount] = useState(0);

  const paymentMethods: PaymentMethod[] = [
    {
      id: "mpesa",
      name: "M-Pesa",
      type: "mpesa",
      icon: <Smartphone className="h-5 w-5" />,
      fee: 0.02,
      processingTime: "Instant",
      isAvailable: true,
      description: "Pay securely with your M-Pesa mobile money",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      type: "card",
      icon: <CreditCard className="h-5 w-5" />,
      fee: 0.035,
      processingTime: "1-2 minutes",
      isAvailable: true,
      description: "Visa, Mastercard, and local bank cards accepted",
    },
    {
      id: "mboga",
      name: "Mboga Coin",
      type: "crypto",
      icon: <Coins className="h-5 w-5" />,
      fee: 0.01,
      processingTime: "~30 seconds",
      isAvailable: true,
      description: "Pay with digital Mboga Coins for instant transactions",
    },
    {
      id: "ussd",
      name: "USSD Banking",
      type: "ussd",
      icon: <Zap className="h-5 w-5" />,
      fee: 0.015,
      processingTime: "2-5 minutes",
      isAvailable: true,
      description: "Use *384# for feature phone banking",
    },
  ];

  useEffect(() => {
    // Convert to Mboga Coins (1 MBOGA = 100 KES)
    setMbogaAmount(Math.round(amount / 100));
  }, [amount]);

  const selectedMethodData = paymentMethods.find(
    (m) => m.id === selectedMethod,
  );
  const totalAmount = amount + amount * (selectedMethodData?.fee || 0);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate different payment processing based on method
      await simulatePayment(selectedMethod);

      // Generate transaction ID
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      onSuccess(transactionId);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const simulatePayment = async (method: string) => {
    switch (method) {
      case "mpesa":
        if (!paymentData.phoneNumber || paymentData.phoneNumber.length < 10) {
          throw new Error("Valid phone number required for M-Pesa");
        }
        break;
      case "card":
        if (
          !paymentData.cardNumber ||
          !paymentData.expiryDate ||
          !paymentData.cvv
        ) {
          throw new Error("All card details required");
        }
        break;
      case "mboga":
        if (!paymentData.walletAddress) {
          throw new Error("Wallet address required for Mboga Coin payment");
        }
        break;
      case "ussd":
        // USSD doesn't require additional validation
        break;
      default:
        throw new Error("Invalid payment method");
    }

    // Simulate random payment failures (5% chance)
    if (Math.random() < 0.05) {
      throw new Error("Payment processing failed. Please try again.");
    }
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case "mpesa":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">M-Pesa Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="254XXXXXXXXX"
                value={paymentData.phoneNumber}
                onChange={(e) =>
                  setPaymentData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                className="font-mono"
              />
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <Smartphone className="h-4 w-4" />
                <span className="font-medium">M-Pesa Payment Process</span>
              </div>
              <ol className="text-sm text-green-600 space-y-1">
                <li>1. You'll receive an M-Pesa prompt on your phone</li>
                <li>2. Enter your M-Pesa PIN to authorize</li>
                <li>3. Payment will be processed instantly</li>
              </ol>
            </div>
          </div>
        );

      case "card":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) =>
                  setPaymentData((prev) => ({
                    ...prev,
                    cardNumber: e.target.value,
                  }))
                }
                className="font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      expiryDate: e.target.value,
                    }))
                  }
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) =>
                    setPaymentData((prev) => ({ ...prev, cvv: e.target.value }))
                  }
                  className="font-mono"
                />
              </div>
            </div>
          </div>
        );

      case "mboga":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="wallet">Mboga Wallet Address</Label>
              <Input
                id="wallet"
                type="text"
                placeholder="0x742d35Cc6634C0532925a3b8D0c4432AF745289E"
                value={paymentData.walletAddress}
                onChange={(e) =>
                  setPaymentData((prev) => ({
                    ...prev,
                    walletAddress: e.target.value,
                  }))
                }
                className="font-mono text-xs"
              />
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 text-purple-700 mb-2">
                <Coins className="h-4 w-4" />
                <span className="font-medium">Crypto Payment Details</span>
              </div>
              <div className="text-sm text-purple-600 space-y-1">
                <p>
                  Amount: <span className="font-mono">{mbogaAmount} MBOGA</span>
                </p>
                <p>Network: Neo-Savannah Blockchain</p>
                <p>Gas Fee: ~0.01 MBOGA</p>
              </div>
            </div>
          </div>
        );

      case "ussd":
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Zap className="h-4 w-4" />
                <span className="font-medium">USSD Payment Instructions</span>
              </div>
              <ol className="text-sm text-blue-600 space-y-2">
                <li>
                  1. Dial{" "}
                  <span className="font-mono bg-blue-100 px-1 rounded">
                    *384*PAY#{orderId}#
                  </span>
                </li>
                <li>2. Follow the prompts to select your bank</li>
                <li>3. Enter your banking PIN</li>
                <li>4. Confirm payment of KES {totalAmount.toFixed(2)}</li>
              </ol>
            </div>
            <div className="text-center">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(`*384*PAY#${orderId}#`);
                  alert("USSD code copied to clipboard");
                }}
                variant="outline"
                size="sm"
              >
                Copy USSD Code
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Secure Payment
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Order: {orderId}</span>
          <Badge variant="outline">SSL Secured</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Amount Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span>Subtotal:</span>
            <span>
              {currency} {amount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Processing Fee:</span>
            <span>
              {currency} {(amount * (selectedMethodData?.fee || 0)).toFixed(2)}
            </span>
          </div>
          <div className="border-t pt-2 flex justify-between items-center font-bold">
            <span>Total:</span>
            <span>
              {currency} {totalAmount.toFixed(2)}
            </span>
          </div>
          {selectedMethod === "mboga" && (
            <div className="text-center mt-2 text-purple-600 text-sm">
              ≈ {mbogaAmount} {NEO_SAVANNAH_THEME.currency.mbogaCoin.symbol}
            </div>
          )}
        </div>

        {/* Payment Method Selection */}
        <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
            <TabsTrigger value="mboga">Crypto</TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-2">
            {paymentMethods
              .filter((method) =>
                selectedMethod === "mpesa"
                  ? ["mpesa", "ussd"].includes(method.id)
                  : ["mboga", "card"].includes(method.id),
              )
              .map((method) => (
                <Button
                  key={method.id}
                  variant={selectedMethod === method.id ? "default" : "outline"}
                  className="w-full justify-between h-auto p-4"
                  onClick={() => setSelectedMethod(method.id)}
                  disabled={!method.isAvailable}
                >
                  <div className="flex items-center gap-3">
                    {method.icon}
                    <div className="text-left">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-xs opacity-70">
                        {method.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div>Fee: {(method.fee * 100).toFixed(1)}%</div>
                    <div className="opacity-70">{method.processingTime}</div>
                  </div>
                </Button>
              ))}
          </div>
        </Tabs>

        {/* Payment Form */}
        <div>{renderPaymentForm()}</div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Pay {currency} {totalAmount.toFixed(2)}
              </>
            )}
          </Button>
        </div>

        {/* Security Notice */}
        <div className="text-xs text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Shield className="h-3 w-3" />
            <span>Your payment is secured by blockchain technology</span>
          </div>
          <p>All transactions are encrypted and monitored for fraud</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentProcessor;
