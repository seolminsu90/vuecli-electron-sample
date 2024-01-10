const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        electronBuilder: {
            mainProcessFile: 'src/background.js',
            rendererProcessFile: 'src/main.js',
            preload: 'src/main/preload.js',
            builderOptions: {
                asar: true,
                appId: 'com.rrimi',
                productName: '알리미',
                artifactName: '${productName} 설치하기.${ext}',
                win: {
                    target: [
                        {
                            target: 'nsis',
                            arch: ['x64', 'ia32']
                        }
                    ],
                    icon: 'icon.png'
                },
                nsis: {
                    oneClick: false,
                    perMachine: false,
                    installerIcon: 'icon.ico',
                    createDesktopShortcut: "always"
                }
            }
        }
    }
})
