import { BootpaySingleton } from './common/singleton'
import { isBlank, isPresent } from './common/support'
import { generateUUID } from './common/encrypt'
import { Logger } from './common/logger'

interface BootpayStorageKeys {
    uuidKey: string
    timeKey: string
    skKey: string
    skTimeKey: string
    lastTimeKey: string
    timeout: number
    visitTimeout: number,
    userKey: string
}

const BootpayStorageDefaultKeys: BootpayStorageKeys = {
    uuidKey: 'uuid',
    timeKey: 'time',
    skKey: 'sk',
    skTimeKey: 'sk_time',
    lastTimeKey: 'last_time',
    timeout: 1800000,
    visitTimeout: 86400000,
    userKey: 'user'
}

interface UserData {
    id?: string
    time?: number
}

class BootpayStorageManager extends BootpaySingleton {
    $localStorage: any

    constructor() {
        super()
        this.$localStorage = {}
    }

    currentUUID() {
        const uuid = this.get(BootpayStorageDefaultKeys.uuidKey)
        return isPresent(uuid) ? uuid : this.set(BootpayStorageDefaultKeys.uuidKey, generateUUID())
    }

    lastTime(value: any = undefined) {
        if (isPresent(value)) {
            this.set(BootpayStorageDefaultKeys.lastTimeKey, value)
        }
        return parseInt(this.get(BootpayStorageDefaultKeys.lastTimeKey))
    }

    sk(value: any = undefined) {
        if (isPresent(value)) {
            this.set(BootpayStorageDefaultKeys.skKey, value)
        }
        return this.get(BootpayStorageDefaultKeys.skKey)
    }

    time(value: any = undefined) {
        if (isPresent(value)) {
            this.set(BootpayStorageDefaultKeys.timeKey, value)
        }
        return parseInt(this.get(BootpayStorageDefaultKeys.timeKey))
    }

    skTime(value: any = undefined) {
        if (isPresent(value)) {
            this.set(BootpayStorageDefaultKeys.skTimeKey, value)
        }
        return parseInt(this.get(BootpayStorageDefaultKeys.skTimeKey))
    }

    user(value: any = undefined) {
        if (isPresent(value)) {
            this.set(BootpayStorageDefaultKeys.userKey, JSON.stringify(value))
        }
        let user = undefined
        try {
            user = JSON.parse(this.get(BootpayStorageDefaultKeys.userKey))
        } catch (e) {
            user = undefined
        }
        return user
    }

    expireUser() {
        if (this.time() + BootpayStorageDefaultKeys.visitTimeout < this.now()) {
            this.user(undefined)
        }
    }

    setUUID(uuid: string) {
        this.set(BootpayStorageDefaultKeys.uuidKey, uuid)
    }

    setReadyUUID() {
        this.currentUUID()
    }

    updateSessionKey() {
        const sessionTime = this.now()
        const lastTime = this.lastTime()
        // 세션 타임이 nan이거나, 시간이 이미 만료되면 갱신한다
        if (isBlank(lastTime) || isNaN(lastTime) || lastTime + BootpayStorageDefaultKeys.timeout < sessionTime) {
            this.sk(`${this.currentUUID()}-${sessionTime}`)
            this.skTime(sessionTime)
            this.time((isBlank(lastTime) || isNaN(lastTime)) ? 0 : (sessionTime - lastTime))
            this.lastTime(sessionTime)
            Logger.debug(`
                마지막 접속 시간 timeout을 지나 세션 고유값 정보를 갱신하였습니다.
                sk: ${this.sk()},
                time: ${this.time()}                
            `)
        }
    }

    now() {
        return (new Date()).getTime()
    }

    private set(key: string, value: any) {
        try {
            window.localStorage.setItem(key, value)
            return value
        } catch (e) {
            this.$localStorage[key] = value
            return value
        }
    }

    private get(key: string) {
        try {
            return window.localStorage.getItem(key)
        } catch (e) {
            return this.$localStorage[key]
        }
    }
}

export const BootpayStorage = BootpayStorageManager.currentInstance<BootpayStorageManager>()