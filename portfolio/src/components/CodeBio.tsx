import { useEffect, useState, useMemo } from 'react';

// Token di-highlight dengan warna ala editor (VS Code dark+)
type Token = { text: string; className: string };

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  const regex =
    /(\/\/.*$)|("(?:[^"\\]|\\.)*")|('[^']*')|(\b(?:import|from|const|let|var|function|return|export|default|new|await|async|type|interface)\b)|(\b[A-Z][A-Za-z0-9_]*\b)|(\b\d+(?:\.\d+)?\b)|([{}()[\];,.=><!&|+\-*/:]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), className: '' });
    }
    let cls = '';
    if (match[1]) cls = 'text-gray-500 italic'; // comment
    else if (match[2] || match[3]) cls = 'text-amber-300'; // string
    else if (match[4]) cls = 'text-fuchsia-400'; // keyword
    else if (match[5]) cls = 'text-teal-300'; // class/type
    else if (match[6]) cls = 'text-orange-300'; // number
    else if (match[7]) cls = 'text-gray-400'; // punctuation
    tokens.push({ text: match[0], className: cls });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), className: '' });
  }
  return tokens;
}

const CODE_LINES = [
  `const developer = {`,
  `  name: 'Moh. Arsyil Afif Madani',`,
  `  role: 'Full-Stack Developer',`,
  `  location: 'Indonesia',`,
  `  stack: ['React', 'TypeScript', 'Node.js', 'Supabase'],`,
  `  passion: 'turning ideas into real-world projects',`,
  `  currentlyLearning: ['IoT', 'Embedded Systems'],`,
  ``,
  `  sayHi() {`,
  `    console.log("Thanks for visiting my portfolio!");`,
  `  },`,
  `};`,
];

export default function CodeBio() {
  const totalChars = useMemo(
    () => CODE_LINES.join('\n').length,
    []
  );
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (charCount >= totalChars) return;
    const timer = setTimeout(() => setCharCount((c) => c + 1), 18);
    return () => clearTimeout(timer);
  }, [charCount, totalChars]);

  // potong sesuai progress mengetik
  let remaining = charCount;
  const visibleLines: string[] = [];
  for (const line of CODE_LINES) {
    if (remaining <= 0) break;
    visibleLines.push(line.slice(0, remaining));
    remaining -= line.length + 1; // +1 for newline
  }

  const done = charCount >= totalChars;

  return (
    <div className="relative w-full max-w-2xl mx-auto text-left">
      {/* Window chrome */}
      <div className="rounded-2xl border border-accent-soft bg-[#0d1117]/90 backdrop-blur-md shadow-glow-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-elevated border-b border-soft">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-gray-400 font-mono">
            developer.ts
          </span>
        </div>

        <pre className="p-5 overflow-x-auto text-sm sm:text-base font-mono leading-relaxed">
          <code>
            {visibleLines.map((line, i) => (
              <div key={i} className="flex">
                <span className="select-none w-8 mr-4 text-right text-gray-600 flex-shrink-0">
                  {i + 1}
                </span>
                <span className="whitespace-pre">
                  {tokenizeLine(line).map((token, j) => (
                    <span key={j} className={token.className}>
                      {token.text}
                    </span>
                  ))}
                  {i === visibleLines.length - 1 && !done && (
                    <span className="inline-block w-2 h-4 bg-accent align-middle animate-pulse ml-0.5" />
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
