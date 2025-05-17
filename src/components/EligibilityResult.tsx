import { format } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface EligibilityResultProps {
  eligibilityDate: Date;
  remainingDays4Years: number;
  remainingDays1Year: number;
}

export function EligibilityResult({ eligibilityDate, remainingDays4Years, remainingDays1Year }: EligibilityResultProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Application Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-primary">
            {format(eligibilityDate, "MMMM d, yyyy")}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              4-Year Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">
                {remainingDays4Years}
              </p>
              <p className="text-sm text-muted-foreground">
                Days remaining for absence in the last 4 years
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              12-Month Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">
                {remainingDays1Year}
              </p>
              <p className="text-sm text-muted-foreground">
                Days remaining for absence in the last 12 months
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Note:</p>
        <p>These calculations are based on the information you provided. Please verify with the official Department of Home Affairs calculator for the most accurate results.</p>
      </div>
    </div>
  );
}