
import { GluegunCommand } from 'gluegun'


const command: GluegunCommand = {
  name: 'cli',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to Shopware PWA CLI')
  },
}

module.exports = command
