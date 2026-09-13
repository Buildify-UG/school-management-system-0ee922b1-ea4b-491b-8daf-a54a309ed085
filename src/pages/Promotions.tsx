import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Promotions() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [fromYear, setFromYear] = useState("2024");
  const [toYear, setToYear] = useState("2025");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const handlePromotion = async () => {
    setLoading(true);
    try {
      // Call Supabase RPC function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/promote_students_to_next_class`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            from_year: parseInt(fromYear),
            to_year: parseInt(toYear),
          }),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Promotion error:", error);
      setResult({ error: "Failed to process promotions" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Student Promotions
          </h1>
          <p className="text-muted-foreground">
            Manage automatic class promotions at the start of academic year
          </p>
        </div>

        {/* Promotion Rules Info */}
        <Card className="p-6 bg-card border-border mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Promotion Flow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">
                Elementary Section
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Baby → Middle</p>
                <p>Middle → Top</p>
                <p>Top → P.1 (Primary Section)</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">
                Primary Section
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>P.1 → P.2 → P.3 → P.4 → P.5 → P.6 → P.7</p>
                <p className="font-semibold text-accent">
                  P.7 → Graduation 🎓
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Promotion Control */}
        <Card className="p-6 bg-card border-border mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Run Promotions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                From Academic Year
              </label>
              <Select value={fromYear} onValueChange={setFromYear}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                To Academic Year
              </label>
              <Select value={toYear} onValueChange={setToYear}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                    Start Promotions
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">
                      Confirm Promotions
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      This will automatically promote all active students from
                      {" "}
                      <span className="font-semibold">{fromYear}</span>
                      {" "}
                      to
                      {" "}
                      <span className="font-semibold">{toYear}</span>. P.7 students will be marked as
                      graduated.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1 border-border text-foreground hover:bg-secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePromotion}
                      disabled={loading}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {loading ? "Processing..." : "Confirm"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>

        {/* Results */}
        {result && (
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Promotion Results
            </h2>
            {result.error ? (
              <Alert className="bg-destructive/10 border-destructive">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">
                  {result.error}
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-3">
                {result.length === 0 ? (
                  <Alert className="bg-secondary/10 border-border">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-muted-foreground">
                      No students to promote
                    </AlertDescription>
                  </Alert>
                ) : (
                  <>
                    <Alert className="bg-green-500/10 border-green-500/30">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertDescription className="text-green-700 dark:text-green-400">
                        Successfully processed {result.length} students
                      </AlertDescription>
                    </Alert>
                    <div className="max-h-96 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 font-semibold text-foreground">
                              Student
                            </th>
                            <th className="text-left py-2 px-3 font-semibold text-foreground">
                              From
                            </th>
                            <th className="text-left py-2 px-3 font-semibold text-foreground">
                              To
                            </th>
                            <th className="text-left py-2 px-3 font-semibold text-foreground">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.map((item: any, idx: number) => (
                            <tr
                              key={idx}
                              className="border-b border-border hover:bg-secondary/50"
                            >
                              <td className="py-2 px-3 text-foreground">
                                {item.student_name}
                              </td>
                              <td className="py-2 px-3 text-muted-foreground">
                                {item.from_class}
                              </td>
                              <td className="py-2 px-3 text-muted-foreground">
                                {item.to_class}
                              </td>
                              <td className="py-2 px-3">
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    item.status === "Graduated"
                                      ? "bg-accent/20 text-accent"
                                      : "bg-green-500/20 text-green-600 dark:text-green-400"
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
