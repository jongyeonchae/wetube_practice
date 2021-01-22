// path: Node JS에서 파일, 디렉토리를 absolute로 만드는 패키지
const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const MODE = process.env.WEBPACK_ENV;
// __dirname: 현재 프로젝트의 디렉토리명 (Node.js 전역 변수)
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    devtool: "cheap-module-source-map",
    mode: MODE,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                // 정규표현식을 통해 scss 파일 확인
                test: /\.(scss)$/,
                // webpack config 파일에서 loader를 사용할 때, 코드 실행의 순서는 역순
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        // 부여한 plugin에 맞춰 css 코드를 변환
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                        {
                                            // options 
                                            // browsers: "cover 99.5%"
                                        },
                                    ]
                                ]
                            }
                        }
                    },
                    {
                        // scss, sass 코드를 css 코드로 전환
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [
        // CssExtractPlugin: sass-loader로 추출된 css 코드를 별도의 파일(styles.css)에 번들하여 저장 
        new MiniCssExtractPlugin({
            filename: "styles.css"
        }),
    ]
};

module.exports = config;