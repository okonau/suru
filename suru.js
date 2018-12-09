const fs = require("fs");

task(() => {
  name("build");
  desc("build suru with suru");

  shell("npx", "tsc");

  run(() => {
    const package_json = fs.readFileSync(__dirname+"/package.json", { encoding: "utf-8", flag: "r"});
    const package = JSON.parse(package_json);
    package.main = "index.js"
    fs.writeFileSync(__dirname+"/dist/package.json", JSON.stringify(package, null, 3));
  })
});

task(() => {
  name("publish");
  desc("echo");

  arg("toto", { optional: true });

  shell("echo", "here", "from", "code", "now shell:", shell.args, "shell finished");
});
