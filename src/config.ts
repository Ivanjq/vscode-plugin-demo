import * as vscode from 'vscode';
const fs = require('fs');

export function getDependence() {
  // 同步读取package.json
  const projectPath = vscode.workspace.rootPath;
  const packagePath = projectPath + '\\package.json';
  const fileContent = fs.readFileSync(packagePath, 'utf8').replace(/\s/g, '');
  const dependencies = {
    ...JSON.parse(fileContent).dependencies,
    ...JSON.parse(fileContent).devDependencies,
  };
  if (dependencies.hasOwnProperty('element-plus')) {
    return 'element-plus';
  } else if (dependencies.hasOwnProperty('element-ui')) {
    return 'element-ui';
  }
  return '';
}

export function getUICompList(UI_NAME: string) {
  const projectPath = vscode.workspace.rootPath;
  let restPath = '';
  if (UI_NAME === 'element-plus') {
    restPath = '\\node_modules\\@element-plus\\icons-vue\\dist\\global.js';
  }
  const packagePath = projectPath + '\\package.json';
  const fileContent = fs.readFileSync(packagePath, 'utf8').replace(/\s/g, '');
  const dependencies = {
    ...JSON.parse(fileContent).dependencies,
    ...JSON.parse(fileContent).devDependencies,
  };
  if (dependencies.hasOwnProperty('element-plus')) {
    return 'element-plus';
  } else if (dependencies.hasOwnProperty('element-ui')) {
    return 'element-ui';
  }
  return '';
}

// This method is called when your extension is deactivated
export function deactivate() {}
