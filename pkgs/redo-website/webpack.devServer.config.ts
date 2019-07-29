import merge from "webpack-merge"
import { devServerConfig } from "redo-bundle/webpack.base"
import { config } from "./webpack.common"

const webDevServerConfig = merge.smart(devServerConfig, config, {
    devServer: {
        open: true
    }
} as any)

module.exports = [webDevServerConfig]