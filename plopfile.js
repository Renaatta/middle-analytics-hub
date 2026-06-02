module.exports = function (plop) {
  plop.setGenerator('ui-component', {
    description: 'Генерация базового UI-компонента в shared/ui',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Как будет называться компонент? (например: Button, Card)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/shared/ui/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/shared/ui/{{pascalCase name}}/{{pascalCase name}}.module.css',
        templateFile: 'plop-templates/Component.module.css.hbs',
      },
      {
        type: 'add',
        path: 'src/shared/ui/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
      },
    ],
  });
};