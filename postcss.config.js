// чтобы оптимизировать(упорялочит) медиа-запросы, используем бибилиотеку https://www.npmjs.com/package/postcss-sort-media-queries :
// и почтавили https://www.npmjs.com/package/autoprefixer

import autoprefixer from "autoprefixer";
import postcssSortMediaQueries from 'postcss-sort-media-queries';

export default{
  plugins: [
    autoprefixer(),
    postcssSortMediaQueries({
      sort: 'desktop-first', 
    }),
  ]
}
