module.exports = {
    module: {
        rules: [
            {
                test   : /\.scss$/,
                loader : 'postcss-loader',
                options: {
                    postcssOptions: {
                        syntax: 'postcss-scss',
                        plugins: [
                            'postcss-import',
                            'tailwindcss',
                            'autoprefixer',
                        ],
                    },
                }
            }
        ]
    }
};
