/**
 * Created by zhaoshuxiang on 16/6/16.
 */
const del = require('del');
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    changed = require('gulp-changed'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    projectName = 'dog',
    distDir = './dist',
    testDir = './testDir',
    wwwDir = './wwwDir',
    srcConfig = {
        sass: './src/sass/**/*.scss',
        js: './src/js/**/*.js',
        images: './dist/images/**/*',
        media: './dist/media/**/*'
    },
    destConfig = {
        css: distDir + '/css',
        js: distDir + '/js'
    },
    testConfig = {
        css: testDir + '/res/app/css/topic/' + projectName,
        js: testDir + '/res/app/js/topic/' + projectName,
        images: testDir + '/res/app/images/topic/' + projectName,
        media: testDir + '/res/app/images/media/',
        html:testDir + '/yc_html/app/topic/' + projectName,
        path:'http://test.res.ycnuli.com/res/',
        site:'http://activity.ycnuli.com/',
        weixinUrl:'http://activity.ycnuli.com/weixin/share.do',
        appId:'wx58e3e94f8313e300'
    },
    wwwConfig = {
        css: wwwDir + '/res/app/css/topic/' + projectName,
        js: wwwDir + '/res/app/js/topic/' + projectName,
        images: wwwDir + '/res/app/images/topic/' + projectName,
        media: wwwDir + '/res/app/images/media/',
        html:wwwDir + '/yc_html/app/topic/' + projectName,
        path:'http://res.ycw.com/',
        site:'http://activity.yc.cn/',
        weixinUrl:'http://www.yc.cn/weixin/share.do',
        appId:'wxf4466017457b72fa'
    },
    development = true;

gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('testImageMin', function () {
    gulp.src(srcConfig.images)
        .pipe(imagemin())
        .pipe(size())
        .pipe(gulp.dest(testConfig.images))
});

gulp.task('wwwImageMin', function () {
    gulp.src(srcConfig.images)
        .pipe(imagemin())
        .pipe(size())
        .pipe(gulp.dest(wwwConfig.images))
});

gulp.task('testMedia', function () {
    gulp.src(srcConfig.media)
        .pipe(size())
        .pipe(gulp.dest(testConfig.media))
});

gulp.task('wwwMedia', function () {
    gulp.src(srcConfig.media)
        .pipe(size())
        .pipe(gulp.dest(wwwConfig.media))
});


gulp.task('sass', function () {
    if (development) {
        return gulp.src(srcConfig.sass)
            .pipe(changed(destConfig.css))
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer({browsers: ['> 1%', 'IE 7'], remove: false}))
            .pipe(sourcemaps.write('./maps'))
            .pipe(size())
            .pipe(gulp.dest(destConfig.css))

    } else {
        return gulp.src(srcConfig.sass)
            .pipe(changed(destConfig.css))
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer({browsers: ['> 1%', 'IE 7'], remove: false}))
            .pipe(size())
            .pipe(replace('../images/', '../../../images/topic/' + projectName + '/'))
            .pipe(gulp.dest(testConfig.css))
    }
});

gulp.task('wwwSass', function () {
    return gulp.src(srcConfig.sass)
        .pipe(changed(destConfig.css))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['> 1%', 'IE 7'], remove: false}))
        .pipe(size())
        .pipe(replace('../images/', '../../../images/topic/' + projectName + '/'))
        .pipe(gulp.dest(wwwConfig.css))
});

gulp.task('js', function () {
    return gulp.src(srcConfig.js)
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest(destConfig.js))
});

gulp.task('testJs', function () {
    return gulp.src(srcConfig.js)
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest(testConfig.js))
});

gulp.task('wwwJs', function () {
    return gulp.src(srcConfig.js)
        .pipe(uglify())
        .pipe(size())
        .pipe(replace(testConfig.weixinUrl,wwwConfig.weixinUrl))
        .pipe(replace(testConfig.site,wwwConfig.site))
        .pipe(replace(testConfig.appId,wwwConfig.appId))
        .pipe(gulp.dest(wwwConfig.js))
});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

gulp.task('testHtml', function () {
    return gulp.src('*.html')
        .pipe(replace('dist/css/', testConfig.path + 'app/css/topic/' + projectName + '/'))
        .pipe(replace('dist/images/', testConfig.path + 'app/images/topic/' + projectName + '/'))
        .pipe(replace('dist/media/', testConfig.path + 'app/images/media/'))
        .pipe(replace('src/js', testConfig.path + 'app/js/topic/' + projectName + '/'))
        .pipe(size())
        .pipe(gulp.dest(testConfig.html))
});

gulp.task('wwwHtml', function () {
    return gulp.src('*.html')
        .pipe(replace('dist/css/', wwwConfig.path + 'app/css/topic/' + projectName + '/'))
        .pipe(replace('dist/images/', wwwConfig.path + 'app/images/topic/' + projectName + '/'))
        .pipe(replace('dist/media/', wwwConfig.path + 'app/images/media/'))
        .pipe(replace('src/js', wwwConfig.path + 'app/js/topic/' + projectName + '/'))
        .pipe(replace(testConfig.path, wwwConfig.path))
        .pipe(size())
        .pipe(gulp.dest(wwwConfig.html))
});

gulp.task('watch', function () {
    gulp.watch(srcConfig.sass, ['sass']);
    gulp.watch(srcConfig.js, ['js']);
    gulp.watch(['*.html', srcConfig.js, srcConfig.sass], ['html']);
});

gulp.task('default', ['watch', 'connect']);

gulp.task('test', function () {
    development = false;
    del([testDir]).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    gulp.start('sass');
    gulp.start('testJs');
    gulp.start('testImageMin');
    gulp.start('testMedia');
    gulp.start('testHtml');
});
});

gulp.task('www', function () {
    del([wwwDir]).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    gulp.start('wwwSass');
    gulp.start('wwwJs');
    gulp.start('wwwImageMin');
    gulp.start('wwwMedia');
    gulp.start('wwwHtml');
});
});

