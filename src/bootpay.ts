import { BootpayStorage } from './lib/storage'
import { isPresent } from './lib/common/support'
import { Logger } from './lib/common/logger'
import { BootpayCommonEvent, EventListener } from './lib/event'
import { CommonAnalyticsData, LoginData, startLoginSession, startTrace } from './lib/analytics'
import { Config } from './lib/config'

declare global {
    interface Window {
        BootPay: BootPayInstance
    }
}

interface BootPayInstance {
    initialize(): void

    setLogLevel(logLevel: any): void

    setMode(mode: string): void

    startLoginSession(data: LoginData): void

    startTrace(data: CommonAnalyticsData): void
}


export const BootPay: BootPayInstance = {
    initialize(): void {
        if (isPresent(Element)) {
            EventListener.initialize()
            Logger.setLevel('warn')
            BootpayStorage.setReadyUUID()
            BootpayStorage.updateSessionKey()
            BootpayCommonEvent.catchCommonEvent()
            Logger.debug("Bootpay Instance 로딩이 완료되었습니다.")
        }
    },
    /**
     * 로그레벨을 설정합니다.
     * Comment by Gosomi
     * @date: 2020-10-29
     * @param logLevel: number or string
     * @returns void
     */
    setLogLevel(logLevel): void {
        Logger.setLevel(logLevel)
    },
    /**
     * 부트페이 Mode를 설정합니다
     * Comment by Gosomi
     * @date: 2020-10-29
     * @param mode: string
     * @returns void
     */
    setMode(mode): void {
        Config.setMode(mode)
    },

    startLoginSession(data: LoginData) {
        return startLoginSession(data)
    },
    /**
     * 통계 로그를 전송합니다
     * Comment by Gosomi
     * @date: 2020-10-29
     * @param data: CommonAnalyticsData
     * @returns void
     */
    startTrace(data: CommonAnalyticsData): void {
        return startTrace(data)
    }
}

window.BootPay = BootPay
BootPay.initialize()

// window.resetBootpayEventListener('message.test', (e: MessageEvent) => {
//     console.log(e.data)
// })
//
// window.postMessage('test', '*')
// setTimeout(() => {
//     window.removeBootpayEventListener('message.test')
//     window.postMessage('test2', '*')
// }, 500)
//
// window.addEventListener('DOMContentLoaded', () => {
//
// })