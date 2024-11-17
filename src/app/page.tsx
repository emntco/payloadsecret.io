"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Home() {
  const [secret, setSecret] = useState<string>("");
  const [displayedSecret, setDisplayedSecret] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [showUsage, setShowUsage] = useState(false);

  const generateSecret = () => {
    setIsGenerating(true);
    setShowSecret(false);

    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const newSecret = btoa(String.fromCharCode(...array));
    setSecret(newSecret);
    setDisplayedSecret(
      newSecret.slice(0, 8) + "•".repeat(newSecret.length - 8)
    );
    setIsGenerating(false);
  };

  useEffect(() => {
    if (!secret) return;

    if (showSecret) {
      setDisplayedSecret(secret);
    } else {
      setDisplayedSecret(secret.slice(0, 8) + "•".repeat(secret.length - 8));
    }
  }, [showSecret, secret]);

  return (
    <main className="min-h-screen p-4 md:p-8 flex items-center justify-center bg-zinc-950">
      <div className="w-full max-w-2xl">
        <div className="text-center space-y-2 mb-6 md:space-y-3 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white px-4">
            Can you keep a secret?
          </h1>
          <p className="text-base md:text-lg text-zinc-400 px-4">
            Generate a secure 32-byte random secret for your Payload instance.
          </p>
        </div>
        <div className="space-y-4 md:space-y-6">
          <div className="flex justify-center gap-3 px-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={generateSecret}
                disabled={isGenerating}
                className="font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors duration-200 disabled:opacity-50 rounded-xl px-8"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={() => setShowUsage(!showUsage)}
                variant="outline"
                className="font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors duration-200 rounded-xl px-8 border-0"
              >
                Usage
              </Button>
            </motion.div>
          </div>

          {secret && (
            <motion.div
              className="space-y-2 px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full">
                <pre className="w-full p-3 md:p-4 rounded-xl bg-zinc-900 font-mono text-[10px] md:text-sm break-all whitespace-pre-wrap text-white border border-zinc-800">
                  {displayedSecret}
                </pre>
                <div className="absolute top-1.5 md:top-2 right-1.5 md:right-2 flex gap-1.5 md:gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 md:h-8 md:w-8 bg-zinc-800/50 hover:bg-zinc-800 text-white hover:text-white focus:text-white"
                    onClick={() => setShowSecret(!showSecret)}
                    disabled={isGenerating}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={showSecret ? "eye-off" : "eye"}
                        initial={{ opacity: 0, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -2 }}
                        transition={{ duration: 0.15 }}
                      >
                        {showSecret ? (
                          <EyeOffIcon className="h-3 w-3 md:h-4 md:w-4" />
                        ) : (
                          <EyeIcon className="h-3 w-3 md:h-4 md:w-4" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                  <CopyButton
                    value={secret}
                    className="h-6 w-6 md:h-8 md:w-8 text-white hover:bg-zinc-800"
                    disabled={isGenerating}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {showUsage && (
              <motion.div
                className="px-4 py-2 space-y-4 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-white">
                    Development
                  </h2>
                  <p className="text-zinc-400">
                    Add the secret to your{" "}
                    <code className="text-xs bg-zinc-800 px-1 py-0.5 rounded">
                      .env
                    </code>{" "}
                    file:
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-900 font-mono text-[10px] md:text-sm break-all whitespace-pre-wrap text-white border border-zinc-800">
                    {`PAYLOAD_SECRET=your_generated_secret_here`}
                  </pre>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-white">
                    Production
                  </h2>
                  <p className="text-zinc-400">
                    Set the secret in your production environment variables.
                    Example using Vercel:
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-900 font-mono text-[10px] md:text-sm whitespace-pre-wrap text-white border border-zinc-800">
                    {`vercel secrets add payload-secret your_generated_secret_here`}
                  </pre>
                  <p className="text-zinc-400">
                    Then reference it in your{" "}
                    <code className="text-xs bg-zinc-800 px-1 py-0.5 rounded">
                      vercel.json
                    </code>
                    :
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-900 font-mono text-[10px] md:text-sm whitespace-pre-wrap text-white border border-zinc-800">
                    {`{
  "env": {
    "PAYLOAD_SECRET": "@payload-secret"
  }
}`}
                  </pre>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-white">
                    Code
                  </h2>
                  <p className="text-zinc-400">In your Payload config:</p>
                  <pre className="p-3 rounded-lg bg-zinc-900 font-mono text-[10px] md:text-sm whitespace-pre-wrap text-white border border-zinc-800">
                    {`import { buildConfig } from 'payload/config';

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET,
  // ... rest of your config
});`}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
