// fis.match('::packager', {
//   spriter: fis.plugin('csssprites')
// });

// // fis.match('*', {
// //   useHash: true
// // });


fis.match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

// fis.match('*.css', {
//   useSprite: true,
//   optimizer: fis.plugin('clean-css')
// });

// // fis.match('*.png', {
// //   optimizer: fis.plugin('png-compressor')
// // });

// // fis.match('*.{js,css,png}', {
// //   useHash: true
// // });

// // fis.match('*.js', {
// //   isMod: true,
// //   release:"/output1/$0"
// // });



// //aa
// // // fis-conf.js
// // fis.match('*.html', {
// //     useMap: true
// // });

// // fis.match('*.{js,css}', {
// //     // 开启 hash
// //     useHash: true
// // });
// // @dddddddddddd
// // fis.match('*.{js,css,png,gif}', {
// //     useHash: true // 开启 md5 戳
// // });

// // 
// // fis.match('**.js', {
// //     //发布到/static/js/xxx目录下
// //     release : '/static/js$0',
// //     //访问url是/mm/static/js/xxx
// //     // url : '/mm/static/js$0'
// // });

// /**
//  output file to dirpath;
// */
// // fis.match('**.css', {
// //     //发布到/static/css/xxx目录下
// //     release : '/static/css$0',
// //     //访问url是/pp/static/css/xxx
// //     // url : '/pp/static/css$0'
// // });

// // // 所有image目录下的.png，.gif文件
// // fis.match('(*.{png,gif})', {
// //     //发布到/static/pic/xxx目录下
// //     release: '/static/pic/$1',
// //     //访问url是/oo/static/baidu/xxx
// //     // url : '/oo/static/baidu$0'
// // });
// /**
//  combine js css;
// */
// // fis.match('*.css', {
// //   packTo: '/static/aio.css'
// // });

// // fis.match('*.js', {
// //   packTo: '/static/aio.js'
// // });



// /**
//  all in one 
// */
// fis.hook('cmd', {
//   // baseUrl: './sea-modules/',

//   // paths: {
//   //   "jquery": "jquery/jquery/1.10.1/jquery.js",
//   //   "$": "jquery/jquery/1.10.1/jquery.js",
//   //   "jquery-easing": "jquery/easing/1.3.0/easing.js",
//   //   "store": "gallery/store/1.3.7/store",
//   //   "angularjs": "angular/angularjs/1.1.5/angular.js",
//   //   "underscore": "gallery/underscore/1.4.4/underscore.js",
//   //   "backbone": "gallery/backbone/1.0.0/backbone.js"
//   // }
// });

// // fis.match('::package', {
// //   postpackager: fis.plugin('loader', {
// //     allInOne: true
// //   })
// // });
// 
// 
// 
// 
/*
fis.match('*', {
  deploy: fis.plugin('local-deliver', {
    to: '../output1'
  })
})

fis.set('project.files', ['*.html', 'map.json']);

fis.match('*.js', {
  isMod: true
});

fis.match('sea.js', {
  isMod: false
});
fis.hook('cmd', {
  // baseUrl: './sea-modules/',

  // paths: {
  //   "jquery": "jquery/jquery/1.10.1/jquery.js",
  //   "$": "jquery/jquery/1.10.1/jquery.js",
  //   "jquery-easing": "jquery/easing/1.3.0/easing.js",
  //   "store": "gallery/store/1.3.7/store",
  //   "angularjs": "angular/angularjs/1.1.5/angular.js",
  //   "underscore": "gallery/underscore/1.4.4/underscore.js",
  //   "backbone": "gallery/backbone/1.0.0/backbone.js"
  // }
});
fis.match('*', {
  deploy: fis.plugin('local-deliver', {
    to: '../out'
  })
})
fis.match('::packager', {
  postpackager: fis.plugin('loader')
});


// 注意： fis 中的 sea.js 方案，不支持部分打包。
// 所以不要去配置 packTo 了，运行时会报错的。
fis
  .media('prod')
  .match('**.js', {
    // 通过 uglify 压缩 js
    // 记得先安装：
    // npm install [-g] fis-optimizer-uglify-js
    optimizer: fis.plugin('uglify-js')
  })
  .match('::packager', {
    postpackager: fis.plugin('loader', {
      allInOne: {
        includeAsyncs: true,
        ignore: ['sea.js']
      }
    })
  })*/