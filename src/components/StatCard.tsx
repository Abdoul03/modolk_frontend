import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const StatCard = ({ title, value, subtext, icon: Icon }) => {
  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-serif mb-1 text-slate-800">{value}</div>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
