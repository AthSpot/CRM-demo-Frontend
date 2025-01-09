import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Wallet, CreditCard, Receipt, Gift } from "lucide-react";

const WalletPage = () => {
  return (
    <div className="min-h-[calc(100vh-112px)] mt-16 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$0.00</div>
            <Button className="mt-4">Add Funds</Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Add Payment Method</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-6 h-6" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No transactions yet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-6 h-6" />
                Rewards & Discounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No rewards available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;