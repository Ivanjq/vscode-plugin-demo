import * as vscode from 'vscode';
import { CssRpxProcess } from './process';
import { CssRpxProvider } from './provider';

let config = vscode.workspace.getConfiguration('px-to-rpx');
const process = new CssRpxProcess(config);
let provider = new CssRpxProvider(process);
const LANS = [
  'html',
  'vue',
  'swan',
  'wxml',
  'axml',
  'css',
  'wxss',
  'acss',
  'less',
  'scss',
  'sass',
  'stylus',
  'wxss',
  'acss',
];
function checkLans(context: vscode.ExtensionContext) {
  for (let lan of LANS) {
    //为对应类型文件添加代码提示
    let providerDisposable = vscode.languages.registerCompletionItemProvider(
      lan,
      provider
    );
    context.subscriptions.push(providerDisposable);
  }
}

//注册px2rpx命令
export function PXToRPX(context: vscode.ExtensionContext) {
  checkLans(context);
  vscode.commands.registerTextEditorCommand(
    'extension.px2rpx',
    (textEditor, edit) => {
      const doc = textEditor.document;
      const start = new vscode.Position(0, 0);
      const end = new vscode.Position(
        doc.lineCount - 1,
        doc.lineAt(doc.lineCount - 1).text.length
      );
      //获取全部文本区域
      const selection = new vscode.Range(start, end);
      let text = doc.getText(selection);
      //替换文件内容
      textEditor.edit((builder) => {
        builder.replace(selection, process.convertAll(text));
      });
    }
  );
}
//注册px2rpxInSelection命令
export function PXToRPXInSELECT(context: vscode.ExtensionContext) {
  checkLans(context);
  vscode.commands.registerTextEditorCommand(
    'extension.px2rpxInSelection',
    (textEditor, edit) => {
      const doc = textEditor.document;
      let selection: vscode.Selection | vscode.Range = textEditor.selection;
      //获取选中区域
      if (selection.isEmpty) {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(
          doc.lineCount - 1,
          doc.lineAt(doc.lineCount - 1).text.length
        );
        selection = new vscode.Range(start, end);
      }

      let text = doc.getText(selection);
      //替换文件内容
      textEditor.edit((builder) => {
        builder.replace(selection, process.convertAll(text));
      });
    }
  );
}
