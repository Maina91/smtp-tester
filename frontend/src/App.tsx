import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

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
    <div className="min-h-screen   bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md py-4 px-6 w-full">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">SMTP Test Tool</h1>
      </header>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={field.name === "user" || field.name === "pass" 
                      ? form.auth[field.name as keyof typeof form.auth] 
                      : (form[field.name as keyof Omit<SmtpPayload, 'auth' | 'user' | 'pass'>] as string) || ''}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}

              <div className="md:col-span-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="secure"
                  checked={form.secure}
                  onChange={(e) => setForm({ ...form, secure: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="secure" className="block text-sm text-gray-900">
                  Use SSL/TLS (secure)
                </label>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-xl text-white font-semibold transition ${
                    loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Testing..." : "Test SMTP"}
                </button>
              </div>
            </form>
          {(result || error) && (
            <div
              className={`mt-6 flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${
                result ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {result ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <span>{result || error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
