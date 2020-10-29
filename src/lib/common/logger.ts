import { BootpaySingleton } from './singleton'
import { isPresent, isType } from './support'

const DEBUG = 4
const INFO = 3
const WARNING = 2
const ERROR = 1

const LevelKeys: any = {
    debug: 4,
    info: 3,
    warning: 2,
    error: 1
}

class BootpayLogger extends BootpaySingleton {
    $loglevel: number

    constructor() {
        super()
        this.$loglevel = INFO
    }

    setLevel(level: any) {
        let setLevel: number = INFO
        if (isType(level, 'string')) {
            setLevel = isPresent(LevelKeys[level.toLowerCase()]) ? LevelKeys[level.toLowerCase()] : INFO
        } else {
            setLevel = (level > 0 && level < 5) ? level : INFO
        }
        this.$loglevel = setLevel
        return
    }

    debug(message: string) {
        if (this.$loglevel >= DEBUG) {
            console.log(`BOOTPAY DEBUG: ${message}`)
        }
    }

    info(message: string) {
        if (this.$loglevel >= INFO) {
            console.info(`BOOTPAY INFO: ${message}`)
        }
    }

    warning(message: string) {
        if (this.$loglevel >= WARNING) {
            console.warn(`BOOTPAY WARN: ${message}`)
        }
    }

    error(message: string) {
        if (this.$loglevel >= ERROR) {
            console.error(`BOOTPAY ERROR: ${message}`)
        }
    }
}

export const Logger = BootpayLogger.currentInstance<BootpayLogger>()