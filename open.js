import { execFileSync } from "child_process";

const commands = () => {
  const { platform } = process; // Get the os version

  if (platform === "linux") {
    return { command: "xdg-open", args: [""] };
  }

  if (platform === "darwin") {
    return { command: "open", args: [""] };
  }

  if (platform === "win32") {
    return { command: "cmd", args: ["/c", "start"] };
  }

  throw new Error(`Platform ${platform} isn't supported.`);
};

export function openWithDefaultApplication(path) {
  return new Promise((resolve, reject) => {
    try {
      const { command, args } = commands();
      execFileSync(command, [...args, encodeURI(path)]);
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
}
