import * as vscode from 'vscode';
import { PXToRPX } from './css/extension';
import { getDependence } from './config';
// import { docs as DOCS } from './docs';

let DOCS: any = {
  import: {
    desc: 'desc',
  },
};
let UI = '';
const reg = new RegExp(/\s+<(u-\w+)(([\s|\S]*)*\s+([\w|\:\|@]+)$)*/);
export function provideHover(
  document: vscode.TextDocument,
  position: vscode.Position
) {
  // ctrl选中的单词
  const word = document.getText(document.getWordRangeAtPosition(position));
  // 查询有无文档
  const docs = DOCS[word];
  if (docs) {
    return new vscode.Hover(docs.desc);
  }
  // 不是标签 属性 方法
  const lineText = document
    .lineAt(position)
    .text.substring(0, position.character);
  const getTag = lineText.match(reg);
  console.log('HOVER:', word, lineText, getTag);
  if (getTag && getTag[1] && DOCS[getTag[1]]) {
    const prop = DOCS[getTag[1]].propertiesAndMethod[word];
    if (prop.desc) {
      return new vscode.Hover(prop.desc);
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  let pxToRpx: any = PXToRPX(context);
  context.subscriptions.push(pxToRpx);
  UI = getDependence();
  if (UI === '') {
    console.log('..............未安装UI框架..............');
  }
  console.log(UI);
  const hoverDisposable = vscode.languages.registerHoverProvider('vue', {
    provideHover,
  });
  context.subscriptions.push(hoverDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
