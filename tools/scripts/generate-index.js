const { join, parse } = require("path");
const fs = require("fs");

const libs = ["components", "hooks"];

const libPath = join(__dirname, "../..", "libs");

for (const lib of libs) {
  const libDir = join(libPath, lib);
  const filesDir = join(libDir, "src", "lib");

  const files = fs.readdirSync(filesDir);

  const index = files.reduce((acc, file) => {
    const { name } = parse(file);
    return `${acc}export * from "./lib/${name}"\n`;
  }, "");
  const indexFile = join(libDir, "src", "index.ts");

  fs.writeFileSync(indexFile, index);
}
