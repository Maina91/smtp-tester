import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LogPanel } from "@/components/ui/log-panel";


type SmtpPayload = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from?: string;
  to?: string;
};

function App() {
  const [form, setForm] = useState<SmtpPayload>({
    host: "",
    port: 587,
    secure: false,
    auth: { user: "", pass: "" },
    from: "",
    to: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "secure") {
      setForm({ ...form, secure: checked });
    } else if (["user", "pass"].includes(name)) {
      setForm({ ...form, auth: { ...form.auth, [name]: value } });
    } else if (["port"].includes(name)) {
      setForm({ ...form, port: parseInt(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/test-smtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (err) {
      setError("Could not reach backend");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-semibold text-center mb-6 text-white-800">SMTP Test Tool</h1>
      <div className="flex-1 flex justify-center items-center py-10 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: "SMTP Host", name: "host", type: "text", required: true },
              { label: "Port", name: "port", type: "number", required: true },
              { label: "Username", name: "user", type: "text", required: true },
              { label: "Password", name: "pass", type: "password", required: true },
              { label: "From Email (optional)", name: "from", type: "email", required: false },
              { label: "To Email (optional)", name: "to", type: "email", required: false },
            ].map((field) => (
              <div key={field.name}>
                <label>{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  value={field.name === "user" || field.name === "pass"
                    ? form.auth[field.name as keyof typeof form.auth]
                    : (form[field.name as keyof Omit<SmtpPayload, 'auth' | 'user' | 'pass'>] as string) || ''}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-grey-500 outline-none"
                />
              </div>
            ))}

            <div className="md:col-span-2 flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="secure"
                  checked={form.secure}
                  onCheckedChange={(checked) => setForm({ ...form, secure: !!checked })}
                />
                <Label htmlFor="secure">Use SSL/TLS (secure)</Label>
              </div>
            </div>

            <div className="md:col-span-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  "Test SMTP"
                )}
              </Button>
            </div>
          </form>
          {(result || error) && (
            <div className="mt-6">
              <LogPanel
                status={result ? "success" : "error"}
                message={result || error || ""}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
