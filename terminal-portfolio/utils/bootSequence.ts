export const bootLines = [
  "Initializing system...",
  "Loading kernel modules...",
  "Mounting virtual file system...",
  "Starting network services...",
  "Checking security policies...",
  "System ready."
];

export async function runBootSequence(
  addLine: (line: string) => void,
  delay = 600
) {
  for (const line of bootLines) {
    addLine(line);
    await new Promise((res) => setTimeout(res, delay));
  }
}
