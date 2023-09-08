const os = require("os");
const childProcess = require("child_process");
const fs = require("fs");

const execProcess = (command) => {
  childProcess.exec(command, (error, stdout, stderr) => {
    const op = stdout.split("\r\n");
    for (let item of op) {
      if (item) {
        console.log(item);
        const fileContent = `\n<${unixTimestamp()}>: ${item}`;
        fs.appendFile("activityMonitor.log", fileContent, (error) => {
          console.clear();
        });
      }
    }
  });
};

function unixTimestamp() {
  return Math.floor(Date.now() / 1000);
}

if (os.platform() === "win32") {
  execProcess(
    `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`
  );
} else if (os.platform() === "linux") {
  execProcess("ps -A -o %cpu,%mem,comm | sort -nr | head");
}
