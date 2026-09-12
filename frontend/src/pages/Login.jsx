import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  // Already logged in? Don't show the form.
  if (user) {
    navigate("/", { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setBusy(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage(
          "Account created. If email confirmation is on, check your inbox, then sign in."
        );
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/", { replace: true });
      }
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-700 border border-gray-600 rounded-xl p-8 w-96"
      >
        <h1 className="text-2xl font-semibold text-center">
          {isSignUp ? "Create an account" : "Sign in"}
        </h1>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg px-3 py-2 text-gray-800 bg-white"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg px-3 py-2 text-gray-800 bg-white"
            placeholder="••••••••"
          />
        </div>

        {message && (
          <p className="text-sm text-yellow-300 text-center">{message}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all rounded-lg px-4 py-2 font-medium disabled:opacity-50"
        >
          {busy ? "Please wait..." : isSignUp ? "Sign up" : "Sign in"}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsSignUp((v) => !v);
            setMessage(null);
          }}
          className="text-sm text-blue-300 hover:text-blue-200"
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "No account? Create one"}
        </button>
      </form>
    </div>
  );
}
