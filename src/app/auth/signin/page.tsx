"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await signIn("credentials", {
				redirect: true,
				email,
				password,
				callbackUrl: "/",
			});
			if (!res || res.error) {
				setError(res?.error || "Sign in failed");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="container mx-auto px-5 py-10 max-w-md">
			<h1 className="text-2xl font-semibold mb-6">Sign in</h1>
			<form onSubmit={onSubmit} className="space-y-4">
				<input
					type="email"
					placeholder="Email"
					className="w-full border rounded px-3 py-2"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					className="w-full border rounded px-3 py-2"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{error && <p className="text-red-600 text-sm">{error}</p>}
				<button
					type="submit"
					className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
					disabled={loading}
				>
					{loading ? "Signing in..." : "Sign in"}
				</button>
			</form>
			<div className="mt-6">
				<button
					onClick={() => signIn("google", { callbackUrl: "/" })}
					className="w-full border py-2 rounded"
				>
					Continue with Google
				</button>
			</div>
		</div>
	);
}