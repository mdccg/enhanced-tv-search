const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in leo efficitur, placerat justo at, dapibus erat. Duis in tortor vulputate, sagittis velit eu, vestibulum odio. Mauris vulputate sem id sapien ultrices aliquet eu id nisi. Phasellus dictum mattis ultricies. Aenean fringilla urna in tincidunt fermentum. Nunc bibendum lectus quis odio condimentum, at porta odio placerat. Donec tempus massa sed nulla tempor elementum. Proin mattis purus eget eros volutpat ullamcorper. Nullam vel ultricies quam. Donec suscipit malesuada tristique. Nullam et aliquam tellus. Proin pellentesque, odio in tincidunt posuere, urna justo viverra nibh, sed viverra ipsum erat a purus. Suspendisse mollis consectetur sem, sit amet finibus risus semper eu. Proin malesuada nunc a vestibulum vulputate. Fusce ut viverra nunc. Duis dui massa, rhoncus eu augue ut, auctor dictum quam. Donec ac eros tempus, condimentum urna sed, luctus lacus. Ut sit amet eleifend est, eget imperdiet lorem. Etiam eget magna sem. Aliquam vitae ante eget quam eleifend luctus. Nullam eros dolor, euismod a cursus eget, lobortis sit amet velit. In vehicula nulla mi, varius luctus leo mattis non. Etiam lacus arcu, lobortis vitae tempus ac, varius vel erat. Nulla gravida quam sed elit aliquet, sit amet cursus risus sagittis. Fusce tempor, nibh rutrum malesuada pretium, lacus tortor facilisis magna, at suscipit erat justo id eros. Quisque vitae sapien consectetur, cursus tellus quis, aliquam arcu. Etiam pellentesque eros et lorem hendrerit ultricies. Morbi commodo, mi ac fermentum pharetra, orci mauris placerat dolor, eget dapibus neque sapien quis tellus. In sit amet rhoncus ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque lorem risus, scelerisque at congue et, feugiat aliquet tortor. Cras gravida sem at elit lacinia rutrum. Maecenas lobortis et ipsum ut euismod. Sed dignissim massa sit amet egestas vehicula. Mauris interdum sodales metus a aliquam. Phasellus congue suscipit pharetra. Cras imperdiet rutrum nisl, sit amet maximus libero congue non. Quisque in hendrerit sem. Suspendisse rutrum vestibulum metus non vehicula. Morbi accumsan consectetur mi quis ullamcorper. Morbi fringilla mollis cursus. Duis id ante ipsum. Quisque lacinia rhoncus leo, in finibus mauris lacinia id. Morbi a ex at mi gravida vehicula molestie at augue. Praesent bibendum tortor ligula, non rutrum lorem tristique ac. Cras id finibus ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eget lectus eu augue mattis ultrices. Donec condimentum sapien sed finibus interdum. Curabitur diam nunc, bibendum nec ante eget, tempor porttitor risus. Vivamus eu urna justo. Donec ultricies nisl quis dui finibus accumsan. Vivamus ultrices urna in fermentum ultricies. Morbi a risus pretium, malesuada nibh vitae, eleifend arcu. Donec at nulla ex. Curabitur nunc sapien, ultricies luctus lacus bibendum, rutrum varius ligula. Sed ac tellus dapibus purus elementum pellentesque. Mauris cursus felis quis massa pulvinar sollicitudin.`;

const termsOfUse = Array(255).fill(loremIpsum).join(' ');

document.writeln('<h1>Termos de uso do app</h1>');
document.writeln(`
  <p
    style="
      font-size: 50%;
      text-indent: 16px;
      text-align: justify;
    ">${termsOfUse}</p>
`);
document.writeln('<h2>Ficamos felizes que tenha lido até o final! ;)</h2>');
document.writeln(`
  <h3
    onclick="history.back()"
    style="
      color: #1d9bf0;
      cursor: pointer;
      text-decoration: underline;
    ">&larr; Voltar à página anterior</h3>
`);