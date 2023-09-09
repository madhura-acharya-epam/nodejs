const os = require("os");
const childProcess = require("child_process");
const fs = require("fs");

let count = 0;
let content = "";
let command = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
let interval;

if (os.platform() === "win32") {
  command = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
}

function execProcess(command, callbackFn) {
  childProcess.exec(command, (error, stdout, stderr) => {
    callbackFn(error, stdout);
  });
}

function unixTimestamp() {
  return Math.floor(Date.now() / 1000);
}

function monitorLog(error, response) {
  if (!error) {
    count++;
    const timestamp = unixTimestamp();
    content += `\n${timestamp} : ${response}`;
    if (count % 600 === 0) {
      fs.appendFile("activityMonitor.log", content, (e) => {
        if (e) {
          clearInterval(interval);
        }
      });
      content = "";
    }
    console.clear();
    console.log(response);
  }
}

interval = setInterval(() => {
  execProcess(command, monitorLog);
}, 100);
