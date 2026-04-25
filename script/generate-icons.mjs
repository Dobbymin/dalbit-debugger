import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const ICON_DIR = path.join(projectRoot, "src/shared/_assets/icon");
const COMPONENTS_DIR = path.join(ICON_DIR, "components");

function banner() {
  return `/**
 * 해당 파일은 자동으로 생성됩니다. 수동으로 수정하지 마세요.
 * src/shared/_assets/icon에서 SVG 파일을 추가/삭제한 후 'pnpm run generate:icons'를 실행하세요.
 */\n`;
}

function toKebab(file) {
  return file.replace(/\.svg$/i, "");
}

function toPascal(kebab) {
  return kebab
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function readSvgFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".svg"))
    .sort((a, b) => a.localeCompare(b));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/**
 * SVG 파일에서 viewBox와 내부 콘텐츠를 추출합니다.
 */
function parseSvg(content) {
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

  const innerMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  const inner = innerMatch ? innerMatch[1].trim() : "";

  return { viewBox, inner };
}

/**
 * SVGProps<SVGSVGElement>를 받는 React 컴포넌트 TSX 코드를 생성합니다.
 * PandaCSS의 css() 결과(className 문자열)를 props로 바로 전달할 수 있습니다.
 */
function generateComponentCode(componentName, viewBox, inner) {
  return `import { type SVGProps } from 'react';

export function ${componentName}(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="${viewBox}"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      ${inner}
    </svg>
  );
}
`;
}

function main() {
  ensureDir(ICON_DIR);
  ensureDir(COMPONENTS_DIR);

  const files = readSvgFiles(ICON_DIR);

  if (files.length === 0) {
    console.log("SVG 파일이 없습니다. src/shared/_assets/icon 에 .svg 파일을 추가하세요.");
    return;
  }

  console.log(`총 ${files.length}개 SVG 파일을 React 컴포넌트로 변환 중...\n`);

  const componentNames = [];

  for (const file of files) {
    const kebab = toKebab(file);
    const componentName = `${toPascal(kebab)}Icon`;

    const svgContent = fs.readFileSync(path.join(ICON_DIR, file), "utf8");
    const { viewBox, inner } = parseSvg(svgContent);

    const tsxPath = path.join(COMPONENTS_DIR, `${componentName}.tsx`);
    fs.writeFileSync(tsxPath, `${banner()}\n${generateComponentCode(componentName, viewBox, inner)}`, "utf8");

    componentNames.push(componentName);
    console.log(`  ✓ ${componentName}`);
  }

  // components/index.ts — 각 컴포넌트 named export 모음
  const componentsIndex = `${banner()}\n${componentNames.map((name) => `export { ${name} } from './${name}';`).join("\n")}\n`;
  fs.writeFileSync(path.join(COMPONENTS_DIR, "index.ts"), componentsIndex, "utf8");

  // icon/index.ts — 외부에서 @/shared/_assets/icon 로 접근하는 진입점
  const iconsIndex = `${banner()}\nexport * from './components';\n`;
  fs.writeFileSync(path.join(ICON_DIR, "index.ts"), iconsIndex, "utf8");

  console.log(`\n아이콘 컴포넌트 생성 완료`);
  console.log(`  components/  →  ${COMPONENTS_DIR}`);
  console.log(`  index.ts     →  ${path.join(ICON_DIR, "index.ts")}`);
}

main();
