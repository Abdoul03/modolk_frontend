import React from "react";
import { Badge } from "./ui/badge";

const OrderItem = ({ order }: { order }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-muted rounded border flex items-center justify-center italic text-[10px]">
          Photo
        </div>
        <div>
          <p className="font-medium text-slate-900">#{order.id}</p>
          <p className="text-sm text-muted-foreground">{order.modelName}</p>
        </div>
      </div>
      <Badge variant="secondary" className="uppercase tracking-tighter">
        {order.status}
      </Badge>
    </div>
  );
};

export default OrderItem;
