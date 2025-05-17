'use client'

import { BuyMeCoffee } from "@/components/BuyMeCoffee";
import { DatePicker } from "@/components/DatePicker";
import { DatePickerWithRange } from "@/components/DatePickerRange";
import { EligibilityResult } from "@/components/EligibilityResult";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Trip, calculateEligibilityDate, parseCsvTrips } from "@/lib/citizenship-calculator";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function CitizenshipEligibilityApp() {
  const [residencyStart, setResidencyStart] = useState<Date>();
  const [permanentVisaStart, setPermanentVisaStart] = useState<Date>();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<DateRange>();
  const [csvTrips, setCsvTrips] = useState("");
  const [result, setResult] = useState<{
    eligibilityDate: Date;
    remainingDays4Years: number;
    remainingDays1Year: number;
  } | null>(null);
  const [showResult, setShowResult] = useState(false);

  function addTrip() {
    if (currentTrip?.from && currentTrip?.to) {
      setTrips([...trips, { depart: currentTrip.from, arrive: currentTrip.to }]);
      setCurrentTrip(undefined);
    }
  }

  function handleSubmit() {
    if (!residencyStart || !permanentVisaStart) {
      setResult(null);
      setShowResult(true);
      return;
    }

    const result = calculateEligibilityDate(residencyStart, permanentVisaStart, trips);
    setResult(result);
    setShowResult(true);
  }

  return (
    <div className="bg-muted p-6">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Australian Citizenship Eligibility Checker</h1>
          <p className="text-muted-foreground">Check your eligibility for Australian citizenship</p>
        </div>
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center md:hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Requirements</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>General Residence Requirements</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          To be eligible, you must have:
                        </p>
                        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                          <li>Been living in Australia on a valid visa for 4 years immediately before the day you apply</li>
                          <li>Held a permanent visa or a Special Category (subclass 444) visa (SCV) for the last 12 months immediately before the day you apply</li>
                          <li>Not been absent from Australia for more than 12 months in the past 4 years, and no more than 90 days in the 12 months immediately before applying</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">How to use the Residence Calculator</h2>
                  <p className="text-sm text-muted-foreground">
                    To use the Residence Calculator, you need to enter exact dates of your:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                    <li>permanent residence</li>
                    <li>lawful residence</li>
                    <li>travel in and out of Australia in the last 4 years</li>
                  </ul>
                </div>
                <div className="hidden md:flex md:flex-shrink-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Requirements</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>General Residence Requirements</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            To be eligible, you must have:
                          </p>
                          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                            <li>Been living in Australia on a valid visa for 4 years immediately before the day you apply</li>
                            <li>Held a permanent visa or a Special Category (subclass 444) visa (SCV) for the last 12 months immediately before the day you apply</li>
                            <li>Not been absent from Australia for more than 12 months in the past 4 years, and no more than 90 days in the 12 months immediately before applying</li>
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Lawful Residence Date</h3>
              <p className="text-sm text-muted-foreground">
                This is when you first started living in Australia on a valid visa. If you are unsure of the exact date, an estimated date can be used as long as you are confident that it was more than four years ago.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Permanent Residence Date</h3>
              <p className="text-sm text-muted-foreground">
                Your permanent residency starts on the date:
              </p>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>We granted the permanent visa when you were in Australia, or</li>
                <li>You first entered Australia on a permanent visa</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Lawful Residence Start Date</label>
                <DatePicker date={residencyStart} onDateChange={setResidencyStart} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Permanent Visa Start Date</label>
                <DatePicker date={permanentVisaStart} onDateChange={setPermanentVisaStart} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Trips Outside Australia</label>
                <Tabs defaultValue="picker" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="picker">Date Picker</TabsTrigger>
                    <TabsTrigger value="csv">CSV Input</TabsTrigger>
                  </TabsList>
                  <TabsContent value="picker" className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Select your departure and return dates using the calendar. Click &quot;Add Trip&quot; to add each trip to the list.
                    </p>
                    <DatePickerWithRange date={currentTrip} onDateChange={setCurrentTrip} />
                    <Button onClick={addTrip} disabled={!currentTrip?.from || !currentTrip?.to} variant="outline">Add Trip</Button>
                  </TabsContent>
                  <TabsContent value="csv" className="space-y-2">
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Enter dates in format: DD/MM/YYYY, DD/MM/YYYY (one per line, departure and return dates separated by a comma)"
                        value={csvTrips}
                        onChange={(e) => setCsvTrips(e.target.value)}
                        rows={5}
                      />
                      <Button onClick={() => setTrips(parseCsvTrips(csvTrips))} variant="outline">Parse Trips</Button>
                    </div>
                  </TabsContent>
                </Tabs>
                {trips.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Added Trips:</h4>
                    <div className="space-y-1">
                      {trips.map((trip, index) => (
                        <div key={index} className="flex items-center justify-between text-sm bg-muted/40 p-1.5 rounded-md">
                          <span>
                            {format(trip.depart, "dd/MM/yyyy")} - {format(trip.arrive, "dd/MM/yyyy")}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setTrips(trips.filter((_, i) => i !== index))}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Button onClick={handleSubmit}>Check</Button>
              <Dialog open={showResult} onOpenChange={setShowResult}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Eligibility Result</DialogTitle>
                  </DialogHeader>
                  {result ? (
                    <EligibilityResult
                      eligibilityDate={result.eligibilityDate}
                      remainingDays4Years={result.remainingDays4Years}
                      remainingDays1Year={result.remainingDays1Year}
                    />
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Please select both dates to check eligibility</p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <div className="space-y-2">
              <BuyMeCoffee />
              <p className="font-medium">Disclaimer</p>
              <p>
                This web application is provided for general informational purposes only and is not affiliated with the Australian Government or the Department of Home Affairs. It is designed to help users estimate their residential eligibility for Australian citizenship by conferral based on publicly available guidelines.
              </p>
              <p>Please note that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The results generated by this tool are estimates only and do not guarantee eligibility.</li>
                <li>Users must refer to the official Residence Calculator and eligibility requirements provided by the Department of Home Affairs for accurate and up-to-date information.</li>
              </ul>
              <p>For authoritative information, please visit:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><a href="https://immi.homeaffairs.gov.au/citizenship/become-a-citizen/permanent-resident" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">Citizenship Eligibility Criteria</a></li>
                <li><a href="https://immi.homeaffairs.gov.au/citizenship/become-a-citizen/permanent-resident/residence-calculator" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">Official Residence Calculator</a></li>
                <li><a href="https://immi.homeaffairs.gov.au/entering-and-leaving-australia/request-movement-records" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">Request Movement Records</a></li>
              </ul>
              <p>Always seek official advice if you are unsure about your eligibility.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
