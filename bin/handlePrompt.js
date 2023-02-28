import { emitKeypressEvents } from "readline";
import open from "open";

export function handlePrompt(path) {
  emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.on("keypress", (str, key) => {
    switch (key.name) {
      case "h":
        console.log("\x1b[32mAvailable commands:\n");
        console.log("\x1b[39m    h: \x1b[35mDisplays this help screen.");
        console.log("\x1b[39m    c: \x1b[35mClears the console.");
        console.log("\x1b[39m    o: \x1b[35mOpens page in default browser.");
        console.log("\x1b[39m    q: \x1b[35mQuit the application");
        console.log(
          "\n\x1b[32mListening for commands. Enter 'h' for help.\n\x1b[39m"
        );
        break;

      case "c":
        if (key.ctrl) {
          process.kill(process.ppid);
          process.exit(0);
        }
        console.clear();
        console.log(
          "\x1b[32mListening for commands. Enter 'h' for help.\n\x1b[39m"
        );
        break;

      case "o":
        console.log("\x1b[32mOpening in default browser.");
        open(path);
        console.log("If your browser does not open, you must");
        console.log(`manually navigate to: \x1b[94m${path}\x1b[32m`);
        console.log("Listening for commands. Enter 'h' for help.\n\x1b[39m");
        break;

      case "q":
        console.log("\x1b[35mExiting cleanly.\x1b[39m");
        process.kill(process.ppid);
        process.exit(0);
    }
  });
  console.log("\x1b[32mListening for commands. Enter 'h' for help.\n\x1b[39m");
}
