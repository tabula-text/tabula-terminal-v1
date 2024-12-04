"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SquareTerminal } from "lucide-react";
import { Caret } from "./Caret";

export function Terminal() {
  const [input, setInput] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("Continue? [Y/n] ");
  const [output, setOutput] = useState<string[]>([
    "Welcome to the Tabula Terminal",
    "Copyright (C) 2024 Tabúla Textasmiðja. All rights reserved.",
    "",
  ]);
  const [caretVisible, setCaretVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleInput = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = input.toLowerCase();
        let response = "";

        if (value === "y" || value === "") {
          response = "Proceeding...";
        } else if (value === "n") {
          response = "Operation cancelled.";
        } else {
          response = "Please enter 'Y' for yes or 'N' for no.";
        }

        setOutput((prev) => [...prev, prompt + input, response]);
        setInput("");
      }
    },
    [input, prompt]
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Handle focus/blur for caret visibility
  useEffect(() => {
    const handleFocus = () => setCaretVisible(true);
    const handleBlur = () => setCaretVisible(false);

    const input = inputRef.current;
    if (input) {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);

      return () => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Terminal Header */}
        <div className="bg-neutral-800 rounded-t-lg p-3 flex items-center gap-2 border-b border-neutral-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 mx-auto">
            <SquareTerminal className="w-4 h-4 text-neutral-400" />
            <span className="text-neutral-400 text-sm">Terminal</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="bg-black rounded-b-lg p-4 h-[480px] overflow-y-auto text-sm"
          onClick={handleTerminalClick}
        >
          {/* Output */}
          {output.map((line, i) => (
            <div key={i} className="text-green-500 whitespace-pre-wrap">
              {line}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex text-green-500 relative">
            <span>{prompt}</span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInput}
                className="w-full bg-transparent outline-none text-transparent selection:bg-green-500 selection:text-black caret-transparent"
                maxLength={1}
                aria-label="Terminal input"
              />
              <div className="absolute inset-0 pointer-events-none text-green-500">
                {input}
                <Caret visible={caretVisible} className="left-[calc(0.6em*var(--cursor-pos))]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}